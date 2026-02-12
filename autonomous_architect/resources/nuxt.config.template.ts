// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 1. Component Strategy (Smart Prefixing)
  // Stops Nuxt from auto-prefixing based on directory structure (e.g. components/Layout/Box.vue -> <LayoutBox>)
  // Allows us to control explicit prefixes where needed (e.g. Shared Components vs Widgets).
  components: {
    dirs: [
      // Primitives: (e.g. components/Primitives/Button.vue -> <[PREFIX_NAME]-button>)
      // NOTE: Replace '[PREFIX_NAME]' with the project-wide prefix (e.g., 'Pls', 'App', 'Base').
      // RULE: MUST be Multi-word to comply with Vue Style Guide (e.g. 'Base', 'App', 'The'). Do NOT use empty string.
      {
        path: '~/components/Primitives',
        prefix: '[PREFIX_NAME]',
        pathPrefix: false,
      },
      // Layout: (e.g. components/Layout/Stack.vue -> <[PREFIX_NAME]-stack>)
      {
        path: '~/components/Layout',
        prefix: '[PREFIX_NAME]',
        pathPrefix: false,
      },
      // Widgets: (e.g. components/Widgets/UserCard.vue -> <[PREFIX_NAME]-user-card>)
      {
        path: '~/components/Widgets',
        prefix: '[PREFIX_NAME]',
        pathPrefix: false,
      },
      // Default: Catch-all for other components
      '~/components',
    ],
  },

  // 2. Strict Aliases
  // Ensures standard imports across the project.
  alias: {
    '@': '~/',
    '@assets': '~/assets',
    '@styles': '~/assets/styles',
    '@types': '~/shared/types',
    '@utils': '~/shared/utils',
    '@api': '~/app/api',
  },

  // 3. Global CSS (Reset + Defaults)
  css: ['~/assets/styles/reset.styl', '~/assets/styles/defaults.styl'],

  // 4. Vite Config (Stylus Abstracts)
  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          // Automatically imports abstracts into every component <style>
          // "additionalData" is the modern Vite equivalent for some preprocessors, but for Stylus in Nuxt,
          // we often use 'imports' array if supported by the specific plugin,
          // OR import manually in a global file if the plugin is strict.
          // CHECK: Nuxt 4 + Vite Stylus plugin behaviors may vary.
          // Safe fallback: usage of @import in style blocks if this fails.
          additionalData: `@import "~/assets/styles/abstracts/index.styl"`,
        },
      },
    },
  },

  // 5. App Head Defaults
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Nuxt App',
    },
  },

  // 6. Modules
  modules: [
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/image',
    '@vueuse/nuxt',
    // '@prisma/nuxt', // Uncomment if DB required
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/html-validator',
  ],

  // 7. Module Configurations
  typescript: {
    strict: true,
    tsConfig: {
      vueCompilerOptions: {
        plugins: ['@vue/language-plugin-pug'],
      },
    },
  },

  fonts: {
    families: [{ name: 'Inter', weights: [300, 400, 600] }],
  },

  pinia: {
    storesDirs: ['./app/stores/**'],
  },
});
