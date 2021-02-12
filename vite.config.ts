import { defineConfig } from "vite"
import { compileFile } from "pug"

export default defineConfig({
  plugins: [
    {
      handleHotUpdate({ file, server }) {
        if (file.slice(-4) === ".pug") {
          server.ws.send({
            type: "full-reload",
          })
        }
      },
      name: "PrePug",
      transformIndexHtml: {
        enforce: "pre",
        transform(html) {
          return html.replace(/<pug>(.*?)<\/pug>/, (_, pugFileName) => {
            const compiler = compileFile(`${pugFileName}.pug`)
            return compiler()
          })
        },
      },
    },
  ],
})
