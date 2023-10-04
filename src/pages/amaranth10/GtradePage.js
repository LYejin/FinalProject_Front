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
            <SelectBoxWrapper height="80px" width="1200px">
              <span className="leftSelectBoxPadding">거래처코드</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_TR_CD')}
              />
              <span className="lastSelectBoxTextPadding">거래처명</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_TR_NM')}
              />
              <span className="rightSelectBoxPadding">사업자등록번호</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_REG_NB')}
              />
              <span className="rightSelectBoxPadding">주민등록번호</span>
              <input
                type="text"
                className="textInputBox"
                {...register('select_PPL_NB')}
              />
              <div className="leftSelectBoxPadding">사용여부</div>
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
                    //clickedBoxID={clickedBoxID}
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
