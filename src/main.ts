import * as css from "./css"
import * as level from "./level"
import * as input from "./input"
import { calcPercent } from "./utils"

window.addEventListener("load", () => {
  const container = document.querySelector<HTMLElement>(".container")

  css.initProps(container)({
    perspective: "800px",
    mouseX: "50%",
    mouseY: "50%",

    edge: "100px",

    cols: level.level.cols.toString(),
    rows: level.level.rows.toString(),
    floor: level.level.floor.toString(),

    translateX: "0px",
    translateY: "0px",
    translateZ: (100 * level.level.floor) + "px", // "calc(var(--edge) * var(--floor))",

    rotateX: "0deg",
    rotateZ: "0deg",
    radius: "0px",
  })

  level.generateLevel(container)
  // level.observeResize(containerEl)
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
  input.pipeline.keydown.push(({ code }) => {
    if (dirty) {
      return
    }
    const edge = parseFloat(css.getProp("edge"))
    let translateX = parseFloat(css.getProp("translateX"))
    let translateY = parseFloat(css.getProp("translateY"))
    let translateZ = parseFloat(css.getProp("translateZ"))
    let rotateX = parseInt(css.getProp("rotateX"), 10)
    let rotateZ = parseInt(css.getProp("rotateZ"), 10)

    switch (code) {
      case "KeyR":
        rotateMode = !rotateMode
        css.setProp("radius", `${rotateMode ? edge / 4 : 0}px`)
        dirty = true
        break
      case "KeyQ":
        console.log({ translateZ, edge })
        translateZ += edge
        css.setProp("translateZ", `${translateZ}px`)
        break
      case "KeyE":
        translateZ -= edge
        css.setProp("translateZ", `${translateZ}px`)
        break
      case "KeyA":
      case "ArrowLeft":
        if (rotateMode) {
          rotateZ -= 90
          css.setProp("rotateZ", `${rotateZ}deg`)
        } else {
          translateX -= edge
          css.setProp("translateX", `${translateX}px`)
        }
        break
      case "KeyD":
      case "ArrowRight":
        if (rotateMode) {
          rotateZ += 90
          css.setProp("rotateZ", `${rotateZ}deg`)
        } else {
          translateX += edge
          css.setProp("translateX", `${translateX}px`)
        }
        break
      case "KeyW":
      case "ArrowUp":
        if (rotateMode) {
          rotateX += 90
          css.setProp("rotateX", `${rotateX}deg`)
        } else {
          translateY -= edge
          css.setProp("translateY", `${translateY}px`)
        }
        break
      case "KeyS":
      case "ArrowDown":
        if (rotateMode) {
          rotateX -= 90
          css.setProp("rotateX", `${rotateX}deg`)
        } else {
          translateY += edge
          css.setProp("translateY", `${translateY}px`)
        }
        break
    }
  })
  input.pipeline.keyup.push(({ code }) => {
    if (code === "KeyR") {
      dirty = false
    }
  })
})
