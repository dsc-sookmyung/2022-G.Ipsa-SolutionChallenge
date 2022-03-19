import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';

import api from 'shared/utils/api';

export function useLikedStories(keyword?: string) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative(`like/story?userId=${keyword}`, api.client.get);

  const loading = fetchingData === undefined;
  const stories = fetchingData?.data;

  return { stories, loading, error, mutate };
}
