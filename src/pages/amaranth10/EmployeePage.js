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
import EmpSelectListWrapper from './../../components/feature/amaranth/employee/EmpSelectListWrapper';
import { EmpInfoBox } from '../../components/feature/amaranth/Index';
import { useForm } from 'react-hook-form';
import CommonLayout from '../../components/common/CommonLayout';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../../components/common/modal/Modal';
import EmpSelectBox from '../../components/feature/amaranth/employee/EmpSelectBox';
import EmpCheckSelectBox from '../../components/feature/amaranth/employee/EmpCheckSelectBox';
import EmployeeModel from '../../model/EmployeeModel';
import DeptModalInEmp from '../../components/feature/amaranth/Modal/DeptModalInEmp';
import ChangeHistoryModal from '../../components/common/modal/ChangeHistoryModal';
import {
  comPanyChangeHistoryLayout,
  companyLabels,
  empAndWorkChangeHistoryLayout,
  employeeLabels,
} from '../../components/feature/ChangeHistory/Realgrid-Data-ChangeHistory';

const EmployeePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    clearErrors,
    setValue,
    setFocus,
    setError,
  } = useForm({
    mode: 'onChange',
  }); // react-hook-form 사용

  const { state, actions } = EmployeeModel({
    register,
    handleSubmit,
    reset,
    getValues,
    errors,
    clearErrors,
    setValue,
    setFocus,
    setError,
  });

  return (
    <>
      <CommonLayout>
        <MainTitle mainTitle={'시스템 설정'} />
        <ContentWrapper>
          <Title titleName={'상용직관리'}>
            {' '}
            <button
              type="button"
              className="changeHistoryWhiteButton"
              onClick={() => actions.ModalOpenButton()}
            >
              변경이력
            </button>
          </Title>
          <DetailContentWrapper>
            <SelectBoxWrapper width="1150px">
              <span className="rightSelectBoxPadding">회사</span>
              <EmpSelectBox
                width={200}
                data={state.companyList}
                setCompanySelect={state.setCompanySelect}
                companySelect={state.companySelect}
              />
              <span className="leftSelectBoxPadding">재직구분</span>
              <EmpCheckSelectBox
                width={'200px'}
                handleCheckSelectChange={actions.handleCheckSelectChange}
                enrlList={state.enrlList}
              />
              <span className="lastSelectBoxTextPadding">이름/ID/Mail ID</span>
              <input
                type="text"
                className="textInputBox"
                {...register('name')}
              />
              <div className="selectBoxButtonWrapper">
                <button
                  className="FFcustomButton"
                  onClick={actions.onClickSearchEmpList}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </SelectBoxWrapper>
            <MainContentWrapper>
              <EmpSelectListWrapper
                width={'295px'}
                title={'사용자:'}
                listRef={state.listRef}
                dataCount={state.empList.length}
                clickedBoxID={state.username}
                data={state.empList}
                clickBoxEvent={actions.onClickDetailEmpInfo}
                clickInsertBoxEvent={actions.onClickInsertEmpBox}
              />
              <RightContentWrapper>
                <DetailTitle detailTitle={'상세정보'}></DetailTitle>
                <form
                  onSubmit={handleSubmit(actions.onSubmit)}
                  onChange={actions.onChangeFunction}
                  onKeyDown={e => actions.onKeyDownEmp(e)}
                >
                  <div className="tableHeader">
                    <div className="defaultTitle">기본정보</div>
                    <div className="buttonWrapper">
                      <button type="submit" className="WhiteButton">
                        저장
                      </button>
                      <button
                        type="button"
                        className="WhiteButton"
                        onClick={actions.onClickButtonRemoveEmp}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <ScrollWrapper width={'900px'}>
                    <EmpInfoBox
                      register={register}
                      state={state}
                      actions={actions}
                      handleSubmit={handleSubmit}
                      reset={reset}
                      getValues={getValues}
                      errors={errors}
                      clearErrors={clearErrors}
                      setValue={setValue}
                      setFocus={setFocus}
                      setError={setError}
                    />
                  </ScrollWrapper>
                </form>
              </RightContentWrapper>
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
        {state.isOpenPost && (
          <Modal
            width={'560px'}
            height={'600px'}
            title={'우편번호'}
            onClickEvent={actions.onChangeOpenPost}
            buttonYN="true"
          >
            <DaumPostcode autoClose onComplete={actions.onCompletePost} />
          </Modal>
        )}
        {state.deptModal && (
          <DeptModalInEmp
            onChangeOpenDeptModal={actions.onChangeOpenDeptModal}
            setChangeFormData={state.setChangeFormData}
            reset={reset}
            setValue={setValue}
            company={state.company}
            setError={setError}
            deptModal={state.deptModal}
            setSelectedDeptCd={state.setSelectedDeptCd}
            setSelectedDivCd={state.setSelectedDivCd}
            setSelectedDeptNm={state.setSelectedDeptNm}
            setSelectedDivNm={state.setSelectedDivNm}
            selectedDeptCd={state.selectedDeptCd}
            selectedDivCd={state.selectedDivCd}
          />
        )}
        {state.changeHistoryOpenPost && (
          <ChangeHistoryModal
            CATEGORY={state.CATEGORY.current}
            changeHistoryOpenPost={state.changeHistoryOpenPost}
            setChangeHistoryOpenPost={state.setChangeHistoryOpenPost}
            layout={empAndWorkChangeHistoryLayout}
            columnLabels={employeeLabels}
          />
        )}
      </CommonLayout>
    </>
  );
};

export default EmployeePage;
