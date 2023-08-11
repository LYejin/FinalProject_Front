import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../pages/login/LoginForm';
import Todo from '../pages/Todo/Todo';
import RegisterForm from '../pages/login/RegisterForm';
import LoginHookForm from '../pages/login/LoginHookForm';
import { URL } from '../constants/router';

const Routers = () => {
  return (
    <Routes>
      <Route path={URL.home} element={<LoginHookForm />} />
      <Route path={URL.main} element={<Todo />} />
      <Route path={URL.register} element={<RegisterForm />} />
    </Routes>
  );
};

export default Routers;
