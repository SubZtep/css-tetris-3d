import { getProp, setProp } from "./css"
import { pipeline } from "./input"
import { dimensions, state } from "./level"
import { calcPercent } from "./utils"

export const defaultCSSProps = {
  perspective: "800px",
  perspectiveX: "50%",
  perspectiveY: "50%",

  edge: "100px",
  radius: "0px",

  cols: dimensions.cols.toString(),
  rows: dimensions.rows.toString(),
  floor: dimensions.floor.toString(),
  currentFloor: state.currentFloor.toString(),
  posX: state.posX.toString(),
  posY: state.posY.toString(),
  rotX: state.rotX.toString(),
  rotZ: state.rotZ.toString(),
}

export const generateLevel = (container: HTMLElement): void => {
  Object.keys(dimensions).forEach(key => setProp(key, dimensions[key]))

  container.querySelectorAll(".level .side").forEach(el => {
    const frag = document.createDocumentFragment()
    const side = el.classList.item(1) as LevelSide
    const tileCount =
      side === "back"
        ? dimensions.cols * dimensions.rows
        : dimensions.floor * (["top", "bottom"].includes(side) ? dimensions.cols : dimensions.rows)

    for (let i = 0; i < tileCount; i++) {
      const tile = document.createElement("div")
      switch (side) {
        case "top":
          tile.classList.add("floor-" + Math.floor(i / dimensions.cols))
          break
        case "bottom":
          tile.classList.add("floor-" + (dimensions.floor - Math.floor(i / dimensions.cols) - 1))
          break
        case "left":
          tile.classList.add("floor-" + (i % dimensions.floor))
          break
        case "right":
          tile.classList.add("floor-" + (dimensions.floor - (i % dimensions.floor) - 1))
          break
      }
      frag.appendChild(tile)
    }
    el.appendChild(frag)
  })
}

export const observeResize = (container: HTMLElement): void =>
  new ResizeObserver(([{ contentRect: { width, height } }]) =>
    setProp("edge", Math.min(width / dimensions.cols, height / dimensions.rows) / dimensions.floor + "px")
  ).observe(container)

export const mutablePerspective = (container: HTMLElement): void => {
  pipeline.mousemove.push(({ buttons, clientX, clientY }) => {
    // buttons: 1: left, 2: right, 3: both
    if (buttons === 1) {
      const { clientWidth, clientHeight } = container
      setProp("perspectiveX", calcPercent(clientWidth, clientX) + "%")
      setProp("perspectiveY", calcPercent(clientHeight, clientY) + "%")
    }
  })

  pipeline.wheel.push(({ deltaY }) => {
    const pers = parseFloat(getProp("perspective")) + deltaY
    if (pers > 0) {
      setProp("perspective", `${pers}px`)
    }
  })
}
