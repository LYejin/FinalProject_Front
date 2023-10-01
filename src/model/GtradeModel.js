import React, { useEffect, useRef, useState } from 'react';
import { authAxiosInstance } from '../axios/axiosInstance';
import Swal from 'sweetalert2';
import { onChangePhoneNumber } from '../util/number';
import { getNowJoinTime } from '../util/time';
import { useForm } from 'react-hook-form';

const GtradeModel = ({
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
  const [closeDate, setCloseDate] = useState(new Date()); // 개업일 선택 상태 관리
  const [onChangeForm, setChangeForm] = useState(false); // 폼 변경 사항 확인
  const [selectedRadioValue, setSelectedRadioValue] = useState(''); //radio 값
  const [address, setAddress] = useState(''); // 우편 주소
  const [addressDetail, setAddressDetail] = useState(); // 주소
  const [isOpenPost, setIsOpenPost] = useState(false); // 우편번호 모달창
  const [deleteListModal, setDeleteListModal] = useState(false); // 거래처 삭제 정보 모달창
  const [deleteListCount, setDeleteListCount] = useState(''); // 거래처 삭제 정보 모달창
  const [deleteStradeInfo, setDeleteStradeInfo] = useState([
    { count: '', tr_CD: '' },
  ]); // 거래처 삭제 정보
  const [data, setData] = useState({}); // form 데이터들 보관
  const [companyList, setCompanyList] = useState([]); // select box 내 company list
  const [errorName, setErrorName] = useState(); // error name 얻기
  const [tr_CD, setTR_CD] = useState(); // update를 위한 username 저장
  const [changeFormData, setChangeFormData] = useState({}); // 변경된 form data
  const [company, setCompany] = useState(''); // Infobox 내 company select
  const [workplaceList, setWorkplaceList] = useState(''); // Infobox workplaceList
  const [useYN, setUseYN] = useState(''); // 사용여부 select box state
  const [selectUseYN, setSelectUseYN] = useState(''); // 사용여부 select box state
  const [selectPplNb, setSelectPplNb] = useState(''); // 내국인 외국인 select box
  const listRef = useRef(null); // list 화면 상하단 이동
  const [checkItems, setCheckItems] = useState(new Set()); // check 된 item들
  const [isAllChecked, setIsAllChecked] = useState(false); // 전체선택 기능
  const [deleteCheck, setDeleteCheck] = useState(''); // list 와 real 그리드 중 어디서 클릭했는지
  const [gridViewStrade, setGridViewStrade] = useState(null); // gridView 저장
  const [dataProviderStrade, setDataProviderStrade] = useState(null); // DataProvider 저장
  const [checkDBErrorYN, setCheckDBErrorYN] = useState({
    emp_CD_ERROR: false,
    username_ERROR: false,
    email_ADD_ERROR: false,
  }); // check db error YN

  // 우편번호 모달창 닫기
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onChangeDeleteListModal = () => {
    setDeleteListModal(!deleteListModal);
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
    setValue('tr_CD', '');
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
      start_DT: getNowJoinTime(date),
    });
  };

  // 폐업일 선택 시 처리 함수
  const handleCloseDateChange = date => {
    console.log(date);
    setCloseDate(date);
    setChangeFormData({
      ...changeFormData,
      end_DT: getNowJoinTime(date),
    });
  };

  const resetData = () => {
    setData({
      tr_CD: '',
      email_ADD: '',
      reg_NB: '',
      ppl_NB: '',
      ceo_NM: '',
      business: '',
      jongmok: '',
      zip: '',
      addr: '',
      addr_NUM: '',
      phone_NB: '',
      fax: '',
      website: '',
      email: '',
      liq_CD: '',
    });
  };

  // 사원 리스트 얻는 axios
  const getEmpList = async emp => {
    const response = await authAxiosInstance(
      `accounting/user/Strade/getSGtradeList`
    );
    console.log(response.data);
    setEmpList(response.data || null);
    if (clickYN && !insertButtonClick) {
      console.log('^^^^^^^^^^^^^^^^^^^^^^^');
      setTR_CD(response.data[0]?.tr_CD);
      setValue('reg_NB', response.data[0]?.reg_NB);
      setValue('ppl_NB', response.data[0]?.ppl_NB);
      setUseYN(response.data[0]?.use_YN);
      setData(response?.data[0] || null);
      setSelectedRadioValue(response.data[0]?.gender_FG);
      setCompany(response.data[0]?.co_CD);
    }
  };

  // 회사 리스트 얻는 axios
  const getCompanyList = async () => {
    const response = await authAxiosInstance(
      'system/user/groupManage/employee/getCompanyList'
    );
    setCompanyList(response?.data);
  };

  useEffect(() => {
    getEmpList();
    getCompanyList();
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
    console.log('TR_CD : ', tr_CD);
    setIsLoading(true);
    setInsertButtonClick(false);
    setClickYN(true);
    const params = {};
    params.TR_CD = tr_CD;

    const response = await authAxiosInstance(
      'accounting/user/Strade/sgtradeDetail',
      {
        params,
      }
    );
    setData(response?.data);
    console.log('Detail : ', response.data);
    setValue('reg_NB', response.data?.reg_NB);
    setValue('ppl_NB', response.data?.ppl_NB);
    setOpenDate(new Date(response.data?.start_DT) || '');
    setCloseDate(new Date(response.data?.end_DT) || '');
    setIsLoading(false);
    setTR_CD(response.data?.tr_CD);
    setUseYN(response.data?.use_YN);
    response.data.home_TEL &&
      setValue('home_TEL', onChangePhoneNumber(response.data?.home_TEL));
    response.data.tel &&
      setValue('tel', onChangePhoneNumber(response.data?.tel));
  };

  // 조건 검색 버튼
  const onClickSearchEmpList = () => {
    const { select_TR_CD, select_TR_NM, select_REG_NB, select_PPL_NB } =
      getValues();
    console.log(select_TR_CD, select_TR_NM, select_REG_NB, select_PPL_NB);

    console.log('selectUseYN : ', selectUseYN);
    const params = {};

    if (select_TR_CD !== '') {
      params.TR_CD = select_TR_CD;
    }
    if (select_TR_NM !== '') {
      params.TR_NM = select_TR_NM;
    }
    if (select_REG_NB !== '') {
      params.REG_NB = select_REG_NB;
    }
    if (select_PPL_NB !== '') {
      params.PPL_NB = select_PPL_NB;
    }
    if (selectUseYN !== '') {
      params.USE_YN = selectUseYN;
    }

    authAxiosInstance('accounting/user/Strade/getSGtradeList', {
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
    setCompany(companyList[0].co_CD);
    setUseYN('1');
    setOpenDate(new Date());
    setCloseDate();
    setValue('reg_NB', '');
    setValue('ppl_NB', '');
    setSelectPplNb(0);
    setInsertButtonClick(true);
    setClickYN(false);
    setSelectedRadioValue('auto');
    setAddress();
    setAddressDetail();
    setWorkplaceList('');
    console.log('djhijsidjofijsdoifj', workplaceList[0]?.div_CD);
    setTR_CD('');
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
    console.log('eeeeeeeeee', openDate);
    const getJoinDT = getNowJoinTime(openDate);
    console.log('geeeeeee', getJoinDT);

    console.log('kkkkkkkkkkkkk');
    console.log(checkDBErrorYN);
    if (checkDBErrorYN.tr_CD_ERROR) {
      setError('tr_CD', { message: '거래처가 중복되었습니다.' });
      alert('중복된 값이 존재합니다.');
      return;
    }

    if (checkDBErrorYN.reg_NB_ERROR) {
      setError('reg_NB', { message: '000-00-0000형식을 맞춰서 입력하세요.' });
      setFocus('reg_NB');
      alert('000-00-0000형식을 맞춰서 입력하세요.');
      return;
    }

    if (checkDBErrorYN.ppl_NB_ERROR) {
      setError('ppl_NB', { message: '주민번호 형식에 맞게 입력하세요.' });
      alert('주민번호 형식에 맞게 입력하세요.');
      return;
    }

    // 사원 update 중일 때 저장버튼 기능
    if (
      clickYN &&
      !insertButtonClick &&
      Object.keys(changeFormData).length > 0
    ) {
      console.log('update 버튼');
      console.log('changeFormData :', changeFormData);
      if (changeFormData && changeFormData.reg_NB === '___-__-_____') {
        changeFormData.reg_NB = '';
      }
      if (changeFormData && changeFormData.ppl_NB === '______-_______') {
        changeFormData.ppl_NB = '';
      }
      // if (changeFormData && Object.keys(changeFormData).includes('tel')) {
      //   changeFormData.tel = changeFormData.tel.replace(/-/g, '');
      // }
      // formData.append(
      //   'userData',
      //   new Blob([JSON.stringify({ ...changeFormData, username: username })], {
      //     type: 'application/json',
      //   })
      // );
      console.log('kkkkkkkkkkkkkk', { ...changeFormData, tr_CD: tr_CD });
      const responseUpdate = await authAxiosInstance.post(
        'accounting/user/Strade/stradeUpdate',
        { ...changeFormData, tr_CD: tr_CD, tr_FG: '1' }
      );
      console.log(responseUpdate.data);
      const responseGetList = await authAxiosInstance(
        `accounting/user/Strade/getSGtradeList`
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
        tr_MA: selectedRadioValue,
        tr_FG: '1',
        use_YN: '1',
        view_YN: '0',
        reg_NB: data?.reg_NB === '___-__-_____' ? null : data?.reg_NB,
        ppl_NB: data?.ppl_NB === '______-_______' ? null : data?.ppl_NB,
        ceo_NM: data?.ceo_NM,
        business: data?.business,
        jongmok: data?.jongmok,
        zip: address || null,
        addr: addressDetail || null,
        addr_NUM: data?.addr_NUM,
        phone_NB: data?.phone_NB.replace(/-/g, ''),
        fax: data?.fax,
        website: data?.website,
        email: data?.email,
        start_DT: getJoinDT || null,
        end_DT: getJoinDT || null,
        for_YN: '0',
        liq_CD: data?.liq_CD,
      };

      //setCompany(company);

      console.log('insert 버튼');
      console.log(userData);
      const response = await authAxiosInstance.post(
        'accounting/user/Strade/stradeInsert',
        userData
      );
      setData({ ...userData, tr_CD: response.data });
      console.log(response.data);
      setEmpList([
        ...empList,
        {
          tr_CD: response.data,
          tr_NM: data?.tr_NM,
          reg_NB: data?.reg_NB,
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
  const onFocusError = async e => {
    if (e.target.name === 'reg_NB') {
      if (e.target.value === '___-__-_____') {
        setCheckDBErrorYN({ ...checkDBErrorYN, reg_NB_ERROR: false });
        delete errors.reg_NB;
        return;
      }
      const regNbRegExp = /^\d{3}-\d{2}-\d{5}$/;
      if (!regNbRegExp.test(e.target.value)) {
        setError('reg_NB', {
          message: `000-00-0000형식을 맞춰서 입력하세요.`,
        });
        setCheckDBErrorYN({ ...checkDBErrorYN, reg_NB_ERROR: true });
        return; // 에러 계속 뜨게 할 건지 고민
      } else {
        delete errors.reg_NB;
        await authAxiosInstance(`accounting/user/Strade/regNbVal`, {
          params: { REG_NB: e.target.value },
        }).then(response => {
          if (response.data) {
            setError('reg_NB', {
              message: `중복된 사업자등록번호가 존재합니다.`,
            });
            setCheckDBErrorYN({ ...checkDBErrorYN, reg_NB_DD_ERROR: true });
          }
          console.log(response.data);
        });
      }
      setCheckDBErrorYN({ ...checkDBErrorYN, reg_NB_ERROR: false });
    }

    if (e.target.name === 'ppl_NB') {
      if (e.target.value === '______-_______') {
        setCheckDBErrorYN({ ...checkDBErrorYN, ppl_NB_ERROR: false });
        delete errors.ppl_NB;
        return;
      }
      const pplNbRegExp =
        /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])-\d{7}$/;
      if (!pplNbRegExp.test(e.target.value)) {
        setCheckDBErrorYN({ ...checkDBErrorYN, ppl_NB_ERROR: true });
        setError('ppl_NB', {
          message: `주민번호 형식에 맞게 입력하세요.`,
        });
        return;
      } else {
        delete errors.ppl_NB;
        setCheckDBErrorYN({ ...checkDBErrorYN, ppl_NB_DD_ERROR: true });
        await authAxiosInstance(`accounting/user/Strade/pplNbVal`, {
          params: { PPL_NB: e.target.value },
        }).then(response => {
          if (response.data) {
            setError('ppl_NB', {
              message: `중복된 주민등록번호가 존재합니다.`,
            });
          }
          console.log(response.data);
          return;
        });
        setCheckDBErrorYN({ ...checkDBErrorYN, ppl_NB_ERROR: false });
      }
    }

    const errorList = Object.keys(errors);
    if (errorList.indexOf('tr_CD') > -1) {
      setErrorName('tr_CD');
    }
    setErrorName(e.target.name);
  };

  //select box event
  const handleCheckSelectChange = event => {
    const {
      target: { value },
    } = event;
  };

  // 사업자등록번호 유효성
  const onCompleteRegNb = async e => {
    let params = {};
    params.REG_NB = e.target.value;
    await authAxiosInstance(`accounting/user/Strade/regNbVal`, {
      params,
    }).then(response => {
      console.log(response.data);
    });
  };

  // 주민등록번호 유효성
  const onCompletePplNb = e => {
    // if (e.target.value.length === 12) {
    alert('hiiii');
    // }
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
    if (e.target.name === 'tr_CD') {
      params.CO_CD = company;
      params.TR_CD = e.target.value;
      await authAxiosInstance(`accounting/user/Strade/trCdVal`, {
        params,
      }).then(response => {
        console.log(response.data);
        response.data &&
          setError('tr_CD', { message: `거래처 코드가 중복되었습니다.` });
        if (response.data) {
          console.log('hiiiiiiii');
          setCheckDBErrorYN({ ...checkDBErrorYN, tr_CD_ERROR: true });
        } else {
          setCheckDBErrorYN({ ...checkDBErrorYN, tr_CD_ERROR: false });
          delete errors.tr_CD;
        }
      });
    }
    // } else if (e.target.name === 'username') {
    //   params.USERNAME = e.target.value;
    //   await authAxiosInstance(
    //     `system/user/groupManage/employee/getUsernameInCompany`,
    //     { params }
    //   ).then(response => {
    //     console.log(response.data);
    //     response.data &&
    //       setError('username', { message: 'ID가 중복되었습니다.' });
    //     if (response.data) {
    //       setCheckDBErrorYN({ ...checkDBErrorYN, username_ERROR: true });
    //     } else {
    //       setCheckDBErrorYN({ ...checkDBErrorYN, username_ERROR: false });
    //       delete errors.username;
    //     }
    //   });
    // } else if (e.target.name === 'email_ADD') {
    //   params.EMAIL_ADD = e.target.value;
    //   await authAxiosInstance(
    //     `system/user/groupManage/employee/getEmailInCompany`,
    //     {
    //       params,
    //     }
    //   ).then(response => {
    //     console.log(response.data);
    //     response.data &&
    //       setError('email_ADD', { message: 'ID가 중복되었습니다.' });
    //     if (response.data) {
    //       setCheckDBErrorYN({ ...checkDBErrorYN, email_ADD_ERROR: true });
    //     } else {
    //       setCheckDBErrorYN({ ...checkDBErrorYN, email_ADD_ERROR: false });
    //       delete errors.email_ADD;
    //     }
    //   });
    // }
    console.log('checkDBErrorYN : ', checkDBErrorYN);
  };

  console.log('errors', errors);
  console.log('errorName', errorName);
  console.log(changeFormData);
  console.log(checkDBErrorYN);
  console.log(data);
  // console.log(onChangeForm);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@', company);

  const checkItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkItems.add(id);
      setCheckItems(checkItems);
    } else if (!isChecked) {
      checkItems.delete(id);
      setCheckItems(checkItems);
    }
    if (checkItems.size > 0) {
      setDeleteCheck('listDelete');
    } else {
      setDeleteCheck('');
    }
  };

  const allCheckedHandler = ({ target }) => {
    if (target.checked) {
      setDeleteCheck('listDelete');
      setCheckItems(new Set(empList.map((data, index) => data.tr_CD)));
      setIsAllChecked(true);
      Array.from(checkItems);
    } else {
      checkItems.clear();
      setCheckItems(checkItems);
      setIsAllChecked(false);
    }
  };

  // list 삭제 이벤트
  const removeStradelist = async () => {
    if (deleteCheck === 'listDelete') {
      const response = await authAxiosInstance.delete(
        'accounting/user/Strade/stradeDelete',
        {
          data: { tr_CD: Array.from(checkItems), tr_FG: '1' },
        }
      );
      setDeleteListCount(Array.from(checkItems).length);
      setDeleteStradeInfo(response.data);
      Swal.fire({
        title: `체크된 데이터 : ${Array.from(checkItems).length}건`,
        text: '체크된 데이터를 모두 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then(result => {
        if (result.isConfirmed) {
          setDeleteListModal(true);
        }
      });
    } else if (deleteCheck === 'gridDelete') {
      // 체크된 행들의 sq_NB값을 수집
      gridViewStrade.cancel();
      const checkedRows = gridViewStrade.getCheckedItems(); // 실제 메소드 이름은 realgrid 문서를 참고해주세요.
      console.log('요고얌', checkedRows);

      // 체크된 행이 없거나 20개를 초과한 경우 alert을 띄움
      if (checkedRows.length === 0) {
        alert('삭제할 항목을 선택해주세요.');
        return;
      }

      if (checkedRows.length > 20) {
        alert('한 번에 20개 이하의 항목만 삭제할 수 있습니다.');
        return;
      }

      Swal.fire({
        title: `체크된 데이터 : ${checkedRows.length}건`,
        text: '체크된 데이터를 모두 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then(result => {
        if (result.isConfirmed) {
          const sqNbsToDelete = checkedRows.map(row => {
            // 데이터 프로바이더에서 해당 행의 sq_NB 컬럼의 값을 가져옵니다.
            const sqNbValue = dataProviderStrade.getValue(row, 'trmg_SQ');
            return sqNbValue;
          });

          console.log('여기서확인하래요', sqNbsToDelete); // 이 부분에서 제대로 된 sq_NB 값들이 출력되는지 확인하세요.
          try {
            // 서버에 삭제 요청
            authAxiosInstance.delete(
              'accounting/user/Strade/stradeRollManageDelete',
              { data: { trmg_SQ: sqNbsToDelete, tr_CD: tr_CD } }
            );
            // 알림 표시
            Swal.fire({
              icon: 'success',
              title: '성공적으로 삭제되었습니다!',
              showConfirmButton: false,
              timer: 1500,
            });
            dataProviderStrade.removeRows(checkedRows);
          } catch (error) {
            console.error('Failed to delete rows:', error);
          }
        }
      });
    }
  };

  const state = {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    clearErrors,
    setValue,
    setFocus,
    setError,
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
    closeDate,
    setCloseDate,
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
    deleteListModal,
    setDeleteListModal,
    deleteListCount,
    setDeleteListCount,
    deleteStradeInfo,
    setDeleteStradeInfo,
    data,
    setData,
    companyList,
    setCompanyList,
    errorName,
    setErrorName,
    tr_CD,
    setTR_CD,
    changeFormData,
    setChangeFormData,
    company,
    setCompany,
    workplaceList,
    setWorkplaceList,
    useYN,
    setUseYN,
    selectUseYN,
    setSelectUseYN,
    selectPplNb,
    setSelectPplNb,
    listRef,
    checkItems,
    setCheckItems,
    isAllChecked,
    setIsAllChecked,
    deleteCheck,
    setDeleteCheck,
    gridViewStrade,
    setGridViewStrade,
    dataProviderStrade,
    setDataProviderStrade,
    checkDBErrorYN,
    setCheckDBErrorYN,
  };

  const actions = {
    onChangeOpenPost,
    onChangeDeleteListModal,
    onCompletePost,
    handleRadioChange,
    handleOpenDateChange,
    handleCloseDateChange,
    resetData,
    getEmpList,
    getCompanyList,
    onClickDetailSGtradeInfo,
    onClickSearchEmpList,
    onChangeFunction,
    onClickInsertEmpBox,
    onClickButtonRemoveEmp,
    onSubmit,
    onFocusError,
    handleCheckSelectChange,
    onCompleteRegNb,
    onCompletePplNb,
    onChangeTel,
    onChangeHomeTel,
    onChangePersonalMAIL,
    onChangeSalaryMAIL,
    onChangeDBDataSearch,
    checkItemHandler,
    allCheckedHandler,
    removeStradelist,
  };

  return { state, actions };
};

export default GtradeModel;
