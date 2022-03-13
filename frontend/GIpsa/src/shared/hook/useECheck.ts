import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';
import api from 'shared/utils/api';

export function useECheck(keyword: string) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative<{ data: number }>(
    `/user/emailCheck?email=${qs.stringify(keyword)}`,
    api.client.get
  );
  const loading = fetchingData === undefined;
  const emailCheck = fetchingData?.data;

  return { emailCheck, loading, error, mutate };
}
