import { pipeline } from "./lib/events"
import { calcPercent } from "./lib/utils"
import { getProp, setProp, setProps } from "./lib/css"
import { dimensions, liftTetromino, rotateX, rotateZ, moveX, moveY } from "./game"
import { guiWorks } from "./gui"

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
      radius: "0px",
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

const resetView = () => {
  setProps({
    perspectiveX: "50%",
    perspectiveY: "50%",
  })
  calcCameraView()
}

const calculateEdgePerspective = (pos: number, fastSize: number, fastMulti: number) => {
  let ePercent = calcPercent(container.clientWidth, pos)
  if (ePercent > 100 - fastSize) {
    ePercent += Math.pow(Math.abs(100 - fastSize - ePercent), fastMulti)
  } else if (ePercent < fastSize) {
    ePercent -= Math.pow(fastSize - ePercent, fastMulti)
  }
  return ePercent
}

const followCursor = (ev: MouseEvent, fastSize = 10, fastMulti = 2) => {
  if (guiWorks) {
    resetView()
    return
  }
  let perspectiveX = 100 - calculateEdgePerspective(ev.clientX, fastSize, fastMulti) + "%"
  let perspectiveY = 100 - calculateEdgePerspective(ev.clientY, fastSize, fastMulti) + "%"
  setProps({ perspectiveX, perspectiveY })
}

const perspectiveScrollToZoom = ({ deltaY }) => {
  const persTurn = 100
  let pers = getProp("perspective", parseFloat)
  pers += Math.sign(deltaY) * (pers < persTurn ? 1 : ~~Math.sqrt(pers - persTurn + 1))
  if (pers > 0) {
    setProp("perspective", `${pers}px`)
  }
}

export const initKeyboardInputs = (ev: KeyboardEvent): boolean | undefined => {
  if (ev.ctrlKey) return
  const isRotation = ev.metaKey || ev.shiftKey || ev.altKey

  switch (ev.code) {
    case "KeyQ":
      liftTetromino(1)
      break

    case "KeyE":
      liftTetromino()
      break

    case "KeyA":
    case "ArrowLeft":
      isRotation ? rotateZ(-90) : moveX(-1)
      break

    case "KeyD":
    case "ArrowRight":
      isRotation ? rotateZ(90) : moveX(1)
      break

    case "KeyW":
    case "ArrowUp":
      isRotation ? rotateX(90) : moveY(-1)
      break

    case "KeyS":
    case "ArrowDown":
      isRotation ? rotateX(-90) : moveY(1)
      break
  }
  return false
}

export const pipeInputControls = (): void => {
  pipeline.keydown.push(initKeyboardInputs)

  pipeline.mouseup.push(resetView)
  pipeline.mousedown.push(followCursor)
  pipeline.mousemove.push(followCursor)
  pipeline.wheel.push(perspectiveScrollToZoom)

  pipeline.mousedown.push(ev => {
    if (ev.buttons === 3) {
      view.perspective = (view.perspective * dimensions.floors) / 350
    }
  })
}
