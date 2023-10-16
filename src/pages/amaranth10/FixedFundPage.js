import React, { useEffect, useState } from 'react';
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

// import FundTypeSearch from '../../components/feature/fundType/FundTypeSearch';
import FundTypeSearchGrid from '../../components/feature/amaranth/fixedfund/realgrid/FixedTypeSearchGrid';
import StradeCodeHelpModal from '../../components/feature/amaranth/Modal/StradeCodeHelpModal/StradeCodeHelpModal';
import FundTypeModel from '../../components/feature/amaranth/fundType/model/FundTypeModel';
import FundTypeModal from '../../components/feature/amaranth/fundType/Modal/FundTypeModal';
import FundTypeSelectBoxWrapper from '../../components/feature/amaranth/fundType/Box/SelectBoxWrapper';
import FundTypeSelectBoxUSEYN from '../../components/feature/amaranth/fundType/Box/FundTypeSelectBoxUSEYN';
import FundTypeRidoButton from '../../components/feature/amaranth/fundType/Box/FundTypeRidoButton';
import FundTypeSearch from '../../components/feature/amaranth/fundType/FundTypeSearch';
import SubmitButton from '../../components/common/button/SubmitButton';
import { useForm } from 'react-hook-form';
import FixedChartBox from '../../components/feature/amaranth/fixedfund/FixedChartBox';

const FixedFundPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {}, []);
  const [isOpenCash, setIsOpenCash] = useState(false);
  const [isOpenStrade, setIsOpenStrade] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState('1');
  const [selectedDivCd, setSelectedDivCd] = useState('');
  const [TRcode, setTRcode] = useState('');
  const [searchValues, setSearchValues] = useState({});
  // 모달의 열림/닫힘 상태 관리
  const [isStradeModalOpen, setIsStradeModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectUseYN, setSelectUseYN] = useState('여');
  const [chartShow, setChartShow] = useState(false);
  const [inputFixedCashCD, setInputFixedCashCD] = useState('');

  // 모달 닫기 함수
  const onChangeModalClose = () => {
    setIsOpenStrade(false);
  };

  // 기타 필요한 상태 및 함수
  const [setDeptMenuButton, setSetDeptMenuButton] = useState(null);
  const [gridViewStrade, setGridViewStrade] = useState();
  const [cellClickData, setCellClickData] = useState(null);
  const [changeFormData, setChangeFormData] = useState({});
  const [onChangeForm, setChangeForm] = useState(false);
  const [clickYN, setClickYN] = useState(true);
  const [isRender, setRender] = useState('');

  const handleOptionChange = option => {
    // console.log('라디오', option);
    setSelectedOption(option);
  };

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
    LEVEL_CD,
    marsterGrid,
    setMarsterGrid,
    searchGrid,
    setCASH_CD,
    setSearchGrid,
    setMenuGrid,
    inputData,
    excelExport,
  } = FundTypeModel();

  const onSearchGridSubmit = async SearchData => {
    SearchData.CASH_FG = selectedOption;
    // console.log('라디오', SearchData, selectUseYN);
    searchGrid.grid.showProgress(); //데이터 로딩바 생성
    searchGrid.grid.cancel();
    searchGrid.provider.clearRows();
    searchGrid.grid.resetCurrent();
    searchGrid.grid.cancel();
    loadRowData(SearchData)
      .then(loadData => {
        // console.log('검색전', CASH_CD, loadData);
        if (CASH_CD !== undefined) {
          loadData = loadData.filter(item => CASH_CD !== item.CASH_CD);
        }
        // console.log('검색후', CASH_CD, loadData);
        searchGrid.grid.closeProgress(); // 서버 데이터 로드 완료시 로딩바 제거
        searchGrid.provider.fillJsonData(loadData, {
          fillMode: 'set',
        });
        //마지막행에 항상 빈 행을 추가하는 기능
        searchGrid.grid.setEditOptions({ displayEmptyEditRow: true });
        //뷰 마운트 시 커서 포커스를 마지막 행 첫번째 셀에 위치하게 설정
        searchGrid.grid.setCurrent({
          itemIndex: 0,
          column: 'CASH_FG',
        });
        searchGrid.grid.setFocus();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onChangeFunction = e => {
    setChangeForm(true);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      [e.target.name]: e.target.value,
    }));
  };

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
    // console.log('버튼을 누른거야?');
  };

  return (
    <>
      <CommonLayout2>
        <MainTitle mainTitle={'시스템설정'} />
        <ContentWrapper>
          <Title titleName={'고정자금등록'}></Title>
          <DetailContentWrapper>
            <FixedFundSelectBoxWrapper
              onValuesChange={handleValuesChange}
              onSearchGridSubmit={onSearchGridSubmit}
              onChangeFunction={onChangeFunction}
              setSelectedDivCd={setSelectedDivCd}
            />
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
                  onChangeOpenCash={onChangeOpenCash}
                  onChangeOpenStrade={onChangeOpenStrade}
                  setMarsterGrid={setMarsterGrid}
                  setGridViewStrade={setGridViewStrade}
                  DISQ={selectedDiv}
                  values={searchValues}
                  isOpenCash={isOpenCash}
                  setInputFixedCashCD={setInputFixedCashCD}
                  setChartShow={setChartShow}
                  excelExport={excelExport}
                  setRender={setRender}
                  isRender={isRender}
                />
                {chartShow && (
                  <FixedChartBox
                    DISP_SQ={selectedDiv}
                    selectedDivCd={selectedDivCd}
                    isRender={isRender}
                  />
                )}
              </FullContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
      {isOpenCash ? (
        <div className="ModalContainer">
          <FundTypeModal
            width={'720px'}
            height={'750px'}
            title={'자금과목코드도움'}
            onClickEvent={onChangeOpenCash}
            buttonYN="true"
          >
            <form
              onSubmit={handleSubmit(onSearchGridSubmit)}
              onChange={onChangeFunction}
            >
              <FundTypeSelectBoxWrapper>
                <FundTypeSelectBoxUSEYN
                  width={'calc(0% - -100px)'}
                  state={selectUseYN}
                  setState={setSelectUseYN}
                  clickYN={clickYN}
                  register={register}
                  total={true}
                  setChangeFormData={setChangeFormData}
                />
                <input
                  type="text"
                  className="searchModalTextInputBox "
                  Placeholder="검색어 입력"
                  {...register('searchData')}
                />
                <span className="searchModalSelectBoxPadding">수지구분</span>
                <FundTypeRidoButton
                  options={['', '지출', '수입']}
                  defultValue={'전체'}
                  selectedOption={selectedOption}
                  onOptionChange={handleOptionChange}
                  handleOptionChange={handleOptionChange}
                />
                <div className="selectBoxButtonWrapper">
                  <SubmitButton
                    data={<i className="fa-solid fa-magnifying-glass" />}
                    width={'-10px'}
                    height={30}
                  />
                </div>
              </FundTypeSelectBoxWrapper>
            </form>
            <FundTypeSearch
              loadRowData={loadRowData}
              LEVEL_CD={LEVEL_CD}
              CASH_CD={CASH_CD}
              onChangeOpenCash={onChangeOpenCash}
              marsterGrid={marsterGrid}
              setMarsterGrid={setMarsterGrid}
              setSearchGrid={setSearchGrid}
              setMenuGrid={setMenuGrid}
              inputData={inputData}
              FixedPage={1}
            />
          </FundTypeModal>
        </div>
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
