/* eslint-disable @typescript-eslint/ban-ts-comment */
import { composeGridTemplate } from "./layout"
import { getProp, setProp } from "./lib/css"
import { getRandomItem } from "./lib/utils"

export const dimensions = {
  cols: 6,
  rows: 6,
  floor: 8,
}

export const blocks = {
  orangeRick: [
    [0, 0, 0, 1],
    [0, 1, 1, 1],
  ],
  hero: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
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

interface GameState {
  rotateMode: boolean
  currentFloor: number
  block: Block
  posX: number
  posY: number
  rotX: number
  rotZ: number
}

type Block = keyof typeof blocks
type StateProp = keyof GameState
type StateVal = GameState[StateProp]

export const handleCSSProps: ProxyHandler<GameState> = {
  set: (target: GameState, p: StateProp, value: StateVal) => {
    switch (p) {
      case "block":
        setProp("block-template", composeGridTemplate(blocks[value as Block]))
        return true
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
  rotateMode: false,
} as GameState

state = new Proxy(state, handleCSSProps)

const getNextBlock = () => getRandomItem(Reflect.ownKeys(blocks) as Block[])

export const resetState = (): void => {
  state.currentFloor = dimensions.floor
  state.block = getNextBlock()
  state.posX = 0
  state.posY = 0
  state.rotX = 0
  state.rotZ = 0
}

export const moveBlock = (forwards = true): void => {
  const nextFloor = state.currentFloor + (forwards ? -1 : 1)
  if (nextFloor < 0) {
    resetState()
    return
  }
  state.currentFloor = nextFloor
}
