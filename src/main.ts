import * as css from "./css"
import * as level from "./level"
import * as input from "./input"
import { calcPercent } from "./utils"

window.addEventListener("load", () => {
  const container = document.querySelector<HTMLElement>(".container")

  css.initProps(container)({
    perspective: "50rem",
    mouseX: "50%",
    mouseY: "50%",

    edge: "3rem",
    halfEdge: "calc(var(--edge) / 2)",

    width: "6",
    height: "5",
    depth: "10",

    translateX: "0rem",
    translateY: "0rem",
    translateZ: "calc(var(--edge) * var(--depth))",
    // translateZ: "calc(var(--edge) * var(--depth) - var(--halfEdge))",
    rotateX: "0deg",
    rotateZ: "0deg",
    radius: "0rem",
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
    let pers = parseFloat(css.getProp("perspective"))
    pers += deltaY / (pers < 10 ? 1000 : 100)
    if (pers > 0 && pers < 100) {
      css.setProp("perspective", `${pers}rem`)
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
        css.setProp("radius", `${rotateMode ? 0.1 : 0}rem`)
        dirty = true
        break
      case "KeyQ":
        translateZ++
        css.setProp("translateZ", `${translateZ}rem`)
        break
      case "KeyE":
        translateZ--
        css.setProp("translateZ", `${translateZ}rem`)
        break
      case "KeyA":
      case "ArrowLeft":
        if (rotateMode) {
          rotateZ -= 90
          css.setProp("rotateZ", `${rotateZ}deg`)
        } else {
          translateX -= edge
          css.setProp("translateX", `${translateX}rem`)
        }
        break
      case "KeyD":
      case "ArrowRight":
        if (rotateMode) {
          rotateZ += 90
          css.setProp("rotateZ", `${rotateZ}deg`)
        } else {
          translateX += edge
          css.setProp("translateX", `${translateX}rem`)
        }
        break
      case "KeyW":
      case "ArrowUp":
        if (rotateMode) {
          rotateX += 90
          css.setProp("rotateX", `${rotateX}deg`)
        } else {
          translateY -= edge
          css.setProp("translateY", `${translateY}rem`)
        }
        break
      case "KeyS":
      case "ArrowDown":
        if (rotateMode) {
          rotateX -= 90
          css.setProp("rotateX", `${rotateX}deg`)
        } else {
          translateY += edge
          css.setProp("translateY", `${translateY}rem`)
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
