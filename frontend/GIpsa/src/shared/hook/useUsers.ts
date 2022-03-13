import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';
import { User } from 'shared/types';
import api from 'shared/utils/api';

export function useUsers(keyword?: string) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative<{ data: User[] }>(
    `/user/${qs.stringify(keyword)}`,
    api.client.get
  );
  const loading = fetchingData === undefined;
  const users = fetchingData?.data;

  return { users, loading, error, mutate };
}
