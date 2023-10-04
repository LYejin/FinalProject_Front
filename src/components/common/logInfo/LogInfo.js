import React from 'react';

import { authAxiosInstance } from '../../../axios/axiosInstance';
import { useEffect } from 'react';
import { useState } from 'react';
import './LogInfo.css';
import EventButton from '../button/EventButton';
import { removeAccessToken } from '../../../cookie/Cookie';
import Swal from 'sweetalert2';
import { FaPowerOff } from 'react-icons/fa';
const LogInfo = () => {
  const [logUserInfo, setLogUserInfo] = useState({});
  const loadLogInfo = async () => {
    const response = await authAxiosInstance(
      'system/user/groupManage/employee/loginUserInfo'
    );
    setLogUserInfo(response.data);
    localStorage.setItem('ROLL', response.data.role_NAME);
    console.log('로그인 데이터!!', response.data);
  };

  const logoutBtnClick = async () => {
    Swal.fire({
      icon: 'question',
      title: '로그아웃 하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async result => {
      if (result.isConfirmed) {
        window.location.href = '/';
        try {
          const response = await authAxiosInstance(
            '/account/user/token/logoutRemoveRefreshToken'
          );
          removeAccessToken();
          setLogUserInfo({});
          localStorage.removeItem('ROLL');
        } catch (error) {
          // 오류 처리
          console.error('오류 발생', error);
        }
      }
    });
  };

  React.useEffect(() => {
    const roll = localStorage.getItem('ROLL');
    if (roll !== undefined) {
      setLogUserInfo({});
      loadLogInfo();
    }
  }, []);

  const imageUrl = logUserInfo.pic_FILE_ID
    ? `${logUserInfo.pic_FILE_ID}`
    : `${process.env.PUBLIC_URL}/image/userImage.png`;

  return (
    <>
      <div className="userInfoWrapper">
        <ul className="h-box">
          <li id="userInfoPopupBtn">
            {Object.keys(logUserInfo).length > 0 && loadLogInfo && (
              <div className="user-info">
                <div className="divi_pic">
                  <img
                    src={imageUrl}
                    alt="LogUser Logo"
                    className="logInfoImg"
                  />
                </div>
                <div className="v-box">
                  <div className="name_txt">{logUserInfo?.kor_NM}</div>
                  <div className="divi_txt">
                    {'[' +
                      logUserInfo?.co_NM +
                      ']' +
                      ' ' +
                      logUserInfo?.dept_NM}
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
      {Object.keys(logUserInfo).length > 0 && loadLogInfo && (
        <div onClick={logoutBtnClick} className="event-button-wrapper">
          <FaPowerOff />
        </div>
      )}
    </>
  );
};

export default LogInfo;
