import React from 'react';
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

const TestGrid = () => {
  const [workplaceData, setWorkplaceData] = useState([]);

  useEffect(() => {
    fetchWorkplaceData();
  }, []);

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
      console.log(response);
      console.log('데이터는', response.data);
      console.log('데이터는', response.data[0].div_CD);
      setWorkplaceData(response.data);
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
              title={'회사'}
              dataCount={527}
              data={workplaceData}
            />
            <RightContentWrapper>
              <DetailTitle detailTitle={'기본정보'}></DetailTitle>
              <ScrollWrapper width={'100%'} height={'100%'}>
                <WorkPlaceInfoWrapper />
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
    </div>
  );
};

export default TestGrid;
