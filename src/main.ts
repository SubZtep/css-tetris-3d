const level = {
  width: 6,
  height: 5,
  depth: 3,
}

const setCSSVar = (propery: string, value: string) => {
  // @ts-ignore
  // const root = document.documentElement.style
  const root = document.styleSheets[0].cssRules[0].style
  // const root = document.querySelector(":root").style
  root.setProperty(`--${propery}`, value)
}

const containerEl: HTMLDivElement = document.querySelector(".container")
const levelEl: HTMLDivElement = containerEl.querySelector(".level")

const generateLevel = () => {
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

window.addEventListener("load", () => {
  generateLevel()

  document.addEventListener(
    "mousemove",
    ({ buttons, clientX, clientY }: MouseEvent) => {
      const { clientWidth, clientHeight } = containerEl
      setCSSVar("mouse-x", 100 - Math.floor((clientX / clientWidth) * 100) + "%")
      setCSSVar("mouse-y", 100 - Math.floor((clientY / clientHeight) * 100) + "%")
    },
    false
  )

  new ResizeObserver(([{ contentRect }]) => {
    const { width, height } = contentRect
    const minWidth = Math.floor(Math.min(width / level.width, height / level.height))
    setCSSVar("square-length", Math.floor((minWidth / level.depth) * 1.5) + "px")
  }).observe(containerEl)
})
