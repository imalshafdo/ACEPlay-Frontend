export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'ACEPlay',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'ACEPlay casino hub' },
      ],
    },
  },
})

