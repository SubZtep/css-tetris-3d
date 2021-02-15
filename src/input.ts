export const pipeline: Pipeline = {
  mousemove: [],
  wheel: [],
  keydown: [],
}

const listen = (event: string) => {
  const piper = (ev: UIEvent) => {
    for (const pipe of pipeline[event]) {
      if (pipe(ev) && ev.preventDefault !== undefined) {
        ev.preventDefault()
      }
    }
  }
  document.addEventListener(event, piper)
}

export const listenInputs = (): void => {
  Object.keys(pipeline).forEach(listen)
}
