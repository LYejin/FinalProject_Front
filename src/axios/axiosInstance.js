import axios from 'axios';
import {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
} from '../cookie/Cookie';

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
    Authorization: getAccessToken(),
  },
  cache: 'no-store',
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

axiosInstance.interceptors.response.use(
  response => {
    // accessToken 갱신
    if (response.headers['authorization'] !== undefined) {
      setAccessToken(response.headers['authorization']);
    }
    return response;
  },
  async error => {
    throw error;
  }
);
////////////////////////////////////////////////////////////

//요청 인터셉터
authAxiosInstance.interceptors.request.use(async config => {
  config.headers['Authorization'] = getAccessToken();
  return config;
});

//응답 인터셉터
authAxiosInstance.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const { config } = error;
    if (error.response.status === 403) {
      const originalRequest = config;
      await axiosInstance('/account/user/token/getAccessToken')
        .then(response => {
          console.log('ㅇㅇㅇㅇ', response);
          originalRequest.headers.Authorization =
            response.headers['authorization'];
          setAccessToken(response.headers['authorization']);
        })
        .catch(async err => {
          if (
            err.response.data.status === 40300 &&
            err.response.data.message === 'RefreshToken 만료'
          ) {
            removeAccessToken();
            window.location.href = '/';
            alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요.');
          }
        });
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

//////////////////////////////////////////////////////////

//요청 인터셉터
imageAxiosInstance.interceptors.requestuse(async config => {
  config.headers['Authorization'] = getAccessToken();
  return config;
});

//응답 인터셉터
imageAxiosInstance.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const { config } = error;
    if (error.response.status === 403) {
      const originalRequest = config;
      await axiosInstance('/account/user/token/getAccessToken')
        .then(response => {
          console.log('ㅇㅇㅇㅇ', response);
          originalRequest.headers.Authorization =
            response.headers['authorization'];
          setAccessToken(response.headers['authorization']);
        })
        .catch(async err => {
          if (
            err.response.data.status === 40300 &&
            err.response.data.message === 'RefreshToken 만료'
          ) {
            removeAccessToken();
            window.location.href = '/';
            alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요.');
          }
        });
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
