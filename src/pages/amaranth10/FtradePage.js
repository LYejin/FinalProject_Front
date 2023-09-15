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
} from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
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

const FtradePage = () => {
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
        <MainTitle mainTitle={'회계관리'} />
        <ContentWrapper>
          <Title titleName={'이게맞냐@!@!@!@!@!!@@!!!'}></Title>
          <DetailContentWrapper>
            <SelectBoxWrapper>
              <span className="rightSelectBoxPadding">회계단위</span>
              <EmpSelectBox
                width={200}
                data={companyList}
                setCompanySelect={setCompanySelect}
                companySelect={companySelect}
              />
              <span className="leftSelectBoxPadding">자금과목</span>
              <EmpCheckSelectBox width={'200px'} enrlList={enrlList} />
              <span className="lastSelectBoxTextPadding">거래처</span>
              <input type="text" className="textInputBox" />
              <div className="selectBoxButtonWrapper">
                <EventButton
                  data={<i className="fa-solid fa-magnifying-glass"></i>}
                  width={'-10px'}
                  height={30}
                />
              </div>
            </SelectBoxWrapper>
            <MainContentWrapper>
              <RightContentWrapper>
                <form>
                  <div className="tableHeader">
                    <div className="defaultTitle">지출 | 수입</div>
                  </div>
                  <hr />
                  <ScrollWrapper width={'900px'}></ScrollWrapper>
                </form>
              </RightContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
    </>
  );
};

export default FtradePage;
