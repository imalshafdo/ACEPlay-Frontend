import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  // Override globalThis.$fetch on the server side to intercept SSR fetches
  const originalFetch = globalThis.$fetch
  if (originalFetch) {
    globalThis.$fetch = (request, opts) => {
      if (typeof request === 'string' && request.startsWith('https://aceplay-admin-backend-production-1c28.up.railway.app')) {
        // Rewrite localhost:5000 requests to the docker backend container name
        const internalUrl = process.env.BACKEND_INTERNAL_URL || 'https://aceplay-admin-backend-production-1c28.up.railway.app'
        request = request.replace('https://aceplay-admin-backend-production-1c28.up.railway.app', internalUrl)
      }
      return originalFetch(request, opts)
    }
  }
})
