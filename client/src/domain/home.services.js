import { BASE_URL, headers } from 'src/infrastructure/shared/config/config';


export const getDashobardInfo = async () => {
  const token = localStorage.getItem('token');
  const uri = '/home/dashboard';
  const res = await fetch(`${BASE_URL}${uri}`, {
    method: 'GET',
    headers: {
      ...headers,
      'auth-token': token
    }
  });
  const data = await res.json();
  return data;
};
