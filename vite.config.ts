import { defineConfig } from "vite"
import pugPlugin from "vite-plugin-pug"

export default defineConfig({
  plugins: [pugPlugin({ pretty: process.env.NODE_ENV !== "production" })],
  base: "./"
})
