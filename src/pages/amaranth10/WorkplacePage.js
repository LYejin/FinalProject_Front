import React, { useRef } from 'react';
import {
  Button,
  CheckSelectBox,
  DetailTitle,
  Header,
  MainSidebar,
  MainTitle,
  PasswordInputBox,
  ScrollWrapper,
  SelectBox,
  Sidebar,
  TextFieldBox,
  Title,
  WorkpHeadTitle,
} from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
  SelectWorkplaceListWrapper,
  WorkPlaceInfoWrapper,
} from '../../components/layout/amaranth/Index';
import axios from '../../../node_modules/axios/index';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAccessToken } from '../../cookie/Cookie';
import Swal from 'sweetalert2';
import { parseDateString, parseDateToString } from '../../util/time';
import { useFetcher } from '../../../node_modules/react-router-dom/dist/index';
import Modal from '../../components/common/modal/Modal';
import DaumPostcode from 'react-daum-postcode';

const WorkplacePage = () => {
  const [companyData, setCompanyData] = useState([]);
  const [workplaceData, setWorkplaceData] = useState([]);
  const [workplaceDetailData, setWorkplaceDetailData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCompanyForInsert, setSelectedCompanyForInsert] = useState('');
  const [openDate, setOpenDate] = useState(null);
  const [closeDate, setCloseDate] = useState(null);
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState();
  const [isOpenPost, setIsOpenPost] = useState(false);

  useEffect(() => {
    fetchWorkplaceData();
    FetchWorkplaceDetailInfo('001');
  }, []);

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

  const handleOpenDateChange = date => {
    setOpenDate(date);
  };

  const handleCloseDateChange = date => {
    setCloseDate(date);
  };

  const inputRefs = {
    divCDRef: useRef(null),
    divNMRef: useRef(null),
    divADDRCodeRef: useRef(null),
    divADDRRef: useRef(null),
    divADDRDetailRef: useRef(null),
    divTELRef: useRef(null),
    regNBRef: useRef(null),
    divTOCDRef: useRef(null),
    divNMKRef: useRef(null),
    businessRef: useRef(null),
    jongmokRef: useRef(null),
    masNMRef: useRef(null),
    divFAXRef: useRef(null),
    copNBRef: useRef(null),
  };

  const fetchWorkplaceData = async () => {
    console.log('데이터를 가져옵니다!');
    const cookie = document.cookie;
    const token = cookie.split('=')[1];
    console.log(token);
    try {
      const response = await axios.get(
        '/system/user/WorkplaceManage/getList',

        { headers: { Authorization: getAccessToken() } }
      );
      setWorkplaceData(response.data);
      console.log(workplaceData);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  const FetchWorkplaceDetailInfo = async divCd => {
    console.log('===나찍혔어요===');
    try {
      const response = await axios.get(
        `system/user/WorkplaceManage/getWorkpInfo/${divCd}`,
        { headers: { Authorization: getAccessToken() } }
      );

      const fetchedWorkplaceDetailData = response.data;
      const openDate = parseDateString(fetchedWorkplaceDetailData.open_DT);
      const closeDate = parseDateString(fetchedWorkplaceDetailData.close_DT);

      try {
        const companyResponse = await axios.get(
          `system/admin/groupManage/CompanyDetail/${fetchedWorkplaceDetailData.co_CD}`,
          { headers: { Authorization: getAccessToken() } }
        );

        const companyData = companyResponse.data;
        const updatedWorkplaceDetailData = {
          ...fetchedWorkplaceDetailData,
          co_NM: companyData.co_NM,
          isAdding: false,
        };

        setWorkplaceDetailData(updatedWorkplaceDetailData);
        setOpenDate(new Date(openDate) || '');
        setCloseDate(new Date(closeDate) || '');
        setIsAdding(false);
        setAddress('');
        setAddressDetail('');
      } catch (error) {
        console.error('Error fetching company detail:', error);
      }
    } catch (error) {
      console.error('Error fetching workplace info:', error);
    }
  };

  const initialWorkplaceDetailData = {
    business: '',
    close_DT: '',
    co_CD: '',
    co_NM: '',
    cop_NB: '',
    div_ADDR: '',
    div_CD: '',
    div_FAX: '',
    div_NM: '',
    div_NMK: '',
    div_TEL: '',
    div_TO_CD: '',
    div_YN: '',
    fill_YN: '',
    jongmok: '',
    mas_NM: '',
    open_DT: '',
    reg_NB: '',
    isAdding: true,
  };

  const handleAddClick = () => {
    setWorkplaceDetailData(initialWorkplaceDetailData);
    setIsAdding(true);
    fetchCompanyData();
    setOpenDate(new Date());
    setCloseDate('');
  };

  const createWorkplaceData = (
    inputRefs,
    workplaceDetailData,
    div_CD,
    co_CD
  ) => {
    return {
      div_CD: div_CD || '',
      co_CD: co_CD || '',
      div_NM: inputRefs.divNMRef?.current?.value || '',
      div_ADDR: `${inputRefs.divADDRCodeRef?.current?.value || ''}/${
        inputRefs.divADDRRef?.current?.value || ''
      }/${inputRefs.divADDRDetailRef?.current?.value || ''}`,
      div_TEL: inputRefs.divTELRef?.current?.value || '',
      reg_NB: inputRefs.regNBRef?.current?.value || '',
      div_TO_CD: '121', // 업태코드 업데이트 필요 시 추가
      div_NMK: inputRefs.divNMKRef?.current?.value || '',
      business: inputRefs.businessRef?.current?.value || '',
      jongmok: inputRefs.jongmokRef?.current?.value || '',
      mas_NM: inputRefs.masNMRef?.current?.value || '',
      open_DT: parseDateToString(openDate) || '',
      close_DT: parseDateToString(closeDate) || '',
      div_FAX: inputRefs.divFAXRef?.current?.value || '',
      cop_NB: inputRefs.copNBRef?.current?.value || '',
    };
  };

  const handleInsert = async () => {
    const data = createWorkplaceData(
      inputRefs,
      workplaceDetailData,
      inputRefs.divCDRef.current.value,
      selectedCompanyForInsert
    );

    console.log(data);
    try {
      const response = await axios.post(
        '/system/user/WorkplaceManage/insert',
        data,
        { headers: { Authorization: getAccessToken() } }
      );

      console.log('Insert response:', response.data);

      Swal.fire({
        icon: 'success',
        title: '저장 완료',
        text: '작업장 정보가 성공적으로 저장되었습니다.',
      });
      fetchWorkplaceData();
    } catch (error) {
      console.error('Error inserting workplace:', error);
      Swal.fire({
        icon: 'error',
        title: '저장 실패',
        text: '작업장 정보 저장에 실패했습니다. 다시 시도해주세요.',
      });
    }
  };

  const handleUpdate = async () => {
    console.log(inputRefs.divNMRef.current.value);
    console.log(inputRefs.copNBRef.current.value);
    console.log('update 함수 실행!');
    const data = createWorkplaceData(
      inputRefs,
      workplaceDetailData,
      workplaceDetailData.div_CD,
      workplaceDetailData.co_CD
    );
    try {
      console.log(data);
      const response = await axios.put(
        '/system/user/WorkplaceManage/update',
        data,
        { headers: { Authorization: getAccessToken() } }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '업데이트 완료',
          text: '작업장 정보가 성공적으로 업데이트되었습니다.',
        });
        fetchWorkplaceData();
      } else {
        Swal.fire({
          icon: 'error',
          title: '업데이트 실패',
          text: '작업장 정보 업데이트에 실패했습니다. 다시 시도해주세요.',
        });
      }
    } catch (error) {
      console.error('Error updating workplace:', error);
      Swal.fire({
        icon: 'error',
        title: '업데이트 실패',
        text: '작업장 정보 업데이트에 실패했습니다. 다시 시도해주세요.',
      });
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(
        'system/admin/groupManage/CompanySelect',
        { headers: { Authorization: getAccessToken() } }
      );
      const mappedCompanyData = response.data.map(company => ({
        value: company.co_CD,
        label: company.co_NM,
      }));

      setCompanyData(mappedCompanyData);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
      <MainTitle mainTitle={'시스템 설정'} />
      <ContentWrapper>
        <Title titleName={'사업장관리'}></Title>
        <DetailContentWrapper>
          <SelectBoxWrapper>
            회사
            <SelectBox />
            사업장
            <TextFieldBox width={'100px'} />
            사용여부
            <SelectBox />
            {/* <CheckSelectBox width={"200px"} />
            <PasswordInputBox /> */}
            <Button data={'검색'} />
          </SelectBoxWrapper>
          <MainContentWrapper>
            <SelectWorkplaceListWrapper
              width={'295px'}
              title={'사업장'}
              dataCount={workplaceData.length}
              data={workplaceData}
              FetchWorkplaceDetailInfo={FetchWorkplaceDetailInfo}
              handleAddClick={handleAddClick}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
            />
            <RightContentWrapper>
              <WorkpHeadTitle
                titleName={isAdding ? '사업장 등록' : '기본정보'}
                isAdding={isAdding}
                onClickInsert={handleInsert}
                onClickUpdate={handleUpdate}
              ></WorkpHeadTitle>
              <ScrollWrapper width={'100%'} height={'100%'}>
                <WorkPlaceInfoWrapper
                  data={workplaceDetailData}
                  inputRefs={inputRefs}
                  companyData={companyData}
                  onCompanyChange={setSelectedCompanyForInsert}
                  openDate={openDate}
                  setOpenDate={setOpenDate}
                  closeDate={closeDate}
                  setCloseDate={setCloseDate}
                  handleOpenDateChange={handleOpenDateChange}
                  handleCloseDateChange={handleCloseDateChange}
                  onChangeOpenPost={onChangeOpenPost}
                  address={address}
                  addressDetail={addressDetail}
                />
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
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
    </div>
  );
};

export default WorkplacePage;
