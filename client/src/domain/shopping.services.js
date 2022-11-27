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


export const addToCarManga = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: 'PUT',
    headers: {
      ...headers,
      'auth-token': token
    },
    body: JSON.stringify({
      productId: id
    })
  });
  const data = await res.json();
  return data;
};


export const removeToCarManga = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/cart/remove`, {
    method: 'PUT',
    headers: {
      ...headers,
      'auth-token': token
    },
    body: JSON.stringify({
      productId: id
    })
  });
  const data = await res.json();
  return data;
};


export const buyServices = async (products) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/card/buy`, {
    method: 'POST',
    headers: {
      ...headers,
      'auth-token': token
    },
    body: JSON.stringify({
      products: products
    })
  });
  const data = await res.json();
  return data;
};
