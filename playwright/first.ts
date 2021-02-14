/* eslint-disable @typescript-eslint/no-var-requires */
const { chromium } = require("playwright")

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto("https://demo.land/")
  await page.waitForTimeout(1000)
  await page.screenshot({ path: `example.png` })
  await browser.close()
})()
