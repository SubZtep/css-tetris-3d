let ticking = false
const tempCSSVars = new Map<string, string>()

const mutateCSSVars = () => {
  ticking = false
  for (const [property, value] of tempCSSVars.entries()) {
    document.documentElement.style.setProperty(`--${property}`, value)
  }
  tempCSSVars.clear()
}

const requestTick = () => {
  if (!ticking) {
    requestAnimationFrame(mutateCSSVars)
  }
  ticking = true
}

export const setCSSVar = (property: string, value: string): void => {
  tempCSSVars.set(property, value)
  requestTick()
}

export const getCSSVar = (property: string): string => document.documentElement.style.getPropertyValue(`--${property}`)
