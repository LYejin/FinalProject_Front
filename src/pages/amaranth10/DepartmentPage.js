import { useEffect, useState } from 'react';
import {
  authAxiosInstance,
  imageAxiosInstance,
} from '../../axios/axiosInstance';
import {
  DetailTitle,
  MainTitle,
  ScrollWrapper,
  Title,
  DeptHeadTitle,
} from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
  SelectWorkplaceListWrapper,
  DepartmentSelectBoxWrapper,
  DeptSearchWrapper,
  LeftContentWrapper,
  DeptShowWrapper,
} from '../../components/layout/amaranth/Index';
import EmpSelectListWrapper from '../../components/feature/amaranth/employee/EmpSelectListWrapper';
import { EmpInfoBox } from '../../components/feature/amaranth/Index';
import { useForm } from 'react-hook-form';
import { getNowJoinTime } from '../../util/time';
import CommonLayout from '../../components/common/CommonLayout';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../../components/common/modal/Modal';
import EventButton from '../../components/common/button/EventButton';
import EmpSelectBox from '../../components/feature/amaranth/employee/EmpSelectBox';
import EmpCheckSelectBox from '../../components/feature/amaranth/employee/EmpCheckSelectBox';
import { onChangePhoneNumber } from '../../util/number';
import { useRef } from 'react';
import CommonLayout2 from '../../components/common/CommonLayout2';
import GtradeInfoBox from '../../components/feature/amaranth/employee/GtradeInfoBox';
import FtradeInfoBox from '../../components/feature/amaranth/employee/FtradeInfoBox';
import DeptInfoWrapper from '../../components/feature/amaranth/Department/DeptInfoWrapper';

const DepartmentPage = () => {
  const {
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  }); // react-hook-form 사용
  const [companyList, setCompanyList] = useState([]); // select box 내 company list
  const [enrlList, setEnrlList] = useState([]); // 재직구분 selectbox 값
  const [companySelect, setCompanySelect] = useState(''); // select box 내 companySelect

  return (
    <>
      <CommonLayout2>
        <MainTitle mainTitle={'시스템설정'} />
        <ContentWrapper>
          <Title titleName={'부서관리'}></Title>
          <DetailContentWrapper>
            <DepartmentSelectBoxWrapper>
              <span>(!!)</span>
              <span>
                회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/임시'유형을
                선택하여 등록할 수 있습니다.
              </span>
            </DepartmentSelectBoxWrapper>
            <MainContentWrapper>
              <LeftContentWrapper>
                <DeptSearchWrapper width={'350px'} />
                <DeptShowWrapper width={'350px'} title={'조직도'} />
              </LeftContentWrapper>
              <RightContentWrapper>
                <DeptHeadTitle titleName={'상세정보'}></DeptHeadTitle>
                <DeptHeadTitle titleName={'기본정보 | 부서원 정보'}></DeptHeadTitle>
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
