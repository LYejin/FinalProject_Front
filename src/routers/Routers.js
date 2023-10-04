import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import FixedFundPage from '../pages/amaranth10/FixedFundPage';

import CompanyChangeHistory from '../components/feature/amaranth/company/CompanyChangeHistory';
import FundTypePage from '../pages/amaranth10/FundTypePage';
import Login from '../pages/login/Login';

const Routers = () => {
  return (
    <Routes>
      <Route path={URL.home} element={<Login />} />
      <Route path={URL.register} element={<RegisterForm />} />
      <Route path={URL.company} element={<CompanyPage />} />
      <Route path={URL.employee} element={<EmployeePage />} />
      <Route path={URL.workplace} element={<WorkplacePage />} />
      <Route path={URL.FundTypeSetting} element={<FundTypePage />} />
      <Route path={URL.FixedCapitalRegistration} element={<FtradePage />} />
      <Route path={URL.GeneralVendorRegistration} element={<GtradePage />} />
      <Route path={URL.Department} element={<DepartmentPage />} />
      <Route path={URL.FixedFund} element={<FixedFundPage />} />
    </Routes>
  );
};

export default Routers;
