import { BASE_URL, headers } from 'src/infrastructure/shared/config/config';

export const signinService = async ({ email = '', password = '' }) => {
  const res = await fetch(`${BASE_URL}/user/singin`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await res.json();
  if (data?.token) localStorage.setItem('token', data.token);
  let operations = {};
  data?.token ? (operations.auth = true) : (operations = data);
  return operations;
};

export const signupService = async ({ email = '', password = '', name = '' }) => {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name,
      email,
      password
    })
  });
  const data = await res.json();
  let operations = {};
  data?.errors ? (operations.error = data.errors[0].code) : (operations.register = true);
  return operations;
};

export const checkoutServices = async () => {
  const token = localStorage.getItem('token');
  const uri = '/user/check';
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
