import React, { useEffect, useState } from 'react';
import { authAxiosInstance } from '../../axios/axiosInstance';
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
import Swal from 'sweetalert2';
import _ from 'lodash';

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
  const [onChangeForm, setChangeForm] = useState(false); // 폼 변경 사항 확인
  const [selectedDept, setSelectedDept] = useState('1');
  const [selectedRadioValue, setSelectedRadioValue] = useState(''); //radio 값
  const [showRadioValue, setShowRadioValue] = useState(''); //radio 값
  const [changeFormData, setChangeFormData] = useState({}); // 변경된 form data
  const [isVisible, setVisible] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false); // 우편번호 모달창
  const [addressDetail, setAddressDetail] = useState(); // 주소
  const [address, setAddress] = useState(''); // 우편 주소
  const [useCoCd, setUseCoCd] = useState(''); // 현재 선택된 회사
  const [useCoCdName, setUseCoCdName] = useState(null); // 현재 선택된 회사 이름
  const [selectedDeptCd, setSelectedDeptCd] = useState(null);
  const [selectedDivCd, setSelectedDivCd] = useState(null);
  const [selectedDivCdName, setSelectedDivCdName] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const formRef = useRef(null);

  const handleClick = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  // 우편번호
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  // // 우편번호 검색 시 처리
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
    setChangeFormData(prevChangeFormData => {
      const updatedData = {
        ...prevChangeFormData,
        addr_CD: data.zonecode,
        addr: fullAddr,
      };

      // 비교를 수행하여 setChangeForm 설정
      const isChanged =
        prevChangeFormData &&
        Object.keys(updatedData).some(
          key => !_.isEqual(prevChangeFormData[key], updatedData[key])
        );
      setChangeForm(!isChanged);

      return updatedData;
    });

    setIsOpenPost(false);
  };

  const handleDivClick = value => {
    setSelectedDept(value);
  };

  const handleSearch = value => {
    setSearchValue(value);
    const foundDept = allDepartmentData.find(dept => dept.dept_CD === value);
    if (foundDept) {
      handleSelectDepartment(value, foundDept.div_CD);
    } else {
      setVisible(false);
    }
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
          setUseCoCdName(response.data[0].co_NM);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
    setIsUpdate(false);
    initialDataFetch();
    setChangeForm(false);
  }, []);

  useEffect(() => {
    console.log('isUpdate', isUpdate);
  }, [isUpdate]);

  const resetData = () => {
    setData(prevData => ({
      co_NM: useCoCdName,
      div_NM: selectedDivCdName,
      mdept_CD: selectedDeptCd,
      dept_CD: '',
      dept_CT: '',
      dept_NM: '',
      dept_NMK: '',
      dept_YN: '',
      call_NM: '',
      call_YN: '',
      mgr_NM: '',
      show_YN: '',
      sort_YN: '',
      addr: '',
      addr_CD: '',
      addr_NUM: '',
    }));
  };

  const onClickInsert = () => {
    reset();
    resetData();
    setAddress();
    setAddressDetail();
  };

  const onSubmit = async data => {
    console.log('이거왜', isUpdate);
    if (isUpdate) {
      console.log('인서트입니다.');
      console.log('당연히 안나오겠지만,', data.dept_CD);
      console.log('Submitted Data: ', data);

      try {
        const response = await authAxiosInstance.get(
          'system/user/departments/deptCheck',
          {
            params: { coCd: useCoCd, deptCd: data.dept_CD },
          }
        );
        if (response.data) {
          setError('dept_CD', {
            type: 'manual',
            message: '중복된 번호입니다.',
          });
          return;
        }
      } catch (error) {
        console.error('Error during duplicate check', error);
        setError('dept_CD', {
          type: 'manual',
          message: '중복 확인 중 오류 발생',
        });
        return;
      }

      const userData = {
        co_CD: useCoCd,
        div_CD: selectedDivCd,
        mdept_CD: selectedDeptCd,
        dept_CD: data?.dept_CD,
        dept_CT: data?.dept_CT,
        dept_NM: data?.dept_NM,
        dept_NMK: data?.dept_NMK,
        dept_YN: data?.dept_YN,
        call_NM: data?.call_NM,
        call_YN: data?.call_YN,
        mgr_NM: data?.mgr_NM,
        show_YN: data?.show_YN,
        sort_YN: data?.sort_YN,
        addr: data?.addr,
        addr_CD: data?.addr_CD,
        addr_NUM: data?.addr_NUM,
      };

      console.log('insert 버튼');
      console.log(userData);

      const response = await authAxiosInstance.post(
        'system/user/departments/insert',
        userData
      );
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: '부서추가 완료',
        text: '부서 정보가 성공적으로 입력되었습니다.',
      });
      setIsUpdate(false);
    } else if (!isUpdate) {
      if (!onChangeForm) {
        Swal.fire({
          icon: 'error',
          title: '변경된 내용이 없습니다.',
        });
        return;
      }
      console.log('업데이트입니다.');
      console.log('당연히 안나오겠지만,', data.dept_CD);
      console.log('Submitted Data: ', changeFormData);

      const response = await authAxiosInstance.put(
        'system/user/departments/update',
        {
          ...changeFormData, // 기존의 changeFormData 객체를 펼침
          co_CD: useCoCd, // 추가적인 프로퍼티를 여기에 나열
          div_CD: selectedDivCd,
          dept_CD: selectedDeptCd,
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: '업데이트 완료',
        text: '부서 정보가 성공적으로 업데이트되었습니다.',
      });
    }
    fetchDepartmentDataAfter(useCoCd);
    setChangeForm(false);
    setChangeFormData();
  };

  const onChangeFunction = e => {
    const updatedData = {
      ...changeFormData,
      [e.target.name]: e.target.value,
    };
    // setChangeFormData(updatedData);
    setChangeFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    const isChanged = Object.keys(updatedData).some(
      key => !_.isEqual(data[key], updatedData[key])
    );

    setChangeForm(isChanged);
  };

  const fetchDepartmentData = async (selectedCoCd, selectedLabel) => {
    try {
      const response = await authAxiosInstance.get(
        `/system/user/departments/getDeptList/${selectedCoCd}`
      );
      setVisible(false);
      setIsUpdate(false);
      const organizedData = hierarchyData(response.data);
      setDeptData(organizedData);
      setChangeForm(false);
      setAllDepartmentData(response.data);
      setUseCoCd(selectedCoCd); //현재 선택된 회사코드
      if (selectedLabel) {
        setUseCoCdName(selectedLabel); //현재 선택된 회사이름
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };
  const fetchDepartmentDataAfter = async (selectedCoCd, selectedLabel) => {
    try {
      const response = await authAxiosInstance.get(
        `/system/user/departments/getDeptList/${selectedCoCd}`
      );
      setIsUpdate(false);
      const organizedData = hierarchyData(response.data);
      setDeptData(organizedData);
      setChangeForm(false);
      //setAllDepartmentData(response.data);
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  //계층형 데이터 정렬
  const hierarchyData = data => {
    if (!data || data.length === 0) {
      return [];
    }
    const result = [];
    const coItem = {
      co_CD: data[0].co_CD || '',
      co_NM: data[0].co_NM || '',
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
        dept.subDepts = findSubDepts(dept.dept_CD || '', deptsForThisDiv);
      });

      const divItem = {
        div_CD: div,
        div_NM: divGroups[div].div_NM || '',
        depts: topLevelDepts,
      };
      coItem.divs.push(divItem);
    }
    result.push(coItem);
    return result;
  };

  const handleSelectDepartment = async (dept_CD, div_CD) => {
    console.log('불렀잖아:', dept_CD, div_CD);
    setSearchValue(dept_CD);
    reset();
    setAddress();
    setAddressDetail();
    setSelectedDivCd(div_CD);
    setIsUpdate(false);
    setChangeForm(false);
    setChangeFormData();
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
                    onSelectChange={(selectedCoCd, selectedLabel) => {
                      setSearchCocd(selectedCoCd);
                      fetchDepartmentData(selectedCoCd, selectedLabel);
                    }}
                    useInitialValue={true}
                    state={0}
                  />

                  <DeptTextFieldBox
                    width={'100px'}
                    onSearch={handleSearch}
                    allDepartmentData={allDepartmentData}
                  />
                </DeptSearchWrapper>
                <DeptContext.Provider
                  value={{
                    selectedDeptCd,
                    setSelectedDeptCd,
                    handleSelectDepartment,
                    searchValue,
                    setSelectedDivCd,
                    setSelectedDivCdName,
                  }}
                >
                  <DeptShowWrapper
                    width={'350px'}
                    title={'조직도'}
                    data={DeptData}
                    searchValue={searchValue}
                  />
                </DeptContext.Provider>
              </LeftContentWrapper>
              <RightContentWrapper>
                <DeptHeadTitle
                  titleName={'상세정보'}
                  clickInsertBoxEvent={onClickInsert}
                  selectedDivCd={selectedDivCd}
                  useCoCd={useCoCd}
                  setVisible={setVisible}
                  onSave={handleSubmit(onSubmit)}
                  formRef={formRef}
                  setIsUpdate={setIsUpdate}
                ></DeptHeadTitle>
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
                    <form
                      ref={formRef}
                      onChange={onChangeFunction}
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <DeptInfoWrapper
                        data={data}
                        register={register}
                        CoCd={useCoCd}
                        errors={errors}
                        setError={setError}
                        isUpdate={isUpdate}
                        clearErrors={clearErrors}
                        selectedRadioValue={selectedRadioValue}
                        showRadioValue={showRadioValue}
                        handleRadioChange={handleRadioChange}
                        handleShowRadioChange={handleShowRadioChange}
                        onChangeOpenPost={onChangeOpenPost}
                        address={address}
                        addressDetail={addressDetail}
                        setChangeForm={onChangeFunction}
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
