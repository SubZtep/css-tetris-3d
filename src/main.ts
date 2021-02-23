import * as css from "./lib/css"
import * as layout from "./layout"
import * as board from "./board"
import * as input from "./input"
import * as game from "./game"
import * as gui from "./gui"

window.addEventListener("load", () => {
  const container = document.querySelector<HTMLElement>(".container")

  css.setPropsContainer(container.style)
  css.setProps(layout.defaultCSSProps(), true)
  layout.setContainer(container)
  layout.handleResize()

  input.pipeInputControls()
  board.initBoard()
  game.resetTetromino()
  gui.initGUI()
})
