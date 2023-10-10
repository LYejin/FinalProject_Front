import React, { useState } from 'react';
import Modal from './Modal';
import SelectBoxWrapper from '../../layout/amaranth/SelectBoxWrapper';
import { FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import ChangeHistorySelectCategory from './../../feature/ChangeHistory/box/ChangeHistorySelectCategory';
import EmpSelectBox from '../../feature/amaranth/employee/EmpSelectBox';
import ChangeHistory from '../../feature/ChangeHistory/ChangeHistory';
import Pagination from 'react-js-pagination';
import { authAxiosInstance } from '../../../axios/axiosInstance';
import { getNowJoinTime } from '../../../util/time';
import { ko } from 'date-fns/esm/locale';
import { useForm } from 'react-hook-form';
import { comPanyChangeHistoryLayout } from './../../feature/ChangeHistory/Realgrid-Data-ChangeHistory';

const ChangeHistoryModal = ({
  CATEGORY,
  changeHistoryOpenPost,
  setChangeHistoryOpenPost,
  layout,
  columnLabels,
}) => {
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

  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState(''); // 사용여부 select box state
  const [clickYN, setClickYN] = useState(true); // empBox click 여부
  const [changeFormData, setChangeFormData] = useState({}); // 변경된 form data
  const [companySelect, setCompanySelect] = useState(''); // select box 내 companySelect
  const [companyList, setCompanyList] = useState([]); // select box 내 company list

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
    data.CH_CATEGORY = CATEGORY;
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
    setPage(1);
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

  return (
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
        CATEGORY={CATEGORY}
        layout={layout}
        columnLabels={columnLabels}
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
  );
};

export default ChangeHistoryModal;
