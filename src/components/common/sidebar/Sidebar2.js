import React from 'react';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';

const Sidebar2 = () => {
  return (
    <div>
      <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div class="sb-sidenav-menu">
            <div class="nav">
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-columns"></i>
                </div>
                자금관리
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                class="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <Link class="nav-link" to="/CapitalSubjectSetting">
                    자금과목설정
                  </Link>
                  <Link class="nav-link" to="/FixedCapitalRegistration">
                    고정자금등록
                  </Link>
                </nav>
              </div>
              <div
                class="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"
              >
                <div class="sb-nav-link-icon">
                  <i class="fas fa-book-open"></i>
                </div>
                회계기초정보관리
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                class="collapse"
                id="collapsePages"
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
              >
                <nav
                  class="sb-sidenav-menu-nested nav accordion"
                  id="sidenavAccordionPages"
                >
                  <Link class="nav-link" to="/CapitalSubjectSetting">
                    일반거래처등록
                  </Link>
                  <Link class="nav-link" to="/FixedCapitalRegistration">
                    금융거래처등록
                  </Link>
                </nav>
              </div>
              <a class="nav-link" href="charts.html">
                <div class="sb-nav-link-icon">
                  <i class="fas fa-chart-area"></i>
                </div>
                Charts
              </a>
              <a class="nav-link" href="tables.html">
                <div class="sb-nav-link-icon">
                  <i class="fas fa-table"></i>
                </div>
                Tables
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar2;
