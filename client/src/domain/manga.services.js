import { BASE_URL, headers } from 'src/infrastructure/shared/config/config';

const formatUri = (title, category) =>
  !category
    ? `/manga/${!title ? 'all' : title}`
    : `/manga/${!title ? 'all' : title}/${category}`;

export const getMangaService = async ({ title = '', category = '' }) => {
  const token = localStorage.getItem('token');
  const uri = formatUri(title, category)
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
