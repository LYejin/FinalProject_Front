import React, { useEffect, useState } from 'react';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';

const Sidebar2 = () => {
  const mainMenu = localStorage.getItem('menu');
  const menu = localStorage.getItem('menuDetailFund');
  const [clickMenu, setClickMenu] = useState('');

  useEffect(() => {
    setClickMenu(localStorage.getItem('menuDetailFund'));
  }, [clickMenu]);

  const onClickMenu = menu => {
    setClickMenu(menu);
    localStorage.setItem('menuDetailFund', menu);
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
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                지출결의/경비관리
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
                자동전표처리
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
                전표/장부관리
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
                결산/재무제표관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className={`nav-link ${
                  (mainMenu === 'FundTypeSetting' &&
                    menu !== 'GeneralVendorRegistration' &&
                    menu !== 'FixedCapitalRegistration') ||
                  menu === 'FundTypeSetting' ||
                  menu === 'Department'
                    ? 'collapsed'
                    : ''
                }`}
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded={`nav-link ${
                  (mainMenu === 'FundTypeSetting' &&
                    menu !== 'GeneralVendorRegistration' &&
                    menu !== 'FixedCapitalRegistration') ||
                  menu === 'FundTypeSetting' ||
                  menu === 'Department'
                    ? 'true'
                    : 'false'
                }`}
                aria-controls="collapseLayouts"
              >
                자금관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className={`collapse ${
                  (mainMenu === 'FundTypeSetting' &&
                    menu !== 'GeneralVendorRegistration' &&
                    menu !== 'FixedCapitalRegistration') ||
                  menu === 'FundTypeSetting' ||
                  menu === 'Department'
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
                      menu === 'FundTypeSetting' && 'activeMenu'
                    }`}
                    to="/FundTypeSetting"
                    onClick={() => onClickMenu('FundTypeSetting')}
                  >
                    자금과목설정
                  </Link>
                  <Link
                    className={`nav-linkShow ${
                      menu === 'FixedFund' && 'activeMenu'
                    }`}
                    to="/FixedFund"
                    onClick={() => onClickMenu('FixedFund')}
                  >
                    고정자금등록
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
                결산/재무제표관리
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
                사용자정의재무제표관리
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
                부가가치세관리
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
                결산/재무제표관리
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
                고정자산관리
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
                금융서비스연동(CMS)
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
                법인세관리
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
                그룹재무제표
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
                업무용승용차관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className={`nav-link ${
                  (menu !== 'FundTypeSetting' && menu !== 'Department') ||
                  menu === 'GeneralVendorRegistration' ||
                  menu === 'FixedCapitalRegistration'
                    ? 'collapsed'
                    : ''
                }`}
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded={`nav-link ${
                  (menu !== 'FundTypeSetting' && menu !== 'Department') ||
                  menu === 'GeneralVendorRegistration' ||
                  menu === 'FixedCapitalRegistration'
                    ? 'true'
                    : 'false'
                }`}
                aria-controls="collapsePages"
              >
                회계기초정보관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className={`collapse ${
                  (menu !== 'FundTypeSetting' && menu !== 'Department') ||
                  menu === 'GeneralVendorRegistration' ||
                  menu === 'FixedCapitalRegistration'
                    ? 'show'
                    : ''
                }`}
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
                      menu === 'GeneralVendorRegistration' && 'activeMenu'
                    }`}
                    to="/GeneralVendorRegistration"
                    onClick={() => onClickMenu('GeneralVendorRegistration')}
                  >
                    일반거래처등록
                  </Link>
                  <Link
                    className={`nav-linkShow ${
                      menu === 'FixedCapitalRegistration' && 'activeMenu'
                    }`}
                    to="/FixedCapitalRegistration"
                    onClick={() => onClickMenu('FixedCapitalRegistration')}
                  >
                    금융거래처등록
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
                여신지급관리
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

export default Sidebar2;
