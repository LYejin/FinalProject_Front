import React, { useEffect, useRef, useState } from 'react';
import { getNowJoinTime } from '../util/time';
import { authAxiosInstance, imageAxiosInstance } from '../axios/axiosInstance';
import { onChangePhoneNumber } from '../util/number';
import Swal from 'sweetalert2';

const EmployeeModel = ({
  register,
  handleSubmit,
  reset,
  getValues,
  errors,
  clearErrors,
  setValue,
  setFocus,
  setError,
}) => {
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
  const [deptModal, setDeptModal] = useState(''); // Info box 내 enrl 재직구분 데이터
  const listRef = useRef(null); // list 화면 상하단 이동
  const [emailPersonalData, setEmailPersonalData] = useState(''); // email drop box 데이터
  const [emailSalaryData, setEmailSalaryData] = useState(''); // email drop box 데이터
  const [checkDBErrorYN, setCheckDBErrorYN] = useState({
    emp_CD_ERROR: false,
    username_ERROR: false,
    email_ADD_ERROR: false,
  }); // check db error YN
  // 부서 모달창 내 정보 가져오기
  const [selectedDeptCd, setSelectedDeptCd] = useState('');
  const [selectedDivCd, setSelectedDivCd] = useState('');
  const [selectedDeptNm, setSelectedDeptNm] = useState('');
  const [selectedDivNm, setSelectedDivNm] = useState('');
  const [deptAndDivData, setDeptAndDivData] = useState('');
  const [deptAndDivDataChangeYN, setDeptAndDivDataChangeYN] = useState(false);

  // 변경이력
  const [changeHistoryOpenPost, setChangeHistoryOpenPost] = useState(false);
  const [endStartDate, setEndStartDate] = useState(null);
  const [endEndDate, setEndEndDate] = useState(null);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const CATEGORY = useRef('사원');
  console.log('--------------', selectedDeptCd);

  const ModalOpenButton = () => {
    setChangeHistoryOpenPost(!changeHistoryOpenPost);
    setIsEndOpen(false);
    setEndStartDate();
    setEndEndDate();
  };

  const onKeyDownEmp = e => {
    if (e.key === 'Insert') {
      onSubmit();
    }
    if (e.key === 'Delete' || e.keyCode === 46) {
      onClickButtonRemoveEmp();
    }
  };

  // 이미지 삭제
  const handleImageRemove = () => {
    setImgFile();
    setImage();
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      pic_FILE_ID: '',
    }));
  };

  // 부서 모달 처리
  const onChangeOpenDeptModal = () => {
    setDeptModal(!deptModal);
  };

  // 부서 변화 여부
  const onChangeDept = () => {
    setDeptAndDivDataChangeYN(!deptAndDivDataChangeYN);
  };

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
  useEffect(() => {
    authAxiosInstance(
      `system/user/groupManage/employee/getWorkplace?CO_CD=${company}`
    ).then(response => {
      setWorkplaceList(response.data);
      setWorkplaceSelect(
        response.data[0]?.div_CD ? response.data[0]?.div_CD : null
      );
      response.data[0]?.div_CD && setValue('div_CD', response.data[0]?.div_CD);
    });
  }, [company]);

  // 사원 리스트 얻는 axios
  const getEmpList = async emp => {
    const response = await authAxiosInstance(
      `system/user/groupManage/employee/getList`
    );
    setEmpList(response.data);
    if (clickYN && !insertButtonClick) {
      setUsername(response.data[0]?.username);
      setData(response?.data[0] || resetData());
      setSelectedRadioValue(response.data[0]?.gender_FG);
      setInfoBoxEnrlData(response.data[0]?.enrl_FG);
      setCompany(response.data[0]?.co_CD);
      setImgFile(response.data[0]?.pic_FILE_ID);
      setDeptAndDivData(
        `${response.data[0]?.div_CD}. ${response.data[0]?.div_NM} / ${response.data[0]?.dept_CD}. ${response.data[0]?.dept_NM}`
      );
      response.data[0]?.home_TEL &&
        setValue('home_TEL', onChangePhoneNumber(response.data[0]?.home_TEL));
      response.data[0]?.tel &&
        setValue('tel', onChangePhoneNumber(response.data[0]?.tel));
      setWorkplaceSelect(response.data[0]?.div_CD);
    }
    setChangeForm(false);
  };

  // 사원 리스트 얻는 axios
  const getEmpListInit = async emp => {
    const response = await authAxiosInstance(
      `system/user/groupManage/employee/getList`
    );
    setEmpList(response.data);
  };

  // 회사 리스트 얻는 axios
  const getCompanyList = async () => {
    const response = await authAxiosInstance(
      'system/user/groupManage/employee/getCompanyList'
    );
    setCompanyList(response.data);
  };

  useEffect(() => {
    getEmpList();
    getCompanyList();
    setChangeForm(false);
  }, []);

  // click 시 사원 정보 가져오기 이벤트
  const onClickDetailEmpInfo = async (kor_NM, username) => {
    if (onChangeForm === true) {
      await Swal.fire({
        text: '작성중인 내용이 있습니다. 취소하시겠습니까',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then(async result => {
        if (result.isConfirmed) {
          setChangeForm(false);
          console.log('***************', selectedDeptNm);
          setChangeFormData();
          setEmailPersonalData('');
          setEmailSalaryData('');
          reset();
          setImgFile();
          setImgPriviewFile();
          setAddress();
          setSelectedDeptNm();
          setAddressDetail();
          console.log('kor_nm : ', kor_NM, 'username : ', username);
          setIsLoading(true);
          setInsertButtonClick(false);
          setClickYN(true);
          const response = await authAxiosInstance.post(
            'system/user/groupManage/employee/empDetail',
            {
              username: username,
            }
          );
          setData(response?.data);
          console.log(response?.data);
          setDeptAndDivData(
            `${response.data?.div_CD}. ${response.data?.div_NM} / ${response.data?.dept_CD}. ${response.data?.dept_NM}`
          );
          console.log(response?.data);
          setSelectedRadioValue(response.data?.gender_FG);
          setOpenDate(new Date(response.data?.join_DT) || '');
          setImgFile(response.data?.pic_FILE_ID);
          setIsLoading(false);
          setUsername(response.data?.username);
          setCompany(response.data?.co_CD);
          setInfoBoxEnrlData(response.data?.enrl_FG);
          setWorkplaceSelect(response.data?.div_CD);

          clearErrors();
          response.data?.home_TEL &&
            setValue('home_TEL', onChangePhoneNumber(response.data?.home_TEL));
          response.data?.tel &&
            setValue('tel', onChangePhoneNumber(response.data?.tel));
        } else if (result.isDenied) {
          return;
        }
      });
    }
    if (onChangeForm === false) {
      setChangeForm(false);
      console.log('***************', selectedDeptNm);
      setChangeFormData();
      setEmailPersonalData('');
      setEmailSalaryData('');
      reset();
      setImgFile();
      setImgPriviewFile();
      setAddress();
      setSelectedDeptNm();
      setAddressDetail();
      console.log('kor_nm : ', kor_NM, 'username : ', username);
      setIsLoading(true);
      setInsertButtonClick(false);
      setClickYN(true);
      const response = await authAxiosInstance.post(
        'system/user/groupManage/employee/empDetail',
        {
          username: username,
        }
      );
      setData(response?.data);
      console.log(response?.data);
      setDeptAndDivData(
        `${response.data?.div_CD}. ${response.data?.div_NM} / ${response.data?.dept_CD}. ${response.data?.dept_NM}`
      );
      console.log(response?.data);
      setSelectedRadioValue(response.data?.gender_FG);
      setOpenDate(new Date(response.data?.join_DT) || '');
      setImgFile(response.data?.pic_FILE_ID);
      setIsLoading(false);
      setUsername(response.data?.username);
      setCompany(response.data?.co_CD);
      setInfoBoxEnrlData(response.data?.enrl_FG);
      setWorkplaceSelect(response.data?.div_CD);

      clearErrors();
      response.data?.home_TEL &&
        setValue('home_TEL', onChangePhoneNumber(response.data?.home_TEL));
      response.data?.tel &&
        setValue('tel', onChangePhoneNumber(response.data?.tel));
    }
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
      setEmpList(response?.data);
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
    clearErrors();
    setInfoBoxEnrlData(0);
    setEmailPersonalData('');
    setEmailSalaryData('');
    setSelectedDeptNm();
    setDeptAndDivData();
    setCompany(companyList[0]?.co_CD);
    setImgPriviewFile();
    setOpenDate(new Date());
    setInsertButtonClick(true);
    setClickYN(false);
    setSelectedDeptCd();
    setSelectedRadioValue('W');
    setAddress();
    setAddressDetail();
    setWorkplaceSelect();
    setWorkplaceList('');
    setImage();
    setImgFile();
    setUsername('');
  };

  // 사원 remove 이벤트
  const onClickButtonRemoveEmp = async () => {
    const { enrl_FG } = getValues();
    console.log('jkkkk');
    if (enrl_FG === '2') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '이미 삭제처리된 사원입니다.',
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (!clickYN) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '삭제할 수 없습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '사원정보가 비활성화되었습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
      await authAxiosInstance.post(
        'system/user/groupManage/employee/empRemove',
        {
          kor_NM: data.kor_NM,
          username: data.username,
        }
      );
      setClickYN(true);
      setChangeForm(false);
      getEmpList();
      setImage();
      setImgFile();
      setUsername(empList[0].username);
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
    }
  };

  // 사원 submit button(update, insert) 이벤트
  const onSubmit = async data => {
    let startTime = new Date().getTime();

    const getJoinDT = getNowJoinTime(openDate);
    const formData = new FormData();

    if (checkDBErrorYN.emp_CD_ERROR) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '사번이 중복되었습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
      setError('emp_CD', { message: '사번이 중복되었습니다.' });
      setFocus('emp_CD');
      return;
    }

    if (checkDBErrorYN.username_ERROR) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ID가 중복되었습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
      setError('username', { message: 'ID가 중복되었습니다.' });
      setFocus('username');
      return;
    }

    if (checkDBErrorYN.email_ADD_ERROR) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ID가 중복되었습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
      setError('email_ADD', { message: 'ID가 중복되었습니다.' });
      setFocus('email_ADD');
      return;
    }

    if (image !== null) {
      formData.append('image', image);
    }

    // 사원 update 중일 때 저장버튼 기능
    if (
      clickYN &&
      !insertButtonClick &&
      (changeFormData ? Object.keys(changeFormData).length > 0 : false)
    ) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '사원정보가 수정되었습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
      setChangeForm(false);
      console.log('update 버튼');
      console.log(changeFormData);
      if (changeFormData && Object.keys(changeFormData).includes('home_TEL')) {
        changeFormData.home_TEL = changeFormData.home_TEL.replace(/-/g, '');
      }
      if (changeFormData && Object.keys(changeFormData).includes('tel')) {
        changeFormData.tel = changeFormData.tel.replace(/-/g, '');
      }
      formData.append(
        'userData',
        new Blob([JSON.stringify({ ...changeFormData, username: username })], {
          type: 'application/json',
        })
      );

      const responseUpdate = await imageAxiosInstance.post(
        'system/user/groupManage/employee/empUpdate',
        formData
      );
      console.log(responseUpdate.data);
      const responseGetList = await authAxiosInstance(
        `system/user/groupManage/employee/getList`
      );

      setEmpList(responseGetList.data);
      setChangeForm(false);
      setChangeFormData();
      setEmailPersonalData('');
      setEmailSalaryData('');
    } else if (
      clickYN &&
      !insertButtonClick &&
      (changeFormData ? false : true)
    ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '수정된 정보가 없습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
    }

    // 사원 insert 중일 때 저장버튼 기능
    if (!clickYN && insertButtonClick && Object.keys(errors).length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '사원이 추가되었습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
      const userData = {
        emp_CD: data?.emp_CD,
        co_CD: company || null,
        div_CD: selectedDivCd || null,
        dept_CD: selectedDeptCd || null,
        username: data?.username,
        password: data?.password,
        kor_NM: data?.kor_NM,
        email_ADD: data?.email_ADD,
        tel: data?.tel.replace(/-/g, ''),
        gender_FG: selectedRadioValue,
        join_DT: getJoinDT || null,
        enrl_FG: infoBoxEnrlData,
        personal_MAIL: data?.personal_MAIL,
        personal_MAIL_CP: data?.personal_MAIL_CP,
        salary_MAIL: data?.salary_MAIL,
        salary_MAIL_CP: data?.salary_MAIL_CP,
        home_TEL: data?.home_TEL.replace(/-/g, ''),
        zipcode: address || null,
        addr: addressDetail || null,
        addr_NUM: data?.addr_NUM,
      };

      setUsername(data?.username);
      setData({ ...userData, home_TEL: data?.home_TEL, tel: data?.tel });
      setWorkplaceSelect(workplaceSelect);
      setCompany(company);

      setSelectedDeptNm();
      formData.append(
        'userData',
        new Blob([JSON.stringify(userData)], {
          type: 'application/json',
        })
      );

      console.log('insert 버튼');
      console.log(userData);
      await imageAxiosInstance.post(
        'system/user/groupManage/employee/empInsert',
        formData
      );
      // setEmpList([
      //   ...empList,
      //   {
      //     join_DT: getJoinDT,
      //     username: data?.username,
      //     kor_NM: data?.kor_NM,
      //   },
      // ]);

      getEmpListInit();
      reset();
      setDeptAndDivData(
        `${selectedDivCd}. ${selectedDivNm} / ${selectedDeptCd}. ${selectedDeptNm}`
      );
      setEmailPersonalData('');
      setEmailSalaryData('');
      setImgFile();
      setChangeForm(false);
      setChangeFormData();
      setInsertButtonClick(false);
      setClickYN(true);
      // if (listRef.current) {
      //   listRef.current.scrollTop = 3000;
      // }
    } else if (
      !clickYN &&
      insertButtonClick &&
      Object.keys(errors).length > 0
    ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '중복된 값이 존재합니다.',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    let endTime = new Date().getTime();
    console.log('resulttttttttttttttt :', endTime - startTime);
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
          setCheckDBErrorYN({ ...checkDBErrorYN, emp_CD_ERROR: true });
        } else {
          setCheckDBErrorYN({ ...checkDBErrorYN, emp_CD_ERROR: false });
          delete errors.emp_CD;
        }
      });
    } else if (e.target.name === 'username') {
      setValue('email_ADD', e.target.value);
      setValue('personal_MAIL', e.target.value);
      ///
      // if (e.target.value === '' || e.target.value === undefined) {
      //   setCheckDBErrorYN({ ...checkDBErrorYN, username_ERROR: true });
      //   setError('username', { message: `로그인ID를 입력해주세요.` });
      // }
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

  //
  const onChangeDeptAndDiv = () => {
    clearErrors();
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      div_CD: selectedDivCd,
      dept_CD: selectedDivCd,
    }));
  };

  console.log('errors', errors);
  console.log('changeFormData : ', changeFormData);
  console.log(checkDBErrorYN);
  // console.log(data);
  // console.log(onChangeForm);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@', company);

  const state = {
    CATEGORY,
    setChangeHistoryOpenPost,
    changeHistoryOpenPost,
    deptAndDivData,
    setDeptAndDivData,
    setSelectedDeptCd,
    setSelectedDivCd,
    setSelectedDeptNm,
    setSelectedDivNm,
    selectedDeptCd,
    selectedDivCd,
    selectedDeptNm,
    selectedDivNm,
    deptModal,
    setDeptModal,
    empList,
    setEmpList,
    clickYN,
    setClickYN,
    isLoading,
    setIsLoading,
    insertButtonClick,
    setInsertButtonClick,
    openDate,
    setOpenDate,
    onChangeForm,
    setChangeForm,
    selectedRadioValue,
    setSelectedRadioValue,
    address,
    setAddress,
    addressDetail,
    setAddressDetail,
    isOpenPost,
    setIsOpenPost,
    image,
    setImage,
    imgFile,
    setImgFile,
    data,
    setData,
    companyList,
    setCompanyList,
    enrlList,
    setEnrlList,
    errorName,
    setErrorName,
    imgPriviewFile,
    setImgPriviewFile,
    username,
    setUsername,
    changeFormData,
    setChangeFormData,
    company,
    setCompany,
    workplaceList,
    setWorkplaceList,
    fixEnrlList,
    setFixEnrlList,
    companySelect,
    setCompanySelect,
    workplaceSelect,
    setWorkplaceSelect,
    infoBoxEnrlData,
    setInfoBoxEnrlData,
    listRef,
    emailPersonalData,
    setEmailPersonalData,
    emailSalaryData,
    setEmailSalaryData,
    checkDBErrorYN,
    setCheckDBErrorYN,
  };

  const actions = {
    ModalOpenButton,
    onKeyDownEmp,
    onChangeDeptAndDiv,
    onChangeOpenDeptModal,
    onChangeOpenPost,
    onCompletePost,
    handleRadioChange,
    handleOpenDateChange,
    resetData,
    getEmpList,
    getCompanyList,
    onClickDetailEmpInfo,
    onClickSearchEmpList,
    onChangeFunction,
    onClickInsertEmpBox,
    onClickButtonRemoveEmp,
    onSubmit,
    onFocusError,
    handleCheckSelectChange,
    onChangeTel,
    onChangeHomeTel,
    onChangePersonalMAIL,
    onChangeSalaryMAIL,
    onChangeDBDataSearch,
    handleImageRemove,
  };

  return { state, actions };
};

export default EmployeeModel;
