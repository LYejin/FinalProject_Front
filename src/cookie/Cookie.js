import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setAccessToken = accessToken => {
  return cookies.set('accessToken', accessToken, {
    httpOnly: false,
    sameSite: 'strict', // CSRF를 방지
    path: '/',
  });
};

export const getAccessToken = () => {
  return cookies.get('accessToken');
};

export const removeAccessToken = () => {
  return cookies.remove('accessToken', { sameSite: 'strict', path: '/' });
};
