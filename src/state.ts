import { toggleLiveTimer } from "./game"
import { setProp } from "./lib/css"
import { Tetromino } from "./tetromino"

export interface GameState {
  live: boolean
  screwAxisX: boolean
  tetromino: Tetromino
  posX: number
  posY: number
  posZ: number
  rotX: number
  rotZ: number
}

export let state: GameState = {
  live: false,
  screwAxisX: false,
} as GameState

state = new Proxy(state, {
  set: (target: GameState, p: keyof GameState, value: GameState[keyof GameState]) => {
    const oldTetromino = state.tetromino

    // @ts-ignore
    target[p] = value

    switch (p) {
      case "live":
        toggleLiveTimer()
        break
      case "screwAxisX":
        setProp("backface", value ? "visible" : "hidden")
        break
      case "tetromino":
        // eslint-disable-next-line no-case-declarations
        const { classList } = document.querySelector(".tetromino")
        if (classList.contains(oldTetromino)) {
          classList.replace(oldTetromino, state.tetromino)
        } else {
          classList.add(state.tetromino)
        }
        break
      default:
        setProp(p, String(value))
    }

    // console.table(target)
    return true
  },
})
