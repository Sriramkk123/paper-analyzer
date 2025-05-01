import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda'
import { appRouter } from '../../server/trpc'

const trpcHandler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: () => ({}),
})

export const handler = async (event: any, context: any): Promise<any> => {
  if (!(event as any).requestContext) {
    (event as any).requestContext = {
      domainName: event.headers.host || 'localhost',
      http: {
        method: event.httpMethod,
        path: event.path,
        protocol: 'HTTP/1.1',
      },
    }
  }
  return trpcHandler(event, context)
}
