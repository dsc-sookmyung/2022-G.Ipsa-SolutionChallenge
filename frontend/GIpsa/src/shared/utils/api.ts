import axios, { AxiosError, AxiosInstance } from 'axios';

import { API_ENDPOINT } from 'shared/constants/env';

class Api {
  public client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: API_ENDPOINT });
  }
}

const api = new Api();

export default api;
