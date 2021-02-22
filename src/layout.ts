import { pipeline } from "./lib/events"
import { calcPercent } from "./lib/utils"
import { getProp, setProp, setProps } from "./lib/css"
import { dimensions, state, liftBlock, rotateX, rotateZ, moveX, moveY } from "./game"
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
  calcView()
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

export const calcView = (): void => {
  const { clientWidth: w, clientHeight: h } = container
  const edge = Math.min(w / dimensions.cols, h / dimensions.rows)
  view.edge = edge / 2
  view.perspective = dimensions.floors * view.edge * 2 // * 2
}

export const handleWindowResize = (): void => new ResizeObserver(calcView).observe(container)

const perspectiveFollows = ({ buttons, clientX, clientY }) => {
  if (guiWorks) return
  if (buttons === 1) {
    const { clientWidth, clientHeight } = container
    const fastPcToEdge = 40
    const fastMulti = 2.2

    let px = calcPercent(clientWidth, clientX)
    if (px > 100 - fastPcToEdge) {
      px += Math.pow(Math.abs(100 - fastPcToEdge - px), fastMulti)
    } else if (px < fastPcToEdge) {
      px -= Math.pow(fastPcToEdge - px, fastMulti)
    }

    let py = calcPercent(clientHeight, clientY)
    if (py > 100 - fastPcToEdge) {
      py += Math.pow(Math.abs(100 - fastPcToEdge - py), fastMulti)
    } else if (py < fastPcToEdge) {
      py -= Math.pow(fastPcToEdge - py, fastMulti)
    }

    setProps({
      perspectiveX: `${100 - px}%`,
      perspectiveY: `${100 - py}%`,
    })
    return true
  }
  return false
}

export const handlePerspectiveMutates = (): void => {
  pipeline.mousedown.push(ev => {
    if (guiWorks) return
    if (ev.buttons === 1) {
      view.perspective = view.perspective * dimensions.floors * 2
    }
    perspectiveFollows(ev)
  })

  pipeline.mouseup.push(() => {
    setProps({
      perspectiveX: "50%",
      perspectiveY: "50%",
    })
    calcView()
  })

  pipeline.mousemove.push(perspectiveFollows)

  pipeline.wheel.push(({ deltaY }) => {
    // const persTurn = 100
    let pers = getProp("perspective", parseFloat)
    pers += Math.sign(deltaY) * 100
    // pers += Math.sign(deltaY) * (pers < persTurn ? 1 : ~~Math.sqrt(pers - persTurn + 1))
    if (pers > 0) {
      setProp("perspective", `${pers}px`)
    }
  })
}

export const handleGameInput = (): void => {
  pipeline.keydown.push(({ code, altKey, ctrlKey }) => {
    if (ctrlKey) return false
    const isRotation = (!altKey || !state.rotateMode) && (altKey || state.rotateMode)

    switch (code) {
      case "KeyR":
        state.rotateMode = !state.rotateMode
        break

      case "KeyQ":
        liftBlock(1)
        break

      case "KeyE":
        liftBlock()
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

      default:
        return false
    }
    return true
  })
}
