import {useCallback, useEffect, useState} from 'react';
import {fetchDare} from '../api';
import {IDare, Maybe} from '../types';
import {useAppSelector} from './redux';

export const useDares = () => {
  const [loading, setLoading] = useState(true);
  const [dare, setDare] = useState<Maybe<IDare>>(null);
  const [fetchedDares, setFetchedDares] = useState<string[]>([]);
  const [outOfDares, setOutOfDares] = useState(false);
  const {user} = useAppSelector(state => state.user);

  const fetchNewDare = useCallback(async () => {
    setLoading(true);

    const fetchedDare = await fetchDare(fetchedDares, user.language);
    if (fetchedDare) {
      setFetchedDares(prev => [...prev, fetchedDare._id]);
    } else {
      setOutOfDares(true);
    }
    setDare(fetchedDare);
    setLoading(false);
  }, [fetchedDares, user.language]);

  useEffect(() => {
    fetchNewDare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    fetchNewDare,
    dare,
    loadingDare: loading,
    outOfDares,
  };
};
