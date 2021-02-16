import * as css from "./css"
import * as level from "./level"
import * as input from "./input"
import * as layout from "./layout"

window.addEventListener("load", () => {
  const container = document.querySelector<HTMLElement>(".container")

  css.initProps(container)(layout.defaultCSSProps())
  input.listenInputs()

  level.resetState()
  layout.createLevel(container)
  layout.handleWindowResize(container)
  layout.handlePerspectiveMutates(container)

  input.pipeline.keydown.push(({ code, altKey, ctrlKey }) => {
    if (ctrlKey) return false

    const isRotation = (!altKey || !level.state.rotateMode) && (altKey || level.state.rotateMode)

    switch (code) {
      case "KeyR":
        level.state.rotateMode = !level.state.rotateMode
        break

      case "KeyQ":
        level.moveBlock(false)
        break

      case "KeyE":
        level.moveBlock()
        break

      case "KeyA":
      case "ArrowLeft":
        isRotation ? (level.state.rotZ -= 90) : level.state.posX--
        break

      case "KeyD":
      case "ArrowRight":
        isRotation ? (level.state.rotZ += 90) : level.state.posX++
        break

      case "KeyW":
      case "ArrowUp":
        isRotation ? (level.state.rotX += 90) : level.state.posY--
        break

      case "KeyS":
      case "ArrowDown":
        isRotation ? (level.state.rotX -= 90) : level.state.posY++
        break

      default:
        return false
    }
    return true
  })
})
