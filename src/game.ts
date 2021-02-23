import { state } from "./state"
import * as pool from "./lib/pool"
import { notify } from "./lib/notification"
import { getNextTetromino, tetrominoChecker } from "./tetromino"
import { board, dimensions, initBoard } from "./board"

let timer: NodeJS.Timeout

export const toggleLiveTimer = () => {
  clearInterval(timer)
  if (state.live) {
    timer = setInterval(liftTetromino, 3000)
  }
}

export const resetTetromino = (): void => {
  state.currentFloor = dimensions.floors - 1
  state.tetromino = getNextTetromino()
  state.posX = 0
  state.posY = 0
  state.rotX = 0
  state.rotZ = 0
}

const testRotZ = (z: number, moveX = 0, moveY = 0) => {
  return tetrominoChecker(z, moveX, moveY, (testX, testY) => {
    if (testX < 0 || testX >= dimensions.cols) {
      return false
    }
    if (testY < 0 || testY >= dimensions.rows) {
      return false
    }
    return true
  })
}

const canLiftTetromino = () => {
  console.log([state.currentFloor, dimensions.floors])
  if (state.currentFloor === 0 || state.currentFloor >= dimensions.floors) return false
  // console.log(board.map(b => [...b.map(c => c.join(" "))]))
  return tetrominoChecker(0, 0, 0, (testX, testY) => !board[state.currentFloor - 1][testY][testX])
}

export const rotateX = (r: -90 | 90): void => {
  const x = state.rotX + r
  console.log("Rotate X", x)
  // state.rotX = x
}

export const rotateZ = (r: -90 | 90): void => {
  const mayMoves = [0, -1, 1, -2, 2, -3, 3, -4, 4] // FIXME: order based on rotation
  for (const i of mayMoves) {
    for (const j of mayMoves) {
      if (testRotZ(r, i, j)) {
        state.posX += i
        state.posY += j
        state.rotZ += r
        return
      }
    }
  }
}

export const moveX = (d: -1 | 1) => {
  if (testRotZ(0, d)) {
    state.posX += d
  }
}

export const moveY = (d: -1 | 1) => {
  if (testRotZ(0, 0, d)) {
    state.posY += d
  }
}

const brickTetromino = () => {
  const frag = document.createDocumentFragment()

  tetrominoChecker(0, 0, 0, (testX, testY) => {
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
    notify("You Died! (×﹏×)")
    pool.recallPoolItems(mason)

    dimensions.cols++
    dimensions.rows++
    dimensions.floors++
    initBoard()

    if (state.live) {
      timer = setInterval(liftTetromino, 3000)
    }
  }
}

export const liftTetromino = (step = -1): void => {
  state.currentFloor += step
  if (!canLiftTetromino()) {
    brickTetromino()
    resetTetromino()
  }
}
