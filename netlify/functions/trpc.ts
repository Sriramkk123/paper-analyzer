import { appRouter } from '../../server/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

export default async (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })
}
