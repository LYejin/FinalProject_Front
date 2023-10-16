import React, { useEffect, useRef, useState } from 'react';
import { authAxiosInstance } from '../axios/axiosInstance';
import Swal from 'sweetalert2';
import { onChangePhoneNumber } from '../util/number';
import { getNowJoinTime } from '../util/time';

const FtradeModel = ({
  register,
  handleSubmit,
  reset,
  getValues,
  errors,
  clearErrors,
  setValue,
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
  const [errorName, setErrorName] = useState(); // error name 얻기
  const [tr_CD, setTR_CD] = useState(); // update를 위한 username 저장
  const [changeFormData, setChangeFormData] = useState({}); // 변경된 form data
  const [company, setCompany] = useState(''); // Infobox 내 company select
  const [useYN, setUseYN] = useState(''); // 사용여부 select box state
  const [selectUseYN, setSelectUseYN] = useState(''); // 사용여부 select box state
  const listRef = useRef(null); // list 화면 상하단 이동
  const [financeCDChangeData, setFinanceChangeCDData] = useState(); // 모달창 통해 변화된 금융 정보
  const [financeCDData, setFinanceCDData] = useState(); // '001. 금융네임' 통채로 입력
  const [deleteCheck, setDeleteCheck] = useState(''); // list 와 real 그리드 중 어디서 클릭했는지
  const [deleteYN, setDeleteYN] = useState(false); // delete check box 클릭 상태 관리
  const [checkItems, setCheckItems] = useState(new Set()); // check 된 item들
  const [isAllChecked, setIsAllChecked] = useState(false); // 전체선택 기능
  const [gridViewStrade, setGridViewStrade] = useState(null); // gridView 저장
  const [dataProviderStrade, setDataProviderStrade] = useState(null); // DataProvider 저장
  const [financeCDModal, setFinanceCDModal] = useState(false);
  const [financeCDInputData, setFinanceCDInputData] = useState('');
  const [viewYN, setViewYN] = useState(''); // 조회권한 여부
  const [checkDBErrorYN, setCheckDBErrorYN] = useState({
    emp_CD_ERROR: false,
    username_ERROR: false,
    email_ADD_ERROR: false,
  }); // check db error YN

  // 우편번호
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

  // 거래처 리스트 얻는 axios
  const getEmpList = async emp => {
    const response = await authAxiosInstance(
      'accounting/user/Strade/getSFtradeList'
    );
    setEmpList(response?.data);
    if (clickYN && !insertButtonClick) {
      setTR_CD(response.data[0]?.tr_CD);
      setData(response?.data[0]);
      setUseYN(response.data[0]?.use_YN);
      setFinanceCDData(
        `${response.data[0]?.bank_CD}. ${response.data[0]?.bank_NAME}`
      );
      setSelectedRadioValue(response.data[0]?.gender_FG);
      setCompany(response.data[0]?.co_CD);
      setViewYN(response.data[0]?.view_YN);
    }
  };

  const getEmpListReal = async () => {
    const response = await authAxiosInstance(
      'accounting/user/Strade/getSFtradeList'
    );
    setEmpList(response?.data);
  };

  useEffect(() => {
    getEmpList();
    setChangeForm(false);
  }, []);

  // click 시 사원 정보 가져오기 이벤트
  const onClickDetailSGtradeInfo = async tr_CD => {
    if (onChangeForm === true) {
      await Swal.fire({
        text: '작성중인 내용이 있습니다. 취소하시겠습니까?',
        icon: 'isConfirmed',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then(async result => {
        if (result.isConfirmed) {
          setFinanceChangeCDData();
          setChangeForm(false);
          setDeleteYN(false);
          setChangeFormData();
          reset();
          setAddress();
          setAddressDetail();
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
          console.log(response.data);
          setData(response?.data);
          setViewYN(response.data?.view_YN);
          setSelectedRadioValue(response.data?.gender_FG);
          setOpenDate(
            JSON.stringify(new Date(response.data?.fstart_DT)) !==
              '"1970-01-01T00:00:00.000Z"'
              ? new Date(response.data?.fstart_DT)
              : null
          );
          setCloseDate(
            JSON.stringify(new Date(response.data?.fend_DT)) !==
              '"1970-01-01T00:00:00.000Z"'
              ? new Date(response.data?.fend_DT)
              : null
          );
          setIsLoading(false);
          setFinanceCDData(
            response.data?.bank_CD
              ? `${response.data?.bank_CD}. ${response.data?.bank_NAME}`
              : null
          );
          setUseYN(response.data?.use_YN);
          setTR_CD(response.data?.tr_CD);
          setCompany(response.data.co_CD);
          response.data.home_TEL &&
            setValue('home_TEL', onChangePhoneNumber(response.data.home_TEL));
          response.data.tel &&
            setValue('tel', onChangePhoneNumber(response.data.tel));
        } else if (result.isDenied) {
          return;
        }
      });
    }
    if (onChangeForm === false) {
      setFinanceChangeCDData();
      setChangeForm(false);
      setDeleteYN(false);
      setChangeFormData();
      reset();
      setAddress();
      setAddressDetail();
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
      console.log(response.data);
      setData(response?.data);
      setViewYN(response.data?.view_YN);
      setSelectedRadioValue(response.data?.gender_FG);
      setOpenDate(
        JSON.stringify(new Date(response.data?.fstart_DT)) !==
          '"1970-01-01T00:00:00.000Z"'
          ? new Date(response.data?.fstart_DT)
          : null
      );
      setCloseDate(
        JSON.stringify(new Date(response.data?.fend_DT)) !==
          '"1970-01-01T00:00:00.000Z"'
          ? new Date(response.data?.fend_DT)
          : null
      );
      setIsLoading(false);
      setFinanceCDData(
        response.data?.bank_CD
          ? `${response.data?.bank_CD}. ${response.data?.bank_NAME}`
          : null
      );
      setUseYN(response.data?.use_YN);
      setTR_CD(response.data?.tr_CD);
      setCompany(response.data.co_CD);
      response.data.home_TEL &&
        setValue('home_TEL', onChangePhoneNumber(response.data.home_TEL));
      response.data.tel &&
        setValue('tel', onChangePhoneNumber(response.data.tel));
    }
  };

  // 조건 검색 버튼
  const onClickSearchEmpList = () => {
    const { select_TR_CD, select_TR_NM, select_BA_NB_TR } = getValues();
    console.log(select_TR_CD, select_TR_NM, select_BA_NB_TR, selectUseYN);

    const params = {};

    if (select_TR_CD !== '' && select_TR_CD !== undefined) {
      params.TR_CD = select_TR_CD;
    }
    if (select_TR_NM !== '' && select_TR_NM !== undefined) {
      params.TR_NM = select_TR_NM;
    }
    if (select_BA_NB_TR !== '' && select_BA_NB_TR !== undefined) {
      params.BA_NB_TR = select_BA_NB_TR;
    }
    if (selectUseYN !== '' && selectUseYN !== undefined) {
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
    setDeleteYN(false);
    setOpenDate(new Date());
    setFinanceCDData();
    setCloseDate();
    setInsertButtonClick(true);
    setClickYN(false);
    setSelectedRadioValue('auto');
    setViewYN('0');
    setAddress();
    setAddressDetail();
    setFinanceChangeCDData();
    setTR_CD('');
    setUseYN('1');
  };

  // 사원 submit button(update, insert) 이벤트
  const onSubmit = async data => {
    const getJoinDT = getNowJoinTime(openDate);
    const getEndDT = closeDate ? getNowJoinTime(closeDate) : '';

    if (checkDBErrorYN.tr_CD_ERROR) {
      setError('tr_CD', { message: '거래처코드가 중복되었습니다.' });
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '거래처코드가 중복되었습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    if (checkDBErrorYN.tr_NM_ERROR) {
      setError('tr_NM', { message: '거래처명을 입력해주세요.' });
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '거래처명을 입력해주세요.',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    // 사원 update 중일 때 저장버튼 기능
    if (
      clickYN &&
      !insertButtonClick &&
      (changeFormData ? Object.keys(changeFormData)?.length > 0 : false)
    ) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '금융거래처가 수정되었습니다.',
        showConfirmButton: false,
        timer: 1000,
      });
      console.log('update 버튼');
      console.log(changeFormData);
      // const data = { ...changeFormData, tr_CD: tr_CD, tr_FG: '3', view_YN: viewYN }
      // financeCDChangeData.finance_CD &&

      const responseUpdate = await authAxiosInstance.post(
        'accounting/user/Strade/stradeUpdate',
        { ...changeFormData, tr_CD: tr_CD, tr_FG: '3', view_YN: viewYN }
      );
      const responseGetList = await authAxiosInstance(
        `accounting/user/Strade/getSFtradeList`
      );
      setEmpList(responseGetList.data);
      setChangeForm(false);
      setChangeFormData();
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
        title: '금융거래처가 추가되었습니다.',
        showConfirmButton: false,
        timer: 1000,
      });

      const userData = {
        tr_CD: data?.tr_CD,
        tr_NM: data?.tr_NM,
        tr_MA: selectedRadioValue,
        tr_FG: '3',
        use_YN: '1',
        view_YN: '0',
        fstart_DT: getJoinDT || null,
        fend_DT: getEndDT || null,
        ba_NB_TR: data?.ba_NB_TR,
        depositor: data?.depositor,
        deposit_NM: data?.deposit_NM,
        account_OPEN_BN: data?.account_OPEN_BN,
        bank_CD: financeCDChangeData?.bank_CD,
      };

      setCompany(company);

      console.log('insert 버튼');
      console.log(userData);
      const response = await authAxiosInstance.post(
        'accounting/user/Strade/stradeInsert',
        userData
      );
      setTR_CD(response?.data);
      console.log(response?.data);
      setEmpList([
        ...empList,
        {
          tr_CD: response?.data,
          tr_NM: data?.tr_NM,
          BA_NB_TR: data?.BA_NB_TR,
        },
      ]);
      setData({ ...userData, tr_CD: response?.data });
      reset();
      setChangeForm(false);
      setChangeFormData();
      setInsertButtonClick(false);
      setFinanceCDData(
        financeCDChangeData?.bank_CD
          ? `${financeCDChangeData?.bank_CD}. ${financeCDChangeData?.bank_NAME}`
          : null
      );
      setClickYN(true);
      //console.log(listRef.current.scrollHeight);
      if (listRef.current) {
        listRef.current.scrollTop = 3000;
      }
      // console.log(listRef.current.scrollHeight);
      // console.log(listRef.current.scrollTop);
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
  };

  // 에러 처리 이벤트
  const onFocusError = async e => {
    if (e.target.name === 'ba_NB_TR') {
      delete errors.ba_NB_TR;
      await authAxiosInstance(`accounting/user/Strade/baNbTrVal`, {
        params: { BA_NB_TR: e.target.value },
      }).then(response => {
        if (response.data) {
          setError('ba_NB_TR', {
            message: `중복된 사업자등록번호가 존재합니다.`,
          });
          setCheckDBErrorYN({ ...checkDBErrorYN, ba_NB_TR_DD_ERROR: true });
        } else {
          setCheckDBErrorYN({ ...checkDBErrorYN, ba_NB_TR_DD_ERROR: false });
        }
      });
    }

    const errorList = Object.keys(errors);
    if (errorList.indexOf('tr_CD') > -1) {
      setErrorName('tr_CD');
    }
    setErrorName(e.target.name);
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
    if (e.target.name === 'tr_CD') {
      params.CO_CD = company;
      params.TR_CD = e.target.value;
      await authAxiosInstance(`accounting/user/Strade/trCdVal`, {
        params,
      }).then(response => {
        response.data &&
          setError('tr_CD', { message: `거래처 코드가 중복되었습니다.` });
        if (response.data) {
          setCheckDBErrorYN({ ...checkDBErrorYN, tr_CD_ERROR: true });
        } else {
          setCheckDBErrorYN({ ...checkDBErrorYN, tr_CD_ERROR: false });
          delete errors.tr_CD;
        }
      });
    } else if (e.target.name === 'bank_CD') {
      setFinanceChangeCDData(financeCDChangeData => ({
        ...financeCDChangeData,
        bank_CD: e.target.value,
      }));
      setChangeFormData(changeFormData => ({
        ...changeFormData,
        [e.target.name]: e.target.value,
      }));
    } else if (
      e.target.name === 'tr_NM' &&
      (e.target.value === '' || e.target.value === undefined)
    ) {
      setCheckDBErrorYN({ ...checkDBErrorYN, tr_NM_ERROR: true });
      setError('tr_NM', { message: `거래처명을 입력해주세요.` });
    } else if (
      e.target.name === 'tr_NM' &&
      e.target.value !== '' &&
      e.target.value !== undefined
    ) {
      setCheckDBErrorYN({ ...checkDBErrorYN, tr_NM_ERROR: false });
      clearErrors();
    }
    setErrorName();
  };

  // list 하나 클릭
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
      setDeleteListCount(Array.from(checkItems).length);
      setDeleteYN(true);
    } else {
      setDeleteCheck('');
      setDeleteYN(false);
    }
  };

  // list 전체 클릭
  const allCheckedHandler = ({ target }) => {
    if (target.checked) {
      setDeleteCheck('listDelete');
      setDeleteYN(true);
      setCheckItems(new Set(empList.map((data, index) => data.tr_CD)));
      setIsAllChecked(true);
      setDeleteListCount(empList.length);
    } else {
      checkItems.clear();
      setCheckItems(checkItems);
      setIsAllChecked(false);
      setDeleteYN(false);
    }
  };

  // list 삭제 이벤트
  const removeStradelist = async () => {
    if (deleteCheck === 'listDelete') {
      Swal.fire({
        title: `체크된 데이터 : ${Array.from(checkItems).length}건`,
        text: '체크된 데이터를 모두 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then(async result => {
        if (result.isConfirmed) {
          const response = await authAxiosInstance.delete(
            'accounting/user/Strade/stradeDelete',
            {
              data: { tr_CD: Array.from(checkItems), tr_FG: '3' },
            }
          );
          setDeleteListCount(Array.from(checkItems).length);
          setDeleteListModal(true);
          setDeleteStradeInfo(response.data);
          getEmpListReal();
          checkItems.clear();
          setCheckItems(checkItems);
          setIsAllChecked(false);
          setDeleteYN(false);
          // setDeleteListCount(0);
        }
      });
    } else if (deleteCheck === 'gridDelete') {
      // 체크된 행들의 sq_NB값을 수집
      gridViewStrade.cancel();
      const checkedRows = gridViewStrade.getCheckedItems(); // 실제 메소드 이름은 realgrid 문서를 참고해주세요.
      console.log('요고얌', checkedRows);

      // 체크된 행이 없거나 20개를 초과한 경우 alert을 띄움
      if (checkedRows.length === 0) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '삭제할 항목을 선택해주세요.',
          showConfirmButton: false,
          timer: 1000,
        });

        return;
      }

      if (checkedRows.length > 20) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '한 번에 20개 이하의 항목만 삭제할 수 있습니다.',
          showConfirmButton: false,
          timer: 1000,
        });
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
              timer: 1000,
            });
            dataProviderStrade.removeRows(checkedRows);
            setDeleteListCount(0);
            setDeleteYN(false);
          } catch (error) {
            console.error('Failed to delete rows:', error);
          }
        }
      });
    }
  };

  const onBlurfinanceCDData = async e => {
    await authAxiosInstance(`accounting/user/Strade//financecodeInfo`, {
      params: { FINANCE_CD: e.target.value },
    }).then(response => {
      if (response.data.length === 1) {
        setFinanceChangeCDData(financeCDChangeData => ({
          ...financeCDChangeData,
          bank_CD: response.data[0]?.finance_CD,
          bank_NAME: response.data[0]?.bank_NAME,
        }));
        setChangeFormData(changeFormData => ({
          ...changeFormData,
          bank_CD: response.data[0]?.finance_CD,
        }));
        setValue(
          'bank_CD',
          `${response.data[0]?.finance_CD}. ${response.data[0]?.bank_NAME}`
        );
        return;
      } else if (response.data.length > 1) {
        setFinanceCDModal(!financeCDModal);
        setFinanceCDInputData(e.target.value);
        return;
      }
      setValue('bank_CD', null);
    });
  };

  // const onKeyDownEnterFin = async e => {
  //   if (e.key === 'Insert') {
  //     console.log('hiii');
  //   }
  //   if (
  //     e.key === 'Enter' &&
  //     (e.target.value !== null || e.target.value !== '')
  //   ) {
  //     e.preventDefault();
  //     await authAxiosInstance(`accounting/user/Strade//financecodeInfo`, {
  //       params: { FINANCE_CD: e.target.value },
  //     }).then(response => {
  //       if (response.data.length === 1) {
  //         setFinanceChangeCDData(financeCDChangeData => ({
  //           ...financeCDChangeData,
  //           bank_CD: response.data[0]?.finance_CD,
  //         }));
  //         setChangeFormData(changeFormData => ({
  //           ...changeFormData,
  //           bank_CD: response.data[0]?.finance_CD,
  //         }));
  //         setValue(
  //           'bank_CD',
  //           `${response.data[0]?.finance_CD}. ${response.data[0]?.bank_NAME}`
  //         );
  //         return;
  //       } else if (response.data.length > 1) {
  //         setFinanceCDModal(!financeCDModal);
  //         setFinanceCDInputData(e.target.value);
  //         return;
  //       }
  //       setValue('bank_CD', null);
  //     });
  //   }
  // };

  console.log(errors);

  const state = {
    deleteYN,
    setDeleteYN,
    financeCDInputData,
    setFinanceCDInputData,
    financeCDModal,
    setFinanceCDModal,
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
    errorName,
    setErrorName,
    tr_CD,
    setTR_CD,
    changeFormData,
    setChangeFormData,
    company,
    setCompany,
    useYN,
    setUseYN,
    selectUseYN,
    setSelectUseYN,
    listRef,
    financeCDChangeData,
    setFinanceChangeCDData,
    financeCDData,
    setFinanceCDData,
    deleteCheck,
    setDeleteCheck,
    checkItems,
    setCheckItems,
    isAllChecked,
    setIsAllChecked,
    gridViewStrade,
    setGridViewStrade,
    dataProviderStrade,
    setDataProviderStrade,
    viewYN,
    setViewYN,
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
    onClickDetailSGtradeInfo,
    onClickSearchEmpList,
    onChangeFunction,
    onClickInsertEmpBox,
    onSubmit,
    onFocusError,
    onChangeTel,
    onChangeHomeTel,
    onChangePersonalMAIL,
    onChangeSalaryMAIL,
    onChangeDBDataSearch,
    checkItemHandler,
    allCheckedHandler,
    removeStradelist,
    onBlurfinanceCDData,
    // onKeyDownEnterFin,
  };
  return { state, actions };
};

export default FtradeModel;
