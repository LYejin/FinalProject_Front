import React, { useState } from 'react';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log('submit');
    e.preventDefault();
    await axios
      .post(
        '/api/v1/join',
        {
          user_id: formData.userId,
          name: formData.name,
          password: formData.password,
        },
        {
          headers: { 'Content-type': 'application/json' },
        },
      )
      .then((res) => navigate('/'));
  };

  return (
    <>
      <div className="text-center">
        {/* html 전체 영역을 지정하는 container */}
        <div id="container">
          {/* login 폼 영역을 : loginBox */}
          <div id="loginBox">
            {/* 로그인 페이지 타이틀 */}
            <div id="loginBoxTitle">회원가입</div>
            <form onSubmit={handleSubmit}>
              {/* 아이디, 비번, 버튼 박스 */}
              <div id="inputBox">
                <div className="input-form-box">
                  <span>아이디 </span>
                  <input
                    type="text"
                    name="userId"
                    placeholder="userId"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-form-box">
                  <span>비밀번호 </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-form-box">
                  <span>비밀번호확인 </span>
                  <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="passwordConfirm"
                    className="form-control"
                  />
                </div>
                <div className="input-form-box">
                  <span>이름</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="button-login-box">
                  <Link to="/">
                    <button
                      type="button"
                      className="btn btn-primary btn-xs"
                      style={{ width: '100%' }}
                    >
                      취소
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary btn-xs"
                    style={{ width: '50%' }}
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
