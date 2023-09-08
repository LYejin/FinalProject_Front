import { useEffect, useState } from 'react';
import {
  authAxiosInstance,
  imageAxiosInstance,
} from '../../axios/axiosInstance';
import {
  MainTitle,
  Title,
  DeptHeadTitle,
  DeptSubTitle,
  CompSelectBox,
  DeptTextFieldBox,
} from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  DepartmentSelectBoxWrapper,
  DeptSearchWrapper,
  LeftContentWrapper,
  DeptShowWrapper,
} from '../../components/layout/amaranth/Index';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import CommonLayout2 from '../../components/common/CommonLayout2';
import DeptInfoWrapper from '../../components/feature/amaranth/Department/DeptInfoWrapper';

const DepartmentPage = () => {
  const {
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  }); // react-hook-form 사용
  const [companyData, setCompanyData] = useState([]);
  const [SearchCocd, setSearchCocd] = useState('');

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await authAxiosInstance.get(
        'system/user/groupManage/employee/getCompanyList'
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
    <>
      <CommonLayout2>
        <MainTitle mainTitle={'시스템설정'} />
        <ContentWrapper>
          <Title titleName={'부서관리'}></Title>
          <DetailContentWrapper>
            <DepartmentSelectBoxWrapper />
            <MainContentWrapper>
              <LeftContentWrapper>
                <DeptSearchWrapper width={'350px'}>
                  <CompSelectBox
                    data={companyData}
                    height={30}
                    width={315}
                    onSelectChange={selectedCoCd => setSearchCocd(selectedCoCd)}
                  />
                  <DeptTextFieldBox width={'100px'} />
                </DeptSearchWrapper>
                <DeptShowWrapper width={'350px'} title={'조직도'} />
              </LeftContentWrapper>
              <RightContentWrapper>
                <DeptHeadTitle titleName={'상세정보'}></DeptHeadTitle>
                <DeptSubTitle
                  titleName={'기본정보 | 부서원 정보'}
                ></DeptSubTitle>
                <DeptInfoWrapper />
              </RightContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
    </>
  );
};

export default DepartmentPage;
