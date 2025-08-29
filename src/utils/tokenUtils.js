export const isTokenValid = () => {
    const expireDate = localStorage.getItem('tokenExpire');
    if (!expireDate) return false;
  
    const now = new Date();
    const tokenExpireDate = new Date(expireDate);
  
    return tokenExpireDate > now;
  };
  