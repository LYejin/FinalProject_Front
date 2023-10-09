import React, { useEffect, useRef, useState } from 'react';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import Modal2 from '../../../common/modal/Modal2';
import DeptShowWrapper from '../employee/Department/DeptShowWrapper';
import DeptInEmpModal from '../../../common/modal/DeptInEmpModal';

const DeptModalInEmp = ({
  onChangeOpenDeptModal,
  reset,
  setValue,
  company,
  deptModal,
  setSelectedDeptCd,
  setSelectedDivCd,
  setSelectedDeptNm,
  setSelectedDivNm,
  selectedDeptCd,
  selectedDivCd,
  setChangeFormData,
}) => {
  const [deptCd, setDeptCd] = useState('');
  const [divCd, setDivCd] = useState('');
  const [deptNm, setDeptNm] = useState('');
  const [divNm, setDivNm] = useState('');
  const [deptAndDivData, setDeptAndDivData] = useState('');
  const [DeptData, setDeptData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [SearchCocd, setSearchCocd] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [allDepartmentData, setAllDepartmentData] = useState([]);
  const [data, setData] = useState({});
  const [onChangeForm, setChangeForm] = useState(false); // 폼 변경 사항 확인
  const [selectedDept, setSelectedDept] = useState('1');
  const [selectedRadioValue, setSelectedRadioValue] = useState(''); //radio 값
  const [showRadioValue, setShowRadioValue] = useState(''); //radio 값
  const [isVisible, setVisible] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false); // 우편번호 모달창
  const [addressDetail, setAddressDetail] = useState(); // 주소
  const [address, setAddress] = useState(''); // 우편 주소
  const [useCoCd, setUseCoCd] = useState(''); // 현재 선택된 회사
  const [useCoCdName, setUseCoCdName] = useState(null); // 현재 선택된 회사 이름
  const [selectedDivCdName, setSelectedDivCdName] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [IsOpenMdept, setIsOpenMdept] = useState(false);
  const [MdeptCD, setMdeptCD] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    fetchDepartmentData(company);
  }, []);

  //selectedCocd -> 회사코드 selectedLabel -> 필요없음
  const fetchDepartmentData = async selectedCoCd => {
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
      setMdeptCD('');
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const updateMdeptCDInInfoWrapper = () => {
    console.log('???????');
    setSelectedDivCd(divCd);
    setSelectedDeptCd(deptCd);
    setSelectedDeptNm(deptNm);
    setSelectedDivNm(divNm);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      div_CD: divCd,
      dept_CD: deptCd,
    }));
    setValue('dept_CD', `${divCd}. ${divNm} / ${deptCd}. ${deptNm}`);
    onChangeOpenDeptModal();
  };

  const handleSelectDepartment = (dept_CD, div_CD, dept_NM, div_NM) => {
    console.log('불렀잖아:', dept_CD, div_CD);
    setSearchValue(dept_CD);
    setDivCd(div_CD);
    setDeptCd(dept_CD);
    setDeptNm(dept_NM);
    setDivNm(div_NM);
    console.log(div_CD);
    console.log(dept_CD);
    console.log(dept_NM);
    console.log(div_NM);
    setIsUpdate(false);
    setMdeptCD('');
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

  return (
    <DeptInEmpModal
      isOpen={deptModal}
      onClose={onChangeOpenDeptModal}
      title={'부서선택'}
      width={400}
      height={700}
      buttonYN={true}
      updateMdeptCDInInfoWrapper={updateMdeptCDInInfoWrapper}
    >
      <DeptShowWrapper
        width={'350px'}
        isModal={1}
        height={550}
        data={DeptData}
        searchValue={searchValue}
        marginL={5}
        marginT={20}
        selectedDeptCd={deptCd}
        setSelectedDeptCd={setDeptCd}
        handleSelectDepartment={handleSelectDepartment}
        setSelectedDivCd={setSelectedDivCd}
        setSelectedDivCdName={setSelectedDivCdName}
        setIsUpdate={setIsUpdate}
        isModalYN={false}
        MdeptCD={MdeptCD}
        setMdeptCD={setMdeptCD}
      />
    </DeptInEmpModal>
  );
};

export default DeptModalInEmp;
