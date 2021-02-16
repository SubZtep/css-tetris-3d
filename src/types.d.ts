type LevelSide = "back" | "right" | "left" | "top" | "bottom"

type Pipeline = {
  [EventType in keyof DocumentEventMap]?: ((ev: DocumentEventMap[EventType]) => boolean | void)[]
}
