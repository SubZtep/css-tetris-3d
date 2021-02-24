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

type RotationIndex = 0 | 1 | 2 | 3

const getRotationIndex = (deg: number) => {
  let rotIdx = deg / 90
  if (Math.abs(rotIdx) >= 4) {
    rotIdx %= 4
  }
  if (rotIdx < 0) {
    rotIdx = 4 + rotIdx
  }
  return rotIdx as RotationIndex
}

const getMoveModifiers = (rotationIndex: RotationIndex, baseX = 0, baseY = 0) => {
  const mod = { x: baseX, y: baseY }
  switch (rotationIndex) {
    case 1:
      mod.x -= 2
      break
    case 2:
      mod.x -= 4
      mod.y -= 2
      break
    case 3:
      mod.y -= 4
  }
  return mod
}

export const tetrominoChecker = (
  rotateZ = 0,
  moveX = 0,
  moveY = 0,
  higher: (testX: number, testY: number) => boolean
) => {
  let tempTetromino = tetrominos[state.tetromino]

  const rotZIdx = getRotationIndex(state.rotZ + rotateZ)
  const mod = getMoveModifiers(rotZIdx, moveX, moveY)
  tempTetromino = rotate2d(tempTetromino, rotZIdx)

  for (let x = 0; x < tempTetromino[0].length; x++) {
    for (let y = 0; y < tempTetromino.length; y++) {
      if (tempTetromino[y][x]) {
        const testX = x + mod.x + state.posX
        const testY = y + mod.y + state.posY

        if (!higher(testX, testY)) {
          return false
        }
      }
    }
  }
  return true
}

export const getNextTetromino = (): Tetromino => {
  // return "clevelandZ"
  // return "hero"
  return getRandomItem(Reflect.ownKeys(tetrominos) as Tetromino[])
}
