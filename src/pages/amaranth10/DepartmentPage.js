import React, { useEffect, useState } from 'react';
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
  const [DeptData, setDeptData] = useState([]);
  const [SearchCocd, setSearchCocd] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = value => {
    setSearchValue(value);
  };

  useEffect(() => {
    fetchCompanyData();
    // fetchDepartmentData(1232);
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

  const fetchDepartmentData = async selectedCoCd => {
    try {
      const response = await authAxiosInstance.get(
        `/system/user/departments/getDeptList/${selectedCoCd}`
      );

      console.log(response.data);
      const organizedData = hierarchyData(response.data);
      setDeptData(organizedData);
      console.log(organizedData);
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const hierarchyData = data => {
    if (!data || data.length === 0) {
      return []; // 데이터가 없는 경우 빈 배열 반환
    }
    const result = [];

    const coItem = {
      co_CD: data[0].co_CD,
      co_NM: data[0].co_NM,
      divs: [],
    };

    const findSubDepts = (dept_CD, allDepts) => {
      return allDepts
        .filter(dept => dept.mdept_CD === dept_CD)
        .map(dept => ({
          ...dept,
          subDepts: findSubDepts(dept.dept_CD, allDepts),
        }));
    };

    // DIV_CD를 기준으로 분류
    const divGroups = data.reduce((acc, curr) => {
      if (!acc[curr.div_CD]) {
        acc[curr.div_CD] = {
          div_NM: curr.div_NM, // DIV_NM 추가
          depts: [],
        };
      }
      acc[curr.div_CD].depts.push(curr);
      return acc;
    }, {});

    for (const div in divGroups) {
      const deptsForThisDiv = divGroups[div].depts;
      const topLevelDepts = deptsForThisDiv.filter(dept => !dept.mdept_CD);
      topLevelDepts.forEach(dept => {
        dept.subDepts = findSubDepts(dept.dept_CD, deptsForThisDiv);
      });

      const divItem = {
        div_CD: div,
        div_NM: divGroups[div].div_NM,
        depts: topLevelDepts,
      };

      coItem.divs.push(divItem);
    }

    result.push(coItem);

    return result;
  };

  const handleSelectDepartment = dept_CD => {
    console.log(dept_CD);
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
                    onSelectChange={selectedCoCd => {
                      setSearchCocd(selectedCoCd);
                      fetchDepartmentData(selectedCoCd);
                    }}
                  />
                  <DeptTextFieldBox width={'100px'} onSearch={handleSearch} />
                </DeptSearchWrapper>
                <DeptContext.Provider value={{ handleSelectDepartment }}>
                  <DeptShowWrapper
                    width={'350px'}
                    title={'조직도'}
                    data={DeptData}
                    searchValue={searchValue}
                  />
                </DeptContext.Provider>
              </LeftContentWrapper>
              <RightContentWrapper>
                <DeptHeadTitle titleName={'상세정보'}></DeptHeadTitle>
                <DeptSubTitle>
                  <div className="subTitleInfo">기본정보</div>
                  <div className="subTitleInfo2">부서원 정보</div>
                </DeptSubTitle>
                <DeptInfoWrapper />
              </RightContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
    </>
  );
};
export const DeptContext = React.createContext();
export default DepartmentPage;
