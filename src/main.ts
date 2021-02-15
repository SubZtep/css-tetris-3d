import * as css from "./css"
import * as level from "./level"
import * as input from "./input"
import * as layout from "./layout"

window.addEventListener("load", () => {
  const container = document.querySelector<HTMLElement>(".container")

  level.resetState()
  css.initProps(container)(layout.defaultCSSProps)
  input.listenInputs()
  layout.generateLevel(container)
  layout.observeResize(container)
  layout.mutablePerspective(container)

  input.pipeline.keydown.push(({ code, altKey }) => {
    const isRotation = (!altKey || !level.state.rotateMode) && (altKey || level.state.rotateMode)

    switch (code) {
      case "KeyR":
        level.state.rotateMode = !level.state.rotateMode
        css.setProp("radius", `${level.state.rotateMode ?  parseFloat(css.getProp("edge")) / 4 : 0}px`)
        break
      case "KeyQ":
        level.moveBlock(false)
        break
        case "KeyE":
        level.moveBlock()
        break
      case "KeyA":
      case "ArrowLeft":
        if (isRotation) {
          level.state.rotZ -= 90
        } else {
          level.state.posX--
        }
        return true
        break
      case "KeyD":
      case "ArrowRight":
        if (isRotation) {
          level.state.rotZ += 90
        } else {
          level.state.posX++
        }
        break
      case "KeyW":
      case "ArrowUp":
        if (isRotation) {
          level.state.rotX += 90
        } else {
          level.state.posY--
        }
        return true
        break
      case "KeyS":
      case "ArrowDown":
        if (isRotation) {
          level.state.rotX -= 90
        } else {
          level.state.posY++
        }
        break
      default:
        return false
    }
    return true
  })
})
