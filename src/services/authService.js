import apiClient from './apiClient';

export const login = async (login, password) => {
  const data = await apiClient('/account/login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  });
  return data; 
};

export const getUserInfo = async () => {
  const data = await apiClient('/account/info');
  return data; 
};
