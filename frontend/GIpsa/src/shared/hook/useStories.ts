import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';
import { Story } from 'shared/types';

import api from 'shared/utils/api';

export function useStories(keyword?: string) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative<{ data: Story[] }>(
    `/story?${qs.stringify({ keyword })}`,
    api.client.get
  );
  console.log(keyword);
  const loading = fetchingData === undefined;
  const stories = fetchingData?.data;

  return { stories, loading, error, mutate };
}
