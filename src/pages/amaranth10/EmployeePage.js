import { authAxiosInstance } from '../../axios/axiosInstance';
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
import { getAccessToken } from '../../cookie/Cookie';
import axios from '../../../node_modules/axios/index';

const EmployeePage = () => {
  const { register, handleSubmit, reset, getValue } = useForm();
  const [empList, setEmpList] = useState([]);
  const [clickYN, setClickYN] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [insertButtonClick, setInsertButtonClick] = useState(false);
  const [openDate, setOpenDate] = useState(new Date()); // 개업일 선택 상태 관리
  const [onChangeForm, setChangeForm] = useState(false); // 폼 변경 사항 확인
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = event => {
    setSelectedValue(event.target.value);
  };

  const [data, setData] = useState({});

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
    try {
      const response = await axios.post(
        'system/user/groupManage/employee/getList',
        {},
        { headers: { Authorization: getAccessToken() } }
      );
      console.log(response.data[0]);
      setData(response.data[0]);
      setEmpList(response.data);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  useEffect(() => {
    getEmpList();
  }, []);

  // click 시 사원 정보 가져오기 이벤트
  const onClickDetailEmpInfo = async (kor_NM, username) => {
    try {
      reset();
      if (insertButtonClick === true && onChangeForm === true) {
        alert('작성중인 내용이 있습니다. 취소하시겠습니까?');
      }
      setChangeForm(false);
      setIsLoading(true);
      setInsertButtonClick(false);
      setClickYN(true);
      console.log(kor_NM, username);
      const response = await authAxiosInstance.post(
        'system/user/groupManage/employee/empDetail',
        { kor_NM: kor_NM, username: username }
      );
      setData(response.data);
      setOpenDate(new Date(response.data.join_DT) || '');
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  const onChangeFunction = e => {
    console.log(e.target.value);
    setChangeForm(true);
    console.log(data);
  };

  // 사원 insert 이벤트
  const onClickInsertEmpBox = () => {
    reset();
    resetData();
    setOpenDate(new Date());
    setInsertButtonClick(true);
    setClickYN(false);
  };

  // 사원 remove 이벤트
  const onClickButtonRemoveEmp = async (kor_NM, username) => {
    try {
      console.log('clickemovebutton');
      const response = await authAxiosInstance.post(
        'system/user/groupManage/employee/empRemove',
        { kor_NM, username }
      );
      console.log('hiii');
      console.log(response.data);
      setClickYN(false);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  // 사원 sumbmit button(update, insert) 이벤트
  const onSubmit = async data => {
    try {
      console.log('clickEmpBoxYN', clickYN);
      console.log('insertButtonClick', insertButtonClick);
      // 사원 update 중일 때 저장버튼 기능
      if (clickYN && !insertButtonClick) {
        console.log('update 버튼');
        console.log(data);
        const response = await authAxiosInstance.post(
          'system/user/groupManage/employee/empUpdate',
          { data }
        );
        console.log('hiii');
        console.log(response.data);
      }

      // 사원 insert 중일 때 저장버튼 기능
      if (!clickYN && insertButtonClick) {
        console.log('insert 버튼');
        console.log(openDate);
        const getJoinDT = getNowJoinTime(openDate);
        console.log(getJoinDT);
        const response = await authAxiosInstance.post(
          'system/user/groupManage/employee/empInsert',
          {
            username: data.username || '',
            password: data.password || '',
            kor_NM: data.kor_NM || '',
            email_ADD: data.email_ADD || '',
            gender_FG: selectedValue,
            emp_CD: data.emp_CD || '',
            enrl_FG: '0',
            join_DT: getJoinDT || '',
            personal_MAIL: data.personal_MAIL || '',
            personal_MAIL_CP: data.personal_MAIL_CP || '',
            salary_MAIL: data.salary_MAIL || '',
            tel: data.tel || '',
            home_TEL: data.home_TEL || '',
            zipcode: data.zipcode || '',
            addr: data.addr || '',
            addr_NUM: data.addr_NUM || '',
          }
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
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
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
                  <Button data={'삭제'} width={'-10px'} height={30} />
                </div>
                <ScrollWrapper width={'700px'}>
                  <EmpInfoBox
                    data={data}
                    register={register}
                    setOpenDate={setOpenDate}
                    openDate={openDate}
                    selectedValue={selectedValue}
                    handleRadioChange={handleRadioChange}
                  />
                </ScrollWrapper>
              </form>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
    </div>
  );
};

export default EmployeePage;
