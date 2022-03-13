import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';

import api from 'shared/utils/api';

export function useStories(keyword?: string) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative(`/story/${keyword}`, api.client.get);

  const loading = fetchingData === undefined;
  const stories = fetchingData?.data;

  return { stories, loading, error, mutate };
}
