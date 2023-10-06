import React from 'react';
import CompanyModel from '../../model/CompanyModel';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
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
  SelectBoxWrapper,
} from './../../components/layout/amaranth/Index';
import { CompanyInputBox } from '../../components/feature/amaranth/Index';

import SelectBox from '../../components/feature/amaranth/company/box/SelectBox';
import TextFieldBox from '../../components/feature/amaranth/company/box/TextFieldBox';

import EventButton from '../../components/feature/amaranth/company/button/EventButton';
import { useState } from 'react';
import ChangeHistory from '../../components/feature/ChangeHistory/ChangeHistory';
import Modal from '../../components/common/modal/Modal';
import { comPanyChangeHistoryLayout } from '../../components/feature/ChangeHistory/Realgrid-Data-ChangeHistory';
import ChangeHistorySelectCategory from '../../components/feature/ChangeHistory/box/ChangeHistorySelectCategory';
import { authAxiosInstance } from '../../axios/axiosInstance';
import EmpSelectBox from '../../components/feature/amaranth/employee/EmpSelectBox';
import { getNowJoinTime } from '../../util/time';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { ko } from 'date-fns/esm/locale';

import SubmitButton from '../../components/common/button/SubmitButton';

import { isAfter } from 'date-fns';

import { useRef } from 'react';

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
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setFocus,
    trigger,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({ mode: 'onChange', shouldFocusError: true });
  const [changeHistoryOpenPost, setChangeHistoryOpenPost] = useState(false);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState(''); // 사용여부 select box state
  const [clickYN, setClickYN] = useState(true); // empBox click 여부
  const [changeFormData, setChangeFormData] = useState({}); // 변경된 form data
  const [companySelect, setCompanySelect] = useState(''); // select box 내 companySelect
  const [companyList, setCompanyList] = useState([]); // select box 내 company list

  const [dateRange, setDateRange] = useState([]);
  const CATEGORY = useRef('사업장');

  const [endStartDate, setEndStartDate] = useState(null);
  const [endEndDate, setEndEndDate] = useState(null);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [endStart, setEndStart] = useState();
  const [endEnd, setEndEnd] = useState();

  const [changeHistoryGrid, setChangeHistoryGrid] = useState();

  const handleEndCalendarClick = () => {
    setIsEndOpen(!isEndOpen);
  };
  const setEndDate1 = data => {
    // console.log('데이트2', formatDate(endStartDate), formatDate(data));
    setEndStart(getNowJoinTime(endStartDate));
    setEndEnd(getNowJoinTime(data));
  };

  const handleDateReset = e => {
    console.log('변경(리셋)', endStartDate);
    // setEndStartDate(null);
    // setEndEndDate(null);
    setEndStart(null);
    setEndEnd(null);
  };

  const onChangeModalClose = () => {
    setModalOpen(false);
  };
  const ModalOpenButton = () => {
    setChangeHistoryOpenPost(!changeHistoryOpenPost);
    setIsEndOpen(false);
    setEndStartDate();
    setEndEndDate();
  };

  const getCompanyList = async () => {
    const response = await authAxiosInstance(
      'system/user/groupManage/employee/getCompanyList'
    );
    setCompanyList(response.data);
  };
  React.useEffect(() => {
    getCompanyList();
    reset();
    setCompanySelect('');
  }, [changeHistoryOpenPost]);

  const onMasterGridSubmit = async data => {
    data.CH_CATEGORY = CATEGORY.current;

    if (endStart !== undefined && endEnd !== undefined) {
      data.startDate = endStart;
      data.endDate = endEnd;
    } else if (endStart !== undefined && endEnd === undefined) {
      data.startDate = endStart;
    }

    const response = await authAxiosInstance.post(
      'system/admin/groupManage/ChangeHistorySearch',
      data
    );

    changeHistoryGrid.grid.showProgress(); //데이터 로딩바 생성
    changeHistoryGrid.grid.cancel();
    changeHistoryGrid.provider.clearRows();
    changeHistoryGrid.grid.resetCurrent();
    changeHistoryGrid.grid.cancel();

    changeHistoryGrid.grid.closeProgress(); // 서버 데이터 로드 완료시 로딩바 제거
    changeHistoryGrid.provider.fillJsonData(response.data, {
      fillMode: 'set',
    });
    console.log('변경검색', data);
    console.log('변경검색1', response.data);
  };
  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
      <MainTitle mainTitle={'시스템 설정'} />
      <ContentWrapper>
        <Title titleName={'회사관리'}>
          <button
            className="changeHistoryWhiteButton"
            onClick={() => ModalOpenButton()}
          >
            변경이력
          </button>
        </Title>
        <DetailContentWrapper>
          <SelectBoxWrapper>
            <span className="leftSelectBoxPadding">사용여부</span>
            <SelectBox SearchDataSet={SearchDataSet} />
            <span className="lastSelectBoxTextPadding">회사코드/회사명</span>
            <TextFieldBox
              width={'200px'}
              SearchDataSet={SearchDataSet}
              searchData={searchData}
            />
            <button
              className="companyFFcustomButton"
              onClick={() => searchCompanyOnClick()}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
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
              <ScrollWrapper width={'100%'}>
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
      {changeHistoryOpenPost && (
        <Modal
          width={'1300px'}
          height={'800px'}
          title={'변경이력'}
          onClickEvent={ModalOpenButton}
          buttonYN={true}
        >
          <form onSubmit={handleSubmit(onMasterGridSubmit)}>
            <SelectBoxWrapper>
              <span className="searchModalSelectBoxPadding">변경일자</span>

              <div style={{ position: 'relative' }}>
                <input
                  className="FixedInputStyle"
                  type="text"
                  readOnly
                  value={
                    endStartDate && endEndDate
                      ? `${endStartDate.toLocaleDateString(
                          'fr-CA'
                        )}~${endEndDate.toLocaleDateString('fr-CA')}`
                      : ''
                  }
                  onClick={handleEndCalendarClick}
                />
                <FaRegCalendarAlt
                  className="FFInputIconStyle"
                  size={20}
                  onClick={handleEndCalendarClick}
                />
                {isEndOpen && (
                  <div className="date-picker-container">
                    <DatePicker
                      className="date-picker"
                      selected={endStartDate}
                      onChange={date => setEndStartDate(date)}
                      selectsStart
                      startDate={endStartDate}
                      endDate={endEndDate}
                      inline
                      locale={ko}
                    />
                    {endStartDate && (
                      <DatePicker
                        className="date-picker"
                        selected={endEndDate}
                        onChange={date => {
                          setEndEndDate(date);
                          setIsEndOpen(false);
                          setEndDate1(date);
                        }}
                        selectsEnd
                        startDate={endStartDate}
                        endDate={endEndDate}
                        minDate={
                          new Date(endStartDate.getTime() + 24 * 60 * 60 * 1000)
                        }
                        inline
                        locale={ko}
                      />
                    )}
                  </div>
                )}
              </div>
              {endStartDate && (
                <button
                  onClick={() => handleDateReset()}
                  className="companyCancelButton"
                >
                  취소
                </button>
              )}

              <span className="searchModalSelectBoxPadding">변경구분</span>
              <ChangeHistorySelectCategory
                width={'calc(0% - -90px)'}
                state={selectCategory}
                setState={setSelectCategory}
                register={register}
                clickYN={clickYN}
                total={true}
                setChangeFormData={setChangeFormData}
              />
              <span className="changeHistoryLableCompanyText">회사</span>
              <EmpSelectBox
                width={135}
                data={companyList}
                setCompanySelect={setCompanySelect}
                companySelect={companySelect}
              />
              <span className="searchModalSelectBoxPadding">변경대상</span>
              <input
                type="text"
                className="changeHistoryTextInputBox"
                {...register('CHD_TARGET_NM')}
              />
              <span className="changeHistoryLableText">변경자(ID)</span>
              <input
                type="text"
                className="changeHistoryTextInputBox"
                {...register('CH_NM')}
              />
              <div className="selectBoxButtonWrapper">
                <button type="submit" className="companyFFcustomButton">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </SelectBoxWrapper>
          </form>

          <ChangeHistory
            onChangeModalClose={onChangeModalClose}
            CATEGORY={CATEGORY.current}
            layout={comPanyChangeHistoryLayout}
            setChangeHistoryGrid={setChangeHistoryGrid}
          />
        </Modal>
      )}
    </div>
  );
};

export default CompanyPage;
