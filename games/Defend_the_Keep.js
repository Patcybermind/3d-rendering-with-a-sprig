
/* 
@title: Defend_the_Keep
@author: alphaom33
@tags: ['dodge']
@img: ""
@addedOn: 2023-06-04
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

//Because I realized that JavaScript arrays don't possess a fixed length only after finishing this.
let newList
class linkNode {
  constructor() {
    this.dir = 0
    this.trail = null
    this.bullet = null
    this.next = null
    this.last = null
  }
}

class linkedList {
  constructor(head = null) {
    this.head = head
  }
}
let list
let head
function initList() {
  head = new linkNode()
  head.dir = 5
  head.next = null
  head.last = null
  list = new linkedList(head)
}

function push(dir, trail, bullet) {
  let current = head
  while (current.next != null) {
    current = current.next
  }
  current.next = new linkNode()
  current.next.last = current
  current.next.dir = dir
  current.next.trail = trail
  current.next.bullet = bullet
  current.next.next = null
}

let warrior = {
  dir: 0,
  sprite: null
}


let bulletColor = bitmap`
................
................
................
................
................
................
........F.......
.......FFF......
........F.......
................
................
................
................
................
................
................`
const player = "p"
const wall = "w"
const bullet = "b"
const bulletTrailRight = "t"
const bulletTrailMiddle = "y"
const bulletTrailLeft = "u"
const warrior1 = "a"
const warrior2 = "s"
const warrior3 = "d"
const warrior4 = "f"
const warrior5 = "g"
const warrior6 = "h"
const warrior7 = "j"
const warrior8 = "k"
let currentWallHealth = 4
const wallHealth3 = bitmap`
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
................
................
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`
const wallHealth2 = bitmap`
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
................
................
LL1LLLLLLLLLLLLL
LLL1LLLL11LL1LLL
LLL1LLL1LLLLL1LL
LLLLLLLLLLLLLLLL`
const wallHealth1 = bitmap`
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
................
................
L.1LLL.LLLL.LL.L
LLL1LLLL11LL1L11
1LL1LLL1LLLLL1LL
L11LL11LLLLL1LLL`
const wallHealth0 = bitmap`
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
................
................
L......L....L..L
LL....LL....1..1
1L.LL.L1L..LL..L
L11LL11LLLLL1LLL`
let dir = 0
let canMove = false
let playerGraphics = bitmap`
................
................
................
................
........F.......
.........F......
.......00.F.....
......0000.F....
......0000......
.......00.......
........1111....
................
................
................
................
................`
let wallGraphics = bitmap`
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
................
................
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`
let textWait = 0
let time = 0
let moveWait = 0
let isBlinked = false
let isInvincible = false
let reset = false
let warriorArray = []
function setLegendary() {
  setLegend(
  [player, playerGraphics],
  [wall, wallGraphics],
  [bullet, bulletColor],
  [bulletTrailRight, bitmap`
................
................
................
................
.....66.........
.....6666.......
......66........
......6.........
................
................
................
................
................
................
................
................`],
  [bulletTrailMiddle, bitmap`
................
................
................
........6.......
.......666......
.......666......
......66.66.....
......6...6.....
................
................
................
................
................
................
................
................`],
  [bulletTrailLeft, bitmap`
................
................
................
................
..........66....
........6666....
.........66.....
..........6.....
................
................
................
................
................
................
................
................`],
  [warrior1, bitmap`
................
................
................
................
................
.......00.......
......0000......
.....000000.....
.....00000C.....
......0000C.....
.......00.L.....
..........L.....
..........L.....
..........L.....
..........L.....
................`],
  [warrior2, bitmap`
................
................
................
................
................
.......00.......
......0000......
.....000000.....
.....000000.....
......0000C.....
.......00CC.....
........LL......
.......LL.......
......LL........
.....LL.........
................`],
  [warrior3, bitmap`
................
................
................
................
................
.......00.......
......0000......
.....000000.....
.....000000.....
......0000......
.LLLLLCC0.......
................
................
................
................
................`],
  [warrior4, bitmap`
................
................
................
................
................
.L.....00.......
.LL...0000......
..LL.000000.....
...LL000000.....
....LC0000......
.....CC00.......
................
................
................
................
................`],
  [warrior5, bitmap`
................
.....L..........
.....L..........
.....L..........
.....L..........
.....L.00.......
.....C0000......
.....C00000.....
.....000000.....
......0000......
.......00.......
................
................
................
................
................`],
  [warrior6, bitmap`
................
.........LL.....
........LL......
.......LL.......
......LL........
.....CC00.......
.....C0000......
.....000000.....
.....000000.....
......0000......
.......00.......
................
................
................
................
................`],
  [warrior7, bitmap`
................
................
................
................
................
.......0CCLLLLL.
......0000......
.....000000.....
.....000000.....
......0000......
.......00.......
................
................
................
................
................`],
  [warrior8, bitmap`
................
................
................
................
................
.......00CC.....
......0000CL....
.....000000LL...
.....000000.LL..
......0000...LL.
.......00.....L.
................
................
................
................
................`],
)
}

function inDIRperetGraphics() {

  if (dir == 8) {
    dir = 0;
  }
  if (dir == -1) {
    dir = 7;
  }
  
  if (dir == 0) {
    playerGraphics = bitmap`
................
................
................
................
........F.......
.........F......
.......00.F.....
......0000.F....
......0000......
.......00.......
........1111....
................
................
................
................
................`
  }
  if (dir == 1) {
    playerGraphics = bitmap`
................
................
................
................
................
................
.......00.F.....
......0000F.....
......0000F.....
.....1.00.F.....
......1.........
.......1........
........1.......
................
................
................` 
  }
  if (dir == 2) {
    playerGraphics = bitmap`
................
................
................
................
................
................
.......00.......
......0000......
.....10000.F....
.....1.00.F.....
.....1...F......
.....1..F.......
................
................
................
................`
  }
  if (dir == 3) {
    playerGraphics = bitmap`
................
................
................
................
................
......1.........
.....1.00.......
....1.0000......
...1..0000......
.......00.......
......FFFF......
................
................
................
................
................` 
  }
  if (dir == 4) {
    playerGraphics = bitmap`
................
................
................
................
................
....1111........
.......00.......
......0000......
....F.0000......
.....F.00.......
......F.........
.......F........
................
................
................
................`
  }
  if (dir == 5) {
    playerGraphics = bitmap`
................
................
................
.......1........
........1.......
.........1......
.....F.00.1.....
.....F0000......
.....F0000......
.....F.00.......
................
................
................
................
................
................`
  }
  if (dir == 6) {
    playerGraphics = bitmap`
................
................
................
................
.......F..1.....
......F...1.....
.....F.00.1.....
....F.00001.....
......0000......
.......00.......
................
................
................
................
................
................`
  }
  if (dir == 7) {
    playerGraphics = bitmap`
................
................
................
................
................
......FFFF......
.......00.......
......0000..1...
......0000.1....
.......00.1.....
.........1......
................
................
................
................
................`
  }
  setLegendary()
}

function decreaseWallHealth() {
  currentWallHealth--
  wallGraphics = bitmap`
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
................
................
L......L....L..L
LL....LL....1..1
1L.LL.L1L..LL..L
L11LL11LLLLL1LLL`  
  if (currentWallHealth == 3) {
    wallGraphics = bitmap`
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
................
................
LL1LLLLLLLLLLLLL
LLL1LLLL11LL1LLL
LLL1LLL1LLLLL1LL
LLLLLLLLLLLLLLLL`
  }
  if (currentWallHealth == 2) {
    wallGraphics = bitmap`
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
................
................
L.1LLL.LLLL.LL.L
LLL1LLLL11LL1L11
1LL1LLL1LLLLL1LL
L11LL11LLLLL1LLL`
  }
  if (currentWallHealth == 1) {
    wallGraphics = bitmap`
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
................
................
L......L....L..L
LL....LL....1..1
1L.LL.L1L..LL..L
L11LL11LLLLL1LLL`
  }
  setLegendary()
}


setLegendary()


setSolids([])

let level = 0
const levels = [
  map`
.....
.....
.....
..p..
wwwww`
]


setMap(levels[level])

function checkCols(dir1, dir2, dir3) {
    let x = getFirst(player).x
    let y = getFirst(player).y
    let current = head.next
    while (current != null) {
      if (current.trail != null) {
        if (current.trail.x == x && current.trail.y == y) {
          if (dir == dir1 || dir == dir2 || dir == dir3) {
            removeBullet(current)
          } else {
            canMove = false;
            moveWait = 10
          }
        }
      }
      current = current.next
  }
}

onInput("w", () => {
  if (canMove) {
    getFirst(player).y -= 1
    checkCols(7, 6, 0)
  } else if (textWait < 7) {
    textWait = 7
  } else if (reset) {
    reset = false
    init()
  }
})
onInput("s", () => {
  if (canMove) {
    getFirst(player).y += 1
    checkCols(2, 3, 4)
  } else if (textWait < 7) {
    textWait = 7
  } else if (reset) {
    reset = false
    init()
  }
})
onInput("a", () => {
  if (canMove) {
    getFirst(player).x -= 1
    checkCols(4, 5, 6)
  } else if (textWait < 7) {
    textWait = 7
  } else if (reset) {
    reset = false
    init()
  }
})
onInput("d", () => {
  if (canMove) {
    getFirst(player).x += 1
    checkCols(0, 1, 2)
  } else if (textWait < 7) {
    textWait = 7
  } else if (reset) {
    reset = false
    init()
  }
})
onInput("j", () => {
  if (canMove) {
    dir--;
    inDIRperetGraphics()
  } else if (textWait < 7) {
    textWait = 7
  } else if (reset) {
    reset = false
    init()
  }
})
onInput("l", () => {
  if (canMove) {
    dir++;
    inDIRperetGraphics()
  } else if (textWait < 7) {
    textWait = 7
  } else if (reset) {
    reset = false
    init()
  }
})

function init() {
  clearText()
  initList()
  setMap(levels[level])
  bulletColor = bitmap`
................
................
................
................
................
................
........F.......
.......FFF......
........F.......
................
................
................
................
................
................
................`
  currentWallHealth = 4
  dir = 0
  canMove = false
  playerGraphics = bitmap`
................
................
................
................
........F.......
.........F......
.......00.F.....
......0000.F....
......0000......
.......00.......
........1111....
................
................
................
................
................`
  wallGraphics = bitmap`
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
................
................
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`
  textWait = 0
  time = 0
  isBlinked = false
  isInvincible = false
  setLegend(
  [player, bitmap`
................
................
................
................
........F.......
.........F......
.......00.F.....
......0000.F....
......0000......
.......00.......
........1111....
................
................
................
................
................`],
  [wall, bitmap`
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
................
................
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [bullet, bulletColor],
  [bulletTrailRight, bitmap`
................
................
................
................
.....66.........
.....6666.......
......66........
......6.........
................
................
................
................
................
................
................
................`],
  [bulletTrailMiddle, bitmap`
................
................
................
........6.......
.......666......
.......666......
......66.66.....
......6...6.....
................
................
................
................
................
................
................
................`],
  [bulletTrailLeft, bitmap`
................
................
................
................
..........66....
........6666....
.........66.....
..........6.....
................
................
................
................
................
................
................
................`]
)
  tick()
}

function cutscene() {
  if (textWait == 1) {
    addText("Rotate Using", {x: 4, y: 2, color: color`1`})
  } else if (textWait == 2) {
    addText("J and L", {x: 6, y: 3, color: color`1`})
  } else if (textWait == 3) {
    addText("Block Bullets With", {x: 1, y: 7, color: color`1`})
  } else if (textWait == 4) {
    addText("Your Shield", {x: 4, y: 8, color: color`1`})
  } else if (textWait == 5) {
    addText("Defend", {x: 7, y: 12, color: color`1`})
  } else if (textWait == 6) {
    addText("The Keep", {x: 6, y: 13, color: color`1`})
  } else if (textWait == 7) {
    clearText()
    initList()
    setTimeout(tick, 200)
  }
  if (textWait < 7) {
    textWait++
    setTimeout(cutscene, 1000)
  }
  
}

function printList() {
  let current
  if (head != null)
    current = head
  while (current != null) {
    current = current.next
  }
}

function removeBullet(current) {
  if (current.last != null && current.next != null) {
    current.last.next = current.next
    current.next.last = current.last
  }
  let x = current.trail.x
  current.trail.remove()
  current.bullet.remove()
  current.trail = null
  current.next = null
  current.last = null
}

function moveBullets(current) {
    if (current.trail == null) {
      return 0
    }
    if (current.trail.y == 4) {
      removeBullet(current)
      decreaseWallHealth()
      return 0
    }  
    if (current.dir == 0) {
      current.trail.y++
      current.trail.x++
      current.bullet.y++
      current.bullet.x++
    }
    if (current.dir == 1 || current.dir == 2 || current.dir == 3) {
      current.trail.y++
      current.bullet.y++
    }
    if (current.dir == 4) {
      current.trail.y++
      current.trail.x--
      current.bullet.y++
      current.bullet.x--
    }
    if (current.trail.y == getFirst(player).y && current.trail.x == getFirst(player).x && !isInvincible) {
      if (current.dir == 0 && (dir == 5 || dir == 6 || dir == 7)) {
        removeBullet(current)
      } else if ((current.dir == 1 || current.dir == 2 || current.dir == 3) && (dir == 0 || dir == 6 || dir == 7)) {
        removeBullet(current)
      } else if (current.dir == 4 && (dir == 0 || dir == 1 || dir == 7)) {
        removeBullet(current)
      } else {
        canMove = false
        moveWait = 10
      }
    }
}

function newBullets() {
  let newDir = Math.floor(Math.random() * 5)
  let newX
  let addTrail;
  let addBullet;
  if (newDir == 0) {
    newX = 0
    addSprite(newX, 0, bulletTrailRight)
    addTrail = getAll(bulletTrailRight)[getAll(bulletTrailRight).length - 1]
  }
  if (newDir == 1 || newDir == 2 || newDir == 3) {
    newX = Math.floor(Math.random() * 3) + 1
    addSprite(newX, 0, bulletTrailMiddle)
    addTrail = getAll(bulletTrailMiddle)[getAll(bulletTrailMiddle).length - 1]
  }
  if (newDir == 4) {
    newX = 4
    addSprite(newX, 0, bulletTrailLeft)
    addTrail = getAll(bulletTrailLeft)[getAll(bulletTrailLeft).length - 1]
  }
  addSprite(newX, 0, bullet)
  addBullet = getAll(bullet)[getAll(bullet).length - 1]
  push(newDir, addTrail, addBullet)
}


function tick() {
  if (time % 4 == 0 ) {
    if (head.next != null) {
      let current = head.next
      while (current != null) {
        moveBullets(current)
        current = current.next
      }
    }
  }
  if (time % (9 - Math.round((time + 200) / 400)) == 0) {
    newBullets()
  }
  time++
  if (moveWait <= 6) {
    canMove = true
  }
  if (moveWait <= 0) {
    isInvincible = false
  } else {
    isInvincible = true
    isBlinked = !isBlinked
    if (isBlinked) {
      setLegend(
        [player, bitmap``],
        [wall, wallGraphics],
        [bullet, bulletColor],
        [bulletTrailRight, bitmap`
................
................
................
................
.....66.........
.....6666.......
......66........
......6.........
................
................
................
................
................
................
................
................`],
        [bulletTrailMiddle, bitmap`
................
................
................
........6.......
.......666......
.......666......
......66.66.....
......6...6.....
................
................
................
................
................
................
................
................`],
        [bulletTrailLeft, bitmap`
................
................
................
................
..........66....
........6666....
.........66.....
..........6.....
................
................
................
................
................
................
................
................`]
      )
    } else {
      setLegendary()
    }
    moveWait--
  }
  if (time <= 100) {
    bulletColor = bitmap`
................
................
................
................
................
................
........F.......
.......FFF......
........F.......
................
................
................
................
................
................
................`
  } else if (time <= 200) {
    bulletColor = bitmap`
................
................
................
................
................
................
........6.......
.......666......
........6.......
................
................
................
................
................
................
................`
  } else if (time <= 300) {
    bulletColor = bitmap`
................
................
................
................
................
................
........9.......
.......999......
........9.......
................
................
................
................
................
................
................`
  } else if (time <= 400) {
    bulletColor = bitmap`
................
................
................
................
................
................
........3.......
.......333......
........3.......
................
................
................
................
................
................
................`
  } else if (9 - Math.round((time + 200) / 400) == 7) {
    bulletColor = bitmap`
................
................
................
................
................
................
........7.......
.......777......
........7.......
................
................
................
................
................
................
................`
  }
  if (currentWallHealth > 1) {
    if (time / 4 < 100) {
      setTimeout(tick, 200 - Math.round(time / 4))
    } else {
      setTimeout(tick, 100)
    }
  } else {
    canMove = false
    reset = true
    addText("Game Over", {x: 5, y: 7, color: color`1`})
  }
}
cutscene()