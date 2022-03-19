import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';

import api from 'shared/utils/api';

export function useFollowers(keyword?: string) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative(`/follow?followerId=${keyword}`, api.client.get);

  const loading = fetchingData === undefined;
  const followers = fetchingData?.data;

  return { followers, loading, error, mutate };
}
