import { calcCameraView } from "./layout"
import { setProp } from "./lib/css"

export let board: number[][][]

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
    calcCameraView()
    return true
  },
})

export const initBoard = (): void => {
  board = Array.from(
    Array.from({ length: dimensions.floors }, () =>
      Array.from({ length: dimensions.rows }, () => Array.from({ length: dimensions.cols }, () => 0))
    )
  )
}
