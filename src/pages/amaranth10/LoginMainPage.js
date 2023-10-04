import React, { useState } from 'react';
import { MainSidebar } from '../../components/common/Index';
import './LoginMainPage.css';
import MainLogo from '../../components/common/image/mainLogo.png';
import { BsBuildings, BsBuilding, BsFillPersonLinesFill } from 'react-icons/bs';
import { AiOutlineApartment } from 'react-icons/ai';
import { TbZoomMoney } from 'react-icons/tb';
import { GrMoney } from 'react-icons/gr';
import { GrPowerCycle } from 'react-icons/gr';
import { RiBankCardFill } from 'react-icons/ri';
import { Link } from '../../../node_modules/react-router-dom/dist/index';

const LoginMainPage = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="loginMainPage">
      <div className="header">
        <img src={MainLogo} alt="Main Logo" className="logo" />
      </div>
      <div className="centerContent">
        <div className="title">Amaranth 10</div>
        <div className="subtitle">
          기업의 지속가능한 성장을 위해 디지털 혁신을 완성한다
        </div>
        <div className="searchInputContainer">
          <input type="text" className="searchInput" placeholder="통합검색" />
          <button className="searchButton">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="semiTransparentBox">
          <Link to="/company">
            <div
              className="btn-hover color-1"
              onMouseOver={() => setShowMessage(1)}
              onMouseOut={() => setShowMessage(false)}
            >
              <BsBuildings />
              {showMessage === 1 && <div className="message">회사관리</div>}
            </div>
          </Link>
          <Link to="/workplace">
            <div
              className="btn-hover color-2"
              onMouseOver={() => setShowMessage(2)}
              onMouseOut={() => setShowMessage(false)}
            >
              <BsBuilding />
              {showMessage === 2 && <div className="message">사업장관리</div>}
            </div>
          </Link>
          <Link to="/department">
            <div
              className="btn-hover color-9"
              onMouseOver={() => setShowMessage(3)}
              onMouseOut={() => setShowMessage(false)}
            >
              <AiOutlineApartment />
              {showMessage === 3 && <div className="message">부서관리</div>}
            </div>
          </Link>
          <Link to="/employee">
            <div
              className="btn-hover color-4"
              onMouseOver={() => setShowMessage(4)}
              onMouseOut={() => setShowMessage(false)}
            >
              <BsFillPersonLinesFill />
              {showMessage === 4 && <div className="message">상용직관리</div>}
            </div>
          </Link>
          <Link to="/FundTypeSetting">
            <div
              className="btn-hover color-5"
              onMouseOver={() => setShowMessage(5)}
              onMouseOut={() => setShowMessage(false)}
            >
              <TbZoomMoney />
              {showMessage === 5 && <div className="message">자금과목</div>}
            </div>
          </Link>
          <Link to="/GeneralVendorRegistration">
            <div
              className="btn-hover color-7"
              onMouseOver={() => setShowMessage(6)}
              onMouseOut={() => setShowMessage(false)}
            >
              <GrPowerCycle />
              {showMessage === 6 && <div className="message">거래처</div>}
            </div>
          </Link>
          <Link to="/FixedCapitalRegistration">
            <div
              className="btn-hover color-9"
              onMouseOver={() => setShowMessage(7)}
              onMouseOut={() => setShowMessage(false)}
            >
              <RiBankCardFill />
              {showMessage === 7 && <div className="message">금융거래처</div>}
            </div>
          </Link>
          <Link to="/FixedFund">
            <div
              className="btn-hover color-10"
              onMouseOver={() => setShowMessage(8)}
              onMouseOut={() => setShowMessage(false)}
            >
              <GrMoney />
              {showMessage === 8 && <div className="message">고정자금</div>}
            </div>
          </Link>
        </div>
      </div>

      <MainSidebar />
    </div>
  );
};

export default LoginMainPage;
