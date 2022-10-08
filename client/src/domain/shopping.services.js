import { BASE_URL, headers } from 'src/infrastructure/shared/config/config';


export const getShoppingCard = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}${'/cart/products'}`, {
    method: 'GET',
    headers: {
      ...headers,
      'auth-token': token
    }
  });
  const data = await res.json();
  return data;
};
