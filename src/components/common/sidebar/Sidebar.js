import React from 'react';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';

const Sidebar = () => {
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
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-columns"></i>
                </div>
                조직관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link className="nav-link" to="/Company">
                    회사관리
                  </Link>
                  <Link className="nav-link" to="/Workplace">
                    사업장관리
                  </Link>
                </nav>
              </div>
              <div
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                사원관리
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div
                className="collapse"
                id="collapsePages"
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
              >
                <nav
                  className="sb-sidenav-menu-nested nav accordion"
                  id="sidenavAccordionPages"
                >
                  <Link className="nav-link" to="/Employee">
                    상용직관리
                  </Link>
                </nav>
              </div>
              <a className="nav-link" href="charts.html">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Charts
              </a>
              <a className="nav-link" href="tables.html">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-table"></i>
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

export default Sidebar;
