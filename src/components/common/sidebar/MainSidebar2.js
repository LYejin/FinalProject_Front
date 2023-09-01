import React, { useState } from 'react';
import { useEffect } from 'react';

function MainSidebar2() {
  const [isToggled, setIsToggled] = useState(false);
  const [isToggled2, setIsToggled2] = useState(false);

  const toggleWrapper = () => {
    setIsToggled(!isToggled);
  };

  const toggleWrapper2 = () => {
    setIsToggled2(!isToggled2);
  };

  return (
    <div id="wrapper" className={isToggled ? 'toggled' : ''}>
      <nav className="navbar navbar-default no-margin">
        <div className="navbar-header fixed-brand">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            id="menu-toggle"
          >
            <span
              className="glyphicon glyphicon-th-large"
              aria-hidden="true"
            ></span>
          </button>
          <a className="navbar-brand" href="#">
            <i className="fa fa-rocket fa-4"></i> M-33
          </a>
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav">
            <li className="active">
              <button
                className={`navbar-toggle ${isToggled2 ? 'collapse in' : ''}`}
                data-toggle="collapse"
                id="menu-toggle-2"
                onClick={toggleWrapper2}
              >
                {' '}
                <span
                  className="glyphicon glyphicon-th-large"
                  aria-hidden="true"
                ></span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav nav-pills nav-stacked" id="menu">
          {/* Menu items */}
        </ul>
      </div>
    </div>
  );
}

export default MainSidebar2;
