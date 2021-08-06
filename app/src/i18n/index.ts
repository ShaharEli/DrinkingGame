import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import en from './locales/en';
import he from './locales/he';
import {Lang} from '../types';
import I18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import {getAppLanguage, setAppLanguage} from '../utils/storage';
import {editUser} from '../api';

I18n.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      he,
    },
    lng: getLocales()[0].languageCode,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export const switchLanguage = async (lang: Lang): Promise<void> => {
  const currentLang = I18n.language;
  if (lang === currentLang) return;
  await editUser({language: lang});
  I18n.changeLanguage(lang);
  const isRtl = lang === 'he';
  I18nManager.forceRTL(isRtl);
  I18nManager.allowRTL(isRtl);
  await setAppLanguage(lang);
  if (isRtl !== I18nManager.isRTL) {
    RNRestart.Restart();
  }
};
(async () => {
  const prevLang: Lang = await getAppLanguage();
  await switchLanguage(prevLang);
})();

export default I18n;
