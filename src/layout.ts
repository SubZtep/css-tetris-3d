import { pipeline } from "./lib/events"
import { calcPercent } from "./lib/utils"
import { getProp, setProp, setProps } from "./lib/css"
import { dimensions, state, moveBlock } from "./game"

export const defaultCSSProps = (): { [prop: string]: string } =>
  Object.assign(
    {
      perspective: "800px",
      perspectiveX: "50%",
      perspectiveY: "50%",
      edge: "100px",
      radius: "0px",
    },
    ...Object.entries(dimensions).map(([key, value]) => ({ [key]: String(value) }))
  )

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
  pipeline.mouseup.push(() => {
    setProps({
      perspectiveX: "50%",
      perspectiveY: "50%",
    })
  })

  pipeline.mousemove.push(({ buttons, clientX, clientY }) => {
    if (buttons === 1) {
      const { clientWidth, clientHeight } = container
      const fastPcToEdge = 20
      const fastMulti = 1.6

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
  })

  pipeline.wheel.push(({ deltaY }) => {
    const persTurn = 100
    let pers = getProp("perspective", parseFloat)
    pers += Math.sign(deltaY) * (pers < persTurn ? 1 : ~~Math.sqrt(pers - persTurn + 1))
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
        moveBlock(false)
        break

      case "KeyE":
        moveBlock()
        break

      case "KeyA":
      case "ArrowLeft":
        isRotation ? (state.rotZ -= 90) : state.posX--
        break

      case "KeyD":
      case "ArrowRight":
        isRotation ? (state.rotZ += 90) : state.posX++
        break

      case "KeyW":
      case "ArrowUp":
        isRotation ? (state.rotX += 90) : state.posY--
        break

      case "KeyS":
      case "ArrowDown":
        isRotation ? (state.rotX -= 90) : state.posY++
        break

      default:
        return false
    }
    return true
  })
}
