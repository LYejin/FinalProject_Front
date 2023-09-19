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
import FundTypeModal from '../../components/feature/fundType/Modal/FundTypeModel';
import FundTypeSearch from '../../components/feature/fundType/FundTypeSearch';
import FundTypeModel from '../../components/feature/fundType/model/FundTypeModel';
import FundTypeSearchGrid from '../../components/feature/amaranth/fixedfund/realgrid/FixedTypeSearchGrid';

const FixedFundPage = () => {
  useEffect(() => {}, []);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState('1');

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const handleDivClick = value => {
    setSelectedDiv(value);
  };

  const {
    loadRowData,
    CASH_CD,
    setCASH_CD,
    marsterGrid,
    setMarsterGrid,
    setCheckList,
    deleteBtnClick,
  } = FundTypeModel();

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
                  <div
                    className={`subTitleInfo ${
                      selectedDiv === '1' ? 'IsSelected' : ''
                    }`}
                    onClick={() => handleDivClick('1')}
                  >
                    지출
                  </div>
                  <div
                    className={`subTitleInfo2 ${
                      selectedDiv === '0' ? 'IsSelected' : ''
                    }`}
                    onClick={() => handleDivClick('0')}
                  >
                    수입
                  </div>
                </DeptSubTitle>
                <FixedFundGrid
                  onChangeOpenPost={onChangeOpenPost}
                  setMarsterGrid={setMarsterGrid}
                  DISQ={selectedDiv}
                />
              </FullContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
      {isOpenPost ? (
        <FundTypeModal
          width={'700px'}
          height={'750px'}
          title={'자금과목코드도움'}
          onClickEvent={onChangeOpenPost}
          buttonYN="true"
        >
          <FundTypeSearchGrid
            loadRowData={loadRowData}
            setCASH_CD={setCASH_CD}
            onChangeOpenPost={onChangeOpenPost}
            marsterGrid={marsterGrid}
            setMarsterGrid={setMarsterGrid}
          />
        </FundTypeModal>
      ) : null}
    </>
  );
};
export const DeptContext = React.createContext();
export default FixedFundPage;
