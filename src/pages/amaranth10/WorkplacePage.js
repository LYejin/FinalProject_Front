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

const WorkplacePage = () => {
  const [workplaceData, setWorkplaceData] = useState([]);
  const [workplaceDetailData, setWorkplaceDetailData] = useState([]);
  useEffect(() => {
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

  const FetchWorkplaceDetailInfo = async divCd => {
    try {
      const response = await axios.get(
        `system/user/WorkplaceManage/getWorkpInfo/${divCd}`,

        { headers: { Authorization: getAccessToken() } }
      );
      // console.log('가져온 사업장 정보:', response.data);
      // console.log('전번 : ', response.data.div_TEL);
      setWorkplaceDetailData(response.data);
    } catch (error) {
      console.error('Error fetching workplace info:', error);
    }
  };

  const handleInsert = async () => {
    // WorkPlaceInfoWrapper 컴포넌트 내의 input 데이터 수집
    console.log('insert함수 실행!');
    console.log('맛증ㄹ까?', inputRefs.divNMRef);
    const formData = new FormData();
    formData.append('DIV_CD', '015'); // div_CD ref 활용
    formData.append('CO_CD', '11');
    formData.append('div_NM', inputRefs.divNMRef.current.value); // div_NM ref 활용
    formData.append('div_ADDR', inputRefs.divADDRRef.current.value); // div_ADDR ref 활용
    formData.append('div_TEL', inputRefs.divTELRef.current.value); // div_TEL ref 활용
    formData.append('reg_NB', inputRefs.regNBRef.current.value); // reg_NB ref 활용
    formData.append('div_TO_CD', '121'); // div_TO_CD ref 활용
    formData.append('div_NMK', inputRefs.divNMKRef.current.value); // div_NMK ref 활용
    formData.append('business', inputRefs.businessRef.current.value); // business ref 활용
    formData.append('jongmok', inputRefs.jongmokRef.current.value); // jongmok ref 활용
    formData.append('mas_NM', inputRefs.masNMRef.current.value);
    console.log('divNMRef.current:', inputRefs.divNMRef.current.value);
    const divNMValue = formData.get('div_CD');
    console.log('div_CD:', divNMValue);
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
      // 성공적으로 요청을 처리한 후에 추가 작업 수행 가능
    } catch (error) {
      console.error('Error inserting workplace:', error);
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
            />
            <RightContentWrapper>
              <WorkpHeadTitle
                titleName={'기본정보'}
                onClick={handleInsert}
              ></WorkpHeadTitle>
              <ScrollWrapper width={'100%'} height={'100%'}>
                {workplaceDetailData && (
                  <WorkPlaceInfoWrapper
                    data={workplaceDetailData}
                    inputRefs={inputRefs}
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
