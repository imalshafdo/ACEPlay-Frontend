import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  // Override globalThis.$fetch on the server side to intercept SSR fetches
  const originalFetch = globalThis.$fetch
  if (originalFetch) {
    globalThis.$fetch = (request, opts) => {
      if (typeof request === 'string' && request.startsWith('aceplay-admin-backend-production-1c28.up.railway.appapi')) {
        // Rewrite localhost:5000 requests to the docker backend container name
        const internalUrl = process.env.BACKEND_INTERNAL_URL || 'aceplay-admin-backend-production-1c28.up.railway.appapi'
        request = request.replace('aceplay-admin-backend-production-1c28.up.railway.appapi', internalUrl)
      }
      return originalFetch(request, opts)
    }
  }
})
