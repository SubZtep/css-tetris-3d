import { getRandomItem, rotate2d } from "./lib/utils"
import { state } from "./state"

export const tetrominos = {
  orangeRick: [
    [0, 0, 1, 0],
    [1, 1, 1, 0],
  ],
  hero: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  blueRick: [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
  ],
  teeWee: [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
  ],
  clevelandZ: [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
  ],
  smashboy: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
  ],
  rhodeIslandZ: [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
  ],
}
Object.freeze(tetrominos)

export type Tetromino = keyof typeof tetrominos

export const tetrominoChecker = (z: number, moveX = 0, moveY = 0, higher: (testX: number, testY: number) => boolean) => {
  let tempTetromino = tetrominos[state.tetromino]
  let rot = (state.rotZ + z) / 90
  if (Math.abs(rot) >= 4) {
    rot %= 4
  }
  if (rot < 0) {
    rot = 4 + rot
  }

  switch (rot) {
    case 1:
      moveX -= 2
      break
    case 2:
      moveX -= 4
      moveY -= 2
      break
    case 3:
      moveY -= 4
  }

  for (let i = 0; i < rot; i++) {
    tempTetromino = rotate2d(tempTetromino)
  }

  for (let x = 0; x < tempTetromino[0].length; x++) {
    for (let y = 0; y < tempTetromino.length; y++) {
      if (tempTetromino[y][x]) {
        const testX = x + moveX + state.posX
        const testY = y + moveY + state.posY

        if (!higher(testX, testY)) {
          return false
        }
      }
    }
  }
  return true
}

export const getNextTetromino = (): Tetromino => {
  // return "hero"
  return getRandomItem(Reflect.ownKeys(tetrominos) as Tetromino[])
}
