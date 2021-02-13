let ticking = false
const tempCSSVars = new Map<string, string>()

const mutateCSSVars = () => {
  ticking = false
  for (let [propery, value] of tempCSSVars.entries()) {
    document.documentElement.style.setProperty(`--${propery}`, value)
  }
  tempCSSVars.clear()
}

const requestTick = () => {
  if (!ticking) {
    requestAnimationFrame(mutateCSSVars)
  }
  ticking = true
}

export const setCSSVar = (propery: string, value: string) => {
  tempCSSVars.set(propery, value)
  requestTick()
}
