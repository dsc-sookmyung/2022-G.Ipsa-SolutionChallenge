import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';
import api from 'shared/utils/api';

export function useLiked(keyword: string) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative(`/like/${keyword}`, api.client.get);
  const loading = fetchingData === undefined;
  const likeData = fetchingData?.data;

  return { likeData, loading, error, mutate };
}
