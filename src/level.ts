import { setProp } from "./css"
import { getRandomItem } from "./utils"

export const dimensions = {
  cols: 4,
  rows: 4,
  floor: 4,
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

const getNextBlock = (): Block => getRandomItem<string>(Object.keys(blocks)) as Block

export let state: GameState = {
  rotateMode: false,
  currentFloor: dimensions.floor,
  block: getNextBlock(),
  posX: 0,
  posY: 0,
  rotX: 0,
  rotZ: 0,
}

/** Should be in layout.ts */
export const parseState: ProxyHandler<GameState> = {
  set: (target: GameState, property: StateProp, value: StateVal): boolean => {
    if (property === "block") {
      const cubes = ["a", "b", "c", "d"]
      setProp(
        "block-template",
        blocks[value as Block]
          .map(row => '"' + row.map(item => (item === 1 ? cubes.shift() : ".")).join(" ") + '"')
          .join(" ")
      )
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target[property as Exclude<StateProp, "block">] = value as number | boolean
      setProp(property, value.toString())
    }

    return true
  },
}

state = new Proxy(state, parseState)

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
