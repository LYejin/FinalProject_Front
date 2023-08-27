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

const EmployeePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    clearErrors,
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
  const [workplaceSelect, setWorkplaceSelect] = useState(''); // select box 내 workplace select

  // 우편번호
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  console.log(changeFormData);

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
    console.log(response.data);
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
    setChangeForm(false);
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
  };

  const onClickSearchEmpList = () => {
    const { name } = getValues();
    console.log(name);
    console.log('hiiii');

    authAxiosInstance(
      `system/user/groupManage/employee/getList?CO_CD=${companySelect}&NAME=${name}&ENRL_FG=${fixEnrlList}`
    ).then(response => {
      console.log(response.data);
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
    const { co_CD } = getValues();
    console.log('Ccccccccc', co_CD);
    console.log(changeFormData);
    //setError('co_CD', { type: 'manual', message: '회사를 선택해주세요' });

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
  };

  // 사원 remove 이벤트
  const onClickButtonRemoveEmp = async () => {
    const response = await authAxiosInstance.post(
      'system/user/groupManage/employee/empRemove',
      { kor_NM: data.kor_NM, username: data.username }
    );
    setEmpList(empList.filter(emp => emp.user_YN !== '0'));
    console.log(response.data);
    setClickYN(false);
    alert('사원정보가 비활성화되었습니다.');
  };

  // 사원 submit button(update, insert) 이벤트
  const onSubmit = async data => {
    console.log(changeFormData);

    const getJoinDT = getNowJoinTime(openDate);
    const formData = new FormData();
    console.log(image);
    if (image !== null) {
      formData.append('image', image);
    }

    // 사원 update 중일 때 저장버튼 기능
    if (clickYN && !insertButtonClick) {
      console.log('update 버튼');
      console.log(changeFormData);

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
      alert('사원정보가 수정되었습니다.');

      setChangeForm(false);
      setChangeFormData();
    }

    // 사원 insert 중일 때 저장버튼 기능
    if (!clickYN && insertButtonClick) {
      const userData = {
        emp_CD: data.emp_CD || null,
        co_CD: '1234',
        div_CD: '001',
        username: data.username || null,
        password: data.password || null,
        kor_NM: data.kor_NM || null,
        email_ADD: data.email_ADD || null,
        tel: data.tel || null,
        gender_FG: selectedRadioValue,
        join_DT: getJoinDT || null,
        enrl_FG: '0',
        personal_MAIL: data.personal_MAIL || null,
        personal_MAIL_CP: data.personal_MAIL_CP || null,
        salary_MAIL: data.salary_MAIL || null,
        salary_MAIL_CP: data.salary_MAIL_CP || null,
        home_TEL: data.home_TEL || null,
        zipcode: address || null,
        addr: addressDetail || null,
        addr_NUM: data.addr_NUM || null,
      };

      formData.append(
        'userData',
        new Blob([JSON.stringify(userData)], {
          type: 'application/json',
        })
      );

      console.log('insert 버튼');
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
    }
  };

  const onFocusError = e => {
    const errorList = Object.keys(errors);
    console.log('zzzzz');
    console.log(errorList);
    console.log(errorList.indexOf('emp_CD'));
    console.log(errorList.indexOf('kor_NM'));
    if (errorList.indexOf('emp_CD') < 0 && errorList.indexOf('co_CD') > -1) {
      console.log('hiii');
      setErrorName('co_CD');
    } else if (
      errorList.indexOf('emp_CD') < 0 &&
      errorList.indexOf('div_CD') > -1
    ) {
      setErrorName('div_CD');
    } else {
      setErrorName(e.target.name);
    }
  };

  console.log('errrrrrr', errorName);

  //select box event
  const handleCheckSelectChange = event => {
    const {
      target: { value },
    } = event;
    setFixEnrlList(typeof value === 'string' ? value.split(',') : value);
    setEnrlList(typeof value === 'string' ? value.split(',') : value);
  };

  console.log(errors);
  console.log(enrlList);
  console.log(fixEnrlList);

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
                      <SubmitButton data={'저장'} width={'-10px'} height={30} />
                      <div className="paddingRight"></div>
                      <EventButton
                        data={'삭제'}
                        width={'-10px'}
                        height={30}
                        onClickEvent={onClickButtonRemoveEmp}
                      />
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
