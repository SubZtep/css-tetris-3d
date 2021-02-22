/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getProp, setProp } from "./lib/css"
import { getRandomItem, rotate2d } from "./lib/utils"
import { calcView } from "./layout"
import * as pool from "./lib/pool"

let timer: NodeJS.Timeout

export let dimensions = {
  cols: 4,
  rows: 4,
  floors: 5,
}

dimensions = new Proxy(dimensions, {
  set(target: typeof dimensions, p: keyof typeof dimensions, value: number) {
    target[p] = value
    setProp(p, String(value))
    initBoard() //FIXME: maybe not like this
    calcView()
    return true
  },
})

export const blocks = {
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
Object.freeze(blocks)

type Block = keyof typeof blocks

interface GameState {
  live: boolean
  rotateMode?: boolean
  currentFloor: number
  block: Block
  posX: number
  posY: number
  rotX: number
  rotZ: number
}

const blockChecker = (z: number, moveX = 0, moveY = 0, higher: (testX: number, testY: number) => boolean) => {
  let tempBlock = blocks[state.block]
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
    tempBlock = rotate2d(tempBlock)
  }

  for (let x = 0; x < tempBlock[0].length; x++) {
    for (let y = 0; y < tempBlock.length; y++) {
      if (tempBlock[y][x]) {
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

const testRotZ = (z: number, moveX = 0, moveY = 0) => {
  return blockChecker(z, moveX, moveY, (testX, testY) => {
    if (testX < 0 || testX >= dimensions.cols) {
      return false
    }
    if (testY < 0 || testY >= dimensions.rows) {
      return false
    }
    return true
  })
}

const canLiftBlock = () => {
  if (state.currentFloor === 0) return false
  // console.log(board.map(b => [...b.map(c => c.join(" "))]))
  return blockChecker(0, 0, 0, (testX, testY) => !board[state.currentFloor - 1][testY][testX])
}

export const rotateX = (r: -90 | 90): void => {
  let x = state.rotX + r
  console.log("Rotate X", x)
  // state.rotX = x
}

export const rotateZ = (r: -90 | 90): boolean => {
  const mayMoves = [0, -1, 1, -2, 2, -3, 3, -4, 4] // FIXME: order based on rotation
  for (const i of mayMoves) {
    for (const j of mayMoves) {
      if (testRotZ(r, i, j)) {
        state.posX += i
        state.posY += j
        state.rotZ += r
        return true
      }
    }
  }
  return false
}

export const moveX = (d: -1 | 1): boolean => {
  if (testRotZ(0, d)) {
    state.posX += d
    return true
  }
  return false
}

export const moveY = (d: -1 | 1): boolean => {
  if (testRotZ(0, 0, d)) {
    state.posY += d
    return true
  }
  return false
}

export const handleCSSProps: ProxyHandler<GameState> = {
  set: (target: GameState, p: keyof GameState, value: GameState[keyof GameState]) => {
    switch (p) {
      case "live":
        clearInterval(timer)
        if (value) {
          timer = setInterval(liftBlock, 3000)
        }
        break
      case "block":
        if (state.block) {
          document.querySelector(".block").classList.replace(state.block, value as Block)
        } else {
          document.querySelector(".block").classList.add(value as Block)
        }
        break
      case "rotateMode":
        setProp("radius", `${value ? parseFloat(getProp("edge")) / 4 : 0}px`)
        break
      default:
        setProp(p, String(value))
    }
    // @ts-ignore
    target[p] = value
    return true
  },
}

export let state: GameState = {
  live: false,
  rotateMode: false,
} as GameState

state = new Proxy(state, handleCSSProps)

let board: number[][][]

export const initBoard = (): void => {
  board = Array.from(
    Array.from({ length: dimensions.floors }, () =>
      Array.from({ length: dimensions.rows }, () => Array.from({ length: dimensions.cols }, () => 0))
    )
  )

  if (state.live) {
    timer = setInterval(liftBlock, 3000)
  }
}

const getNextBlock = (): Block => {
  // return "hero"
  return getRandomItem(Reflect.ownKeys(blocks) as Block[])
}

export const resetBlock = (): void => {
  state.currentFloor = dimensions.floors - 1
  state.block = getNextBlock()
  state.posX = 0
  state.posY = 0
  state.rotX = 0
  state.rotZ = 0
}

const masonBlock = () => {
  const frag = document.createDocumentFragment()

  blockChecker(0, 0, 0, (testX, testY) => {
    board[state.currentFloor][testY][testX] = 1
    const el = pool.getHTMLElement("mc")
    el.classList.add(`floor${state.currentFloor}`)
    el.style.transform = `translate3d(calc(var(--edge) * ${testX}), calc(var(--edge) * ${testY}), calc(var(--edge) * ${state.currentFloor}))`
    frag.appendChild(el)
    return true
  })

  const mason = document.querySelector(".mason")
  mason.appendChild(frag)

  if (state.currentFloor + 1 === dimensions.floors - 1) {
    clearInterval(timer)
    // if (!confirm("(×﹏×)\n\nContinue?")) {
    //   document.location.href = "https://github.com/SubZtep/css-tetris-3d#readme"
    // }
    pool.removeChildren(mason)
    dimensions.cols++
    dimensions.rows++
    dimensions.floors++
    initBoard()
  }
}

export const liftBlock = (step = -1): void => {
  state.currentFloor += step
  if (!canLiftBlock()) {
    masonBlock()
    resetBlock()
  }
}
