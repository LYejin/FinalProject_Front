import React from 'react';
import CompanyModel from '../../model/CompanyModel';
import {
  CheckSelectBox,
  DetailTitle,
  Header,
  MainSidebar,
  MainTitle,
  PasswordInputBox,
  ScrollWrapper,
  Sidebar,
  Title,
} from '../../components/common/Index';

import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  CompanySelectListWrapper,
  SelectListWrapper,
  SelectBoxWrapper,
} from './../../components/layout/amaranth/Index';
import { CompanyInputBox } from '../../components/feature/amaranth/Index';
import DaumPostcode from 'react-daum-postcode';
import ComCheckSelectBox from '../../components/feature/amaranth/company/box/ComCheckSelectBox';
import SelectBox from '../../components/feature/amaranth/company/box/SelectBox';
import TextFieldBox from '../../components/feature/amaranth/company/box/TextFieldBox';
import Button from '../../components/feature/amaranth/company/button/Button';
import EventButton from '../../components/feature/amaranth/company/button/EventButton';

const CompanyPage = () => {
  const {
    formData,
    formDataSet,
    ch_listData,
    ch_listDataSet,
    listData,
    listDataSet,
    listCount,
    listCountSet,
    searchData,
    SearchDataSet,
    searchCompanyOnClick,
    reSetData,
  } = CompanyModel();

  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
      <MainTitle mainTitle={'시스템 설정'} />
      <ContentWrapper>
        <Title titleName={'회사관리'}>
          <div class="button-container">
            <Button data={'변경이력'} />
          </div>
        </Title>
        <DetailContentWrapper>
          <SelectBoxWrapper>
            <span className="leftSelectBoxPadding">사용여부</span>
            <SelectBox SearchDataSet={SearchDataSet} />
            <span className="leftSelectBoxPadding">계정유형</span>
            <SelectBox SearchDataSet={SearchDataSet} />
            <span className="lastSelectBoxTextPadding">회사코드/회사명</span>
            <TextFieldBox
              width={'200px'}
              SearchDataSet={SearchDataSet}
              searchData={searchData}
            />
            <div className="C_eventButton">
              <EventButton data={'검색'} onClickEvent={searchCompanyOnClick} />
            </div>
          </SelectBoxWrapper>
          <MainContentWrapper>
            <CompanySelectListWrapper
              width={'295px'}
              title={'회사'}
              dataCount={listCount}
              formData={formData}
              formDataSet={formDataSet}
              listCountSet={listCountSet}
              ch_listData={ch_listData}
              listData={listData}
              listDataSet={listDataSet}
              searchCompanyOnClick={searchCompanyOnClick}
              reSetData={reSetData}
            />
            <RightContentWrapper>
              <DetailTitle detailTitle={'기본정보'}></DetailTitle>
              <ScrollWrapper width={'100%'} height={'100%'}>
                <CompanyInputBox
                  formData={formData}
                  formDataSet={formDataSet}
                  ch_listData={ch_listData}
                  ch_listDataSet={ch_listDataSet}
                />
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
    </div>
  );
};

export default CompanyPage;
