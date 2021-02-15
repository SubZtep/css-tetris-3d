export const calcPercent = (whole: number, amount: number): number => (amount / whole) * 100
export const getRandomItem = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)]
