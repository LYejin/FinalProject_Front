import React, { useState } from 'react';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const LoginForm = () => {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await axios
      .post(
        '/login',
        {
          username: userId,
          password: password,
        },
        {
          headers: { 'Content-type': 'application/json' },
        }
      )
      .then(res => {
        navigate('/Main');
        console.log(res.headers['authorization']);
      });
  };

  return (
    <div className="text-center">
      {/* html 전체 영역을 지정하는 container */}
      <div id="container">
        {/* login 폼 영역을 : loginBox */}
        <div id="loginBox">
          {/* 로그인 페이지 타이틀 */}
          <div id="loginBoxTitle">로그인</div>
          <form onSubmit={handleSubmit}>
            {/* 아이디, 비번, 버튼 박스 */}
            <div id="inputBox">
              <div className="input-form-box">
                <span>아이디 </span>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  onChange={e => setUserId(e.target.value)}
                />
              </div>
              <div className="input-form-box">
                <span>비밀번호 </span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="button-login-box">
                <button
                  type="submit"
                  className="btn btn-primary btn-xs"
                  style={{ width: '50%' }}
                >
                  로그인
                </button>
                <Link to="/Register">
                  <button
                    type="button"
                    className="btn btn-primary btn-xs"
                    style={{ width: '200%' }}
                  >
                    회원가입
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
