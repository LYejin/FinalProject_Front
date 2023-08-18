import React from "react";


import CompanyModel from "../../model/CompanyModel";
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
  SelectListWrapper,} from './../../components/layout/amaranth/Index';
import CompanyInputBox from "../../components/feature/amaranth/company/CompanyInputBox";


const CompanyPage = () => {
  const { formData, formDataSet } = CompanyModel();
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
            <SelectListWrapper width={"295px"} title={"회사"} dataCount={527} formData={formData} formDataSet={formDataSet}/>
            <RightContentWrapper>
              <DetailTitle detailTitle={"기본정보"}></DetailTitle>
              <ScrollWrapper width={"100%"} height={"100%"}>
                <CompanyInputBox formData={formData}/>
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
    </div>
  );
};

export default CompanyPage;
