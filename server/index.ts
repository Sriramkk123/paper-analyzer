import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import dotenv from 'dotenv'
import { appRouter } from './trpc.js'
import cors from 'cors'
import path from 'path'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
)

// Serve React static assets
const distPath = path.join(process.cwd(), 'dist')
app.use(express.static(distPath))
// Only fallback for GET requests not starting with /trpc
app.get(/^\/(?!trpc).*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`tRPC server listening on port ${port}`)
})
