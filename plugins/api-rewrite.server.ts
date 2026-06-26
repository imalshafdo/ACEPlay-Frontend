import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  // Override globalThis.$fetch on the server side to intercept SSR fetches
  const originalFetch = globalThis.$fetch
  if (originalFetch) {
    globalThis.$fetch = (request, opts) => {
      if (typeof request === 'string' && request.startsWith('http://localhost:5000')) {
        // Rewrite localhost:5000 requests to the docker backend container name
        const internalUrl = process.env.BACKEND_INTERNAL_URL || 'http://backend:5000'
        request = request.replace('http://localhost:5000', internalUrl)
      }
      return originalFetch(request, opts)
    }
  }
})
