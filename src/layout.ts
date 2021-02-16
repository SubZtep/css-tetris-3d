import { pipeline } from "./input"
import { dimensions } from "./level"
import { calcPercent } from "./utils"
import { getProp, setProp } from "./css"

export const defaultCSSProps = (): { [prop: string]: string } =>
  Object.assign(
    {
      perspective: "800px",
      perspectiveX: "50%",
      perspectiveY: "50%",
      edge: "100px",
      radius: "0px",
    },
    ...Object.entries(dimensions).map(([key, value]) => ({ [key]: value.toString() }))
  )

export const createLevel = (container: HTMLElement): void => {
  const { cols, rows, floor } = dimensions

  container.querySelectorAll(".level .side").forEach(el => {
    const frag = document.createDocumentFragment()
    const side = el.classList.item(1) as LevelSide
    const tileCount = side === "back" ? cols * rows : floor * (["top", "bottom"].includes(side) ? cols : rows)
    for (let i = 0; i < tileCount; i++) {
      const tile = document.createElement("div")
      let nr: number
      switch (side) {
        case "top":
          nr = Math.floor(i / cols)
          break
        case "bottom":
          nr = floor - Math.floor(i / cols) - 1
          break
        case "left":
          nr = i % floor
          break
        case "right":
          nr = floor - (i % floor) - 1
          break
        default:
      }
      tile.classList.add(`floor-${nr ?? "backwall"}`)
      frag.appendChild(tile)
    }
    el.appendChild(frag)
  })
}

/**
 * Set `--edge` size
 */
export const handleWindowResize = (container: HTMLElement): void =>
  new ResizeObserver(
    ([
      {
        contentRect: { width, height },
      },
    ]) => {
      const edge = (Math.min(width / dimensions.cols, height / dimensions.rows) / dimensions.floor) * 2
      setProp("edge", `${edge}px`)
    }
  ).observe(container)

/**
 * Set `--perspectiveX`, `--perspectiveY` and `--perspective`
 */
export const handlePerspectiveMutates = (container: HTMLElement): void => {
  pipeline.mousemove.push(({ buttons, clientX, clientY }) => {
    if (buttons === 1) {
      const { clientWidth, clientHeight } = container
      setProp("perspectiveX", calcPercent(clientWidth, clientX) + "%")
      setProp("perspectiveY", calcPercent(clientHeight, clientY) + "%")
      return true
    }
    return false
  })

  pipeline.wheel.push(({ deltaY }) => {
    const persTurn = 100
    let pers = parseFloat(getProp("perspective"))

    console.log({ pers })
    pers += Math.sign(deltaY) * (pers < persTurn ? 1 : ~~Math.sqrt(pers - persTurn + 1))
    if (pers > 0) {
      setProp("perspective", `${pers}px`)
    }
  })
}
