// fetch
// dares

import {logger} from '../utils';
import securedFetch from './privateFetch';
import i18n from '../i18n';
import Snackbar from 'react-native-snackbar';
import {IDare, Lang, Maybe} from '../types';
const BASE = '/dares';

export const fetchDare = async (
  alreadyFetched: string[] = [],
  language: Lang = 'en',
): Promise<Maybe<IDare>> => {
  try {
    const dare = await securedFetch<IDare>(`${BASE}/fetch`, 'POST', {
      alreadyFetched,
      language,
    });
    return dare;
  } catch (err) {
    logger.error(err);
    if (err.error) {
      Snackbar.show({
        text: i18n.t('outOfDares'),
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    return null;
  }
};
