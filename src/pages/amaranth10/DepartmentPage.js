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
import Modal2 from '../../components/common/modal/Modal2';
import DeptEmpListGrid from '../../components/feature/amaranth/Department/DeptEmpListGrid';
import CommonLayout from '../../components/common/CommonLayout';

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
  const [IsOpenMdept, setIsOpenMdept] = useState(false); //상위부서 모달창
  const [MdeptCD, setMdeptCD] = useState(''); //상위부서 설정값
  const [isLowLevel, setIsLowLevel] = useState(false); //하위부서,직원 확인
  const [isHighLevel, setIsHighLevel] = useState(false); //상위부서 사용여부 확인
  const [useSelect, setUseSelect] = useState('0'); //조직도표시 사용여부
  const [showSelect, setShowSelect] = useState('0'); //조직도표시 표시기능

  console.log('isHighLevel : ', isHighLevel);

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

  const onChangeOpenDeptList = () => {
    setIsOpenMdept(!IsOpenMdept);
  };

  const handleCloseModal = () => {
    setIsOpenMdept(false);
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
    setChangeForm(true);
    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setData(prevData => ({
      ...prevData,
      addr_NUM: '',
    }));

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
    setMdeptCD('');
  }, []);

  useEffect(() => {
    console.log('isUpdate', isUpdate);
  }, [isUpdate]);

  const resetData = () => {
    setData({
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
    });
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
      console.log('당연히 안나오겠지만,', data.dept_YN);
      console.log('당연히 안나오겠지만,', data.show_YN);
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
        mdept_CD: MdeptCD !== '' ? MdeptCD : selectedDeptCd,
        dept_CD: data?.dept_CD,
        dept_CT: data?.dept_CT || '0',
        dept_NM: data?.dept_NM,
        dept_NMK: data?.dept_NMK,
        dept_YN: data?.dept_YN || '1',
        call_NM: data?.call_NM,
        call_YN: data?.call_YN || '1',
        mgr_NM: data?.mgr_NM,
        show_YN: data?.show_YN || 'Y',
        sort_YN: data?.sort_YN,
        addr: data?.addr || addressDetail,
        addr_CD: data?.addr_CD || address,
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
      setSelectedDeptCd(userData.dept_CD);
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

      const mergedData = {
        ...changeFormData,
        dept_NM: changeFormData.dept_NM ? changeFormData.dept_NM : data.dept_NM,
        co_CD: useCoCd,
        div_CD: selectedDivCd,
        dept_CD: selectedDeptCd,
      };

      const response = await authAxiosInstance.put(
        'system/user/departments/update',
        mergedData
      );

      // const response = await authAxiosInstance.put(
      //   'system/user/departments/update',
      //   {
      //     ...changeFormData, // 기존의 changeFormData 객체를 펼침
      //     co_CD: useCoCd, // 추가적인 프로퍼티를 여기에 나열
      //     div_CD: selectedDivCd,
      //     dept_CD: selectedDeptCd,
      //   }
      // );
      const updatedData = { ...data, ...changeFormData };
      setChangeFormData(updatedData);

      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: '업데이트 완료',
        text: '부서 정보가 성공적으로 업데이트되었습니다.',
      });
      console.log('아울아ㅓㄴ리ㅏㅇ', selectedDeptCd, useCoCd);
    }
    fetchDepartmentDataAfter(useCoCd);
    setChangeFormData({});
    setIsUpdate(false);
    setChangeForm(false);
    setMdeptCD('');
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
      console.log('이건뭐지? : ', response.data);
      setVisible(false);
      setIsUpdate(false);
      const organizedData = hierarchyData(response.data);
      setDeptData(organizedData);
      console.log('오늘은 너다:', organizedData);
      setChangeForm(false);
      setAllDepartmentData(response.data);
      setUseCoCd(selectedCoCd); //현재 선택된 회사코드
      setMdeptCD('');
      setSelectedDeptCd('');
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
      const organizedData = hierarchyData(response.data);
      setDeptData(organizedData);
      setAllDepartmentData(response.data);
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
        .filter(dept => dept && dept.mdept_CD === dept_CD)
        .sort((a, b) => {
          // sort_YN이 null이거나 undefined인 경우를 모두 고려하여 정렬
          const aSortValue =
            a.sort_YN !== null && a.sort_YN !== undefined
              ? parseInt(a.sort_YN)
              : Infinity;
          const bSortValue =
            b.sort_YN !== null && b.sort_YN !== undefined
              ? parseInt(b.sort_YN)
              : Infinity;

          return aSortValue - bSortValue || a.dept_CD.localeCompare(b.dept_CD);
        })
        .map(dept => ({
          ...dept,
          subDepts: findSubDepts(dept.dept_CD || '', allDepts),
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

      // 여기서 최상위 부서를 찾고 정렬합니다.
      const topLevelDepts = (deptsForThisDiv || [])
        .filter(dept => dept && !dept.mdept_CD)
        .sort((a, b) => {
          // sort_YN이 null이거나 undefined인 경우를 모두 고려하여 정렬
          const aSortValue =
            a.sort_YN !== null && a.sort_YN !== undefined
              ? parseInt(a.sort_YN)
              : Infinity;
          const bSortValue =
            b.sort_YN !== null && b.sort_YN !== undefined
              ? parseInt(b.sort_YN)
              : Infinity;

          return aSortValue - bSortValue || a.dept_CD.localeCompare(b.dept_CD);
        });

      // 정렬된 최상위 부서를 바탕으로 각 부서의 하위 부서를 찾습니다.
      (topLevelDepts || []).forEach(dept => {
        dept.subDepts = findSubDepts(dept.dept_CD || '', deptsForThisDiv);
      });

      const divItem = {
        div_CD: div,
        div_NM: divGroups[div].div_NM || '',
        depts: topLevelDepts, // 정렬된 최상위 부서를 할당합니다.
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
    setSelectedDeptCd(dept_CD);
    setIsUpdate(false);
    setChangeForm(false);
    setChangeFormData();
    setMdeptCD('');
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
        setSelectedRadioValue(response.data.dept_YN);
        setShowRadioValue(response.data.show_YN);
      } else {
        console.log('No matching department found.');
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const handleRadioChange = e => {
    const newValue = e.target.value;
    if (isHighLevel && selectedRadioValue === '0' && newValue === '1') {
      alert('상위부서를 먼저 사용 으로 변경해주세요');
      return;
    }
    if (isLowLevel && selectedRadioValue === '1' && newValue === '0') {
      const userConfirmation = window.confirm(
        '부서를 미사용으로 변경시 \n하위부서 및 해당부서의 사원들도 미사용으로 변경됩니다.'
      );
      if (!userConfirmation) {
        // 사용자가 취소를 선택하면 값을 업데이트하지 않고 함수 종료
        return;
      }
    }

    setSelectedRadioValue(newValue);
    setChangeFormData(prevState => ({
      ...prevState,
      [e.target.name]: newValue,
    }));
  };

  const handleShowRadioChange = e => {
    setShowRadioValue(e.target.value);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const updateMdeptCDInInfoWrapper = () => {
    if (formRef.current) {
      const mdeptInputElement = formRef.current.elements['mdept_CD'];
      if (mdeptInputElement) {
        mdeptInputElement.value = MdeptCD;
        setChangeForm(true);
        setChangeFormData(changeFormData => ({
          ...changeFormData,
          mdept_CD: MdeptCD,
        }));

        setChangeFormData(changeFormData => ({
          ...changeFormData,
          div_CD: selectedDivCd,
        }));

        handleCloseModal();
      }
    }
  };
  const queryParams = new URLSearchParams();

  const checkDeleteDept = async () => {
    console.log('CoCd : ', useCoCd, 'Dept_CD :', selectedDeptCd);
    if (
      !useCoCd ||
      !selectedDeptCd ||
      useCoCd === '' ||
      selectedDeptCd === ''
    ) {
      alert('부서를 선택하세요');
      return;
    }

    queryParams.append('CO_CD', useCoCd);
    queryParams.append('DEPT_CD', selectedDeptCd);

    try {
      const response = await authAxiosInstance.get(
        `/system/user/departments/check-data?${queryParams.toString()}`
      );

      if (response.data === false) {
        const userConfirmation = window.confirm(
          '부서에 속한 하위 부서 혹은 사원이 존재하므로 삭제할 수 없습니다.\n미사용으로 변경하시겠습니까?'
        );

        if (userConfirmation) {
          const response = await authAxiosInstance.put(
            '/system/user/departments/update-department-employee',
            {
              CO_CD: useCoCd,
              DEPT_CD: selectedDeptCd,
            }
          );

          console.log('부서 삭제', response.data);
          fetchDepartmentData(useCoCd);
          Swal.fire({
            icon: 'success',
            title: '삭제 완료',
            text: '부서 정보가 성공적으로 변경 되었습니다.',
          });
          console.log('미사용으로 변경');
        } else {
          console.log('삭제취소');
        }
      } else {
        const deleteConfirmation = window.confirm('부서를 삭제하시겠습니까?');
        if (deleteConfirmation) {
          const response = await authAxiosInstance.delete(
            '/system/user/departments/delete',
            {
              data: {
                co_CD: useCoCd,
                dept_CD: selectedDeptCd,
              },
            }
          );
          console.log('부서 삭제', response.data);
          fetchDepartmentData(useCoCd);
          Swal.fire({
            icon: 'success',
            title: '삭제 완료',
            text: '부서가 삭제되었습니다.',
          });
        } else {
          console.log('삭제취소');
        }
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  return (
    <>
      <CommonLayout>
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
                    setIsUpdate,
                    setIsHighLevel,
                    setIsLowLevel,
                    useSelect,
                    showSelect,
                  }}
                >
                  <DeptShowWrapper
                    width={'350px'}
                    title={'조직도'}
                    height={'100%'}
                    data={DeptData}
                    searchValue={searchValue}
                    useSelect={useSelect}
                    showSelect={showSelect}
                    setUseSelect={setUseSelect}
                    setShowSelect={setShowSelect}
                  />
                </DeptContext.Provider>
              </LeftContentWrapper>
              <RightContentWrapper>
                <DeptHeadTitle
                  titleName={isUpdate ? '부서 추가' : '상세정보'}
                  clickInsertBoxEvent={onClickInsert}
                  selectedDivCd={selectedDivCd}
                  useCoCd={useCoCd}
                  setVisible={setVisible}
                  onSave={handleSubmit(onSubmit)}
                  formRef={formRef}
                  setIsUpdate={setIsUpdate}
                  isUpdate={isUpdate}
                  checkDeleteDept={checkDeleteDept}
                ></DeptHeadTitle>
                <div style={{ display: isVisible ? 'block' : 'none' }}>
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

                  {selectedDept === '1' ? (
                    <ScrollWrapper width={'900px'} deptH={30}>
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
                          onChangeOpenDeptList={onChangeOpenDeptList}
                        />
                      </form>
                    </ScrollWrapper>
                  ) : (
                    selectedDept === '0' && (
                      <DeptEmpListGrid
                        CoCd={useCoCd}
                        DeptCd={selectedDeptCd}
                        setIsLowLevel={setIsLowLevel}
                      />
                    )
                  )}
                </div>
                <div
                  className="selectDeptImg"
                  style={{
                    display: isVisible ? 'none' : 'flex',
                    border: '2px solid #ccc',
                    marginTop: 10,
                    padding: '328px 0px',
                  }}
                >
                  <img src={selectDeptImg} alt="부서선택" />
                </div>
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
        {IsOpenMdept ? (
          <Modal2
            isOpen={IsOpenMdept}
            onClose={handleCloseModal}
            title={'상위부서선택'}
            width={400}
            height={700}
            buttonYN={true}
            updateMdeptCDInInfoWrapper={updateMdeptCDInInfoWrapper}
          >
            <DeptContext.Provider
              value={{
                selectedDeptCd: '',
                setSelectedDeptCd,
                handleSelectDepartment,
                searchValue,
                setSelectedDivCd,
                setSelectedDivCdName,
                setIsUpdate,
                isModal: false,
                MdeptCD,
                setMdeptCD,
              }}
            >
              <DeptShowWrapper
                width={'350px'}
                isModal={1}
                height={550}
                data={DeptData}
                searchValue={searchValue}
                marginL={5}
                marginT={20}
              />
            </DeptContext.Provider>
          </Modal2>
        ) : null}
      </CommonLayout>
    </>
  );
};
export const DeptContext = React.createContext();
export default DepartmentPage;
