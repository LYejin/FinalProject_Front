import { authAxiosInstance } from "../../axios/axiosInstance";
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
} from "../../components/common/Index";
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
} from "../../components/layout/amaranth/Index";
import { useEffect, useState } from "react";
import EmpSelectListWrapper from "./../../components/feature/amaranth/employee/EmpSelectListWrapper";
import { EmpInfoBox } from "../../components/feature/amaranth/Index";
import EmpInsertBox from "../../components/feature/amaranth/employee/EmpInsertBox";

const EmployeePage = () => {
  const [empList, setEmpList] = useState([]);
  const [detailEmpInfo, setDetailEmpInfo] = useState();
  const [clickYN, setClickYN] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [insertButtonClick, setInsertButtonClick] = useState(false);

  // const { data, error, isLoading } = useGetEmpList();
  // console.log(data);

  const getEmpList = async () => {
    try {
      const response = await authAxiosInstance.post(
        "system/user/groupManage/employee/getList",
        {}
      );
      setEmpList(response.data);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  useEffect(() => {
    getEmpList();
  }, []);

  // click 시 사원 정보 가져오기 이벤트
  const onClickDetailEmpInfo = async (kor_NM, username) => {
    try {
      setIsLoading(true);
      setClickYN(true);
      console.log(kor_NM, username);
      const response = await authAxiosInstance.post(
        "system/user/groupManage/employee/empDetail",
        { kor_NM: kor_NM, username: username }
      );
      console.log("hiii");
      console.log(response.data);
      setDetailEmpInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  // 사원 insert 이벤트
  const onClickInsertEmp = async (data) => {
    try {
      setIsLoading(true);
      setInsertButtonClick(true);
      setClickYN(false);
      const response = await authAxiosInstance.post(
        "system/user/groupManage/employee/empInsert",
        { data }
      );
      console.log("hiii");
      console.log(response.data);
      setDetailEmpInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
      <MainTitle mainTitle={"시스템 설정"} />
      <ContentWrapper>
        <Title titleName={"상용직관리"}></Title>
        <DetailContentWrapper>
          <SelectBoxWrapper>
            <span className="rightPadding">회사</span>
            <SelectBox width={200} />
            <span className="leftSelectBoxPadding">재직구분</span>
            <CheckSelectBox width={"200px"} />
            <span className="lastSelectBoxTextPadding">이름/ID/Mail ID</span>
            <TextFieldBox width={"200px"} />
            <div className="selectBoxButtonWrapper">
              <Button
                data={<i class="fa-solid fa-magnifying-glass"></i>}
                width={"-10px"}
                height={30}
              />
            </div>
          </SelectBoxWrapper>
          <MainContentWrapper>
            <EmpSelectListWrapper
              width={"295px"}
              title={"사용자:"}
              dataCount={527}
              data={empList}
              clickBoxEvent={onClickDetailEmpInfo}
              clickInsertEvent={onClickInsertEmp}
            />
            <RightContentWrapper>
              <DetailTitle detailTitle={"상세정보"}></DetailTitle>
              <div className="tableHeader">
                기본정보 <Button data={"저장"} width={"-10px"} height={30} />
                <Button data={"삭제"} width={"-10px"} height={30} />
              </div>
              <ScrollWrapper width={"100%"} height={"calc(100% - 40px)"}>
                {/* 테이블 입력 */}
                {clickYN && !isLoading && (
                  <EmpInfoBox detailEmpInfo={detailEmpInfo} />
                )}
                {/* 사원 insert 시에 생성 */}
                {insertButtonClick && !isLoading && <EmpInsertBox />}
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
    </div>
  );
};

export default EmployeePage;
