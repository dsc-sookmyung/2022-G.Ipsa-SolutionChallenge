import useSWRNative from '@nandorojo/swr-react-native';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { User } from 'shared/types';
import api from 'shared/utils/api';

export function useisUser(user: User | undefined) {
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (user != undefined) {
      setIsUser(true);
    }
  });

  return { isUser };
}
