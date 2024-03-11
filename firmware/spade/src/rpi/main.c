#include "pico/stdlib.h"
#include "hardware/pwm.h"
#include "hardware/spi.h"
#include "hardware/timer.h"
#include "hardware/watchdog.h"
#include "hardware/adc.h"
#include "pico/util/queue.h"
#include "pico/multicore.h"
#include "jerryscript.h"

#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

// Set to false to enable debug prints for development (this is janky)
#if true
  #define dbg puts
  #define dbgf printf
#else
  #define dbg(...) ;
  #define dbgf(...) ;
#endif

// Debugging shortcut might need this later 
#define yell puts

#ifdef SPADE_AUDIO
  #include "audio.c"
#endif

// More firmware stuiff
#include "ST7735_TFT.h"
#include "upload.h"

// Other imports
#include "shared/sprig_engine/base_engine.c"
#include "shared/sprig_engine/module_native.c"
#include "shared/js_runtime/jerry_mem.h"
#include "shared/js_runtime/jerryxx.c"
#include "shared/js_runtime/js.h"

// Externs for shared/ui/errorbuf.h
char errorbuf[512] = "";
Color errorbuf_color; // Initialized in main()
static void fatal_error() {
  // On fatal error, start an infinite loop rendering the errorbuf.
  errorbuf_color = color16(255, 0, 0); // Make sure it's red
  while (1) {
    text_clear();
    render_errorbuf();
    st7735_fill_start();
    render(st7735_fill_send);
    st7735_fill_finish();
  }
}
#include "shared/ui/errorbuf.h"

#define ARR_LEN(arr) (sizeof(arr) / sizeof(arr[0]))

/**
 * We store a 64-boolean ringbuffer of polled button states for a primitive
 * sort of debouncing. The button counts as pressed if more than 5/6th of
 * the ringbuffer is true.
 * 
 * (gpio_set_input_hysteresis_enabled was too slow.)
 */
#define HISTORY_LEN (64)
typedef struct {
  uint8_t history[HISTORY_LEN/8];
  uint8_t last_state;
  uint8_t ring_i;
} ButtonState;
uint button_pins[] = {  5,  7,  6,  8, 12, 14, 13, 15 };
static ButtonState button_states[ARR_LEN(button_pins)] = {0};

static bool button_history_read(ButtonState *bs, int i) {
  // We want to store bools compactly so we have to do some bit twiddling.
  int q = 1 << (i % 8);
  return !!(bs->history[i/8] & q);
}
static void button_history_write(ButtonState *bs, int i, bool value) {
  if (value)
    bs->history[i/8] |=   1 << (i % 8) ;
  else
    bs->history[i/8] &= ~(1 << (i % 8));
}

static void button_init(void) {
  for (int i = 0; i < ARR_LEN(button_pins); i++) {
    ButtonState *bs = button_states + i;
    gpio_set_dir(button_pins[i], GPIO_IN);
    gpio_pull_up(button_pins[i]);
  }
}

/**
 * Poll the buttons and push any keypresses to the main core.
 * 
 * (Should be run in a loop on a non-primary core.)
 */
static void button_poll(void) {
  for (int i = 0; i < ARR_LEN(button_pins); i++) {
    ButtonState *bs = button_states + i;

    bs->ring_i = (bs->ring_i + 1) % HISTORY_LEN; // Incrememnt ringbuffer index
    button_history_write(bs, bs->ring_i, gpio_get(button_pins[i]));

    // up is true if more than 5/6 are true
    int up = 0;
    for (int i = 0; i < HISTORY_LEN; i++) {
      up += button_history_read(bs, i);
    }
    up = up > ((HISTORY_LEN*5)/6); // Here we convert to a bool

    if (up != bs->last_state) {
      bs->last_state = up;
      if (!up) {
        // Send the keypress to the main core
        multicore_fifo_push_blocking(button_pins[i]); 
      }
    }
  }
}

// Turn on the power lights and dim them with PWM.
static void power_lights() {
  // left white light
  const int pin_num_0 = 28;
  gpio_set_function(pin_num_0, GPIO_FUNC_PWM);
  uint slice_num_0 = pwm_gpio_to_slice_num(pin_num_0);
  pwm_set_enabled(slice_num_0, true);
  pwm_set_gpio_level(pin_num_0, 65535/8);

  // right blue light
  const int pin_num_1 = 4;
  gpio_set_function(pin_num_1, GPIO_FUNC_PWM);
  uint slice_num_1 = pwm_gpio_to_slice_num(pin_num_1);
  pwm_set_enabled(slice_num_1, true);
  pwm_set_gpio_level(pin_num_1, 65535/4);
}

// Entry point for the second core that polls the buttons.
static void core1_entry(void) {
  button_init();

  while (1) {
    button_poll();
  }
}

// Wait for a game to be uploaded. // needed for load new scripts
static int load_new_scripts(void) {
  return upl_stdin_read();
}


int main() {
  // Overclock the RP2040! Default is 125MHz, we're going to 270MHz.
  set_sys_clock_khz(270000, true);

  errorbuf_color = color16(0, 255, 255); // cyan

  power_lights();   // Turn on the power lights
  stdio_init_all(); // Init serial port
  st7735_init();    // Init display
  // Init JerryScript
  jerry_init(JERRY_INIT_MEM_STATS);
  init(sprite_free_jerry_object); // TODO: document

  
  


  strcpy(errorbuf, "                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"   STARTING SOON!   \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					" sprig.hackclub.com \n");
  render_errorbuf();
  st7735_fill_start();
  render(st7735_fill_send);
  st7735_fill_finish();

  load_new_scripts();
  sleep_ms(3000);

  strcpy(errorbuf, "                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"   STARTING NOW!    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					"                    \n"
					" sprig.hackclub.com \n");
  render_errorbuf();
  st7735_fill_start();
  render(st7735_fill_send);
  st7735_fill_finish();

  load_new_scripts();
  sleep_ms(1000);
  

  // draw a pixel test
  drawPixel(0, 0, ST7735_CYAN);
  
  return 0;
}
