import React from 'react';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';

const Sidebar3 = () => {
  return (
    <div className="wrapper3">
      <nav id="sidebar3">
        <div className="sidebar-header3">
          <h3>Bootstrap Sidebar</h3>
        </div>

        <ul className="list-unstyled components3">
          <p>Dummy Heading</p>
          <li className="active">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle3"
            >
              Home
            </a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
              <li>
                <a href="#">Home 1</a>
              </li>
              <li>
                <a href="#">Home 2</a>
              </li>
              <li>
                <a href="#">Home 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a
              href="#pageSubmenu"
              data-toggle="collapse"
              aria-expanded="true"
              className="dropdown-toggle"
            >
              Pages
            </a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <a href="#">Page 1</a>
              </li>
              <li>
                <a href="#">Page 2</a>
              </li>
              <li>
                <a href="#">Page 3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>

        <ul className="list-unstyled CTAs">
          <li>
            <a
              href="https://bootstrapious.com/tutorial/files/sidebar.zip"
              className="download"
            >
              Download source
            </a>
          </li>
          <li>
            <a
              href="https://bootstrapious.com/p/bootstrap-sidebar"
              className="article"
            >
              Back to article
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar3;
