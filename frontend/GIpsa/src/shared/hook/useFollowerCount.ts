import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';

import api from 'shared/utils/api';

export function useFollowerCount(keyword?: number) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative(`/follow/cnt?creatorId=${keyword}`, api.client.get);

  const loading = fetchingData === undefined;
  const followercount = fetchingData?.data;

  return { followercount, loading, error, mutate };
}
