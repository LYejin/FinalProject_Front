import React, { useEffect, useState } from 'react';

import {
  DetailTitle,
  MainTitle,
  ScrollWrapper,
  Title,
} from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
} from '../../components/layout/amaranth/Index';
import EmpSelectListWrapper from '../../components/feature/amaranth/employee/EmpSelectListWrapper';
import { EmpInfoBox } from '../../components/feature/amaranth/Index';
import { useForm } from 'react-hook-form';
import { getNowJoinTime } from '../../util/time';
import CommonLayout from '../../components/common/CommonLayout';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../../components/common/modal/Modal';
import EventButton from '../../components/common/button/EventButton';
import EmpSelectBox from '../../components/feature/amaranth/employee/EmpSelectBox';
import EmpCheckSelectBox from '../../components/feature/amaranth/employee/EmpCheckSelectBox';
import { onChangePhoneNumber } from '../../util/number';
import { useRef } from 'react';
import CommonLayout2 from '../../components/common/CommonLayout2';

import FundTypeSelectBoxUSEYN from '../../components/feature/amaranth/fundType/Box/FundTypeSelectBoxUSEYN';
import FundTypeSelectBoxWrapper from '../../components/feature/amaranth/fundType/Box/SelectBoxWrapper';
import FundTypeRidoButton from '../../components/feature/amaranth/fundType/Box/FundTypeRidoButton';
import SubmitButton from '../../components/common/button/SubmitButton';
import FundTypeSelectCashFG from '../../components/feature/amaranth/fundType/Box/FundTypeSelectCashFG';
import RealGrid from '../../components/feature/amaranth/fundType/FuntTypeRealGrid';
import FundTypeWidthView from '../../components/feature/amaranth/fundType/FundTypeWidthView';
import FundTypeSearch from '../../components/feature/amaranth/fundType/FundTypeSearch';
import { authAxiosInstance } from '../../axios/axiosInstance';
import FundTypeModel from '../../components/feature/amaranth/fundType/model/FundTypeModel';
import FundTypeModal from '../../components/feature/amaranth/fundType/Modal/FundTypeModal';

const FundTypePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
  } = useForm({
    mode: 'onChange',
  }); // react-hook-form 사용
  const [empList, setEmpList] = useState([]); // 사원 리스트
  const [clickYN, setClickYN] = useState(true); // empBox click 여부
  const [isLoading, setIsLoading] = useState(false); // loading 관리
  const [insertButtonClick, setInsertButtonClick] = useState(false); // insert button click을 했는지 아닌지
  const [openDate, setOpenDate] = useState(new Date()); // 개업일 선택 상태 관리
  const [onChangeForm, setChangeForm] = useState(false); // 폼 변경 사항 확인
  const [selectedRadioValue, setSelectedRadioValue] = useState(''); //radio 값
  const [address, setAddress] = useState(''); // 우편 주소
  const [addressDetail, setAddressDetail] = useState(); // 주소
  const [isOpenPost, setIsOpenPost] = useState(false); // 우편번호 모달창
  const [image, setImage] = useState(); // image axios
  const [imgFile, setImgFile] = useState(); // 순수 image file
  const [data, setData] = useState({}); // form 데이터들 보관
  const [companyList, setCompanyList] = useState([]); // select box 내 company list
  const [enrlList, setEnrlList] = useState([]); // 재직구분 selectbox 값
  const [errorName, setErrorName] = useState(); // error name 얻기
  const [imgPriviewFile, setImgPriviewFile] = useState(); // image 미리보기
  const [username, setUsername] = useState(); // update를 위한 username 저장
  const [changeFormData, setChangeFormData] = useState({}); // 변경된 form data
  const [company, setCompany] = useState(''); // Infobox 내 company select
  const [workplaceList, setWorkplaceList] = useState(''); // Infobox workplaceList
  const [fixEnrlList, setFixEnrlList] = useState([]); // 백 전송을 위해 변경된 enrlList
  const [companySelect, setCompanySelect] = useState(''); // select box 내 companySelect
  const [workplaceSelect, setWorkplaceSelect] = useState(''); // Info box 내 workplace select
  const [infoBoxEnrlData, setInfoBoxEnrlData] = useState(''); // Info box 내 enrl 재직구분 데이터
  const listRef = useRef(null); // list 화면 상하단 이동
  const [emailPersonalData, setEmailPersonalData] = useState(''); // email drop box 데이터
  const [emailSalaryData, setEmailSalaryData] = useState(''); // email drop box 데이터
  const [checkDBErrorYN, setCheckDBErrorYN] = useState({
    emp_CD_ERROR: false,
    username_ERROR: false,
    email_ADD_ERROR: false,
  }); // check db error YN
  const [selectUseYN, setSelectUseYN] = useState('여'); // 사용여부 select box state
  const [selectCashFG, setSelectCashFG] = useState(''); // 사용여부 select box state
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedViewOption, setSelectedViewOption] = useState('세로형태조회');
  const {
    loadRowData,
    CASH_CD,
    setCASH_CD,
    LEVEL_CD,
    setLEVEL_CD,
    marsterGrid,
    setMarsterGrid,
    searchGrid,
    setSearchGrid,
    checkList,
    setCheckList,
    deleteBtnClick,
    excelExport,
    excelImport,
    setMenuGrid,
    inputData,
    setInputData,
    loadTreeRowData,
    highFundsList,
    reqCASH_CD,
    setreqCASH_CD,
  } = FundTypeModel();

  React.useEffect(() => {
    setValue('USE_YN', '');
    setValue('CASH_FG', '');
    setValue('CASH_CD', '');
    setValue('searchData', '');
    setValue('TYPE_NM', '');
    console.log('서치 데이터', getValues());
    const marsterRowValues = marsterGrid?.grid.getValues(
      marsterGrid?.grid.getCurrent().itemIndex
    );
    if (
      marsterRowValues?.SUM_CD === undefined &&
      marsterRowValues?.SUM_NM === undefined &&
      !isOpenPost
    ) {
      if (!reqCASH_CD) {
        console.log('확인용(페이지)');
        marsterGrid?.grid.setCurrent({
          dataRow: marsterGrid?.grid.getCurrent().dataRow,
          column: 'SUM_CD',
        });
        marsterGrid?.grid.setFocus();
      } else {
        marsterGrid?.grid.setCurrent({
          dataRow: marsterGrid?.grid.getCurrent().dataRow,
          column: 'CASH_CD',
        });
        marsterGrid?.grid.setFocus();
      }
    }
  }, [isOpenPost]);

  const handleOptionChange = option => {
    console.log('라디오', option);
    setSelectedOption(option);
  };

  const handleViewOptionChange = option => {
    setSelectedViewOption(option);
  };

  const trimObjectProperties = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      }
    }
    return obj;
  };

  const onMasterGridSubmit = async SearchData => {
    console.log('마스터서브밋', SearchData);
    SearchData = trimObjectProperties(SearchData);

    marsterGrid.grid.showProgress(); //데이터 로딩바 생성
    marsterGrid.grid.cancel();
    marsterGrid.provider.clearRows();
    marsterGrid.grid.resetCurrent();
    marsterGrid.grid.cancel();
    loadRowData(SearchData)
      .then(lodaData => {
        marsterGrid.grid.closeProgress(); // 서버 데이터 로드 완료시 로딩바 제거
        marsterGrid.provider.fillJsonData(lodaData, {
          fillMode: 'set',
        });
        //마지막행에 항상 빈 행을 추가하는 기능
        marsterGrid.grid.setEditOptions({ displayEmptyEditRow: true });
        //뷰 마운트 시 커서 포커스를 마지막 행 첫번째 셀에 위치하게 설정
        marsterGrid.grid.setCurrent({
          itemIndex: marsterGrid.provider.getRowCount(),
          column: 'CASH_FG',
        });
        marsterGrid.grid.setFocus();
      })
      .catch(error => {
        console.error(error);
      });
  };
  const onSearchGridSubmit = async SearchData => {
    SearchData.CASH_FG = selectedOption;
    SearchData = trimObjectProperties(SearchData);
    console.log('라디오!!!!!', SearchData, selectUseYN);
    searchGrid.grid.showProgress(); //데이터 로딩바 생성
    searchGrid.grid.cancel();
    searchGrid.provider.clearRows();
    searchGrid.grid.resetCurrent();
    searchGrid.grid.cancel();
    loadRowData(SearchData)
      .then(loadData => {
        console.log('검색전', CASH_CD, loadData);
        if (CASH_CD !== undefined) {
          loadData = loadData.filter(item => CASH_CD !== item.CASH_CD);
        }
        console.log('검색후', CASH_CD, loadData);
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

  // 우편번호
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
    setSelectUseYN('여');
    setSelectedOption('');
  };

  // 우편번호 검색 시 처리
  const onCompletePost = data => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setChangeFormData({
      ...changeFormData,
      zipcode: data.zonecode,
      addr: fullAddr,
    });
    setIsOpenPost(false);
  };

  // radio
  const handleRadioChange = e => {
    setSelectedRadioValue(e.target.value);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // 개업일 선택 시 처리 함수
  const handleOpenDateChange = date => {
    console.log(date);
    setOpenDate(date);
    setChangeFormData({
      ...changeFormData,
      join_DT: getNowJoinTime(date),
    });
  };

  const resetData = () => {
    setData({
      username: '',
      password: '',
      kor_NM: '',
      email_ADD: '',
      gender_FG: '',
      emp_CD: '',
      enrl_FG: '',
      join_DT: '',
      personal_MAIL: '',
      personal_MAIL_CP: '',
      salary_MAIL: '',
      tel: '',
      home_TEL: '',
      zipcode: '',
      addr: '',
      addr_NUM: '',
    });
  };

  // Company co_CD 변경 시 Workplace select box 정보 수정

  // 사원 리스트 얻는 axios

  // 회사 리스트 얻는 axios
  const getCompanyList = async () => {
    const response = await authAxiosInstance(
      'system/user/groupManage/employee/getCompanyList'
    );
    setCompanyList(response.data);
  };

  // click 시 사원 정보 가져오기 이벤트
  const onClickDetailEmpInfo = async (kor_NM, username) => {
    setChangeForm(false);
    setChangeFormData();
    setEmailPersonalData('');
    setEmailSalaryData('');
    reset();
    setImgFile();
    setImgPriviewFile();
    setAddress();
    setAddressDetail();
    if (onChangeForm === true) {
      alert('작성중인 내용이 있습니다. 취소하시겠습니까?');
    }
    console.log('kornm : ', kor_NM, 'username : ', username);
    setIsLoading(true);
    setInsertButtonClick(false);
    setClickYN(true);
    const response = await authAxiosInstance.post(
      'system/user/groupManage/employee/empDetail',
      {
        username: username,
      }
    );
    setData(response.data);
    console.log(response.data);
    setSelectedRadioValue(response.data.gender_FG);
    setOpenDate(new Date(response.data.join_DT) || '');
    setImgFile(response.data.pic_FILE_ID);
    setIsLoading(false);
    setUsername(response.data.username);
    setCompany(response.data.co_CD);
    setInfoBoxEnrlData(response.data.enrl_FG);
    setWorkplaceSelect(response.data?.div_CD);
    response.data.home_TEL &&
      setValue('home_TEL', onChangePhoneNumber(response.data.home_TEL));
    response.data.tel &&
      setValue('tel', onChangePhoneNumber(response.data.tel));
  };

  // 조건 검색 버튼
  const onClickSearchEmpList = () => {
    const { name } = getValues();
    const params = {};

    if (name !== '') {
      params.NAME = name;
    }
    if (fixEnrlList.length > 0) {
      params.ENRL_FG = fixEnrlList.join(',');
    }
    if (companySelect !== '') {
      params.CO_CD = companySelect;
    }

    authAxiosInstance('system/user/groupManage/employee/getList', {
      params,
    }).then(response => {
      setEmpList(response.data);
    });
  };

  // form 상태 change 되었는지 확인
  const onChangeFunction = e => {
    setChangeForm(true);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // 사원 insert 이벤트
  const onClickInsertEmpBox = () => {
    reset();
    resetData();
    setEmailPersonalData('');
    setEmailSalaryData('');
    setCompany(companyList[0].co_CD);
    setImgPriviewFile();
    setOpenDate(new Date());
    setInsertButtonClick(true);
    setClickYN(false);
    setSelectedRadioValue('W');
    setAddress();
    setAddressDetail();
    setWorkplaceSelect();
    setWorkplaceList('');
    setImage();
    setImgFile();
    console.log('djhijsidjofijsdoifj', workplaceList[0]?.div_CD);
    setInfoBoxEnrlData(0);
    setUsername('');
  };

  // 에러 처리 이벤트
  const onFocusError = e => {
    const errorList = Object.keys(errors);
    if (errorList.indexOf('emp_CD') < 0 && errorList.indexOf('co_CD') > -1) {
      setErrorName('co_CD');
    } else if (
      errorList.indexOf('emp_CD') < 0 &&
      errorList.indexOf('div_CD') > -1
    ) {
      setErrorName('div_CD');
    } else if (
      errorList.indexOf('emp_CD') < 0 &&
      errorList.indexOf('enrl_FG') > -1
    ) {
      setErrorName('enrl_FG');
    } else {
      setErrorName(e.target.name);
    }
  };

  //select box event
  const handleCheckSelectChange = event => {
    const {
      target: { value },
    } = event;
    setFixEnrlList(typeof value === 'string' ? value.split(',') : value);
    setEnrlList(typeof value === 'string' ? value.split(',') : value);
  };

  // 전화번호 실시간 010-0000-000 change
  const onChangeTel = e => {
    // 입력된 값을 숫자만 남기도록 정제합니다.
    const tel = e.target.value.replace(/\D/g, '');
    // 정제된 숫자를 원하는 전화번호 형식으로 변환합니다.
    const formattedPhoneNumber = onChangePhoneNumber(tel);

    setValue('tel', formattedPhoneNumber);
  };

  // 전화번호(집) 실시간 010-0000-000 change
  const onChangeHomeTel = e => {
    // 입력된 값을 숫자만 남기도록 정제합니다.
    const tel = e.target.value.replace(/\D/g, '');
    const formattedPhoneNumber = onChangePhoneNumber(tel);

    setValue('home_TEL', formattedPhoneNumber);
  };

  // drop box 선택시 personal_MAIL_CP 값 변경
  const onChangePersonalMAIL = value => {
    value === ''
      ? setValue('personal_MAIL_CP', '')
      : setValue('personal_MAIL_CP', value);
  };

  // drop box 선택시 salary_MAIL_CP 값 변경
  const onChangeSalaryMAIL = value => {
    value === ''
      ? setValue('salary_MAIL_CP', '')
      : setValue('salary_MAIL_CP', value);
  };

  // onChange 시 DB 내 동일한 데이터 검사
  const onChangeDBDataSearch = async e => {
    let params = {};
    console.log('=============', changeFormData);
    if (e.target.name === 'emp_CD') {
      params.CO_CD = company;
      params.EMP_CD = e.target.value;
      await authAxiosInstance(
        `system/user/groupManage/employee/getEmpCDInWorkplace`,
        { params }
      ).then(response => {
        console.log(response.data);
        response.data &&
          setError('emp_CD', { message: '사번이 중복되었습니다.' });
        if (response.data) {
          console.log('hiiiiiiii');
          setCheckDBErrorYN({ ...checkDBErrorYN, emp_CD_ERROR: true });
        } else {
          setCheckDBErrorYN({ ...checkDBErrorYN, emp_CD_ERROR: false });
          delete errors.emp_CD;
        }
      });
    } else if (e.target.name === 'username') {
      params.USERNAME = e.target.value;
      await authAxiosInstance(
        `system/user/groupManage/employee/getUsernameInCompany`,
        { params }
      ).then(response => {
        console.log(response.data);
        response.data &&
          setError('username', { message: 'ID가 중복되었습니다.' });
        if (response.data) {
          setCheckDBErrorYN({ ...checkDBErrorYN, username_ERROR: true });
        } else {
          setCheckDBErrorYN({ ...checkDBErrorYN, username_ERROR: false });
          delete errors.username;
        }
      });
    } else if (e.target.name === 'email_ADD') {
      params.EMAIL_ADD = e.target.value;
      await authAxiosInstance(
        `system/user/groupManage/employee/getEmailInCompany`,
        {
          params,
        }
      ).then(response => {
        console.log(response.data);
        response.data &&
          setError('email_ADD', { message: 'ID가 중복되었습니다.' });
        if (response.data) {
          setCheckDBErrorYN({ ...checkDBErrorYN, email_ADD_ERROR: true });
        } else {
          setCheckDBErrorYN({ ...checkDBErrorYN, email_ADD_ERROR: false });
          delete errors.email_ADD;
        }
      });
    }
    console.log('checkDBErrorYN : ', checkDBErrorYN);
  };

  console.log('errors', errors);
  console.log(changeFormData);
  console.log(checkDBErrorYN);
  // console.log(data);
  // console.log(onChangeForm);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@', company);

  return (
    <>
      <CommonLayout2>
        <MainTitle mainTitle={'회계관리'} />
        <ContentWrapper>
          <Title titleName={'자금과목설정'}>
            {' '}
            <button
              className="changeHistoryWhiteButton"
              onClick={() => deleteBtnClick()}
            >
              삭제
            </button>
          </Title>
          <DetailContentWrapper>
            <form
              onSubmit={handleSubmit(onMasterGridSubmit)}
              onChange={onChangeFunction}
            >
              <SelectBoxWrapper>
                <span className="searchModalSelectBoxPadding">수지구분</span>
                <FundTypeSelectCashFG
                  width={'calc(0% - -100px)'}
                  state={selectCashFG}
                  setState={setSelectCashFG}
                  clickYN={clickYN}
                  register={register}
                  errors={errors}
                  errorName={errorName}
                  total={true}
                  setChangeFormData={setChangeFormData}
                />

                <span className="leftSelectBoxPadding">용도</span>
                {selectedViewOption === '세로형태조회' ? (
                  <input
                    type="text"
                    className="textInputBox"
                    {...register('TYPE_NM')}
                  />
                ) : (
                  <input type="text" className="textInputBox" disabled />
                )}

                <span className="lastSelectBoxTextPadding">자금조회방식</span>
                <FundTypeRidoButton
                  options={['세로형태조회', '가로형태조회']}
                  selectedOption={selectedViewOption}
                  onOptionChange={handleViewOptionChange}
                  register={register}
                />
                <div className="selectBoxButtonWrapper">
                  <button type="submit" className="companyFFcustomButton">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </SelectBoxWrapper>
            </form>
            <MainContentWrapper>
              {selectedViewOption === '세로형태조회' ? (
                <RealGrid
                  onChangeOpenPost={onChangeOpenPost}
                  loadRowData={loadRowData}
                  setCASH_CD={setCASH_CD}
                  setLEVEL_CD={setLEVEL_CD}
                  setMarsterGrid={setMarsterGrid}
                  setCheckList={setCheckList}
                  deleteBtnClick={deleteBtnClick}
                  excelExport={excelExport}
                  excelImport={excelImport}
                  setMenuGrid={setMenuGrid}
                  setInputData={setInputData}
                  highFundsList={highFundsList}
                />
              ) : (
                <FundTypeWidthView
                  loadTreeRowData={loadTreeRowData}
                  excelExport={excelExport}
                  excelImport={excelImport}
                  setMenuGrid={setMenuGrid}
                />
              )}
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
      {isOpenPost ? (
        <div className="ModalContainer">
          <FundTypeModal
            width={'720px'}
            height={'750px'}
            title={'자금과목코드도움'}
            onClickEvent={onChangeOpenPost}
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
                  errors={errors}
                  errorName={errorName}
                  total={true}
                  setChangeFormData={setChangeFormData}
                />
                <input
                  type="text"
                  className="searchModalTextInputBox"
                  Placeholder="검색어 입력"
                  {...register('searchData')}
                />
                <span className="searchModalSelectBoxPadding">수지구분</span>
                <FundTypeRidoButton
                  options={['', '지출', '수입']}
                  defultValue={'전체'}
                  selectedOption={selectedOption}
                  onOptionChange={handleOptionChange}
                  register={register}
                />
                <div className="selectBoxButtonWrapper">
                  <button type="submit" className="companySearchFFcustomButton">
                    <i className="fa-solid fa-magnifying-glass" />
                  </button>
                </div>
              </FundTypeSelectBoxWrapper>
            </form>
            <FundTypeSearch
              loadRowData={loadRowData}
              LEVEL_CD={LEVEL_CD}
              CASH_CD={CASH_CD}
              onChangeOpenPost={onChangeOpenPost}
              marsterGrid={marsterGrid}
              setMarsterGrid={setMarsterGrid}
              setSearchGrid={setSearchGrid}
              excelExport={excelExport}
              excelImport={excelImport}
              setMenuGrid={setMenuGrid}
              inputData={inputData}
              setreqCASH_CD={setreqCASH_CD}
            />
          </FundTypeModal>
        </div>
      ) : null}
    </>
  );
};

export default FundTypePage;
