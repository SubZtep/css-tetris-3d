import { setProp } from "./css"
import { getRandomItem } from "./utils"

export const dimensions = {
  cols: 4,
  rows: 4,
  floor: 4,
}

const blocks = ["orangeRick", "hero", "blueRick", "teeWee", "clevelandZ", "smashboy", "rhodeIslandZ"] as const

type Block = typeof blocks[number]
type Side = "back" | "right" | "left" | "top" | "bottom"

export const generateLevel = (container: HTMLElement): void => {
  Object.keys(dimensions).forEach(key => setProp(key, dimensions[key]))

  container.querySelectorAll(".level .side").forEach(el => {
    const frag = document.createDocumentFragment()
    const side = el.classList.item(1) as Side
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

export const observeResize = (containerEl: HTMLElement): void => {
  new ResizeObserver(([{ contentRect }]) => {
    const { width, height } = contentRect
    const minWidth = Math.min(width / dimensions.cols, height / dimensions.rows)
    setProp("edge", minWidth / dimensions.floor + "px")
  }).observe(containerEl)
}


export const getBlock = (): Block => {
  return getRandomItem(blocks)
}
