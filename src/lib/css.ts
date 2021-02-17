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

export const setProp = (property: string, value: string | number): void => {
  tempProps.set(property, String(value) )
  requestTick()
}

export const getProp = <T = string>(property: string, parser?: (value: string) => T): T => {
  const prop = styleContainer.getPropertyValue(`--${property}`)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return parser === undefined ? prop : parser(prop)
}

const setProps = (vars: { [property: string]: string }): void => {
  for (const [property, value] of Object.entries(vars)) {
    styleContainer.setProperty(`--${property}`, value)
  }
}

export const initProps = (container: HTMLElement): typeof setProps => {
  styleContainer = container.style
  return setProps
}
