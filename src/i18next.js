import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./locails/uz.json";
import en from "./locails/en.json";
import ru from "./locails/ru.json";

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  uz: {
    translation: uz,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz",
});

export default i18n;
