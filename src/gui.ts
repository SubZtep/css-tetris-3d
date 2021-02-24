import * as dat from "dat.gui"
import { state } from "./state"
import { view } from "./layout"
import { dimensions } from "./board"
import { tetrominos } from "./tetromino"

let gui: dat.GUI

export const initGUI = (): void => {
  gui = new dat.GUI()
  gui.close()

  const d = gui.addFolder("Dimensions")
  d.add(dimensions, "cols").min(4).max(50).step(1).listen()
  d.add(dimensions, "rows").min(4).max(50).step(1).listen()
  d.add(dimensions, "floors").min(4).max(50).step(1).listen()
  d.open()

  const l = gui.addFolder("Layout")
  l.add(view, "edge").min(1).step(1).listen()
  l.add(view, "perspective").min(0).step(1).listen()
  l.open()

  const s = gui.addFolder("State")
  s.add(state, "live").listen()
  s.add(state, "screwAxisX").listen()
  s.add(state, "tetromino").options(Object.keys(tetrominos)).listen()
  s.add(state, "posX").step(1).listen()
  s.add(state, "posY").step(1).listen()
  s.add(state, "posZ").step(1).listen()
  s.add(state, "rotX").step(1).listen()
  s.add(state, "rotZ").step(1).listen()
  s.open()
}
