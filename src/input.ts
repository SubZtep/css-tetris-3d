import { pipeline } from "./lib/events"
import { liftTetromino, rotateZ, moveX, rotateX, moveY } from "./game"
import { followCursor, haluView, perspectiveScrollToZoom, resetView } from "./layout"

export const initKeyboardInputs = (ev: KeyboardEvent): boolean | undefined => {
  if (ev.ctrlKey) return
  const isRotation = ev.metaKey || ev.shiftKey || ev.altKey

  switch (ev.code) {
    case "KeyQ":
      liftTetromino(1)
      break

    case "KeyE":
      liftTetromino()
      break

    case "KeyA":
    case "ArrowLeft":
      isRotation ? rotateZ(-90) : moveX(-1)
      break

    case "KeyD":
    case "ArrowRight":
      isRotation ? rotateZ(90) : moveX(1)
      break

    case "KeyW":
    case "ArrowUp":
      isRotation ? rotateX(90) : moveY(-1)
      break

    case "KeyS":
    case "ArrowDown":
      isRotation ? rotateX(-90) : moveY(1)
      break
  }
  return false
}

export const pipeInputControls = (): void => {
  pipeline.keydown.push(initKeyboardInputs)

  pipeline.mouseup.push(resetView)
  pipeline.mousedown.push(followCursor)
  pipeline.mousemove.push(followCursor)
  pipeline.wheel.push(perspectiveScrollToZoom)

  pipeline.keyup.push(({ key }) => {
    if (key === "Control") {
      resetView()
    }
  })

  pipeline.mousedown.push(({ buttons }) => {
    if (buttons === 3) {
      haluView()
    }
  })
}
