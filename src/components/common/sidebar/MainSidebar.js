import React, { useEffect } from 'react';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';
import { useState } from 'react';

const MainSidebar = () => {
  const menu = localStorage.getItem('menu');
  console.log('menu', menu);
  const [clickMenu, setClickMenu] = useState(menu);

  useEffect(() => {
    setClickMenu(localStorage.getItem('menu'));
  }, [clickMenu]);

  const onClickSetting = () => {
    localStorage.setItem('menu', 'setting');
  };

  const onClickFinancial = () => {
    localStorage.setItem('menu', 'financial');
  };

  return (
    <div className="navbarWrapper">
      <div className="navbarStylekkk" id="navbar">
        <nav className="nav">
          <div>
            <div className="nav__brand">
              <ion-icon
                name="menu-outline"
                class="nav__toggle"
                id="nav-toggle"
              ></ion-icon>
              <a href="#" className="nav__logo">
                Bedimcode
              </a>
            </div>
            <div className="nav__list">
              <Link
                to="/Company"
                className={
                  clickMenu === 'setting' ? 'nav__link active' : 'nav__link'
                }
                onClick={onClickSetting}
              >
                <ion-icon name="home-outline" class="nav__icon"></ion-icon>
                <span className="nav_name">시스템 설정</span>
              </Link>
              <Link
                to="/CapitalSubjectSetting"
                className={
                  clickMenu === 'financial' ? 'nav__link active' : 'nav__link'
                }
                onClick={onClickFinancial}
              >
                <ion-icon
                  name="chatbubbles-outline"
                  class="nav__icon"
                ></ion-icon>
                <span className="nav_name">회계관리</span>
              </Link>

              <div href="#" className="nav__link collapse">
                <ion-icon name="folder-outline" class="nav__icon"></ion-icon>
                <span className="nav_name">Projects</span>

                <ion-icon
                  name="chevron-down-outline"
                  class="collapse__link"
                ></ion-icon>

                <ul className="collapse__menu">
                  <a href="#" className="collapse__sublink">
                    Data
                  </a>
                  <a href="#" className="collapse__sublink">
                    Group
                  </a>
                  <a href="#" className="collapse__sublink">
                    Members
                  </a>
                </ul>
              </div>

              <a href="#" className="nav__link">
                <ion-icon name="pie-chart-outline" class="nav__icon"></ion-icon>
                <span className="nav_name">Analytics</span>
              </a>

              <div href="#" className="nav__link collapse">
                <ion-icon name="people-outline" class="nav__icon"></ion-icon>
                <span className="nav_name">Team</span>
              </div>

              <a href="#" className="nav__link">
                <ion-icon name="settings-outline" class="nav__icon"></ion-icon>
                <span className="nav_name">Settings</span>
              </a>
            </div>
            <a href="#" className="nav__link">
              <ion-icon name="log-out-outline" class="nav__icon"></ion-icon>
              <span className="nav_name">Log out</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainSidebar;
