import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import SelectBoxUSEYN from '../../../common/box/SelectBoxUSEYN';
import StradeRollManageRealGrid from './StradeRollManage/StradeRollManageRealGrid';
import { useState } from 'react';
import StradeCodeHelpModal from '../Modal/StradeCodeHelpModal/StradeCodeHelpModal';
import FinancecodeModal from '../Modal/FinancecodeModal/FinancecodeModal';
import { ErrorMessage } from '@hookform/error-message';
import SelectBox from './../../../common/box/SelectBox';
import { CiSquareMore } from 'react-icons/ci';

const FtradeInfoBox = ({ register, errors, setValue, state, actions }) => {
  const [trCDModal, setTrCDModal] = useState(false);

  const trCDModalButton = () => {
    setTrCDModal(!trCDModal);
  };

  const financeCDModalButton = () => {
    state.setFinanceCDModal(!state.financeCDModal);
  };

  return (
    <>
      <div className="selectListWrapper">
        <div>기본정보</div>
        <table className="tableStyle">
          <tbody>
            <tr>
              <th className="headerCellStyle">거래처코드</th>
              <td className="cellStyle">
                <div
                  className={state.clickYN ? 'GtradeFlex' : 'GtradeFlexInsert'}
                >
                  <div
                    className={
                      state.clickYN ? 'errorWrapper' : 'errorWrapperTRCD'
                    }
                  >
                    <input
                      type="text"
                      className={
                        state.clickYN ? 'inputTRCD' : 'inputTRCDInsert'
                      }
                      name="tr_CD"
                      {...register(
                        'tr_CD',
                        state.selectedRadioValue !== 'auto' &&
                          !state.clickYN && {
                            required: '거래처코드를 입력해주세요.',
                          }
                      )}
                      maxLength="9"
                      style={{
                        border:
                          errors.tr_CD &&
                          (state.checkDBErrorYN.tr_CD_ERROR ||
                            state.errorName === 'tr_CD')
                            ? '1px solid red'
                            : '1px solid #ccc',
                        backgroundColor:
                          state.clickYN || state.selectedRadioValue === 'auto'
                            ? '#f2f2f2'
                            : '#fef4f4',
                      }}
                      disabled={
                        state.selectedRadioValue === 'auto' || state.clickYN
                      }
                      onChange={actions.onChangeDBDataSearch}
                      defaultValue={state.data?.tr_CD}
                      onFocus={actions.onFocusError}
                    />
                    {(state.checkDBErrorYN.tr_CD_ERROR ||
                      state.errorName === 'tr_CD') && (
                      <ErrorMessage
                        errors={errors}
                        name="tr_CD"
                        as="p"
                        className="errorBox"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className={
                      state.clickYN ? 'WhiteButtonTR' : 'WhiteButtonTRInsert'
                    }
                    onClick={trCDModalButton}
                  >
                    <CiSquareMore className="CiSquareMoreIcon" />
                  </button>
                </div>
                {state.insertButtonClick && (
                  <div className="radioTradeStyle">
                    <input
                      className="radioStyle"
                      type="radio"
                      name="trCdFg"
                      value="manual"
                      checked={state.selectedRadioValue === 'manual'}
                      onChange={actions.handleRadioChange}
                    />
                    수동
                    <input
                      className="radioStyle"
                      type="radio"
                      name="trCdFg"
                      value="auto"
                      checked={state.selectedRadioValue === 'auto'}
                      onChange={actions.handleRadioChange}
                    />
                    자동
                  </div>
                )}
              </td>
              <th className="headerCellStyle">거래처명</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name="tr_NM"
                    className="reqInputStyle"
                    {...register(
                      'tr_NM',
                      !state.clickYN && {
                        required: '거래처명을 입력해주세요.',
                      }
                    )}
                    defaultValue={state.data?.tr_NM}
                    style={{
                      border:
                        errors.tr_NM &&
                        (state.checkDBErrorYN.tr_NM_ERROR ||
                          state.errorName === 'tr_NM')
                          ? '1px solid red'
                          : '1px solid #ccc',
                    }}
                    onFocus={actions.onFocusError}
                    onChange={actions.onChangeDBDataSearch}
                    maxLength="50"
                  />
                  {(state.checkDBErrorYN.tr_NM_ERROR ||
                    state.errorName === 'tr_NM') && (
                    <ErrorMessage
                      errors={errors}
                      name="tr_NM"
                      as="p"
                      className="TRNameErrorBox"
                    />
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">계좌번호</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    className="inputStyle"
                    name="ba_NB_TR"
                    {...register('ba_NB_TR')}
                    style={{
                      border:
                        errors.ba_NB_TR &&
                        (state.checkDBErrorYN.ba_NB_TR_ERROR ||
                          state.errorName === 'ba_NB_TR')
                          ? '1px solid red'
                          : '1px solid #ccc',
                    }}
                    onChange={actions.onFocusError}
                    defaultValue={state.data?.ba_NB_TR}
                    maxLength="38"
                  />
                  {
                    <ErrorMessage
                      errors={errors}
                      name="ba_NB_TR"
                      as="p"
                      className="TRBaErrorBox"
                    />
                  }
                </div>
              </td>
              <th className="headerCellStyle">금융기관코드</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name="bank_CD"
                    className="inputStyle"
                    {...register('bank_CD')}
                    maxLength="3"
                    defaultValue={
                      state.financeCDChangeData
                        ? `${state.financeCDChangeData?.bank_CD}. ${state.financeCDChangeData?.bank_NAME}`
                        : state.financeCDData
                    }
                    onChange={actions.onChangeDBDataSearch}
                    onBlur={actions.onBlurfinanceCDData}
                    // onKeyDown={actions.onKeyDownEnterFin}
                  />
                  <FaRegListAlt
                    className="FFInputIconStyle"
                    size={20}
                    onClick={financeCDModalButton}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">예금주</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="depositor"
                  className="inputStyle"
                  {...register('depositor')}
                  maxLength="70"
                  defaultValue={state.data?.depositor}
                />
              </td>
              <th className="headerCellStyle">예금명</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="deposit_NM"
                  className="inputStyle"
                  maxLength="70"
                  {...register('deposit_NM')}
                  defaultValue={state.data?.deposit_NM}
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">계좌개설점</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="account_OPEN_BN"
                  className="reqInputStyleAccount"
                  maxLength="70"
                  {...register('account_OPEN_BN')}
                  defaultValue={state.data?.account_OPEN_BN}
                />
              </td>
              <th className="headerCellStyle22"></th>
              <td className="cellStyle"></td>
            </tr>
          </tbody>
        </table>

        <br />

        {/* 거래기간 정보 */}
        <div>거래기간정보</div>
        <table className="tableStyle">
          <tbody>
            <tr>
              <th className="headerCellStyle">계좌개설일</th>
              <td className="cellStyle">
                <DatePicker
                  selected={state.openDate}
                  name="fstart_DT"
                  onChange={actions.handleOpenDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="datePickerInputStyleTrade"
                />
              </td>
              <th className="headerCellStyle">거래종료일</th>
              <td className="cellStyle">
                <DatePicker
                  name="fend_DT"
                  selected={state.closeDate}
                  onChange={actions.handleCloseDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="datePickerInputStyleTrade"
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">사용여부</th>
              <td className="cellStyle">
                <SelectBoxUSEYN
                  width={300}
                  state={state.useYN}
                  setState={state.setUseYN}
                  clickYN={state.clickYN}
                  register={register}
                  errors={errors}
                  errorName={state.errorName}
                  setChangeFormData={state.setChangeFormData}
                />
              </td>
              <th className="headerCellStyle22"></th>
              <td className="cellStyle"></td>
            </tr>
          </tbody>
        </table>

        {/* 거래처 담당자 관리 */}
        <div className="titleTradeRole">금융거래처 조회권한</div>
        <div className="tradeRoleYN">
          <span className="tradeRoleYNTitle">권한설정여부</span>
          <SelectBox
            data={['부', '여']}
            width={800}
            state={state.viewYN}
            setState={state.setViewYN}
            setChangeFormData={state.setChangeFormData}
            disable={state.insertButtonClick ? true : false}
          />
        </div>
        {(state.viewYN === '1' || state.viewYN === 1) && (
          <StradeRollManageRealGrid
            tr_CD={state.tr_CD}
            gridViewStrade={state.gridViewStrade}
            setGridViewStrade={state.setGridViewStrade}
            dataProviderStrade={state.dataProviderStrade}
            setDataProviderStrade={state.setDataProviderStrade}
            setDeleteCheck={state.setDeleteCheck}
            setDeleteYN={state.setDeleteYN}
            setDeleteListCount={state.setDeleteListCount}
          />
        )}
      </div>
      {trCDModal && (
        <StradeCodeHelpModal
          onChangeModalClose={trCDModalButton}
          tr_CD={state.tr_CD}
        />
      )}
      {state.financeCDModal && (
        <FinancecodeModal
          onChangeModalClose={financeCDModalButton}
          setState={state.setFinanceChangeCDData}
          inputData={state.financeCDInputData}
          setValue={setValue}
          setFinanceChangeCDData={state.setFinanceChangeCDData}
          setChangeFormData={state.setChangeFormData}
        />
      )}
    </>
  );
};

export default FtradeInfoBox;
