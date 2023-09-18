import React, { useEffect, useState } from 'react';
import {
  authAxiosInstance,
  imageAxiosInstance,
} from '../../axios/axiosInstance';
import {
  MainTitle,
  Title,
  DeptSubTitle,
  ScrollWrapper,
} from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  FixedFundSelectBoxWrapper,
  FullContentWrapper,
} from '../../components/layout/amaranth/Index';
import CommonLayout2 from '../../components/common/CommonLayout2';
import FixedFundGrid from '../../components/feature/amaranth/fixedfund/realgrid/FixedFundGrid';

const FixedFundPage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <CommonLayout2>
        <MainTitle mainTitle={'시스템설정'} />
        <ContentWrapper>
          <Title titleName={'고정자금등록'}></Title>
          <DetailContentWrapper>
            <FixedFundSelectBoxWrapper />
            <MainContentWrapper state={0}>
              <FullContentWrapper>
                <DeptSubTitle>
                  <div className="subTitleInfo">기본정보</div>
                  <div className="subTitleInfo2">부서원 정보</div>
                </DeptSubTitle>
                <FixedFundGrid />
                {/* <ScrollWrapper width={'900px'} deptH={55}></ScrollWrapper> */}
              </FullContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
    </>
  );
};
export const DeptContext = React.createContext();
export default FixedFundPage;
