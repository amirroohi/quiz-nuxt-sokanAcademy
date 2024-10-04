// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  modules: ['nuxt-icons'],
  app: {
    head: {
        htmlAttrs: { dir: 'rtl', lang: 'fa' },
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
    },
  },
})
