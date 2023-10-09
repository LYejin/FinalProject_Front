import React, { useEffect, useState } from 'react';
import { MainTitle, Title, DeptSubTitle } from '../../components/common/Index';
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

// import FundTypeSearch from '../../components/feature/fundType/FundTypeSearch';
import FundTypeSearchGrid from '../../components/feature/amaranth/fixedfund/realgrid/FixedTypeSearchGrid';
import StradeCodeHelpModal from '../../components/feature/amaranth/Modal/StradeCodeHelpModal/StradeCodeHelpModal';
import FundTypeModel from '../../components/feature/amaranth/fundType/model/FundTypeModel';
import FundTypeModal from '../../components/feature/amaranth/fundType/Modal/FundTypeModal';
import FixedChartBox from '../../components/feature/amaranth/fixedfund/FixedChartBox';

const FixedFundPage = () => {
  useEffect(() => {}, []);
  const [isOpenCash, setIsOpenCash] = useState(false);
  const [isOpenStrade, setIsOpenStrade] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState('1');
  const [TRcode, setTRcode] = useState('');
  const [searchValues, setSearchValues] = useState({});
  // 모달의 열림/닫힘 상태 관리
  const [isStradeModalOpen, setIsStradeModalOpen] = useState(false);

  // 모달 닫기 함수
  const onChangeModalClose = () => {
    setIsOpenStrade(false);
  };

  // 기타 필요한 상태 및 함수
  const [setDeptMenuButton, setSetDeptMenuButton] = useState(null);
  const [gridViewStrade, setGridViewStrade] = useState();
  const [cellClickData, setCellClickData] = useState(null);

  const onChangeOpenCash = () => {
    setIsOpenCash(!isOpenCash);
  };

  const onChangeOpenStrade = value => {
    setIsOpenStrade(!isOpenStrade);
    if (value === 1) {
      setTRcode(1);
    } else {
      setTRcode(3);
    }
  };

  // 수입/지출 선택
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

  const handleValuesChange = values => {
    const {
      divCode,
      cashCode,
      gtradeCode,
      ftradeCode,
      startStart,
      startEnd,
      endStart,
      endEnd,
    } = values;
    setSearchValues(values);
    console.log('버튼을 누른거야?');
  };

  return (
    <>
      <CommonLayout2>
        <MainTitle mainTitle={'시스템설정'} />
        <ContentWrapper>
          <Title titleName={'고정자금등록'}></Title>
          <DetailContentWrapper>
            <FixedFundSelectBoxWrapper onValuesChange={handleValuesChange} />
            <MainContentWrapper state={0}>
              <FullContentWrapper>
                <DeptSubTitle margin={-5}>
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
                {/* <FixedFundGrid
                  onChangeOpenCash={onChangeOpenCash}
                  onChangeOpenStrade={onChangeOpenStrade}
                  setMarsterGrid={setMarsterGrid}
                  setGridViewStrade={setGridViewStrade}
                  DISQ={selectedDiv}
                  values={searchValues}
                /> */}
                <FixedChartBox />
              </FullContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
      {isOpenCash ? (
        <FundTypeModal
          width={'700px'}
          height={'750px'}
          title={'자금과목코드도움'}
          onClickEvent={onChangeOpenCash}
          buttonYN="true"
        >
          <FundTypeSearchGrid
            loadRowData={loadRowData}
            setCASH_CD={setCASH_CD}
            onChangeOpenCash={onChangeOpenCash}
            marsterGrid={marsterGrid}
            setMarsterGrid={setMarsterGrid}
          />
        </FundTypeModal>
      ) : null}
      {isOpenStrade && (
        <StradeCodeHelpModal
          onChangeModalClose={onChangeModalClose}
          setDeptMenuButton={setDeptMenuButton}
          tr_FG={TRcode}
          marsterGrid={marsterGrid}
          gridViewStrade={gridViewStrade}
          cellClickData={cellClickData}
        />
      )}
    </>
  );
};
export const DeptContext = React.createContext();
export default FixedFundPage;
