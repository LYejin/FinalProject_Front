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
import {
  comPanyChangeHistoryLayout,
  companyLabels,
  empAndWorkChangeHistoryLayout,
} from '../../components/feature/ChangeHistory/Realgrid-Data-ChangeHistory';
import ChangeHistorySelectCategory from '../../components/feature/ChangeHistory/box/ChangeHistorySelectCategory';
import { authAxiosInstance } from '../../axios/axiosInstance';
import EmpSelectBox from '../../components/feature/amaranth/employee/EmpSelectBox';
import { getNowJoinTime } from '../../util/time';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { ko } from 'date-fns/esm/locale';

import Pagination from 'react-js-pagination';

import SubmitButton from '../../components/common/button/SubmitButton';

import { isAfter } from 'date-fns';

import { useRef } from 'react';
import ChangeHistoryModal from '../../components/common/modal/ChangeHistoryModal';

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
    saveBtn,
    editBtn,
    removeBtn,
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

  const listRef = useRef(null); // list 화면 상하단 이동
  const [insertCheck, setInsertCheck] = useState(null);

  const [dateRange, setDateRange] = useState([]);
  const CATEGORY = useRef('회사');

  const [endStartDate, setEndStartDate] = useState(null);
  const [endEndDate, setEndEndDate] = useState(null);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [endStart, setEndStart] = useState();
  const [endEnd, setEndEnd] = useState();

  const [changeHistoryGrid, setChangeHistoryGrid] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handlePageChange = page => {
    changeHistoryGrid.grid.setPage(page - 1);
    setPage(page);
  };

  const handleEndCalendarClick = () => {
    setIsEndOpen(!isEndOpen);
  };
  const setEndDate1 = data => {
    // console.log('데이트2', formatDate(endStartDate), formatDate(data));
    setEndStart(getNowJoinTime(endStartDate));
    setEndEnd(getNowJoinTime(data));
  };

  const handleDateReset = e => {
    console.log('변경(리셋)', endStartDate, e.key);
    setEndStartDate(null);
    setEndEndDate(null);
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
    setSelectCategory('');
    setCompanySelect('');
    setTotalPage(0);
    setPage(1);
    setEndStart(null);
    setEndEnd(null);
  }, [changeHistoryOpenPost]);

  const trimObjectProperties = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      }
    }
    return obj;
  };

  const onMasterGridSubmit = async data => {
    data.CH_CATEGORY = CATEGORY.current;
    console.log('companySelect', companySelect);
    if (endStart !== undefined && endEnd !== undefined) {
      data.startDate = endStart;
      data.endDate = endEnd;
    } else if (endStart !== undefined && endEnd === undefined) {
      data.startDate = endStart;
    }
    if (companySelect !== '') {
      const selectedValue = companySelect;

      // data 배열에서 선택한 값과 일치하는 객체를 찾습니다.
      const selectedCompany = companyList.find(
        company => company.co_CD === selectedValue
      );
      data.CHD_TARGET_CO_NM = selectedCompany.co_NM;
    }
    data = trimObjectProperties(data);

    const response = await authAxiosInstance.post(
      'system/admin/groupManage/ChangeHistorySearch',
      data
    );

    setTotalPage(response.data.length);
    changeHistoryGrid.grid.showProgress(); //데이터 로딩바 생성
    changeHistoryGrid.grid.cancel();
    changeHistoryGrid.provider.clearRows();
    changeHistoryGrid.grid.resetCurrent();
    changeHistoryGrid.grid.cancel();

    changeHistoryGrid.grid.closeProgress(); // 서버 데이터 로드 완료시 로딩바 제거
    changeHistoryGrid.provider.fillJsonData(response.data, {
      fillMode: 'set',
    });
    console.log('변경검색', data, companySelect);
    console.log('변경검색1', response.data);
  };

  const editBtnClickHeander = () => {
    if (editBtn?.current) {
      console.log('수정버튼(타냐1?)');
      editBtn?.current.click();
    } else if (formData?.co_CD === '') {
      console.log('수정버튼(타냐2?)');
    }
    console.log('수정버튼', formData);
  };
  const saveBtnClickHeander = () => {
    if (saveBtn?.current) {
      console.log('저장버튼(타냐1?)', formData);
      saveBtn?.current.click();
    }
    console.log('저장버튼(타냐2?)', formData);
  };
  const removeBtnClickHeander = () => {
    if (removeBtn?.current) {
      removeBtn?.current.click();
    }
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
            type="button"
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
            <span className="comlastSelectBoxTextPadding">회사</span>
            <TextFieldBox
              width={'200px'}
              SearchDataSet={SearchDataSet}
              searchData={searchData}
            />

            <button
              className="companySearchFFcustomButton"
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
              ch_listDataSet={ch_listDataSet}
              listData={listData}
              listDataSet={listDataSet}
              searchCompanyOnClick={searchCompanyOnClick}
              reSetData={reSetData}
              listRef={listRef}
            />
            <RightContentWrapper>
              <DetailTitle detailTitle={'기본정보'}>
                <div className="button-container">
                  {(formData?.co_CD !== '' && formData) || insertCheck ? (
                    <div>
                      <button
                        ref={editBtn}
                        className="companyWhiteButton"
                        onClick={() => {
                          editBtnClickHeander();
                        }}
                      >
                        저장
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        ref={saveBtn}
                        className="companyWhiteButton"
                        onClick={() => {
                          saveBtnClickHeander();
                        }}
                      >
                        저장
                      </button>
                    </div>
                  )}
                  <button
                    ref={removeBtn}
                    className="companyWhiteButton"
                    onClick={() => {
                      removeBtnClickHeander();
                    }}
                  >
                    삭제
                  </button>
                </div>
              </DetailTitle>
              <ScrollWrapper width={'100%'}>
                <CompanyInputBox
                  formData={formData}
                  formDataSet={formDataSet}
                  setInsertCheck={setInsertCheck}
                  insertCheck={insertCheck}
                  ch_listData={ch_listData}
                  ch_listDataSet={ch_listDataSet}
                  saveBtn={saveBtn}
                  editBtn={editBtn}
                  removeBtn={removeBtn}
                />
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
      {/* {changeHistoryOpenPost && (
        <Modal
          width={'1300px'}
          height={'600px'}
          title={'변경이력'}
          onClickEvent={ModalOpenButton}
        >
          <form onSubmit={handleSubmit(onMasterGridSubmit)}>
            <SelectBoxWrapper>
              <span className="searchModalSelectBoxPadding">변경일자</span>

              <div style={{ position: 'relative' }}>
                <input
                  className="companyFixedInputStyle"
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
              <div className="cancleDiv">
                {endStartDate && (
                  <button
                    type="button"
                    onClick={e => handleDateReset(e)}
                    className="companyCancelButton"
                  >
                    취소
                  </button>
                )}
              </div>

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
                width={190}
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
            changeHistoryGrid={changeHistoryGrid}
            setTotalPage={setTotalPage}
            ModalOpenButton={ModalOpenButton}
          />

          <Pagination
            activePage={page}
            totalItemsCount={totalPage}
            itemsCountPerPage={11}
            pageRangeDisplayed={5}
            prevPageText={'‹'}
            nextPageText={'›'}
            onChange={handlePageChange}
          />
        </Modal>
      )} */}
      {changeHistoryOpenPost && (
        <ChangeHistoryModal
          CATEGORY={CATEGORY.current}
          changeHistoryOpenPost={changeHistoryOpenPost}
          setChangeHistoryOpenPost={setChangeHistoryOpenPost}
          layout={comPanyChangeHistoryLayout}
          columnLabels={companyLabels}
        />
      )}
    </div>
  );
};

export default CompanyPage;
