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
            <SelectBoxWrapper height="50px" width="1200px">
              <span className="rightSelectBoxPadding">거래처코드</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_TR_CD')}
              />
              <span className="leftSelectBoxPadding">거래처명</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_TR_NM')}
              />
              <span className="lastSelectBoxTextPadding">계좌/가맹점번호</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_BA_NB_TR')}
              />
              <div className="leftSelectBoxPadding">사용여부</div>
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
                <EventButton
                  data={<i className="fa-solid fa-magnifying-glass"></i>}
                  width={'-10px'}
                  height={30}
                  onClickEvent={actions.onClickSearchEmpList}
                />
              </div>
            </SelectBoxWrapper>
            <MainContentWrapper>
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
                    //clickedBoxID={clickedBoxID}
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
                      <button
                        type="button"
                        className="WhiteButton"
                        onClick={actions.removeStradelist}
                      >
                        L삭제
                      </button>
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
        <Modal
          width={'560px'}
          height={'600px'}
          title={'거래처'}
          onClickEvent={actions.onChangeDeleteListModal}
        >
          <div>금융거래처 삭제 요청이 완료되었습니다.</div>
          <div>
            <span>요청 {state.deleteListCount}건</span>
            <span>
              성공 {state.deleteListCount - state.deleteStradeInfo.length}건
            </span>
            <span>실패 {state.deleteStradeInfo.length}건</span>
          </div>
          {state.deleteStradeInfo.map((info, index) => (
            <>
              <div>
                {index + 1}. 거래처 코드 {info.tr_CD}
              </div>
              <div>
                고정자금등록에 {info.count}건 등록된 데이터가 존재하여 삭제할 수
                없습니다.
              </div>
            </>
          ))}
        </Modal>
      )}
    </>
  );
};

export default FtradePage;
