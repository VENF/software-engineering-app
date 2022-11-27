import { BASE_URL, headers } from 'src/infrastructure/shared/config/config';

export const getCreditCart = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}${'/card/user'}`, {
    method: 'GET',
    headers: {
      ...headers,
      'auth-token': token
    }
  });
  const data = await res.json();
  return data;
};

export const getUserById = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}${`/user/${id}`}`, {
      method: 'GET',
      headers: {
        ...headers,
        'auth-token': token
      }
    });
    const data = await res.json();
    return data;
};
  
export const rechargeService = async ({ amount = 0 }) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/card/recharge`, {
    method: 'POST',
    headers: {
      ...headers,
      'auth-token': token
    },
    body: JSON.stringify({
      amount: parseInt(amount)
    })
  });
  const data = await res.json();
  return data;
};