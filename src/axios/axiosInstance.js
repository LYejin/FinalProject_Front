import axios from 'axios';
import {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
} from '../cookie/Cookie';

console.log('인스턴스 토큰:', getAccessToken());
const accesstoken = getAccessToken();

const baseConfig = {
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const authConfig = {
  baseURL: '',
  // timeout: 1000, 요청 최대 대기 시간
  headers: {
    Authorization: accesstoken,
  },
  withCredentials: true,
};

const imageConfig = {
  baseURL: '',
  headers: {
    Authorization: accesstoken,
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
};

// 기본적으로 사용되는 axios instance
export const axiosInstance = axios.create(baseConfig);

//token 인증이 필요한 instance
export const authAxiosInstance = axios.create(authConfig);

// image 요청시 사용되는 instance
export const imageAxiosInstance = axios.create(imageConfig);

//요청 인터셉터
// axiosInstance.interceptors.request.use(
//   (config) => {
//     //요청 보내기 전에 수행 로직
//     return config;
//   },
//   (err) => {
//     //요청 에러 시 수행 로직
//     return Promise.reject(err);
//   }
// );

// authAxiosInstance.interceptors.request.use((config) => {
//   config.defaults.headers.common['Authorization'] = accesstoken;
//   return config;
// });

//응답 인터셉터
authAxiosInstance.interceptors.response.use(
  response => {
    console.log('타ㅁ탐', response.headers['authorization']);
    // accessToken 갱신
    if (response.headers['authorization'] !== undefined) {
      setAccessToken(response.headers['authorization']);
    }
    return response;
  },
  async error => {
    console.log('에러 발생:', error);
    console.log('error.response.status', error.response.status);
    if (error.response.status === 403) {
      removeAccessToken();
      window.location.href = '/';
      alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요.');
    }

    throw error;
  }
);
