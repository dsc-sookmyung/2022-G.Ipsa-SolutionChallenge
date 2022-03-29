import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';

import api from 'shared/utils/api';

export function useStoryCount(keyword?: number) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative(`/story/cnt?creatorId=${keyword}`, api.client.get);

  const loading = fetchingData === undefined;
  const storycount = fetchingData?.data;

  return { storycount, loading, error, mutate };
}
