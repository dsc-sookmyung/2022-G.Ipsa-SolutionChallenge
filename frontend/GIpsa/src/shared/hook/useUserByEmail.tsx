import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { User } from 'shared/types';
import { API_ENDPOINT } from 'shared/constants/env';
interface Response {
  userByEmail: User[];
  loading: boolean;
  error?: Error;
}

const useUserByEmail = (keyword: string): Response => {
  const [userByEmail, setuserByEmail] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    const getUserByEmail = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get(
          API_ENDPOINT + `/user?email=${keyword}`
        );
        setuserByEmail(response.data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    getUserByEmail();
  }, []);

  return { userByEmail, loading, error };
};

export default useUserByEmail;
