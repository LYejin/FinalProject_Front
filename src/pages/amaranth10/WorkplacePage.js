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
} from "../../components/common/Index";
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
  SelectListWrapper,
  WorkPlaceInfoWrapper,
} from "../../components/layout/amaranth/Index";

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
            회사
            <SelectBox />
            사업장
            <TextFieldBox width={"100px"} />
            사용여부
            <SelectBox />
            {/* <CheckSelectBox width={"200px"} />
            <PasswordInputBox /> */}
            <Button data={"퇴사처리"} />
          </SelectBoxWrapper>
          <MainContentWrapper>
            <SelectListWrapper width={"295px"} title={"회사"} dataCount={527} />
            <RightContentWrapper>
              <DetailTitle detailTitle={"기본정보"}></DetailTitle>
              <ScrollWrapper width={"100%"} height={"100%"}>
                <WorkPlaceInfoWrapper />
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
    </div>
  );
};

export default TestGrid;
