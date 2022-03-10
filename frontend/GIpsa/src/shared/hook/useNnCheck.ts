import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';
import api from 'shared/utils/api';

export function useNnCheck(keyword: string) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative<{ data: number }>(
    `/user/nicknameCheck?nickname=${qs.stringify(keyword)}`,
    api.client.get
  );
  const loading = fetchingData === undefined;
  const nicknameCheck = fetchingData?.data;

  return { nicknameCheck, loading, error, mutate };
}
