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
            <SelectBoxWrapper height="92px" width="1200px">
              <div className="selectDetailWrapper">
                <div className="selectBox">
                  <div className="selectTop1">
                    <span className="leftSelectBoxPaddingGtrade">
                      거래처코드
                    </span>
                    <input
                      type="text"
                      className="textInputBox"
                      {...register('select_TR_CD')}
                    />
                    <span className="rightSelectBoxPaddingGtrade">
                      거래처명
                    </span>
                    <input
                      type="text"
                      className="textInputBox"
                      {...register('select_TR_NM')}
                    />
                    <span className="rightSelectBoxPaddingGtradeREG">
                      사업자등록번호
                    </span>
                    <input
                      type="text"
                      className="textInputBox"
                      {...register('select_REG_NB')}
                    />
                  </div>
                  <div className="selectTop2">
                    <span className="leftSelectBoxPaddingGtradePPL">
                      주민등록번호
                    </span>
                    <input
                      type="text"
                      className="textInputBox"
                      {...register('select_PPL_NB')}
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
                title={'사용자:'}
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
                >
                  <div className="tableHeader">
                    <div className="defaultTitle">기본등록사항</div>
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
        <Modal
          width={'560px'}
          height={'600px'}
          title={'거래처'}
          onClickEvent={actions.onChangeDeleteListModal}
        >
          <div>일반거래처 삭제 요청이 완료되었습니다.</div>
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

export default GtradePage;
