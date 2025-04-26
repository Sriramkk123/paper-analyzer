import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../server/trpc'

// Use relative URLs in the browser, absolute URLs on server
function getBaseUrl() {
  if (typeof window !== 'undefined') return ''; // relative path in browser
  return process.env.RAILWAY_PRIVATE_DOMAIN || 'http://localhost:8080';
}

export const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: `${getBaseUrl()}/trpc` })]
})
