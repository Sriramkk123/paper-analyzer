import { builder } from '@netlify/functions'
import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda'
import { appRouter } from '../../server/trpc'

const trpcHandler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: () => ({}),
})

// Netlify On-Demand Builder handler
const netlifyBuilderHandler = async (event: any, context: any) => {
  if (!event.requestContext) {
    event.requestContext = {
      domainName: event.headers.host || 'localhost',
      http: {
        method: event.httpMethod,
        path: event.rawUrl || event.path,
        protocol: 'HTTP/1.1',
      },
    }
  }
  return trpcHandler(event, context)
}

export const handler = builder(netlifyBuilderHandler)
