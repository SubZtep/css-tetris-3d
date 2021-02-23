import * as css from "./lib/css"
import * as layout from "./layout"
import * as game from "./game"
import * as gui from "./gui"

window.addEventListener("load", () => {
  const container = document.querySelector<HTMLElement>(".container")

  layout.setContainer(container)
  css.initProps(container)(layout.defaultCSSProps())

  layout.handleResize()
  layout.pipeInputControls()

  game.resetTetromino()
  game.initBoard()
  gui.initGUI()
})
