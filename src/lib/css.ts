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

export const getProp = (property: string): string => styleContainer.getPropertyValue(`--${property}`)

const setProps = (vars: { [property: string]: string }): void => {
  for (const [property, value] of Object.entries(vars)) {
    styleContainer.setProperty(`--${property}`, value)
  }
}

export const initProps = (container: HTMLElement): typeof setProps => {
  styleContainer = container.style
  return setProps
}
