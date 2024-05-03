// import defineI18nConfig from "@nuxtjs/i18n"
import enLocale from "./locales/en.json";
import idLocale from "./locales/id.json";

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: enLocale,
        id: idLocale
    }
  }))