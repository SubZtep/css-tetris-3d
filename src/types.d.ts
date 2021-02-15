type LevelSide = "back" | "right" | "left" | "top" | "bottom"

type PipeEventType = "mousemove" | "wheel" | "keydown"

type Pipeline = {
  [EventType in keyof Pick<DocumentEventMap, PipeEventType>]: ((ev: DocumentEventMap[EventType]) => void)[]
}
