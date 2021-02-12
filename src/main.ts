const level = {
  width: 6,
  height: 5,
  depth: 3,
}

const containerEl: HTMLDivElement = document.querySelector(".container")
const levelEl: HTMLDivElement = containerEl.querySelector(".level")

const generateLevel = () => {
  Object.keys(level).forEach(key => levelEl.style.setProperty(`--${key}`, level[key]))

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
      containerEl.style.setProperty("--mouse-x", 100 - Math.floor((clientX / clientWidth) * 100) + "%")
      containerEl.style.setProperty("--mouse-y", 100 - Math.floor((clientY / clientHeight) * 100) + "%")
    },
    false
  )

  new ResizeObserver(
    ([
      {
        contentRect: { width, height },
      },
    ]) => {
      const minWidth = Math.floor(Math.min(width / level.width, height / level.height))
      levelEl.style.setProperty("--square-length", Math.floor((minWidth / level.depth) * 1.5) + "px")
    }
  ).observe(containerEl)
})
