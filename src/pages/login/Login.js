import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { setAccessToken } from '../../cookie/Cookie';
import { axiosInstance } from '../../axios/axiosInstance';
import Swal from 'sweetalert2';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async data => {
    await axiosInstance
      .post(
        '/login',
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: { 'Content-type': 'application/json' },
        }
      )
      .then(async res => {
        if (res.headers['authorization'] != null) {
          setAccessToken(res.headers['authorization']);
        }
        await axiosInstance('common/page/mainSidebarList').then(res => {
          localStorage.setItem('mainSidebar', JSON.stringify(res.data));
        });
        localStorage.setItem('menu', 'Company');
        navigate('/Employee');
      })
      .catch(err => {
        try {
          Swal.fire({
            icon: 'error',
            text: '아이디 혹은 패스워드를 잘못 입력하셨습니다.',
            confirmButtonColor: '#1673c9',
          });
        } catch (e) {
          console.log(e);
        }
      });
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form
            className="login100-form validate-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="login100-Wrapper">
              <img
                className="loginLogo"
                src={`${process.env.PUBLIC_URL}/image/amaranth10Logo.png`}
                alt="아마란스로고"
              />
              <span className="login100-form-title p-b-43">로그인</span>
              <div className="wrap-input100 validate-input">
                <input
                  className="input100 has-val loginInput"
                  type="text"
                  name="username"
                  {...register('username')}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">ID</span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100 has-val loginInput"
                  type="password"
                  name="password"
                  {...register('password')}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Password</span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Login</button>
              </div>
            </div>
          </form>

          <img
            className="login100-more"
            src={`${process.env.PUBLIC_URL}/image/douzoneImage3.jpg`}
            alt="더존비즈온회사이미지"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
