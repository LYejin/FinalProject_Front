import { useEffect, useState } from 'react';
import { authAxiosInstance } from '../../axios/axiosInstance';
import { MainTitle, ScrollWrapper, Title } from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
} from '../../components/layout/amaranth/Index';
import { useForm } from 'react-hook-form';
import { getNowJoinTime } from '../../util/time';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../../components/common/modal/Modal';
import EventButton from '../../components/common/button/EventButton';
import { onChangePhoneNumber } from '../../util/number';
import { useRef } from 'react';
import CommonLayout2 from '../../components/common/CommonLayout2';
import SelectListWrapperCommon from '../../components/layout/amaranth/SelectListWrapperCommon';
import GtradeListBoxItem from '../../components/feature/amaranth/Strade/GtradeListBoxItem';
import FtradeInfoBox from '../../components/feature/amaranth/Strade/FtradeInfoBox';
import SelectBoxUSEYN from '../../components/common/box/SelectBoxUSEYN';
import Swal from 'sweetalert2';
import FtradeModel from '../../model/FtradeModel';
import DeleteTradeModal from '../../components/feature/amaranth/Modal/DeleteTradeModal';

const FtradePage = () => {
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

  const { state, actions } = FtradeModel({
    register,
    handleSubmit,
    reset,
    getValues,
    errors,
    clearErrors,
    setValue,
    setError,
  });

  return (
    <>
      <CommonLayout2>
        <MainTitle mainTitle={'회계관리'} />
        <ContentWrapper>
          <Title titleName={'금융거래처등록'}></Title>
          <DetailContentWrapper>
            <SelectBoxWrapper height="50px" width="1400px">
              <span className="rightSelectBoxPaddingFtradeTR">거래처코드</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_TR_CD')}
              />
              <span className="rightSelectBoxPaddingFtradeTRNM">거래처명</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_TR_NM')}
              />
              <span className="rightFtradeBANBTR">계좌/가맹점번호</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_BA_NB_TR')}
              />
              <div className="rightFtradeUSEYN">사용여부</div>
              <SelectBoxUSEYN
                width={'80px'}
                state={state.selectUseYN}
                setState={state.setSelectUseYN}
                clickYN={state.clickYN}
                register={register}
                errors={errors}
                errorName={state.errorName}
                total={true}
                setChangeFormData={state.setChangeFormData}
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
            <MainContentWrapper
              height={state.deleteYN === true ? '110px' : '50px'}
            >
              <SelectListWrapperCommon
                width={'295px'}
                title={'거래처'}
                listRef={state.listRef}
                dataCount={state.empList.length}
                clickedBoxID={state.tr_CD}
                data={state.empList}
                clickInsertBoxEvent={actions.onClickInsertEmpBox}
                allCheckedHandler={actions.allCheckedHandler}
                checkTotalList={true}
              >
                {state.empList.map(info => (
                  <GtradeListBoxItem
                    key={info.tr_CD}
                    clickedBoxID={state.tr_CD}
                    isAllChecked={state.isAllChecked}
                    leftTop={info?.tr_CD}
                    rightTop={info?.tr_NM}
                    leftBottom={info?.ba_NB_TR}
                    clickBoxEvent={actions.onClickDetailSGtradeInfo}
                    checkItemHandler={actions.checkItemHandler}
                  />
                ))}
              </SelectListWrapperCommon>
              <RightContentWrapper>
                <form
                  onSubmit={handleSubmit(actions.onSubmit)}
                  onChange={actions.onChangeFunction}
                >
                  <div className="tableHeader">
                    <div className="defaultTitle">기본등록사항</div>
                    <div className="buttonWrapper">
                      <button type="submit" className="WhiteButton">
                        저장
                      </button>
                    </div>
                  </div>
                  <ScrollWrapper
                    width={'900px'}
                    deptH={state.deleteYN === true ? 25 : -36}
                  >
                    <FtradeInfoBox
                      register={register}
                      state={state}
                      actions={actions}
                      handleSubmit={handleSubmit}
                      reset={reset}
                      getValues={getValues}
                      errors={errors}
                      clearErrors={clearErrors}
                      setValue={setValue}
                      setError={setError}
                    />
                  </ScrollWrapper>
                </form>
              </RightContentWrapper>
              {state.deleteYN === true && state.deleteListCount > 0 && (
                <div className="deletBoxWrapper">
                  <div className="deleteCount">{state.deleteListCount}건</div>
                  <div className="deleteTradeSpan">선택됨</div>
                  <div className="deleteButtonTradeWrapper">
                    <div
                      type="button"
                      className="deleteTradeButton"
                      onClick={actions.removeStradelist}
                    >
                      삭제
                    </div>
                  </div>
                </div>
              )}
            </MainContentWrapper>
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>
      {state.isOpenPost && (
        <Modal
          width={'560px'}
          height={'600px'}
          title={'우편번호'}
          onClickEvent={actions.onChangeOpenPost}
        >
          <DaumPostcode autoClose onComplete={actions.onCompletePost} />
        </Modal>
      )}
      {state.deleteListModal && (
        <DeleteTradeModal
          name="금융"
          onClickEvent={actions.onChangeDeleteListModal}
          deleteListCount={state.deleteListCount}
          deleteStradeInfo={state.deleteStradeInfo}
        />
      )}
    </>
  );
};

export default FtradePage;
