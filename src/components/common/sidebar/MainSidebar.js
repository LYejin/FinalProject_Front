import React, { useEffect } from 'react';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';
import { useState } from 'react';
import {
  FaCalculator,
  FaCoins,
  FaMoneyCheckAlt,
  FaBoxes,
  FaBox,
  FaBullhorn,
  FaFileMedical,
  FaStethoscope,
  FaUserMd,
  FaFileSignature,
  FaClipboardList,
  FaCalendarAlt,
} from 'react-icons/fa';
import { HiComputerDesktop } from 'react-icons/hi2';
import { ImFolderOpen } from 'react-icons/im';
import {
  MdBusinessCenter,
  MdFactory,
  MdEqualizer,
  MdPrint,
  MdMenu,
  MdPhoneAndroid,
} from 'react-icons/md';
import { BsPersonLinesFill } from 'react-icons/bs';
import { RiShakeHandsFill } from 'react-icons/ri';
import { TbReportMoney } from 'react-icons/tb';
import { GrMail } from 'react-icons/gr';
import { CgMenuGridR } from 'react-icons/cg';
import { AiOutlineStar, AiOutlineMenu } from 'react-icons/ai';
import { GiBackwardTime } from 'react-icons/gi';

const MainSidebar = () => {
  const menu = localStorage.getItem('menu');
  const menuData = JSON.parse(localStorage.getItem('mainSidebar'));
  const [clickMenu, setClickMenu] = useState(menu);
  const iconList = [
    { name: 'FaCoins', value: <FaCoins className="nav__icon" /> },
    { name: 'MdPhoneAndroid', value: <MdPhoneAndroid className="nav__icon" /> },
    {
      name: 'FaClipboardList',
      value: <FaClipboardList className="nav__icon" />,
    },
    { name: 'FaCalendarAlt', value: <FaCalendarAlt className="nav__icon" /> },
    { name: 'MdPrint', value: <MdPrint className="nav__icon" /> },
    { name: 'GrMail', value: <GrMail className="nav__icon" /> },
    { name: 'MdEqualizer', value: <MdEqualizer className="nav__icon" /> },
    {
      name: 'FaFileSignature',
      value: <FaFileSignature className="nav__icon" />,
    },
    {
      name: 'TbReportMoney',
      value: <TbReportMoney className="nav__icon" />,
    },
    { name: 'FaCalculator', value: <FaCalculator className="nav__icon" /> },
    {
      name: 'FaMoneyCheckAlt',
      value: <FaMoneyCheckAlt className="nav__icon" />,
    },
    { name: 'FaBoxes', value: <FaBoxes className="nav__icon" /> },
    { name: 'FaBox', value: <FaBox className="nav__icon" /> },
    { name: 'FaBullhorn', value: <FaBullhorn className="nav__icon" /> },
    { name: 'FaFileMedical', value: <FaFileMedical className="nav__icon" /> },
    { name: 'FaStethoscope', value: <FaStethoscope className="nav__icon" /> },
    { name: 'FaUserMd', value: <FaUserMd className="nav__icon" /> },
    { name: 'ImFolderOpen', value: <ImFolderOpen className="nav__icon" /> },
    {
      name: 'MdBusinessCenter',
      value: <MdBusinessCenter className="nav__icon" />,
    },
    { name: 'MdFactory', value: <MdFactory className="nav__icon" /> },
    {
      name: 'BsPersonLinesFill',
      value: <BsPersonLinesFill className="nav__icon" />,
    },
    {
      name: 'RiShakeHandsFill',
      value: <RiShakeHandsFill className="nav__icon" />,
    },
    {
      name: 'HiComputerDesktop',
      value: <HiComputerDesktop className="nav__icon" />,
    },
  ];

  const icon = <FaCalculator className="nav__icon" />;

  useEffect(() => {
    setClickMenu(localStorage.getItem('menu'));
  }, [clickMenu]);

  const onClickMenu = menu => {
    setClickMenu(menu);
    localStorage.setItem('menu', menu);
    if (menu === 'Company') {
      localStorage.setItem('menuDetailSystem', 'Company');
    } else if (menu === 'FundTypeSetting') {
      localStorage.setItem('menuDetailFund', 'FundTypeSetting');
    }
  };

  return (
    <div className="navbarWrapper">
      <div className="navbarStylekkk" id="navbar">
        <nav className="nav">
          <div>
            <div className="nav__brand">
              <div className="topNavWrapper">
                <CgMenuGridR className="nav__topIcon" />
                <AiOutlineMenu className="nav__topIcon2" />
                <AiOutlineStar className="nav__topIcon3" />
                <GiBackwardTime className="nav__topIcon3" />
              </div>
            </div>
            <div className="nav__list">
              {menuData.map(data => {
                const foundIcon = iconList.find(
                  iconName => iconName.name === data.icon
                );
                if (foundIcon) {
                  return (
                    <Link
                      key={data.icon}
                      name={data.link && data.link}
                      to={data.link && `/${data.link}`}
                      className={
                        clickMenu === data.link
                          ? 'nav__link active'
                          : 'nav__link'
                      }
                      onClick={() => onClickMenu(data.link)}
                    >
                      {foundIcon.value}
                      <span className="nav_name">{data.title}</span>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default React.memo(MainSidebar);
