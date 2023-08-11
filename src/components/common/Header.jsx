import React from "react";
import { IoIosMenu } from "react-icons/io";
import styled from "styled-components";

const Header = () => {
  return (
    <HomePageHeader>
      <img src="/images/Nav/Logo.png" alt="Logo" />
      <MenuBox menu={menu}>
        <Menu>회사소개</Menu>
        <Menu>고객센터</Menu>
        <Menu to="/MyEstimatePage/">내 견적 조회</Menu>
        <MainMenu to="/e_request/">무료 견적 받기</MainMenu>
      </MenuBox>
      <Menubar
        onClick={() => {
          //   setMenu(!menu);
        }}
      >
        <IoIosMenu className="IoMenu" />
      </Menubar>
    </HomePageHeader>
  );
};

export default Header;

const HomePageWrapper = styled.div``;

// 홈페이지 헤더 부분

const HomePageHeaderWrapper = styled.div`
  width: 100;
  height: 60px;
  background-color: white;
  position: sticky;
  top: 0;
  padding: 10px 0;
`;

const HomePageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  background-color: white;

  img {
    width: 155px;
    height: 60px;
    margin-left: 2%;
  }

  @media all and (max-width: 1100px) {
    width: 90%;
  }

  @media ${device.mobile} {
    display: none;
    display: block;
  }
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2%;
  background-color: white;

  @media ${device.mobile} {
    background-color: white;
    margin-top: 10px;
    flex-direction: column;
    align-items: flex-center;
    display: ${({ menu }) => {
      return menu === false ? "none" : "flex";
    }};
  }
`;

const Menu = styled(Link)`
  font-size: 16px;
  margin-right: 30px;
  cursor: pointer;
  background-color: white;

  @media ${device.mobile} {
    width: 100%;
    font-size: 16px;
    padding: 15px 0;
    margin-right: 0;
    cursor: pointer;
    text-align: center;

    :hover {
      background-color: #bcbcbc;
    }
  }
`;

const MainMenu = styled(Link)`
  font-size: 16px;
  border: 1px solid black;
  padding: 13px;
  border-radius: 40px;
  cursor: pointer;
  background-color: white;

  @media ${device.mobile} {
    width: 100%;
    text-align: center;
    border: none;
    border-radius: 0px;
    padding: 15px 0;
    font-size: 16px;
    cursor: pointer;

    :hover {
      background-color: #bcbcbc;
    }
  }
`;

const Menubar = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 32px;
  top: 15px;
  cursor: pointer;

  .IoMenu {
    margin-top: 10px;
    font-size: 30px;
  }

  @media all and (min-width: 768px) {
    display: none;
  }
`;

// 홈페이지 바디 부분

const HomepageBody = styled.div`
  width: 100%;
  maring: 0 auto;
`;

const Section1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.5rem;
  height: 90vh;
  padding: 0 10px;

  img {
    display: block;
    width: 280px;
    margin-left: 7%;
  }

  @media ${device.mobile} {
    padding: 25% 0;
    display: block;
    text-align: center;

    img {
      display: block;
      width: 280px;
      margin: 60px auto;
    }
  }
`;

const Section1Title = styled.div``;

const Section2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.8rem;
  height: 91vh;
  text-align: end;

  img {
    display: block;
    width: 250px;
    margin-right: 7%;
  }
`;

const Section2Title = styled.div``;

const Section3 = styled.div`
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.8rem;
  text-align: center;
  height: 91vh;
  margin-bottom: 120px;

  img {
    display: block;
    margin: 50px auto;
    width: 250px;
  }
`;

const Section3Title = styled.div``;
