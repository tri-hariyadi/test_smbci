import Axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import type { IApi, IApiRequestParams } from 'lib/api/types';

class Api {
  // private BASE_URL = 'https://authentic-fulfillment-production.up.railway.app/api/v1';
  private BASE_URL = 'http://localhost:8080/api/v1';
  private instance = Axios.create({
    timeout: 60000,
    baseURL: this.BASE_URL,
    withCredentials: true
  });

  constructor() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private request = async <T>(config: AxiosRequestConfig, params: IApiRequestParams): Promise<IApi<T>['Response']> => {
    const { isErrorless } = params;

    try {
      const data: AxiosResponse<IApi<T>['Response']> = await this.instance(config);
      return data.data;
    } catch (err) {
      const error = err as AxiosError<IApi['Response'] & T>;
      const data = error?.response?.data;

      if (!isErrorless && (error?.code === 'ECONNABORTED' || error?.code === 'ERR_NETWORK')) {
        window.location.replace('/service-unavailable');
      }
      if (!isErrorless && data?.message) toast?.error?.(data.message);
      return {
        message: data?.message || '',
        status: data?.status || false
      };
    }
  };

  private get = async <T>(params: IApiRequestParams, config?: AxiosRequestConfig) => {
    const { url, payload } = params;
    const configuration: AxiosRequestConfig = {
      ...config,
      method: 'get',
      url,
      params: payload || undefined
    };

    return this.request<T>(configuration, params);
  };

  private patch = async <T>(params: IApiRequestParams) => {
    const { url, payload, isMultipart } = params;
    const config: AxiosRequestConfig = {
      method: 'patch',
      url,
      data: payload || undefined,
      headers: isMultipart ? { 'Content-Type': 'multipart/form-data' } : undefined
    };

    return this.request<T>(config, params);
  };

  private post = async <T>(params: IApiRequestParams) => {
    const { url, payload, isMultipart } = params;
    const config: AxiosRequestConfig = {
      method: 'post',
      url,
      data: payload || undefined,
      headers: isMultipart ? { 'Content-Type': 'multipart/form-data' } : undefined
    };

    return this.request<T>(config, params);
  };

  register = (payload: IApi['RegisterRequest']) =>
    this.post<IApi['AuthResponse']>({
      url: '/users/register',
      payload
    });

  login = (payload: IApi['LoginRequest']) =>
    this.post<IApi['AuthResponse']>({
      url: '/users/login',
      payload
    });

  logout = () => this.get({ url: '/users/logout' });

  verifyToken = () => this.get<IApi['UserProfile']>({ url: '/users/verify' });

  getBooks = () => this.get<Array<IApi['Books']>>({ url: '/books' });

  getRentBook = (userId: number) => this.get<Array<IApi['RentBook']>>({ url: `/book_rentals/${userId}` });

  rentBook = (payload: IApi['RentBookRequest']) => this.post<IApi>({ url: '/book_rentals', payload });

  returnBook = (id: number, payload: IApi['RentBookRequest']) =>
    this.patch<IApi>({ url: `/book_rentals/${id}`, payload });

  searchBook = (keyword: string) => {
    const params = new URLSearchParams();
    params.set('keyword', keyword);

    return this.get<Array<IApi['Books']>>({ url: `/books/search?${params.toString()}` });
  };
}

export default new Api();
