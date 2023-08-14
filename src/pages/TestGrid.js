import React from "react";
import {
  Button,
  CheckSelectBox,
  DetailTitle,
  Header,
  MainSidebar,
  MainTitle,
  PasswordInputBox,
  ScrollWrapper,
  SelectBox,
  Sidebar,
  TextFieldBox,
  Title,
} from "../components/common/Index";
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
  SelectListWrapper,
} from "../components/layout/amaranth/Index";

const TestGrid = () => {
  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
      <MainTitle mainTitle={"시스템 설정"} />
      <ContentWrapper>
        <Title titleName={"사업장관리"}></Title>
        <DetailContentWrapper>
          <SelectBoxWrapper>
            <TextFieldBox width={"100px"} />
            <SelectBox />
            <CheckSelectBox width={"200px"} />
            <PasswordInputBox />
            <Button data={"퇴사처리"} />
          </SelectBoxWrapper>
          <MainContentWrapper>
            <SelectListWrapper width={"295px"} title={"회사"} dataCount={527} />
            <RightContentWrapper>
              <DetailTitle detailTitle={"기본정보"}></DetailTitle>
              <ScrollWrapper width={"100%"} height={"100%"}>
                {/* 테이블 입력 */}
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
    </div>
  );
};

export default TestGrid;
