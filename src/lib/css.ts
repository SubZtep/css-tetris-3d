/* eslint-disable @typescript-eslint/ban-ts-comment */
let ticking = false
const tempProps = new Map<string, string>()
let propsContainer: CSSStyleDeclaration

const mutateProps = () => {
  ticking = false
  for (const [property, value] of tempProps.entries()) {
    propsContainer.setProperty(`--${property}`, value)
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

export const setProps = (properties: { [property: string]: string }, immediate = false): void => {
  if (immediate) {
    for (const [property, value] of Object.entries(properties)) {
      propsContainer.setProperty(`--${property}`, value)
    }
    return
  }

  for (const [property, value] of Object.entries(properties)) {
    tempProps.set(property, value)
  }
  requestTick()
}

export const getProp = <T = string>(property: string, parser?: (value: string) => T): T => {
  const prop = propsContainer.getPropertyValue(`--${property}`)
  // @ts-ignore
  return parser === undefined ? prop : parser(prop)
}

export const setPropsContainer = (container: CSSStyleDeclaration) => {
  propsContainer = container
}
