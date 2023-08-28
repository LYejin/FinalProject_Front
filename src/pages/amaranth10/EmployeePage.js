import { useEffect, useState } from 'react';
import {
  authAxiosInstance,
  imageAxiosInstance,
} from '../../axios/axiosInstance';
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
import EmpSelectListWrapper from './../../components/feature/amaranth/employee/EmpSelectListWrapper';
import { EmpInfoBox } from '../../components/feature/amaranth/Index';
import { useForm } from 'react-hook-form';
import SubmitButton from '../../components/common/button/SubmitButton';
import { getNowJoinTime, updateArray } from './../../util/time';
import CommonLayout from '../../components/common/CommonLayout';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../../components/common/modal/Modal';
import EventButton from '../../components/common/button/EventButton';
import EmpSelectBox from '../../components/feature/amaranth/employee/EmpSelectBox';
import EmpCheckSelectBox from '../../components/feature/amaranth/employee/EmpCheckSelectBox';
import { onChangePhoneNumber } from '../../util/number';

const EmployeePage = () => {
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
  const [company, setCompany] = useState(''); // Infobox companyList
  const [workplaceList, setWorkplaceList] = useState(''); // Infobox workplaceList
  const [fixEnrlList, setFixEnrlList] = useState([]); // 백 전송을 위해 변경된 enrlList
  const [companySelect, setCompanySelect] = useState(''); // select box 내 companySelect
  const [workplaceSelect, setWorkplaceSelect] = useState(''); // Info box 내 workplace select
  const [infoBoxEnrlData, setInfoBoxEnrlData] = useState(''); // Info box 내 enrl 재직구분 데이터

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
    console.log();
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

  // 사원 리스트 얻는 axios
  const getEmpList = async emp => {
    const response = await authAxiosInstance(
      `system/user/groupManage/employee/getList`
    );
    setData(response.data[0] || resetData());
    setEmpList(response.data);
    setSelectedRadioValue(response.data[0].gender_FG);
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
  }, []);

  // click 시 사원 정보 가져오기 이벤트
  const onClickDetailEmpInfo = async (kor_NM, username) => {
    setChangeFormData();
    reset();
    setImgFile();
    setImgPriviewFile();
    setAddress();
    setAddressDetail();
    if (onChangeForm === true) {
      alert('작성중인 내용이 있습니다. 취소하시겠습니까?');
    }
    setIsLoading(true);
    setInsertButtonClick(false);
    setClickYN(true);
    const response = await authAxiosInstance.post(
      'system/user/groupManage/employee/empDetail',
      { kor_NM: kor_NM, username: username }
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
    setWorkplaceSelect(response.data.div_CD);
    authAxiosInstance(
      `system/user/groupManage/employee/getWorkplace?CO_CD=${response.data.co_CD}`
    ).then(response => {
      setWorkplaceList(response.data);
    });
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
      console.log('didididi');
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
    clearErrors();
  };

  // 사원 insert 이벤트
  const onClickInsertEmpBox = () => {
    reset();
    resetData();
    setImgPriviewFile();
    setOpenDate(new Date());
    setInsertButtonClick(true);
    setClickYN(false);
    setSelectedRadioValue('W');
    setAddress();
    setAddressDetail();
    setImage();
    setImgFile();
    setWorkplaceSelect('');
    setCompany('');
    setInfoBoxEnrlData('');
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
    alert('사원정보가 비활성화되었습니다.');
  };

  // 사원 submit button(update, insert) 이벤트
  const onSubmit = async data => {
    const getJoinDT = getNowJoinTime(openDate);
    const formData = new FormData();

    if (image !== null) {
      formData.append('image', image);
    }

    // 사원 update 중일 때 저장버튼 기능
    if (clickYN && !insertButtonClick) {
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

      const response = await imageAxiosInstance.post(
        'system/user/groupManage/employee/empUpdate',
        formData
      );
      console.log(response.data);
      getEmpList();
      setChangeForm(false);
      setChangeFormData();
      alert('사원정보가 수정되었습니다.');
    }

    // 사원 insert 중일 때 저장버튼 기능
    if (!clickYN && insertButtonClick) {
      const userData = {
        emp_CD: data?.emp_CD,
        co_CD: company || null,
        div_CD: workplaceSelect || null,
        username: data?.username,
        password: data?.password,
        kor_NM: data?.kor_NM,
        email_ADD: data?.email_ADD,
        tel: data?.tel.replace(/-/g, ''),
        gender_FG: selectedRadioValue,
        join_DT: getJoinDT || null,
        enrl_FG: infoBoxEnrlData || null,
        personal_MAIL: data?.personal_MAIL,
        personal_MAIL_CP: data?.personal_MAIL_CP,
        salary_MAIL: data?.salary_MAIL,
        salary_MAIL_CP: data?.salary_MAIL_CP,
        home_TEL: data?.home_TEL.replace(/-/g, ''),
        zipcode: address || null,
        addr: addressDetail || null,
        addr_NUM: data?.addr_NUM,
      };

      formData.append(
        'userData',
        new Blob([JSON.stringify(userData)], {
          type: 'application/json',
        })
      );

      console.log('insert 버튼');
      console.log(userData);
      const response = await imageAxiosInstance.post(
        'system/user/groupManage/employee/empInsert',
        formData
      );
      console.log(response.data);
      setEmpList([
        ...empList,
        {
          join_DT: getJoinDT,
          username: data.username,
          kor_NM: data.kor_NM,
        },
      ]);
      alert('사원이 추가되었습니다.');
      reset();
      setImgFile();
      setImgPriviewFile();
      setChangeForm(false);
      setChangeFormData();
      setWorkplaceSelect();
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

  console.log(errors);
  console.log(changeFormData);

  return (
    <>
      <CommonLayout>
        <MainTitle mainTitle={'시스템 설정'} />
        <ContentWrapper>
          <Title titleName={'상용직관리'}></Title>
          <DetailContentWrapper>
            <SelectBoxWrapper>
              <span className="rightSelectBoxPadding">회사</span>
              <EmpSelectBox
                width={200}
                data={companyList}
                setCompanySelect={setCompanySelect}
                companySelect={companySelect}
              />
              <span className="leftSelectBoxPadding">재직구분</span>
              <EmpCheckSelectBox
                width={'200px'}
                handleCheckSelectChange={handleCheckSelectChange}
                enrlList={enrlList}
              />
              <span className="lastSelectBoxTextPadding">이름/ID/Mail ID</span>
              <input
                type="text"
                className="textInputBox"
                {...register('name')}
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
              <EmpSelectListWrapper
                width={'295px'}
                title={'사용자:'}
                dataCount={empList.length}
                data={empList}
                clickBoxEvent={onClickDetailEmpInfo}
                clickInsertBoxEvent={onClickInsertEmpBox}
              />
              <RightContentWrapper>
                <DetailTitle detailTitle={'상세정보'}></DetailTitle>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onChange={onChangeFunction}
                >
                  <div className="tableHeader">
                    <div className="defaultTitle">기본정보</div>
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
                  <ScrollWrapper width={'700px'}>
                    <EmpInfoBox
                      data={data || []}
                      onChangeOpenPost={onChangeOpenPost}
                      register={register}
                      setOpenDate={setOpenDate}
                      openDate={openDate}
                      selectedValue={selectedRadioValue}
                      handleRadioChange={handleRadioChange}
                      address={address}
                      addressDetail={addressDetail}
                      setImage={setImage}
                      imgFile={imgFile}
                      companyList={companyList}
                      errors={errors}
                      clickYN={clickYN}
                      onFocusError={onFocusError}
                      errorName={errorName}
                      setImgPriviewFile={setImgPriviewFile}
                      imgPriviewFile={imgPriviewFile}
                      handleOpenDateChange={handleOpenDateChange}
                      setCompany={setCompany}
                      company={company}
                      workplaceList={workplaceList}
                      setWorkplaceList={setWorkplaceList}
                      workplaceSelect={workplaceSelect}
                      setWorkplaceSelect={setWorkplaceSelect}
                      onChangeTel={onChangeTel}
                      onChangeHomeTel={onChangeHomeTel}
                      infoBoxEnrlData={infoBoxEnrlData}
                      setInfoBoxEnrlData={setInfoBoxEnrlData}
                      getValues={getValues}
                      setChangeFormData={setChangeFormData}
                    />
                  </ScrollWrapper>
                </form>
              </RightContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout>
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

export default EmployeePage;
