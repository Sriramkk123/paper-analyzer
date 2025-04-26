import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import dotenv from 'dotenv'
import { appRouter } from './trpc'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`tRPC server listening on http://localhost:${port}/trpc`)
})
