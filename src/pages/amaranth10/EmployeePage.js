import {
  authAxiosInstance,
  imageAxiosInstance,
} from '../../axios/axiosInstance';
import {
  Button,
  CheckSelectBox,
  DetailTitle,
  Header,
  MainSidebar,
  MainTitle,
  ScrollWrapper,
  SelectBox,
  Sidebar,
  TextFieldBox,
  Title,
} from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
} from '../../components/layout/amaranth/Index';
import { useEffect, useState } from 'react';
import EmpSelectListWrapper from './../../components/feature/amaranth/employee/EmpSelectListWrapper';
import { EmpInfoBox } from '../../components/feature/amaranth/Index';
import { useForm } from 'react-hook-form';
import SubmitButton from '../../components/common/button/SubmitButton';
import { getNowJoinTime } from './../../util/time';
import { getAccessToken, removeAccessToken } from '../../cookie/Cookie';
import axios from '../../../node_modules/axios/index';
import CommonLayout from '../../components/common/CommonLayout';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../../components/common/modal/Modal';
import EventButton from '../../components/common/button/EventButton';

const EmployeePage = () => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const [empList, setEmpList] = useState([]);
  const [clickYN, setClickYN] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [insertButtonClick, setInsertButtonClick] = useState(false);
  const [openDate, setOpenDate] = useState(new Date()); // 개업일 선택 상태 관리
  const [onChangeForm, setChangeForm] = useState(false); // 폼 변경 사항 확인
  const [selectedRadioValue, setSelectedRadioValue] = useState(''); //radio 값
  const [address, setAddress] = useState(''); // 우편 주소
  const [addressDetail, setAddressDetail] = useState(); // 주소
  const [isOpenPost, setIsOpenPost] = useState(false); // 우편번호 모달창
  const [image, setImage] = useState(); // image axios
  const [imgFile, setImgFile] = useState(); // image 미리보기
  const [data, setData] = useState({}); // form 데이터들 보관

  // 우편번호
  const onChangeOpenPost = () => {
    console.log(isOpenPost);
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
    console.log(data.zonecode);
    setAddressDetail(fullAddr);
    console.log(fullAddr);
    setIsOpenPost(false);
  };

  const handleRadioChange = e => {
    setSelectedRadioValue(e.target.value);
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

  const getEmpList = async () => {
    const response = await axios
      .post(
        'system/user/groupManage/employee/getList',
        {},
        { headers: { Authorization: getAccessToken() } }
      )
      .catch(error => {
        if (error.response.status === 403) {
          window.location.href = '/';
          alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요.');
        }
      });
    console.log(response.data[0]);
    setData(response.data[0]);
    setEmpList(response.data);
    setSelectedRadioValue(response.data[0].gender_FG);
  };

  useEffect(() => {
    getEmpList();
  }, []);

  // click 시 사원 정보 가져오기 이벤트
  const onClickDetailEmpInfo = async (kor_NM, username) => {
    try {
      reset();
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
      console.log(response.data);
      setData(response.data);
      setSelectedRadioValue(response.data.gender_FG);
      setOpenDate(new Date(response.data.join_DT) || '');
      setImgFile(response.data.pic_FILE_ID);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  const onChangeFunction = e => {
    console.log(e.target.value);
    setChangeForm(true);
  };

  // 사원 insert 이벤트
  const onClickInsertEmpBox = () => {
    reset();
    resetData();
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
    console.log('hiii');
    console.log(response.data);
    setClickYN(false);
  };

  // 사원 submit button(update, insert) 이벤트
  const onSubmit = async data => {
    const getJoinDT = getNowJoinTime(openDate);
    console.log(getJoinDT);

    const formData = new FormData();

    const userData = {
      emp_CD: data.emp_CD || null,
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
      zipcode: data.zipcode || null,
      addr: data.addr || null,
      addr_NUM: data.addr_NUM || null,
    };

    formData.append(
      'userData',
      new Blob([JSON.stringify(userData)], {
        type: 'application/json',
      })
    );
    if (image !== null) {
      formData.append('image', image);
    }
    console.log('hiiiiiiii', formData);
    for (let key of formData.keys()) {
      console.log(key, ':', formData.get(key));
    }
    for (let value of formData.values()) {
      console.log(value);
    }
    console.log('clickEmpBoxYN', clickYN);
    console.log('insertButtonClick', insertButtonClick);
    // 사원 update 중일 때 저장버튼 기능
    if (clickYN && !insertButtonClick) {
      console.log('update 버튼');
      console.log(data);
      const response = await imageAxiosInstance.post(
        'system/user/groupManage/employee/empUpdate',
        formData
      );
      console.log('hiii');
      console.log(response.data);
    }

    // 사원 insert 중일 때 저장버튼 기능
    if (!clickYN && insertButtonClick) {
      console.log('insert 버튼');
      console.log(openDate);
      const response = await imageAxiosInstance.post(
        'system/user/groupManage/employee/empInsert',
        formData
      );
      console.log(response.data);
      console.log(getJoinDT);
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
    }
  };

  return (
    <>
      <CommonLayout>
        <MainTitle mainTitle={'시스템 설정'} />
        <ContentWrapper>
          <Title titleName={'상용직관리'}></Title>
          <DetailContentWrapper>
            <SelectBoxWrapper>
              <span className="rightSelectBoxPadding">회사</span>
              <SelectBox width={200} />
              <span className="leftSelectBoxPadding">재직구분</span>
              <CheckSelectBox width={'200px'} />
              <span className="lastSelectBoxTextPadding">이름/ID/Mail ID</span>
              <TextFieldBox width={'200px'} />
              <div className="selectBoxButtonWrapper">
                <Button
                  data={<i className="fa-solid fa-magnifying-glass"></i>}
                  width={'-10px'}
                  height={30}
                />
              </div>
            </SelectBoxWrapper>
            <MainContentWrapper>
              <EmpSelectListWrapper
                width={'295px'}
                title={'사용자:'}
                dataCount={527}
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
                    기본정보{' '}
                    <SubmitButton data={'저장'} width={'-10px'} height={30} />
                    <EventButton
                      data={'삭제'}
                      width={'-10px'}
                      height={30}
                      onClickEvent={onClickButtonRemoveEmp}
                    />
                  </div>
                  <ScrollWrapper width={'700px'}>
                    <EmpInfoBox
                      data={data}
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
