import React from 'react';
import { Header, MainSidebar, Sidebar } from './Index';

const CommonLayout = ({ children }) => {
  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
      {children}
    </div>
  );
};

export default CommonLayout;
