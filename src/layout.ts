import { calcPercent } from "./lib/utils"
import { getProp, setProp, setProps } from "./lib/css"
import { dimensions } from "./board"

let container: HTMLElement

export let view = {
  edge: 0,
  perspective: 0,
}

view = new Proxy(view, {
  set(target: typeof view, p: keyof typeof view, value: number) {
    target[p] = value
    setProp(p, `${value}px`)
    return true
  },
})

export const setContainer = (el: HTMLElement): void => {
  container = el
  calcCameraView()
}

export const defaultCSSProps = (): { [prop: string]: string } =>
  Object.assign(
    {
      perspectiveX: "50%",
      perspectiveY: "50%",
      backface: "hidden",
    },
    ...Object.entries(dimensions).map(([key, value]) => ({ [key]: String(value) }))
  )

export const calcCameraView = (): void => {
  const we = container.clientWidth / dimensions.cols
  const he = container.clientHeight / dimensions.rows
  view.edge = Math.min(we, he) / 2
  view.perspective = dimensions.floors * view.edge * 2
}

export const handleResize = (): void => new ResizeObserver(calcCameraView).observe(container)

export const resetView = () => {
  setProps({
    perspectiveX: "50%",
    perspectiveY: "50%",
  })
  calcCameraView()
}

export const calculateEdgePerspective = (pos: number, fastSize: number, fastMulti: number) => {
  let ePercent = calcPercent(container.clientWidth, pos)
  if (ePercent > 100 - fastSize) {
    ePercent += Math.pow(Math.abs(100 - fastSize - ePercent), fastMulti)
  } else if (ePercent < fastSize) {
    ePercent -= Math.pow(fastSize - ePercent, fastMulti)
  }
  return ePercent
}

export const followCursor = (ev: MouseEvent, fastSize = 10, fastMulti = 2) => {
  if (!ev.ctrlKey) return
  const perspectiveX = 100 - calculateEdgePerspective(ev.clientX, fastSize, fastMulti) + "%"
  const perspectiveY = 100 - calculateEdgePerspective(ev.clientY, fastSize, fastMulti) + "%"
  setProps({ perspectiveX, perspectiveY })
}

export const perspectiveScrollToZoom = ({ deltaY }) => {
  const persTurn = 100
  let pers = getProp("perspective", parseFloat)
  pers += Math.sign(deltaY) * (pers < persTurn ? 1 : ~~Math.sqrt(pers - persTurn + 1))
  if (pers > 0) {
    setProp("perspective", `${pers}px`)
  }
}

export const haluView = () => {
  view.perspective = (view.perspective * dimensions.floors) / 350
}
