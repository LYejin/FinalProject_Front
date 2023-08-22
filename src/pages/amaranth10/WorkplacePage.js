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

const WorkplacePage = () => {
  const [companyData, setCompanyData] = useState([]);
  const [workplaceData, setWorkplaceData] = useState([]);
  const [workplaceDetailData, setWorkplaceDetailData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCompanyData();
    fetchWorkplaceData();
  }, []);

  const inputRefs = {
    divCDRef: useRef(null),
    divNMRef: useRef(null),
    divADDRRef: useRef(null),
    divTELRef: useRef(null),
    regNBRef: useRef(null),
    divTOCDRef: useRef(null),
    divNMKRef: useRef(null),
    businessRef: useRef(null),
    jongmokRef: useRef(null),
    masNMRef: useRef(null),
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
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  // const FetchWorkplaceDetailInfo = async divCd => {
  //   try {
  //     const response = await axios.get(
  //       `system/user/WorkplaceManage/getWorkpInfo/${divCd}`,
  //       { headers: { Authorization: getAccessToken() } }
  //     );
  //     setWorkplaceDetailData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching workplace info:', error);
  //   }
  // };

  const FetchWorkplaceDetailInfo = async divCd => {
    try {
      const response = await axios.get(
        `system/user/WorkplaceManage/getWorkpInfo/${divCd}`,
        { headers: { Authorization: getAccessToken() } }
      );

      const fetchedWorkplaceDetailData = response.data;

      try {
        const companyResponse = await axios.get(
          `system/admin/groupManage/CompanyDetail/${fetchedWorkplaceDetailData.co_CD}`,
          { headers: { Authorization: getAccessToken() } }
        );

        const companyData = companyResponse.data;
        const updatedWorkplaceDetailData = {
          ...fetchedWorkplaceDetailData,
          co_NM: companyData.co_NM,
        };

        setWorkplaceDetailData(updatedWorkplaceDetailData);
      } catch (error) {
        console.error('Error fetching company detail:', error);
      }
    } catch (error) {
      console.error('Error fetching workplace info:', error);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const createFormData = inputRefs => {
    const formData = new FormData();
    formData.append('DIV_CD', inputRefs.divCDRef?.current?.value || '');
    formData.append('CO_CD', '11'); // 회사코드 업데이트 필요 시 추가
    formData.append('DIV_NM', inputRefs.divNMRef?.current?.value || '');
    formData.append('DIV_ADDR', inputRefs.divADDRRef?.current?.value || '');
    formData.append('DIV_TEL', inputRefs.divTELRef?.current?.value || '');
    formData.append('REG_NB', inputRefs.regNBRef?.current?.value || '');
    formData.append('DIV_TO_CD', '121'); // 업태코드 업데이트 필요 시 추가
    formData.append('DIV_NMK', inputRefs.divNMKRef?.current?.value || '');
    formData.append('BUSINESS', inputRefs.businessRef?.current?.value || '');
    formData.append('JONGMOK', inputRefs.jongmokRef?.current?.value || '');
    formData.append('MAS_NM', inputRefs.masNMRef?.current?.value || '');
    return formData;
  };

  const handleInsert = async () => {
    const formData = createFormData(inputRefs, workplaceDetailData);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await axios.post(
        '/system/user/WorkplaceManage/insert',
        formData,
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
    console.log('update 함수 실행!');
    const formData = createFormData(inputRefs, workplaceDetailData);

    try {
      const response = await axios.put(
        '/system/user/WorkplaceManage/update',
        formData,
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
      console.log('znlznnlznlznlz', mappedCompanyData);
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
            <Button data={'퇴사처리'} />
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
                titleName={'기본정보'}
                onClick={handleInsert}
              ></WorkpHeadTitle>
              <ScrollWrapper width={'100%'} height={'100%'}>
                {workplaceDetailData && (
                  <WorkPlaceInfoWrapper
                    data={isAdding ? '' : workplaceDetailData}
                    inputRefs={inputRefs}
                    isAdding={isAdding}
                    companyData={companyData}
                  />
                )}
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
    </div>
  );
};

export default WorkplacePage;
