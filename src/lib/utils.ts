export const calcPercent = (whole: number, amount: number): number => (amount / whole) * 100

export const getRandomItem = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)]

export const rotate2d = (matrix: number[][]) => matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())
