/*
@title: Rock, Paper, Scissors!
@tags: ['classic']
@img: ""
@addedOn: 2022-09-13
@author: ezefranca
*/
const player = "p";

const rock = "r";
const paper = "a";
const scissor = "s";

const enemy = "e";

const wall = "w";
const line = "n"
const collum = "c"
const junction = "j"

const positions = [1, 2, 3]

const move = tune`
166.66666666666666,
166.66666666666666: c5-166.66666666666666,
166.66666666666666: b4-166.66666666666666,
4833.333333333333`;
const draw = tune`
167.5977653631285: c4~167.5977653631285,
167.5977653631285: d4~167.5977653631285,
167.5977653631285: e4~167.5977653631285,
167.5977653631285,
167.5977653631285: b5~167.5977653631285,
167.5977653631285: b5~167.5977653631285,
167.5977653631285: a5~167.5977653631285,
167.5977653631285: f5~167.5977653631285,
167.5977653631285: d5~167.5977653631285,
167.5977653631285: b4~167.5977653631285,
167.5977653631285: g4~167.5977653631285,
167.5977653631285: e4~167.5977653631285,
167.5977653631285: d4~167.5977653631285,
167.5977653631285: d4~167.5977653631285,
167.5977653631285: c4~167.5977653631285,
167.5977653631285,
167.5977653631285: c4~167.5977653631285,
167.5977653631285: d4~167.5977653631285,
167.5977653631285: c4~167.5977653631285,
167.5977653631285: c4~167.5977653631285,
167.5977653631285: c4/167.5977653631285,
1843.5754189944134`;
const win = tune`
166.66666666666666: b5/166.66666666666666 + f5^166.66666666666666,
166.66666666666666: c5~166.66666666666666 + c4-166.66666666666666 + a5/166.66666666666666,
166.66666666666666: d5~166.66666666666666 + d4-166.66666666666666 + b5/166.66666666666666 + f5^166.66666666666666,
166.66666666666666: e5~166.66666666666666 + e4-166.66666666666666 + a5/166.66666666666666,
166.66666666666666: b4~166.66666666666666 + b5/166.66666666666666 + f5^166.66666666666666,
166.66666666666666: c5~166.66666666666666 + c4-166.66666666666666 + a5/166.66666666666666,
166.66666666666666: d5~166.66666666666666 + d4-166.66666666666666 + b5/166.66666666666666 + f5^166.66666666666666,
166.66666666666666: e5~166.66666666666666 + e4-166.66666666666666 + a5/166.66666666666666,
166.66666666666666: d5~166.66666666666666 + d4-166.66666666666666 + b5/166.66666666666666 + f5^166.66666666666666,
166.66666666666666: c5~166.66666666666666 + c4-166.66666666666666 + a5/166.66666666666666,
166.66666666666666: b5/166.66666666666666 + f5^166.66666666666666,
166.66666666666666: b4~166.66666666666666 + c4-166.66666666666666 + a5/166.66666666666666,
166.66666666666666: e5~166.66666666666666 + e4-166.66666666666666 + b5/166.66666666666666 + f5^166.66666666666666,
166.66666666666666: c5~166.66666666666666 + d4-166.66666666666666 + a5/166.66666666666666,
166.66666666666666: a5/166.66666666666666 + c5~166.66666666666666 + f5^166.66666666666666,
166.66666666666666: a5/166.66666666666666 + c5~166.66666666666666,
166.66666666666666: a5/166.66666666666666 + c5~166.66666666666666 + b4~166.66666666666666 + a4~166.66666666666666 + g4~166.66666666666666,
166.66666666666666: f4~166.66666666666666 + e4~166.66666666666666 + d4~166.66666666666666 + f5^166.66666666666666,
2333.333333333333`;
const lose = tune`
166.66666666666666: g4~166.66666666666666 + c4/166.66666666666666,
166.66666666666666: g4~166.66666666666666 + c4/166.66666666666666,
166.66666666666666: g4~166.66666666666666,
166.66666666666666: d4~166.66666666666666,
166.66666666666666: d4~166.66666666666666,
166.66666666666666: f4~166.66666666666666 + d4/166.66666666666666,
166.66666666666666: f4~166.66666666666666 + d4/166.66666666666666,
166.66666666666666: f4~166.66666666666666,
166.66666666666666: d4~166.66666666666666,
166.66666666666666: d4~166.66666666666666,
166.66666666666666: g4-166.66666666666666,
166.66666666666666: f4-166.66666666666666,
166.66666666666666: e4-166.66666666666666,
166.66666666666666: d4-166.66666666666666,
166.66666666666666: c4-166.66666666666666,
166.66666666666666,
166.66666666666666: c4-166.66666666666666,
166.66666666666666: c4-166.66666666666666,
2333.333333333333`;

var enemyVictories = 0
var playerVictories = 0

var gameFinished = false;

showScore()

addText("Press j to confirm", { y: 1, color: color`2` });
addText("Use w and s to move", { y: 3, color: color`2` });
setLegend(
    [player, bitmap`
4444444444444444
4444444444444444
4444444466644444
4444444463664444
4444444463366444
4666666663336644
4633333333333664
4633333333333364
4633333333333664
4666666663336644
4444444463366444
4444444463664444
4444444466644444
4444444444444444
4444444444444444
4444444444444444`],
    [rock, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444440004444444
4444402200444444
4444002110004444
4440021111100444
44402111111L0444
44401111111L0444
444011111LL04444
44400LLLLLL04444
4444000000004444
4444444444444444
4444444444444444`],
    [paper, bitmap`
4444444444444444
4442322222224444
444232LLLLLL2444
4442322222222444
4442321111112444
4442322222222444
4442321111112444
4442322222222444
4442321111122444
4442322222222444
4442321111112444
4442322222222444
4442321111222444
4442322222222444
4442322222222444
4444444444444444`],
    [scissor, bitmap`
4444444444444444
4444441441444444
44444L1441L44444
4444LL1441LL4444
4444LL1441LL4444
4444LL1441LL4444
4444LL1441LL4444
4444LL1441LL4444
44444L1441L44444
4444441LL1444444
4444444LL4444444
444433L44L334444
4443443443443444
4443443443443444
4444334444334444
4444444444444444`],
    [enemy, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444400000444444
4444022222044444
4440222222204444
4402222222220444
4402002220020444
4402030203020444
4402222222220444
4440222022204444
4444022222044444
4444020202044444
4444000000044444
4444444444444444
4444444444444444`],
    [wall, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
    [line, bitmap`
4444444444444444
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
    [collum, bitmap`
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
    [junction, bitmap`
4444444444444444
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
0000000000000000`]

);

setSolids([]);

let level = 0;
const levels = [
    map`
nnnnn
wrcrw
pacaw
wscsw`,
];

setMap(levels[level]);

setPushables({
    [player]: [],
});

onInput("w", () => {
    if (gameFinished == false) {
        playTune(move)
        addSprite(0, getFirst(player).y, wall);
        if (getFirst(player).y > 1) {
            getFirst(player).y -= 1;
        }
    }
});

onInput("s", () => {
    if (gameFinished == false) {
        playTune(move)
        addSprite(0, getFirst(player).y, wall);
        if (getFirst(player).y < 4) {
            getFirst(player).y += 1;
        }
    }
});

onInput("d", () => {
    if (gameFinished == true) {
      restart()
    }
});

function restart() {
    clearTile(4, 1);
    clearTile(4, 2);
    clearTile(4, 3);
    addSprite(4, 1, wall);
    addSprite(4, 2, wall);
    addSprite(4, 3, wall);
    clearText()
    gameFinished = false;
    showScore()
}

function showScore() {
      addText("GAME" , {
            x: 8,
            y: 13,
            color: color`6`
        });
    addText(playerVictories + "  " + enemyVictories , {
            x: 8,
            y: 15,
            color: color`2`
        });
}
  

onInput("j", () => {

    if (gameFinished == false) {
        clearText();
        var enemyPosition = positions[Math.floor(Math.random() * positions.length)];
        var playerPosition = getFirst(player).y;

        addSprite(4, enemyPosition, enemy);

        if (enemyPosition == playerPosition) {
            addText("Draw Game", {
                y: 1,
                color: color`6`
            });
            playTune(draw)
        } else if (playerPosition == 1 && enemyPosition == 2 ||
            playerPosition == 2 && enemyPosition == 3 ||
            playerPosition == 3 && enemyPosition == 1) {

            addText("You Lose!", {
                y: 1,
                color: color`3`
            });
          
            enemyVictories += 1
            playTune(lose)

        } else {
            addText("You Win!", {
                y: 1,
                color: color`4`
            });
          
            playerVictories += 1
            playTune(win)
        }

        gameFinished = true;
        addText("Press d to restart", {
            y: 3,
            color: color`2`
        });
    }

});

afterInput(() => {

});