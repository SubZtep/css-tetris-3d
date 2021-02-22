import { dimensions } from "../game"

export const calcPercent = (whole: number, amount: number): number => (amount / whole) * 100

export const getRandomItem = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)]

export const rotate2d = (matrix: number[][]): number[][] =>
  matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())

export const calcPerspective = ({ clientWidth, clientHeight, clientX, clientY }) => {
  const fastPcToEdge = 13
  const fastMulti = 1.3 // 2.2

  let px = calcPercent(clientWidth, clientX)
  if (px > 100 - fastPcToEdge) {
    px += Math.pow(Math.abs(100 - fastPcToEdge - px), fastMulti)
  } else if (px < fastPcToEdge) {
    px -= Math.pow(fastPcToEdge - px, fastMulti)
  }

  let py = calcPercent(clientHeight, clientY)
  if (py > 100 - fastPcToEdge) {
    py += Math.pow(Math.abs(100 - fastPcToEdge - py), fastMulti)
  } else if (py < fastPcToEdge) {
    py -= Math.pow(fastPcToEdge - py, fastMulti)
  }

  return { px, py }
}

// --

export const colEdge = (width: number) => width / dimensions.cols
export const rowEdge = (height: number) => height / dimensions.rows
