type Pipeline = {
  [EventType in keyof DocumentEventMap]?: ((ev: DocumentEventMap[EventType]) => boolean | void)[]
}

export const pipeline = new Proxy({} as Pipeline, {
  get(target, p) {
    if (!Reflect.has(target, p)) {
      target[p] = []
      listen(p as keyof Pipeline)
    }
    return target[p]
  },
})

const passiveEventListeners: (keyof Pipeline)[] = ["wheel"]

//TODO: manage filters somehow
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
