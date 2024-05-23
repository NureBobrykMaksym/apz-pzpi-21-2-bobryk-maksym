import Cookies from 'js-cookie';
import { apiInstance } from '../libs/axios';
import { ICreateUser, ILoginUser, IUpdateUser } from '../types/userTypes';

export const usersApi = {
  signUp: async (data: ICreateUser) => {
    return await apiInstance.post('/users', data);
  },
  login: async (data: ILoginUser) => {
    return await apiInstance.post('/users/login', data);
  },
  getCurrentUser: async (token: string) => {
    return await apiInstance.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateUser: async (data: IUpdateUser, token: string) => {
    return await apiInstance.put('/user', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  logout: () => {
    return Cookies.remove('token');
  },
};
