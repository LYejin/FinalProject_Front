import React from 'react';
import { Header, MainSidebar, Sidebar } from './Index';
import Sidebar2 from './sidebar/Sidebar2';

const CommonLayout2 = ({ children }) => {
  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar2 />
      {children}
    </div>
  );
};

export default CommonLayout2;
