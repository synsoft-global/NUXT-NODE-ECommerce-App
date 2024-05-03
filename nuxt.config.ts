// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/app.css"],
  mode: 'spa',
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-server-utils",
    "@vee-validate/nuxt",
    "@samk-dev/nuxt-vcalendar",
    "@nuxtjs/i18n",
    "@nuxt/eslint"
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGODB_URI ?? "",
  },
  nitro: {},
  // Vite configuration
  vite: {
    server: {
      hmr: {
        overlay: false,
      },
    },
  },
  eslint: {
    // options here
  }
});