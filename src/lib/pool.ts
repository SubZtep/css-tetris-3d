
// let shadow = document.attachShadow({mode: 'open'});

export const getHTMLElement = (poolClassName: string): HTMLElement => {
  return document.querySelector(`.pool > .${poolClassName}`).cloneNode(true) as HTMLElement
}

export const recallPoolItems = (el: Element): void => {
  while (el.firstChild) {
    el.removeChild(el.lastChild)
  }
}
