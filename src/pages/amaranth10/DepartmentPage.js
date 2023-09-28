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
  ScrollWrapper,
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
import selectDeptImg from '../../components/feature/amaranth/Department/deptSelect.png';
import Modal from '../../components/common/modal/Modal';
import DaumPostcode from 'react-daum-postcode';
import { setDate } from 'date-fns';

const DepartmentPage = () => {
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
  const [companyData, setCompanyData] = useState([]);
  const [DeptData, setDeptData] = useState([]);
  const [SearchCocd, setSearchCocd] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [allDepartmentData, setAllDepartmentData] = useState([]);
  const [data, setData] = useState({});
  const [selectedDept, setSelectedDept] = useState('1');
  const [selectedRadioValue, setSelectedRadioValue] = useState(''); //radio 값
  const [showRadioValue, setShowRadioValue] = useState(''); //radio 값
  const [changeFormData, setChangeFormData] = useState({}); // 변경된 form data
  const [isVisible, setVisible] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false); // 우편번호 모달창
  const [addressDetail, setAddressDetail] = useState(); // 주소
  const [address, setAddress] = useState(''); // 우편 주소
  const [useCoCd, setUseCoCd] = useState(''); // 현재 선택된 회사
  const [useDivCd, setUseDivCd] = useState(''); // 현재 선택된 사업장

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

  const handleDivClick = value => {
    setSelectedDept(value);
  };

  const handleSearch = value => {
    setSearchValue(value);
  };

  useEffect(() => {
    const initialDataFetch = async () => {
      try {
        const response = await authAxiosInstance.get(
          'system/user/groupManage/employee/getCompanyList'
        );
        const mappedCompanyData = response.data.map(company => ({
          value: company.co_CD,
          label: company.co_NM,
        }));
        setCompanyData(mappedCompanyData);

        // 첫번째 데이터의 co_CD를 가지고 fetchDepartmentData를 호출
        if (response.data.length > 0) {
          fetchDepartmentData(response.data[0].co_CD);
          setUseCoCd(response.data[0].co_CD);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    initialDataFetch();
  }, []);

  const resetData = () => {
    setData({
      // co_CD: '',
      // div_CD: '',
      co_NM: '',
      dept_CD: '',
      dept_CT: '',
      dept_NM: '',
      dept_NMK: '',
      dept_YN: '',
      call_NM: '',
      call_YN: '',
      div_NM: '',
      mdept_CD: '',
      mgr_NM: '',
      show_YN: '',
      sort_YN: '',
      addr: '',
      addr_CD: '',
      addr_NUM: '',
    });
  };

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
      setVisible(false);
      console.log('이짓거리', response.data);
      const organizedData = hierarchyData(response.data);
      setDeptData(organizedData);
      setAllDepartmentData(response.data);
      setUseCoCd(selectedCoCd); //현재 선택된 회사코드
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  // const hierarchyData = data => {
  //   if (!data || data.length === 0) {
  //     return []; // 데이터가 없는 경우 빈 배열 반환
  //   }
  //   const result = [];

  //   const coItem = {
  //     co_CD: data[0].co_CD,
  //     co_NM: data[0].co_NM,
  //     divs: [],
  //   };

  //   const findSubDepts = (dept_CD, allDepts) => {
  //     return allDepts
  //       .filter(dept => dept.mdept_CD === dept_CD)
  //       .map(dept => ({
  //         ...dept,
  //         subDepts: findSubDepts(dept.dept_CD, allDepts),
  //       }));
  //   };

  //   // DIV_CD를 기준으로 분류
  //   const divGroups = data.reduce((acc, curr) => {
  //     if (!acc[curr.div_CD]) {
  //       acc[curr.div_CD] = {
  //         div_NM: curr.div_NM, // DIV_NM 추가
  //         depts: [],
  //       };
  //     }
  //     acc[curr.div_CD].depts.push(curr);
  //     return acc;
  //   }, {});

  //   for (const div in divGroups) {
  //     const deptsForThisDiv = divGroups[div].depts;
  //     const topLevelDepts = deptsForThisDiv.filter(dept => !dept.mdept_CD);
  //     topLevelDepts.forEach(dept => {
  //       dept.subDepts = findSubDepts(dept.dept_CD, deptsForThisDiv);
  //     });

  //     const divItem = {
  //       div_CD: div,
  //       div_NM: divGroups[div].div_NM,
  //       depts: topLevelDepts,
  //     };

  //     coItem.divs.push(divItem);
  //   }

  //   result.push(coItem);

  //   return result;
  // };

  const hierarchyData = data => {
    if (!data || data.length === 0) {
      return [];
    }
    const result = [];
    const coItem = {
      co_CD: data[0].co_CD || '', // co_CD가 없는 경우에 대비
      co_NM: data[0].co_NM || '', // co_NM이 없는 경우에 대비
      divs: [],
    };

    const findSubDepts = (dept_CD, allDepts) => {
      return (allDepts || [])
        .filter(dept => dept && dept.mdept_CD === dept_CD) // dept와 mdept_CD가 있는지 확인
        .map(dept => ({
          ...dept,
          subDepts: findSubDepts(dept.dept_CD || '', allDepts), // dept_CD가 있는지 확인
        }));
    };

    const divGroups = (data || []).reduce((acc, curr) => {
      const div_CD = curr?.div_CD || ''; // div_CD가 있는지 확인
      const div_NM = curr?.div_NM || ''; // div_NM이 있는지 확인
      if (!div_CD) return acc; // div_CD가 없으면 현재의 accumulator 반환
      if (!acc[div_CD]) {
        acc[div_CD] = {
          div_NM: div_NM,
          depts: [],
        };
      }
      acc[div_CD].depts.push(curr);
      return acc;
    }, {});

    for (const div in divGroups) {
      const deptsForThisDiv = divGroups[div].depts || [];
      const topLevelDepts = (deptsForThisDiv || []).filter(
        dept => dept && !dept.mdept_CD
      ); // dept와 mdept_CD가 있는지 확인
      (topLevelDepts || []).forEach(dept => {
        dept.subDepts = findSubDepts(dept.dept_CD || '', deptsForThisDiv); // dept_CD가 있는지 확인
      });

      const divItem = {
        div_CD: div,
        div_NM: divGroups[div].div_NM || '', // div_NM이 있는지 확인
        depts: topLevelDepts,
      };
      coItem.divs.push(divItem);
    }
    result.push(coItem);
    return result;
  };

  // const handleSelectDepartment = async dept_CD => {
  //   console.log(dept_CD);
  //   try {
  //     const response = await authAxiosInstance.get(
  //       `system/user/WorkplaceManage/getWorkpInfo/${dept_CD}`
  //     );
  //     const foundDept = allDepartmentData.find(
  //       dept => dept.dept_CD === dept_CD
  //     );
  //     if (foundDept) {
  //       console.log('Found matching department data:', foundDept);
  //       if (!isVisible) {
  //         setVisible(true);
  //       }
  //       setMatchingDept(foundDept);
  //       setSelectedRadioValue(response.data.call_YN);
  //       setShowRadioValue(response.data.show_YN);
  //     } else {
  //       console.log('No matching department found.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching department data:', error);
  //   }
  // };

  const handleSelectDepartment = async (dept_CD, div_CD) => {
    try {
      const response = await authAxiosInstance.get(
        `system/user/departments/getDeptInfo/${dept_CD}`,
        {
          params: {
            divCd: div_CD,
            coCd: useCoCd,
          },
        }
      );

      const foundDept = allDepartmentData.find(
        dept => dept.dept_CD === dept_CD
      );
      if (foundDept) {
        console.log('Found matching department data:', foundDept);
        if (!isVisible) {
          setVisible(true);
        }
        console.log(response.data);
        setData({
          ...response.data,
          co_NM: foundDept.co_NM,
          div_NM: foundDept.div_NM,
        });
        setSelectedRadioValue(response.data.call_YN);
        setShowRadioValue(response.data.show_YN);
      } else {
        console.log('No matching department found.');
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const handleRadioChange = e => {
    setSelectedRadioValue(e.target.value);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowRadioChange = e => {
    setShowRadioValue(e.target.value);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <CommonLayout2>
        <MainTitle mainTitle={'시스템설정'} />
        <ContentWrapper>
          <Title titleName={'부서관리'}></Title>
          <DetailContentWrapper>
            <DepartmentSelectBoxWrapper />
            <MainContentWrapper state={0}>
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
                    useInitialValue={true}
                    state={0}
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
                  <div
                    className={`subTitleInfo ${
                      selectedDept === '1' ? 'IsSelected' : ''
                    }`}
                    onClick={() => handleDivClick('1')}
                  >
                    기본정보
                  </div>
                  <div
                    className={`subTitleInfo2 ${
                      selectedDept === '0' ? 'IsSelected' : ''
                    }`}
                    onClick={() => handleDivClick('0')}
                  >
                    부서원 정보
                  </div>
                </DeptSubTitle>

                <ScrollWrapper width={'900px'} deptH={30}>
                  <div style={{ display: isVisible ? 'block' : 'none' }}>
                    <form>
                      <DeptInfoWrapper
                        data={data}
                        register={register}
                        selectedRadioValue={selectedRadioValue}
                        showRadioValue={showRadioValue}
                        handleRadioChange={handleRadioChange}
                        handleShowRadioChange={handleShowRadioChange}
                        onChangeOpenPost={onChangeOpenPost}
                        address={address}
                        addressDetail={addressDetail}
                      />
                    </form>
                  </div>
                  <div
                    className="selectDeptImg"
                    style={{ display: isVisible ? 'none' : 'flex' }}
                  >
                    <img src={selectDeptImg} alt="부서선택" />
                  </div>
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
            buttonYN="true"
          >
            <DaumPostcode autoClose onComplete={onCompletePost} />
          </Modal>
        ) : null}
      </CommonLayout2>
    </>
  );
};
export const DeptContext = React.createContext();
export default DepartmentPage;
