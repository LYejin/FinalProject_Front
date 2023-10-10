import React, { useEffect, useState } from 'react';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';

const Sidebar = () => {
  const mainMenu = localStorage.getItem('menu');
  const menu = localStorage.getItem('menuDetailSystem');
  const [clickMenu, setClickMenu] = useState('');

  useEffect(() => {
    setClickMenu(localStorage.getItem('menuDetailSystem'));
  }, [clickMenu]);

  const onClickMenu = menu => {
    setClickMenu(menu);
    localStorage.setItem('menuDetailSystem', menu);
  };

  return (
    <div>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                프로세스갤러리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className={`nav-link ${
                  (mainMenu === 'Company' && menu !== 'Employee') ||
                  menu === 'Company' ||
                  menu === 'Workplace'
                    ? 'collapsed'
                    : ''
                }`}
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded={`nav-link ${
                  (mainMenu === 'Company' && menu !== 'Employee') ||
                  menu === 'Company' ||
                  menu === 'Workplace'
                    ? 'true'
                    : 'false'
                }`}
                aria-controls="collapseLayouts"
              >
                조직관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className={`collapse ${
                  (mainMenu === 'Company' && menu !== 'Employee') ||
                  menu === 'Company' ||
                  menu === 'Workplace'
                    ? 'show'
                    : ''
                }`}
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link
                    className={`nav-linkShow ${
                      menu === 'Company' && 'activeMenu'
                    }`}
                    to="/Company"
                    onClick={() => onClickMenu('Company')}
                  >
                    회사관리
                  </Link>
                  <Link
                    className={`nav-linkShow ${
                      menu === 'Workplace' && 'activeMenu'
                    }`}
                    to="/Workplace"
                    onClick={() => onClickMenu('Workplace')}
                  >
                    사업장관리
                  </Link>
                  <Link
                    className={`nav-linkShow ${
                      menu === 'Department' && 'activeMenu'
                    }`}
                    to="/Department"
                    onClick={() => onClickMenu('Department')}
                  >
                    부서관리
                  </Link>
                </nav>
              </div>
              <div
                className={`nav-link ${menu === 'Employee' ? 'collapsed' : ''}`}
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded={`nav-link ${
                  menu === 'Employee' ? 'true' : 'false'
                }`}
                aria-controls="collapsePages"
              >
                사원관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className={`collapse ${menu === 'Employee' ? 'show' : ''}`}
                id="collapsePages"
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
              >
                <nav
                  className="sb-sidenav-menu-nested nav accordion"
                  id="sidenavAccordionPages"
                >
                  <Link
                    className={`nav-linkShow ${
                      menu === 'Employee' && 'activeMenu'
                    }`}
                    to="/Employee"
                    onClick={() => onClickMenu('Employee')}
                  >
                    상용직관리
                  </Link>
                </nav>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                권한관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                일반설정
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                포털설정
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                알림설정
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                항목관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                시스템통계
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                보안관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                연동설정
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                Biz사용자 관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
