import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Todo from '../pages/Todo/Todo';
import RegisterForm from '../pages/login/RegisterForm';
import LoginHookForm from '../pages/login/LoginHookForm';
import { URL } from '../constants/router';
import {
  CompanyPage,
  EmployeePage,
  WorkplacePage,
  DepartmentPage,
} from '../pages/amaranth10/Index.js';
import GtradePage from '../pages/amaranth10/GtradePage';
import FtradePage from '../pages/amaranth10/FtradePage';

import CompanyChangeHistory from '../components/feature/amaranth/company/CompanyChangeHistory';

const Routers = () => {
  return (
    <Routes>
      <Route path={URL.home} element={<LoginHookForm />} />
      <Route path={URL.main} element={<Todo />} />
      <Route path={URL.register} element={<RegisterForm />} />
      <Route path={URL.company} element={<CompanyPage />} />
      <Route path={URL.employee} element={<EmployeePage />} />
      <Route path={URL.workplace} element={<WorkplacePage />} />
      <Route path={URL.CapitalSubjectSetting} element={<GtradePage />} />
      <Route path={URL.FixedCapitalRegistration} element={<FtradePage />} />
      <Route path={URL.GeneralVendorRegistration} element={<EmployeePage />} />
      <Route path={URL.Department} element={<DepartmentPage />} />
    </Routes>
  );
};

export default Routers;
