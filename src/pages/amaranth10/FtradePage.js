import { useEffect, useState } from 'react';
import { authAxiosInstance } from '../../axios/axiosInstance';
import { MainTitle, ScrollWrapper, Title } from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
} from '../../components/layout/amaranth/Index';
import { useForm } from 'react-hook-form';
import { getNowJoinTime } from '../../util/time';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../../components/common/modal/Modal';
import EventButton from '../../components/common/button/EventButton';
import { onChangePhoneNumber } from '../../util/number';
import { useRef } from 'react';
import CommonLayout2 from '../../components/common/CommonLayout2';
import SelectListWrapperCommon from '../../components/layout/amaranth/SelectListWrapperCommon';
import GtradeListBoxItem from '../../components/feature/amaranth/employee/GtradeListBoxItem';
import FtradeInfoBox from '../../components/feature/amaranth/employee/FtradeInfoBox';
import SelectBoxUSEYN from '../../components/common/box/SelectBoxUSEYN';

const FtradePage = () => {
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
  const [closeDate, setCloseDate] = useState(new Date()); // 개업일 선택 상태 관리
  const [onChangeForm, setChangeForm] = useState(false); // 폼 변경 사항 확인
  const [selectedRadioValue, setSelectedRadioValue] = useState(''); //radio 값
  const [address, setAddress] = useState(''); // 우편 주소
  const [addressDetail, setAddressDetail] = useState(); // 주소
  const [isOpenPost, setIsOpenPost] = useState(false); // 우편번호 모달창
  const [data, setData] = useState({}); // form 데이터들 보관
  const [errorName, setErrorName] = useState(); // error name 얻기
  const [tr_CD, setTR_CD] = useState(); // update를 위한 username 저장
  const [changeFormData, setChangeFormData] = useState({}); // 변경된 form data
  const [company, setCompany] = useState(''); // Infobox 내 company select
  const [useYN, setUseYN] = useState(''); // 사용여부 select box state
  const [selectUseYN, setSelectUseYN] = useState(''); // 사용여부 select box state
  const listRef = useRef(null); // list 화면 상하단 이동
  const [checkDBErrorYN, setCheckDBErrorYN] = useState({
    emp_CD_ERROR: false,
    username_ERROR: false,
    email_ADD_ERROR: false,
  }); // check db error YN

  // 우편번호
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
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
      zip: data.zonecode,
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
      fstart_DT: getNowJoinTime(date),
    });
  };

  // 폐업일 선택 시 처리 함수
  const handleCloseDateChange = date => {
    console.log(date);
    setCloseDate(date);
    setChangeFormData({
      ...changeFormData,
      fend_DT: getNowJoinTime(date),
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
  // useEffect(() => {
  //   authAxiosInstance(
  //     `system/user/groupManage/employee/getWorkplace?CO_CD=${company}`
  //   ).then(response => {
  //     setWorkplaceList(response.data);
  //     setWorkplaceSelect(
  //       response.data[0]?.div_CD ? response.data[0]?.div_CD : null
  //     );
  //     response.data[0]?.div_CD && setValue('div_CD', response.data[0]?.div_CD);
  //   });
  // }, [company]);

  // 사원 리스트 얻는 axios
  const getEmpList = async emp => {
    const response = await authAxiosInstance(
      'accounting/user/Strade/getSFtradeList'
    );
    console.log(response.data);
    setEmpList(response?.data);
    if (clickYN && !insertButtonClick) {
      console.log('^^^^^^^^^^^^^^^^^^^^^^^');
      setTR_CD(response.data[0]?.tr_CD);
      setData(response?.data[0]);
      setUseYN(response.data[0]?.use_YN);
      setSelectedRadioValue(response.data[0]?.gender_FG);
      setCompany(response.data[0]?.co_CD);
    }
  };

  useEffect(() => {
    getEmpList();
    setChangeForm(false);
  }, []);

  // click 시 사원 정보 가져오기 이벤트
  const onClickDetailSGtradeInfo = async tr_CD => {
    setChangeForm(false);
    setChangeFormData();
    reset();
    setAddress();
    setAddressDetail();
    if (onChangeForm === true) {
      alert('작성중인 내용이 있습니다. 취소하시겠습니까?');
    }
    console.log('tr_CD : ', tr_CD);
    setIsLoading(true);
    setInsertButtonClick(false);
    setClickYN(true);
    const params = {};
    params.TR_CD = tr_CD;

    const response = await authAxiosInstance(
      'accounting/user/Strade/sftradeDetail',
      {
        params,
      }
    );
    setData(response?.data);
    console.log(response.data);
    setSelectedRadioValue(response.data?.gender_FG);
    setOpenDate(new Date(response.data?.fstart_DT) || '');
    setCloseDate(new Date(response.data?.fend_DT) || '');
    setIsLoading(false);
    setUseYN(response.data?.use_YN);
    setTR_CD(response.data?.tr_CD);
    setCompany(response.data.co_CD);
    response.data.home_TEL &&
      setValue('home_TEL', onChangePhoneNumber(response.data.home_TEL));
    response.data.tel &&
      setValue('tel', onChangePhoneNumber(response.data.tel));
  };

  // 조건 검색 버튼
  const onClickSearchEmpList = () => {
    const { select_TR_CD, select_TR_NM, select_BA_NB_TR } = getValues();
    console.log(select_TR_CD, select_TR_NM, select_BA_NB_TR, selectUseYN);
    const params = {};

    if (select_TR_CD !== '') {
      params.TR_CD = select_TR_CD;
    }
    if (select_TR_NM !== '') {
      params.TR_NM = select_TR_NM;
    }
    if (select_BA_NB_TR !== '') {
      params.BA_NB_TR = select_BA_NB_TR;
    }
    if (selectUseYN !== '') {
      params.USE_YN = selectUseYN;
    }

    authAxiosInstance('accounting/user/Strade/getSFtradeList', {
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
    setOpenDate(new Date());
    setCloseDate();
    setInsertButtonClick(true);
    setClickYN(false);
    setAddress();
    setAddressDetail();
    setTR_CD('');
    setUseYN('1');
  };

  // 사원 remove 이벤트
  const onClickButtonRemoveEmp = async () => {
    await authAxiosInstance.post('system/user/groupManage/employee/empRemove', {
      kor_NM: data.kor_NM,
      username: data.username,
    });
    setClickYN(true);
    setChangeForm(false);
    getEmpList();
    setTR_CD(empList[0].tr_CD);
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
    alert('사원정보가 비활성화되었습니다.');
  };

  // 사원 submit button(update, insert) 이벤트
  const onSubmit = async data => {
    const getJoinDT = getNowJoinTime(openDate);

    console.log(checkDBErrorYN);
    checkDBErrorYN.emp_CD_ERROR &&
      setError('emp_CD', { message: '사번이 중복되었습니다.' });
    checkDBErrorYN.username_ERROR &&
      setError('username', { message: 'ID가 중복되었습니다.' });
    checkDBErrorYN.email_ADD_ERROR &&
      setError('email_ADD', { message: 'ID가 중복되었습니다.' });

    // 사원 update 중일 때 저장버튼 기능
    if (
      clickYN &&
      !insertButtonClick &&
      Object.keys(changeFormData).length > 0
    ) {
      console.log('update 버튼');
      console.log(changeFormData);
      // if (changeFormData && Object.keys(changeFormData).includes('home_TEL')) {
      //   changeFormData.home_TEL = changeFormData.home_TEL.replace(/-/g, '');
      // }
      // if (changeFormData && Object.keys(changeFormData).includes('tel')) {
      //   changeFormData.tel = changeFormData.tel.replace(/-/g, '');
      // }
      // formData.append(
      //   'userData',
      //   new Blob([JSON.stringify({ ...changeFormData, username: username })], {
      //     type: 'application/json',
      //   })
      // );

      const responseUpdate = await authAxiosInstance.post(
        'accounting/user/Strade/stradeUpdate',
        { ...changeFormData, tr_CD: tr_CD, tr_FG: '3' }
      );
      console.log(responseUpdate.data);
      const responseGetList = await authAxiosInstance(
        `accounting/user/Strade/getSFtradeList`
      );
      setEmpList(responseGetList.data);
      setChangeForm(false);
      setChangeFormData();
      alert('사원정보가 수정되었습니다.');
    } else if (
      clickYN &&
      !insertButtonClick &&
      Object.keys(changeFormData).length === 0
    ) {
      alert('사원정보가 수정된 정보가 없습니다.');
    }

    // 사원 insert 중일 때 저장버튼 기능
    if (!clickYN && insertButtonClick && Object.keys(errors).length === 0) {
      const userData = {
        tr_CD: data?.tr_CD,
        tr_NM: data?.tr_NM,
        tr_FG: '3',
        use_YN: '1',
        view_YN: '0',
        fstart_DT: getJoinDT || null,
        fend_DT: getJoinDT || null,
        ba_NB_TR: data?.ba_NB_TR,
        depositor: data?.depositor,
        depositor_NM: data?.depositor_NM,
        account_OPEN_BN: data?.account_OPEN_BN,
        bank_CD: data?.bank_CD,
      };

      setTR_CD(data?.tr_CD);
      setData(userData);
      setCompany(company);

      console.log('insert 버튼');
      console.log(userData);
      const response = await authAxiosInstance.post(
        'accounting/user/Strade/stradeInsert',
        userData
      );
      console.log(response.data);
      setEmpList([
        ...empList,
        {
          tr_CD: data?.tr_CD,
          tr_NM: data?.tr_NM,
          BA_NB_TR: data?.BA_NB_TR,
        },
      ]);
      alert('사원이 추가되었습니다.');
      reset();
      setChangeForm(false);
      setChangeFormData();
      setInsertButtonClick(false);
      setClickYN(true);
      console.log(listRef.current.scrollHeight);
      if (listRef.current) {
        listRef.current.scrollTop = 3000;
      }
      console.log(listRef.current.scrollHeight);
      console.log(listRef.current.scrollTop);
    } else if (
      !clickYN &&
      insertButtonClick &&
      Object.keys(errors).length > 0
    ) {
      alert('중복된 값이 존재합니다.');
    }
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
          <Title titleName={'금융거래처등록'}></Title>
          <DetailContentWrapper>
            <SelectBoxWrapper height="50px" width="1200px">
              <span className="rightSelectBoxPadding">거래처코드</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_TR_CD')}
              />
              <span className="leftSelectBoxPadding">거래처명</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_TR_NM')}
              />
              <span className="lastSelectBoxTextPadding">계좌/가맹점번호</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_BA_NB_TR')}
              />
              <div className="leftSelectBoxPadding">사용여부</div>
              <SelectBoxUSEYN
                width={'80px'}
                state={selectUseYN}
                setState={setSelectUseYN}
                clickYN={clickYN}
                register={register}
                errors={errors}
                errorName={errorName}
                total={true}
                setChangeFormData={setChangeFormData}
              />
              <div className="selectBoxButtonWrapper">
                <EventButton
                  data={<i className="fa-solid fa-magnifying-glass"></i>}
                  width={'-10px'}
                  height={30}
                  onClickEvent={onClickSearchEmpList}
                />
              </div>
            </SelectBoxWrapper>
            <MainContentWrapper>
              <SelectListWrapperCommon
                width={'295px'}
                title={'거래처'}
                listRef={listRef}
                dataCount={empList.length}
                clickedBoxID={tr_CD}
                data={empList}
                clickInsertBoxEvent={onClickInsertEmpBox}
              >
                {empList.map(info => (
                  <GtradeListBoxItem
                    key={info.tr_CD}
                    //clickedBoxID={clickedBoxID}
                    leftTop={info?.tr_CD}
                    rightTop={info?.tr_NM}
                    leftBottom={info?.ba_NB_TR}
                    clickBoxEvent={onClickDetailSGtradeInfo}
                  />
                ))}
              </SelectListWrapperCommon>
              <RightContentWrapper>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onChange={onChangeFunction}
                >
                  <div className="tableHeader">
                    <div className="defaultTitle">기본등록사항</div>
                    <div className="buttonWrapper">
                      <button type="submit" className="WhiteButton">
                        저장
                      </button>
                      <button
                        type="button"
                        className="WhiteButton"
                        onClick={onClickButtonRemoveEmp}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <ScrollWrapper width={'900px'}>
                    <FtradeInfoBox
                      data={data || []}
                      onChangeOpenPost={onChangeOpenPost}
                      register={register}
                      setOpenDate={setOpenDate}
                      openDate={openDate}
                      selectedValue={selectedRadioValue}
                      handleRadioChange={handleRadioChange}
                      address={address}
                      addressDetail={addressDetail}
                      errors={errors}
                      clickYN={clickYN}
                      onFocusError={onFocusError}
                      errorName={errorName}
                      handleOpenDateChange={handleOpenDateChange}
                      handleCloseDateChange={handleCloseDateChange}
                      closeDate={closeDate}
                      setCompany={setCompany}
                      company={company}
                      onChangeTel={onChangeTel}
                      onChangeHomeTel={onChangeHomeTel}
                      getValues={getValues}
                      setChangeFormData={setChangeFormData}
                      onChangePersonalMAIL={onChangePersonalMAIL}
                      onChangeSalaryMAIL={onChangeSalaryMAIL}
                      onChangeDBDataSearch={onChangeDBDataSearch}
                      setError={setError}
                      clearErrors={clearErrors}
                      checkDBErrorYN={checkDBErrorYN}
                      useYN={useYN}
                      setUseYN={setUseYN}
                      tr_CD={tr_CD}
                    />
                  </ScrollWrapper>
                </form>
              </RightContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
      {isOpenPost ? (
        <Modal
          width={'560px'}
          height={'600px'}
          title={'우편번호'}
          onClickEvent={onChangeOpenPost}
        >
          <DaumPostcode autoClose onComplete={onCompletePost} />
        </Modal>
      ) : null}
    </>
  );
};

export default FtradePage;
