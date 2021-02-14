import { calcPercent } from "./utils"
import { setCSSVar, getCSSVar } from "./cssvar"
import * as level from "./level"
import * as input from "./input"

window.addEventListener("load", () => {
  const containerEl = document.querySelector<HTMLElement>(".container")

  level.generateLevel(containerEl)
  // level.observeResize(containerEl)
  input.listenInputs()

  input.pipeline.mousemove.push(({ buttons, clientX, clientY }) => {
    // buttons: 1: left, 2: right, 3: both
    if (buttons === 1) {
      const { clientWidth, clientHeight } = containerEl
      setCSSVar("mouse-x-pc", calcPercent(clientWidth, clientX) + "%")
      setCSSVar("mouse-y-pc", calcPercent(clientHeight, clientY) + "%")
    }
  })

  setCSSVar("perspective", "20rem")
  input.pipeline.wheel.push(({ deltaY }) => {
    let pers = parseFloat(getCSSVar("perspective"))
    pers += deltaY / (pers < 10 ? 1000 : 100)
    if (pers > 0 && pers < 30) {
      setCSSVar("perspective", `${pers}rem`)
    }
  })

  setCSSVar("edge", "0.5rem")
  let rotateMode = false
  let dirty = false
  input.pipeline.keydown.push(({ code }) => {
    if (dirty) {
      return
    }
    const edge = parseFloat(getCSSVar("edge"))
    let translateX = parseFloat(getCSSVar("translateX")) || 0
    let translateY = parseFloat(getCSSVar("translateY")) || 0
    let rotateX = parseInt(getCSSVar("rotateX"), 10) || 0
    let rotateZ = parseInt(getCSSVar("rotateZ"), 10) || 0

    switch (code) {
      case "KeyR":
        rotateMode = !rotateMode
        setCSSVar("radius", `${rotateMode ? 0.1 : 0}rem`)
        dirty = true
        break
      case "KeyA":
      case "ArrowLeft":
        if (rotateMode) {
          rotateZ -= 90
          setCSSVar("rotateZ", `${rotateZ}deg`)
        } else {
          translateX -= edge
          setCSSVar("translateX", `${translateX}rem`)
        }
        break
      case "KeyD":
      case "ArrowRight":
        if (rotateMode) {
          rotateZ += 90
          setCSSVar("rotateZ", `${rotateZ}deg`)
        } else {
          translateX += edge
          setCSSVar("translateX", `${translateX}rem`)
        }
        break
      case "KeyW":
      case "ArrowUp":
        if (rotateMode) {
          rotateX += 90
          setCSSVar("rotateX", `${rotateX}deg`)
        } else {
          translateY -= edge
          setCSSVar("translateY", `${translateY}rem`)
        }
        break
      case "KeyS":
      case "ArrowDown":
        if (rotateMode) {
          rotateX -= 90
          setCSSVar("rotateX", `${rotateX}deg`)
        } else {
          translateY += edge
          setCSSVar("translateY", `${translateY}rem`)
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
