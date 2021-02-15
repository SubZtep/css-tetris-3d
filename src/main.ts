import * as css from "./css"
import * as level from "./level"
import * as input from "./input"
import { calcPercent } from "./utils"

window.addEventListener("load", () => {
  const container = document.querySelector<HTMLElement>(".container")

  let current = level.dimensions.floor

  css.initProps(container)({
    perspective: "800px",
    mouseX: "50%",
    mouseY: "50%",

    edge: "100px",

    cols: level.dimensions.cols.toString(),
    rows: level.dimensions.rows.toString(),
    floor: level.dimensions.floor.toString(),

    translateX: "0px",
    translateY: "0px",
    // translateZ: 100 * level.dimensions.floor + "px", // "calc(var(--edge) * var(--floor))",
    current: current.toString(),

    rotateX: "0deg",
    rotateZ: "0deg",
    radius: "0px",
  })

  level.generateLevel(container)
  level.observeResize(container)
  input.listenInputs()

  input.pipeline.mousemove.push(({ buttons, clientX, clientY }) => {
    // buttons: 1: left, 2: right, 3: both
    if (buttons === 1) {
      const { clientWidth, clientHeight } = container
      css.setProp("mouseX", calcPercent(clientWidth, clientX) + "%")
      css.setProp("mouseY", calcPercent(clientHeight, clientY) + "%")
    }
  })

  input.pipeline.wheel.push(({ deltaY }) => {
    const pers = parseFloat(css.getProp("perspective")) + deltaY
    if (pers > 0) {
      css.setProp("perspective", `${pers}px`)
    }
  })

  let rotateMode = false
  let dirty = false
  input.pipeline.keydown.push(({ code, altKey }) => {
    if (dirty) {
      return
    }
    const edge = parseFloat(css.getProp("edge"))
    let translateX = parseFloat(css.getProp("translateX"))
    let translateY = parseFloat(css.getProp("translateY"))
    // let translateZ = parseFloat(css.getProp("translateZ"))
    let rotateX = parseInt(css.getProp("rotateX"), 10)
    let rotateZ = parseInt(css.getProp("rotateZ"), 10)
    const isRotation = (!altKey || !rotateMode) && (altKey || rotateMode)

    switch (code) {
      case "KeyR":
        rotateMode = !rotateMode
        css.setProp("radius", `${rotateMode ? edge / 4 : 0}px`)
        dirty = true
        break
      case "KeyQ":
        // translateZ += edge
        // css.setProp("translateZ", `${translateZ}px`)
        css.setProp("current", (++current).toString())
        break
      case "KeyE":
        // translateZ -= edge
        // css.setProp("translateZ", `${translateZ}px`)
        css.setProp("current", (--current).toString())
        break
      case "KeyA":
      case "ArrowLeft":
        if (isRotation) {
          rotateZ -= 90
          css.setProp("rotateZ", `${rotateZ}deg`)
        } else {
          translateX -= edge
          css.setProp("translateX", `${translateX}px`)
        }
        return true
        break
      case "KeyD":
      case "ArrowRight":
        if (isRotation) {
          rotateZ += 90
          css.setProp("rotateZ", `${rotateZ}deg`)
        } else {
          translateX += edge
          css.setProp("translateX", `${translateX}px`)
        }
        break
      case "KeyW":
      case "ArrowUp":
        if (isRotation) {
          rotateX += 90
          css.setProp("rotateX", `${rotateX}deg`)
        } else {
          translateY -= edge
          css.setProp("translateY", `${translateY}px`)
        }
        return true
        break
      case "KeyS":
      case "ArrowDown":
        if (isRotation) {
          rotateX -= 90
          css.setProp("rotateX", `${rotateX}deg`)
        } else {
          translateY += edge
          css.setProp("translateY", `${translateY}px`)
        }
        break
      default:
        return false
    }
    return true
  })

  input.pipeline.keyup.push(({ code }) => {
    if (code === "KeyR") {
      dirty = false
    }
  })

  container.querySelector(".block").classList.add(level.getBlock())
})
