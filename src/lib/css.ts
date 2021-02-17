/* eslint-disable @typescript-eslint/ban-ts-comment */
let ticking = false
const tempProps = new Map<string, string>()
let styleContainer: CSSStyleDeclaration

const mutateProps = () => {
  ticking = false
  for (const [property, value] of tempProps.entries()) {
    styleContainer.setProperty(`--${property}`, value)
  }
  tempProps.clear()
}

const requestTick = () => {
  if (!ticking) {
    requestAnimationFrame(mutateProps)
  }
  ticking = true
}

export const setProp = (property: string, value: string): void => {
  tempProps.set(property, value)
  requestTick()
}

export const setProps = (properties: { [property: string]: string }): void => {
  for (const [property, value] of Object.entries(properties)) {
    tempProps.set(property, value)
  }
  requestTick()
}

export const getProp = <T = string>(property: string, parser?: (value: string) => T): T => {
  const prop = styleContainer.getPropertyValue(`--${property}`)
  // @ts-ignore
  return parser === undefined ? prop : parser(prop)
}

const setPropsImmediate = (properties: { [property: string]: string }): void => {
  for (const [property, value] of Object.entries(properties)) {
    styleContainer.setProperty(`--${property}`, value)
  }
}

export const initProps = (container: HTMLElement): typeof setPropsImmediate => {
  styleContainer = container.style
  return setPropsImmediate
}
