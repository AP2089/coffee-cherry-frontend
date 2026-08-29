// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  // Keep pages/, components/, layouts/ at project root (alongside app/)
  srcDir: '.',
  devtools: { enabled: false },

  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n'],

  eslint: {
    config: {
      stylistic: false,
    },
  },

  i18n: {
    locales: [
      {
        code: 'ru',
        language: 'ru-RU',
        name: 'Русский',
        file: 'ru.json',
      },
    ],
    defaultLocale: 'ru',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    vueI18n: 'i18n.config.ts',
    detectBrowserLanguage: false,
  },

  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    // Server-side (Docker network): http://backend:3001/api
    apiUrl:
      process.env.NUXT_API_URL || process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    public: {
      // Browser: http://localhost:3001/api
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'coffee cherry',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Премиальный особенный кофе с ограниченным ассортиментом.',
        },
        { property: 'og:site_name', content: 'coffee cherry' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#0E0C0A' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Syne:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
})
