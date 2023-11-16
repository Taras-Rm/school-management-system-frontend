import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LOCALES } from "./constants";
import { uk } from "./translations/uk";
import { en } from "./translations/en";

const resources = {
  [LOCALES.EN]: {
    translation: en,
  },
  [LOCALES.UK]: {
    translation: uk,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLang: LOCALES.EN,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
