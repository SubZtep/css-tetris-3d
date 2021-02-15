import { setProp } from "./css"

export const level = {
  // cols: 6,
  // rows: 4,
  // floor: 10,
  cols: 4,
  rows: 4,
  floor: 4,
}

type Side = "back" | "right" | "left" | "top" | "bottom"

export const generateLevel = (container: HTMLElement): void => {
  Object.keys(level).forEach(key => setProp(key, level[key]))

  container.querySelectorAll(".level .side").forEach(el => {
    const frag = document.createDocumentFragment()
    const side = el.classList.item(1) as Side
    const tileCount =
        side === "back"
          ? level.cols * level.rows
          : level.floor * (["top", "bottom"].includes(side) ? level.cols : level.rows)

    for (let i = 0; i < tileCount; i++) {
      const tile = document.createElement("div")
      switch (side) {
        case "top":
          tile.classList.add("floor-" + Math.floor(i / level.cols))
          break
        case "bottom":
          tile.classList.add("floor-" + (level.floor - Math.floor(i / level.cols) - 1))
          break
        case "left":
          tile.classList.add("floor-" + (i % level.floor))
          break
        case "right":
          tile.classList.add("floor-" + (level.floor - (i % level.floor) - 1))
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
    const minWidth = Math.min(width / level.cols, height / level.rows)
    setProp("edge", minWidth / level.floor + "px")
  }).observe(containerEl)
}
