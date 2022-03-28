import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';

import api from 'shared/utils/api';

export function useLikedStories(keyword?: number) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative(`/like/story?userId=${keyword}`, api.client.get);

  const loading = fetchingData === undefined;
  const likedStories = fetchingData?.data;

  return { likedStories, loading, error, mutate };
}
