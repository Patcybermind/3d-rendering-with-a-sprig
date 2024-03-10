/*
@title: Learn Morse
@tags: []
@img: ""
@addedOn: 2023-10-15
@author: Ashen Chathuranga
*/

// define the sprites in our game
const player = "P";
const box = "B";
//const goal = "G";
const unit = "U";
const tr = "X";
const tl = "Z";
const br = "A";
const bl = "V";
const A = "a";
const B = "b";
const C = "c";
const D = "d";
const E = "e";
const F = "f";
const G = "g";
const H = "h";
const I = "i";
const J = "j";
const K = "k";
const L = "l";
const M = "m";
const N = "n";
const O = "o";
const P = "p";
const Q = "q";
const R = "r";
const S = "s";
const T = "t";
const U = "u";
const V = "v";
const W = "w";
const X = "x";
const Y = "y";
const Z = "z";
const N0 = "0";
const N1 = "1";
const N2 = "2";
const N3 = "3";
const N4 = "4";
const N5 = "5";
const N6 = "6";
const N7 = "7";
const N8 = "8";
const N9 = "9";
const space = "S";
const wall = "K";

const usedNumbers = [];
let levelFlag = false;
let marks = 0;

const tMove = tune`
151.5151515151515: D5^151.5151515151515 + A5^151.5151515151515,
4696.969696969696`;
const tTryAgain = tune`
84.98583569405099: F4/84.98583569405099 + B4/84.98583569405099 + C4/84.98583569405099,
84.98583569405099: E4/84.98583569405099 + A4/84.98583569405099,
84.98583569405099: D4/84.98583569405099 + G4/84.98583569405099,
84.98583569405099: F4/84.98583569405099,
2379.6033994334275`;
const tWin = tune`
116.73151750972762: C5-116.73151750972762,
116.73151750972762: E5-116.73151750972762,
116.73151750972762: G5-116.73151750972762,
116.73151750972762: F5-116.73151750972762,
116.73151750972762: E5-116.73151750972762,
116.73151750972762: F5/116.73151750972762,
116.73151750972762: B4-116.73151750972762,
116.73151750972762,
116.73151750972762: E4/116.73151750972762 + G4/116.73151750972762 + C5/116.73151750972762,
116.73151750972762,
116.73151750972762: E4/116.73151750972762 + G4/116.73151750972762 + C5/116.73151750972762,
2451.36186770428`;
const tNextLevel = tune`
93.16770186335404: F5-93.16770186335404,
93.16770186335404: B4-93.16770186335404,
93.16770186335404: F5-93.16770186335404,
93.16770186335404: B5-93.16770186335404,
2608.695652173913`;

// assign bitmap art to each sprite
setLegend(
  [ unit, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ wall, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ player, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000`],
  [ space, bitmap`
................
................
................
................
................
................
................
................
................
................
..000000000000..
..000000000000..
..00........00..
..00........00..
................
................`],
  [ box, bitmap`
................
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`],
  [ tr, bitmap`
0000000000000000
0000000000000000
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00`],
  [ tl, bitmap`
0000000000000000
0000000000000000
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............`],
  [ br, bitmap`
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
..............00
0000000000000000
0000000000000000`],
  [ bl, bitmap`
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
00..............
0000000000000000
0000000000000000`],
  [ A, bitmap`
................
................
......0000......
......0000......
....00....00....
....00....00....
....00....00....
....00....00....
....00000000....
....00000000....
....00....00....
....00....00....
....00....00....
....00....00....
................
................`],
  [ B, bitmap`
................
................
....000000......
....000000......
....00....00....
....00....00....
....000000......
....000000......
....00....00....
....00....00....
....00....00....
....00....00....
....000000......
....000000......
................
................`],
  [ C, bitmap`
................
................
......000000....
......000000....
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
......000000....
......000000....
................
................`],
  [ D, bitmap`
................
................
....000000......
....000000......
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....000000......
....000000......
................
................`],
  [ E, bitmap`
................
................
....00000000....
....00000000....
....00..........
....00..........
....000000......
....000000......
....00..........
....00..........
....00..........
....00..........
....00000000....
....00000000....
................
................`],
  [ F, bitmap`
................
................
....00000000....
....00000000....
....00..........
....00..........
....000000......
....000000......
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
................
................`],
  [ G, bitmap`
................
................
......000000....
......000000....
....00..........
....00..........
....00..........
....00..........
....00..0000....
....00..0000....
....00....00....
....00....00....
......000000....
......000000....
................
................`],
  [ H, bitmap`
................
................
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00000000....
....00000000....
....00....00....
....00....00....
....00....00....
....00....00....
................
................`],
  [ I, bitmap`
................
................
.....000000.....
.....000000.....
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.....000000.....
.....000000.....
................
................`],
  [ J, bitmap`
................
................
....00000000....
....00000000....
..........00....
..........00....
..........00....
..........00....
..........00....
..........00....
..........00....
..........00....
....000000......
....000000......
................
................`],
  [ K, bitmap`
................
................
....00....00....
....00....00....
....00..00......
....00..00......
....0000........
....0000........
....0000........
....0000........
....00..00......
....00..00......
....00....00....
....00....00....
................
................`],
  [ L, bitmap`
................
................
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00000000....
....00000000....
................
................`],
  [ M, bitmap`
................
................
...00......00...
...0000..0000...
...0000..0000...
...00..00..00...
...00..00..00...
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
................
................`],
  [ N, bitmap`
................
................
....00....00....
....00....00....
....0000..00....
....0000..00....
....00..0000....
....00..0000....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
................
................`],
  [ O, bitmap`
................
................
......0000......
......0000......
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
......0000......
......0000......
................
................`],
  [ P, bitmap`
................
................
....000000......
....000000......
....00....00....
....00....00....
....00....00....
....00....00....
....00000000....
....00000000....
....00..........
....00..........
....00..........
....00..........
................
................`],
  [ Q, bitmap`
................
................
......0000......
......0000......
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
......0000......
......0000......
..........00....
..........00....
................
................`],
  [ R, bitmap`
................
................
....000000......
....000000......
....00....00....
....00....00....
....00....00....
....00....00....
....000000......
....000000......
....00....00....
....00....00....
....00....00....
....00....00....
................
................`],
  [ S, bitmap`
................
................
......000000....
......000000....
....00..........
....00..........
......00........
......00........
........00......
........00......
..........00....
..........00....
....000000......
....000000......
................
................`],
  [ T, bitmap`
................
................
....00000000....
....00000000....
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................
................`],
  [ U, bitmap`
................
................
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
......000000....
......000000....
................
................`],
  [ V, bitmap`
................
................
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00..00......
....00..00......
......00........
......00........
................
................`],
  [ W, bitmap`
................
................
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
...00..00..00...
...00..00..00...
...0000..0000...
...0000..0000...
...00......00...
...00......00...
................
................`],
  [ X, bitmap`
................
................
...00......00...
...00......00...
.....00..00.....
.....00..00.....
.......00.......
.......00.......
.......00.......
.......00.......
.....00..00.....
.....00..00.....
...00......00...
...00......00...
................
................`],
  [ Y, bitmap`
................
................
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
......000000....
......000000....
..........00....
..........00....
......0000......
......0000......
................
................`],
  [ Z, bitmap`
................
................
....00000000....
....00000000....
..........00....
..........00....
........00......
........00......
......00........
......00........
....00..........
....00..........
....00000000....
....00000000....
................
................`],
  [ N0, bitmap`
................
................
......0000......
......0000......
....00....00....
....00....00....
....00....00....
....00....00....
....00..0000....
....00..0000....
....0000..00....
....0000..00....
......0000......
......0000......
................
................`],
  [ N1, bitmap`
................
................
......0000......
......0000......
........00......
........00......
........00......
........00......
........00......
........00......
........00......
........00......
........00......
........00......
........00......
................`],
  [ N2, bitmap`
................
................
....000000......
....000000......
..........00....
..........00....
..........00....
..........00....
......0000......
......0000......
....00..........
....00..........
....00000000....
....00000000....
................
................`],
  [ N3, bitmap`
................
................
....000000......
....000000......
..........00....
..........00....
......0000......
......0000......
..........00....
..........00....
..........00....
..........00....
....000000......
....000000......
................
................`],
  [ N4, bitmap`
................
................
........00......
........00......
......0000......
......0000......
....00..00......
....00..00......
....00000000....
....00000000....
........00......
........00......
........00......
........00......
................
................`],
  [ N5, bitmap`
................
................
....00000000....
....00000000....
....00..........
....00..........
....000000......
....000000......
..........00....
..........00....
..........00....
..........00....
....000000......
....000000......
................
................`],
  [ N6, bitmap`
................
................
......0000......
......0000......
....00..........
....00..........
....000000......
....000000......
....00....00....
....00....00....
....00....00....
....00....00....
......0000......
......0000......
................
................`],
  [ N7, bitmap`
................
................
....00000000....
....00000000....
..........00....
..........00....
........00......
........00......
........00......
........00......
......00........
......00........
......00........
......00........
................
................`],
  [ N8, bitmap`
................
................
......0000......
......0000......
....00....00....
....00....00....
......0000......
......0000......
....00....00....
....00....00....
....00....00....
....00....00....
......0000......
......0000......
................
................`],
  [ N9, bitmap`
................
................
......0000......
......0000......
....00....00....
....00....00....
....00....00....
....00....00....
......000000....
......000000....
..........00....
..........00....
......0000......
......0000......
................
................`],
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................`,
  map`
.....................
.....................
Z...................X
........U.UUU........
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K..P.rstuvwxyz....K.
.K...01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // A
  map`
.....................
.....................
Z...................X
......UUU.U.U.U......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // B
  map`
.....................
.....................
Z...................X
.....UUU.U.UUU.U.....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // C
  map`
.....................
.....................
Z...................X
.......UUU.U.U.......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // D
  map`
.....................
.....................
Z...................X
..........U..........
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // E
  map`
.....................
.....................
Z...................X
......U.U.UUU.U......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // F
  map`
.....................
.....................
Z...................X
......UUU.UUU.U......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // G
  map`
.....................
.....................
Z...................X
.......U.U.U.U.......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // H
  map`
.....................
.....................
Z...................X
.........U.U.........
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // I
  map`
.....................
.....................
Z...................X
....U.UUU.UUU.UUU....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // J
  map`
.....................
.....................
Z...................X
......UUU.U.UUU......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // K
  map`
.....................
.....................
Z...................X
......U.UUU.U.U......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // L
  map`
.....................
.....................
Z...................X
.......UUU.UUU.......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // M
  map`
.....................
.....................
Z...................X
........UUU.U........
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // N
  map`
.....................
.....................
Z...................X
.....UUU.UUU.UUU.....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // O
  map`
.....................
.....................
Z...................X
.....U.UUU.UUU.U.....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // P
  map`
.....................
.....................
Z...................X
....UUU.UUU.U.UUU....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // Q
  map`
.....................
.....................
Z...................X
.......U.UUU.U.......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // R
  map`
.....................
.....................
Z...................X
........U.U.U........
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // S
  map`
.....................
.....................
Z...................X
.........UUU.........
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // T
  map`
.....................
.....................
Z...................X
.......U.U.UUU.......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // U
  map`
.....................
.....................
Z...................X
......U.U.U.UUU......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // V
  map`
.....................
.....................
Z...................X
......U.UUU.UUU......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // W
  map`
.....................
.....................
Z...................X
.....UUU.U.U.UUU.....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // X
  map`
.....................
.....................
Z...................X
....UUU.U.UUU.UUU....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // Y
  map`
.....................
.....................
Z...................X
.....UUU.UUU.U.U.....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // Z
  map`
.....................
.....................
Z...................X
.UUU.UUU.UUU.UUU.UUU.
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 0
  map`
.....................
.....................
Z...................X
..U.UUU.UUU.UUU.UUU..
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 1
  map`
.....................
.....................
Z...................X
...U.U.UUU.UUU.UUU...
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 2
  map`
.....................
.....................
Z...................X
....U.U.U.UUU.UUU....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 3
  map`
.....................
.....................
Z...................X
.....U.U.U.U.UUU.....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 4
  map`
.....................
.....................
Z...................X
......U.U.U.U.U......
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 5
  map`
.....................
.....................
Z...................X
.....UUU.U.U.U.U.....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 6
  map`
.....................
.....................
Z...................X
....UUU.UUU.U.U.U....
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 7
  map`
.....................
.....................
Z...................X
...UUU.UUU.UUU.U.U...
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 8
  map`
.....................
.....................
Z...................X
..UUU.UUU.UUU.UUU.U..
V...................A
.....................
.KKKKKKKKKKKKKKKKKKK.
.KabcdefghijklmnopqK.
.K....rstuvwxyz....K.
.KP..01234S56789...K.
.KKKKKKKKKKKKKKKKKKK.
.....................`, // 9
];

// set the map displayed to the current level
//const currentLevel = levels[level];
setMap(levels[0]);

if (level === 0) {
  clearText("");
  addText("Morse Code Game", { y: 3, color: color`D` });
  addText("press 'i'", { y: 6, color: color`1` });
  addText("to confirm", { y: 7, color: color`1` });
  addText("press 'j'", { y: 9, color: color`L` });
  addText("to start", { y: 10, color: color`L` });
} else {
  clearText("");
}

setSolids([ player, box, unit, tr, tl, br, bl, wall]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

// inputs for player movement control
onInput("s", () => {
  playTune(tMove);
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  playTune(tMove);
  getFirst(player).x += 1;
});

onInput("a", () => {
  playTune(tMove);
  getFirst(player).x -= 1;
});

onInput("w", () => {
  playTune(tMove);
  getFirst(player).y -= 1;
});

// input to reset level
onInput("j", () => {
  if (level === 0) {
    level = randLevel();
    const currentLevel = levels[level];
    clearText("");
    setMap(levels[level]);
    addText("score:" + marks + "/36", { y: 1, x: 1, color: color`2` });
  }
  
});


onInput("i", () => {
  if (level !== 0) {
    const targetNumber = tilesWith(goal(level)).length;
    const numberCovered = tilesWith(goal(level), player).length;
    if (numberCovered === targetNumber) {
      level = randLevel();
    if (level !== 100) {
      //const currentLevel = levels[level];
      clearText("");
      setMap(levels[level]);
      if (marks < 36) {
        marks += 1;
      }
      addText("score:" + marks + "/36", { y: 1, x: 1, color: color`2` });
      playTune(tNextLevel);
    } else {
      if (marks < 36) {
        marks += 1;
      }
      clearText("");
      addText("score:" + marks + "/36", { y: 1, x: 1, color: color`2` });
      addText("you won!", { y: 3, color: color`4` });
      addText("Morse Master!", { y: 12, color: color`4` });
      playTune(tWin);
    }
  } else {
      addText("try again champ!", { y: 3, color: color`3` });
      playTune(tTryAgain);
  }
    
  }
}
  );


// these get run after every input
afterInput(() => {
});

function goal(lev) {
  switch (lev) {
    case 1:
      return A;
      break;
    case 2:
      return B;
      break;
    case 3:
      return C;
      break;
    case 4:
      return D;
      break;
    case 5:
      return E;
      break;
    case 6:
      return F;
      break;
    case 7:
      return G;
      break;
    case 8:
      return H;
      break;
    case 9:
      return I;
      break;
    case 10:
      return J;
      break;
    case 11:
      return K;
      break;
    case 12:
      return L;
      break;
    case 13:
      return M;
      break;
    case 14:
      return N;
      break;
    case 15:
      return O;
      break;
    case 16:
      return P;
      break;
    case 17:
      return Q;
      break;
    case 18:
      return R;
      break;
    case 19:
      return S;
      break;
    case 20:
      return T;
      break;
    case 21:
      return U;
      break;
    case 22:
      return V;
      break;
    case 23:
      return W;
      break;
    case 24:
      return X;
      break;
    case 25:
      return Y;
      break;
    case 26:
      return Z;
      break;
    case 27:
      return N0;
      break;
    case 28:
      return N1;
      break;
    case 29:
      return N2;
      break;
    case 30:
      return N3;
      break;
    case 31:
      return N4;
      break;
    case 32:
      return N5;
      break;
    case 33:
      return N6;
      break;
    case 34:
      return N7;
      break;
    case 35:
      return N8;
      break;
    case 36:
      return N9;
      break;
  }
}

function randLevel() {
    if (!levelFlag) {
      const min = 1;
      const max = 36;
    
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (usedNumbers.includes(randomNum));
    
      usedNumbers.push(randomNum);
    
      if (usedNumbers.length !== 36) {
          return randomNum;
      } else {
          levelFlag = true;
          return randomNum;
          
      }
    
      //level = randomNum;
    } else {
        return 100;
    }
}