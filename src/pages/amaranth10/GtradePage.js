import { MainTitle, ScrollWrapper, Title } from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
} from '../../components/layout/amaranth/Index';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../../components/common/modal/Modal';
import EventButton from '../../components/common/button/EventButton';
import CommonLayout2 from '../../components/common/CommonLayout2';
import GtradeInfoBox from '../../components/feature/amaranth/Strade/GtradeInfoBox';
import SelectListWrapperCommon from '../../components/layout/amaranth/SelectListWrapperCommon';
import GtradeListBoxItem from '../../components/feature/amaranth/Strade/GtradeListBoxItem';
import SelectBoxUSEYN from '../../components/common/box/SelectBoxUSEYN';
import GtradeModel from '../../model/GtradeModel';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import DeleteTradeModal from '../../components/feature/amaranth/Modal/DeleteTradeModal';

const GtradePage = () => {
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
  });
  const { state, actions } = GtradeModel({
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
      <CommonLayout2>
        <MainTitle mainTitle={'회계관리'} />
        <ContentWrapper>
          <Title titleName={'일반거래처등록'}></Title>
          <DetailContentWrapper>
            <SelectBoxWrapper height="92px" width="1375px">
              <div className="selectDetailWrapper">
                <div className="selectBox">
                  <div className="selectTop1">
                    <span className="leftSelectBoxPaddingGtrade">
                      거래처코드
                    </span>
                    <input
                      type="text"
                      className="textInputBox"
                      {...register('select_TR_CDG')}
                    />
                    <span className="rightSelectBoxPaddingGtrade">
                      거래처명
                    </span>
                    <input
                      type="text"
                      className="textInputBox"
                      {...register('select_TR_NMG')}
                    />
                    <span className="rightSelectBoxPaddingGtradeREG">
                      사업자등록번호
                    </span>
                    <input
                      type="text"
                      className="textInputBox"
                      {...register('select_REG_NBG')}
                    />
                  </div>
                  <div className="selectTop2">
                    <span className="leftSelectBoxPaddingGtradePPL">
                      주민등록번호
                    </span>
                    <input
                      type="text"
                      className="textInputBox"
                      {...register('select_PPL_NBG')}
                    />
                    <span className="rightSelectBoxPaddingGtrade">
                      사용여부
                    </span>
                    <SelectBoxUSEYN
                      width={'100px'}
                      state={state.selectUseYN}
                      setState={state.setSelectUseYN}
                      clickYN={state.clickYN}
                      register={register}
                      errors={errors}
                      errorName={state.errorName}
                      total={true}
                      setChangeFormData={state.setChangeFormData}
                    />
                  </div>
                </div>

                <div className="selectButtonWrapperGtrade">
                  <button
                    className="FFcustomButton"
                    onClick={actions.onClickSearchEmpList}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </SelectBoxWrapper>
            <MainContentWrapper
              height={state.deleteYN === true ? '150px' : '97px'}
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
                    leftBottom={info?.reg_NB}
                    clickBoxEvent={actions.onClickDetailSGtradeInfo}
                    checkItemHandler={actions.checkItemHandler}
                  />
                ))}
              </SelectListWrapperCommon>
              <RightContentWrapper>
                <form
                  onSubmit={handleSubmit(actions.onSubmit)}
                  onChange={actions.onChangeFunction}
                  onKeyDown={actions.onformKeyDown}
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
                    deptH={state.deleteYN === true ? 65 : 15}
                  >
                    <GtradeInfoBox
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
            {state.deleteYN === true && state.deleteListCount > 0 && (
              <div className="deletBoxWrapper">
                <div className="deleteTitleWrapper">
                  <div className="deleteCount">{state.deleteListCount}건</div>
                  <div className="deleteTradeSpan">선택됨</div>
                </div>
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
          </DetailContentWrapper>
        </ContentWrapper>
      </CommonLayout2>

      {state.isOpenPost ? (
        <Modal
          width={'560px'}
          height={'600px'}
          title={'우편번호'}
          onClickEvent={actions.onChangeOpenPost}
        >
          <DaumPostcode autoClose onComplete={actions.onCompletePost} />
        </Modal>
      ) : null}
      {state.deleteListModal && (
        <DeleteTradeModal
          name="일반"
          onClickEvent={actions.onChangeDeleteListModal}
          deleteListCount={state.deleteListCount}
          deleteStradeInfo={state.deleteStradeInfo}
        />
      )}
    </>
  );
};

export default GtradePage;
