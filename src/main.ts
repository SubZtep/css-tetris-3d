import * as css from "./lib/css"
import * as layout from "./layout"
import * as game from "./game"

window.addEventListener("load", () => {
  const container = document.querySelector<HTMLElement>(".container")

  css.initProps(container)(layout.defaultCSSProps())
  game.resetState()

  layout.handleWindowResize(container)
  layout.handlePerspectiveMutates(container)
  layout.handleGameInput()
})
