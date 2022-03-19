import useSWRNative from '@nandorojo/swr-react-native';
import { User } from 'shared/types';
import api from 'shared/utils/api';

export function useUsersEmail(keyword?: string) {
  const {
    data: fetchingData,
    error,
    mutate,
  } = useSWRNative<{ data: User[] }>(`/user?email=${keyword}`, api.client.get);
  const loading = fetchingData === undefined;
  const usersEmail = fetchingData?.data;

  return { usersEmail, loading, error, mutate };
}
