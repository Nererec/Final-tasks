const BASE_URL = 'https://gateway.scan-interfax.ru/api/v1';

const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('accessToken');
  const tokenExpire = localStorage.getItem('tokenExpire');
  
  if (tokenExpire && new Date(tokenExpire) <= new Date()) {
    throw new Error('Токен истек. Выполните вход заново.');
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), 
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Произошла ошибка');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default apiClient;
