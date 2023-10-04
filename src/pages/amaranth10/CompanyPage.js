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
import { useState } from 'react';
import ChangeHistory from '../../components/feature/ChangeHistory/ChangeHistory';
import Modal from '../../components/common/modal/Modal';
import { comPanyChangeHistoryLayout } from '../../components/feature/ChangeHistory/Realgrid-Data-ChangeHistory';
import ChangeHistorySelectCategory from '../../components/feature/ChangeHistory/box/ChangeHistorySelectCategory';
import { authAxiosInstance } from '../../axios/axiosInstance';
import EmpSelectBox from '../../components/feature/amaranth/employee/EmpSelectBox';
import { getNowJoinTime } from '../../util/time';
import { ko } from 'date-fns/esm/locale';
import LogInfo from './../../components/common/logInfo/LogInfo';
import SubmitButton from '../../components/common/button/SubmitButton';

import { isAfter } from 'date-fns';

import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const CATEGORY = useRef('회사');
  const kor = {
    sunday: '일',
    monday: '월',
    tuesday: '화',
    wednesday: '수',
    thursday: '목',
    friday: '금',
    saturday: '토',
    ok: '확인',
    today: '오늘',
    yesterday: '어제',
    last7Days: '지난 7일',
  };

  // 날짜 범위가 변경될 때 호출되는 콜백 함수
  const handleDateRangeChange = newDateRange => {
    setDateRange(newDateRange); // 새로운 날짜 범위로 상태 업데이트
  };

  const handleSelect = ranges => {
    // 선택한 날짜 범위 업데이트
    setDateRange([ranges.selection]);
    // setTimeout(() => {
    //   setShowDateRangePicker(!showDateRangePicker);
    // }, 1000);
  };

  const onChangeModalClose = () => {
    setModalOpen(false);
  };
  const ModalOpenButton = () => {
    setChangeHistoryOpenPost(!changeHistoryOpenPost);
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
    data.CATEGORY = CATEGORY.current;

    if (dateRange.length > 0) {
      if (dateRange[0] !== undefined && dateRange[1] !== undefined) {
        data.startDate = getNowJoinTime(dateRange[0]);
        data.endDate = getNowJoinTime(dateRange[1]);
      } else if (dateRange[0] !== undefined && dateRange[1] === undefined) {
        data.startDate = getNowJoinTime(dateRange[0]);
      }
    }
    const response = await authAxiosInstance(
      'system/user/groupManage/employee/',
      data
    );
    setCompanyList(response.data);
    console.log('변경검색1', data);
  };
  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
      <MainTitle mainTitle={'시스템 설정'} />
      <ContentWrapper>
        <Title titleName={'회사관리'}>
          <div class="button-container">
            <EventButton data={'변경이력'} onClickEvent={ModalOpenButton} />
          </div>
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
              <DateRangePicker
                placement={'bottomStart'}
                preventOverflow
                name="period"
                ranges={dateRange}
                onChange={handleDateRangeChange}
                size="sm"
                className="daterangepicker-container"
                placeholder="변경기간"
                disabledDate={date => isAfter(date, new Date())}
                locale={kor}
              />
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
                width={100}
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
                <SubmitButton
                  data={<i className="fa-solid fa-magnifying-glass" />}
                  width={'-10px'}
                  height={30}
                />
              </div>
            </SelectBoxWrapper>
          </form>
          <ChangeHistory
            onChangeModalClose={onChangeModalClose}
            CATEGORY={CATEGORY.current}
            layout={comPanyChangeHistoryLayout}
          />
        </Modal>
      )}
    </div>
  );
};

export default CompanyPage;
