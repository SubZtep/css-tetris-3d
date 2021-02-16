export const pipeline: Pipeline = {
  mousemove: [],
  keydown: [],
  wheel: [],
}

const passiveEventListeners: (keyof Pipeline)[] = ["wheel"]

const listen = (event: keyof Pipeline) => {
  document.addEventListener(event, ev => {
    for (const pipe of pipeline[event]) {
      Reflect.apply(pipe, undefined, [ev]) &&
        !passiveEventListeners.includes(event) &&
        Reflect.has(ev, "preventDefault") &&
        ev.preventDefault()
    }
  })
}

export const listenInputs = (): void => Reflect.ownKeys(pipeline).forEach(listen)
