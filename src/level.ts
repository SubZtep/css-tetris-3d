import { setCSSVar } from "./cssvar"

export const level = {
  width: 6,
  height: 5,
  depth: 30,
}

export const generateLevel = (containerEl: HTMLElement): void => {
  const levelEl: HTMLDivElement = containerEl.querySelector(".level")
  Object.keys(level).forEach(key => setCSSVar(key, level[key]))

  levelEl.querySelectorAll(".face").forEach(el => {
    const rectCount = el.classList.contains("back")
      ? level.width * level.height
      : el.classList.contains("top") || el.classList.contains("bottom")
      ? level.width * level.depth
      : level.height * level.depth
    const frag = document.createDocumentFragment()
    for (let i = 0; i < rectCount; i++) {
      frag.appendChild(document.createElement("div"))
    }
    el.appendChild(frag)
  })
}

export const observeResize = (containerEl: HTMLElement): void => {
  new ResizeObserver(([{ contentRect }]) => {
    const { width, height } = contentRect
    // const minWidth = Math.floor(Math.min(width / level.width, height / level.height))
    // setCSSVar("edge", Math.floor((minWidth / level.depth) * 1.5) + "px")
    // setCSSVar("edge", Math.floor(minWidth / level.depth) + "rem")
    const minWidth = Math.min(width / level.width, height / level.height)
    setCSSVar("edge", minWidth / level.depth + "rem")
  }).observe(containerEl)
}
