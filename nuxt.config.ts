import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  // Keep pages/, components/, layouts/ at project root (alongside app/)
  srcDir: '.',
  devtools: { enabled: false },

  modules: ['@nuxt/eslint', 'shadcn-nuxt', '@pinia/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt'],

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },

  vite: {
    plugins: [tailwindcss()],
  },

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
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],
    defaultLocale: 'ru',
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    vueI18n: 'i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'ru',
      redirectOn: 'root',
    },
  },

  css: ['~/assets/css/tailwind.css', '~/assets/scss/main.scss'],

  runtimeConfig: {
    // Server-side (Docker network): http://backend:3001/api
    apiUrl:
      process.env.NUXT_API_URL || process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    public: {
      // Browser: http://localhost:3001/api
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      socketUrl: process.env.NUXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },

  app: {
    head: {
      title: 'coffee cherry',
      titleTemplate: '%s',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '5 сортов. 5 историй. 1 coffee cherry. Премиальный specialty-кофе с ограниченным ассортиментом.',
        },
        { name: 'author', content: 'coffee cherry' },
        { name: 'application-name', content: 'coffee cherry' },
        { name: 'robots', content: 'index, follow' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:site_name', content: 'coffee cherry' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:locale:alternate', content: 'en_US' },
        {
          property: 'og:image',
          content: '/images/og-default.svg',
        },
        {
          property: 'og:image:alt',
          content: 'coffee cherry — specialty coffee',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/images/og-default.svg' },
        { name: 'theme-color', content: '#0E0C0A' },
        { name: 'msapplication-TileColor', content: '#0E0C0A' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.svg' },
        { rel: 'manifest', href: '/site.webmanifest' },
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
