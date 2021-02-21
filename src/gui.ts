import * as dat from "dat.gui"
import * as game from "./game"
import * as layout from "./layout"

let gui: dat.GUI

export const initGUI = (): void => {
  gui = new dat.GUI()

  const d = gui.addFolder("Dimensions")
  d.add(game.dimensions, "cols").min(4).step(1).listen()
  d.add(game.dimensions, "rows").min(4).step(1).listen()
  d.add(game.dimensions, "floors").min(4).step(1).listen()
  d.open()

  const l = gui.addFolder("Layout")
  l.add(layout.view, "edge").min(1).listen()
  l.add(layout.view, "perspective").min(0).listen()
  l.open()

  const s = gui.addFolder("State")
  s.add(game.state, "currentFloor").step(1).listen()
  s.add(game.state, "block").options(Object.keys(game.blocks)).listen()
  s.add(game.state, "posX").step(1).listen()
  s.add(game.state, "posY").step(1).listen()
  s.add(game.state, "rotX").step(1).listen()
  s.add(game.state, "rotZ").step(1).listen()
  s.open()
}
