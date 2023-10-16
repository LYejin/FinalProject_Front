import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventButton from '../../../common/button/EventButton';
import { ErrorMessage } from '@hookform/error-message';
import InputMask from 'react-input-mask';
import SelectBoxUSEYN from '../../../common/box/SelectBoxUSEYN';
import StradeRollManageRealGrid from './StradeRollManage/StradeRollManageRealGrid';
import StradeCodeHelpModal from '../Modal/StradeCodeHelpModal/StradeCodeHelpModal';
import LiquorcodeModal from '../Modal/LiquorcodeModal/LiquorcodeModal';
import SelectBox from './../../../common/box/SelectBox';
import { CiSquareMore } from 'react-icons/ci';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';

const GtradeInfoBox = ({ register, errors, state, actions, setValue }) => {
  const [trCDModal, setTrCDModal] = useState(false);
  const [liquorCDData, setLiquorCDData] = useState(false);

  const trCDModalButton = () => {
    setTrCDModal(!trCDModal);
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
                        state.selectedRadioValue === 'manual' &&
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
                        className="TRCdErrorBox"
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
                    maxLength="50"
                    onFocus={actions.onFocusError}
                    onChange={actions.onChangeDBDataSearch}
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
              <th className="headerCellStyle">사업자등록번호</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <InputMask
                    mask="999-99-99999"
                    alwaysShowMask={true}
                    //onFocus={onFocusErrors}
                    name="reg_NB"
                    {...register('reg_NB')}
                    onChange={actions.onFocusError}
                  >
                    {() => (
                      <input
                        type="text"
                        name="reg_NB"
                        className="inputStyle"
                        style={{
                          border:
                            errors.reg_NB &&
                            (state.checkDBErrorYN.reg_NB_ERROR ||
                              state.errorName === 'reg_NB')
                              ? '1px solid red'
                              : '1px solid #ccc',
                        }}
                      />
                    )}
                  </InputMask>
                  <ErrorMessage
                    errors={errors}
                    name="reg_NB"
                    as="p"
                    className="TRRegErrorBox"
                  />
                </div>
              </td>
              <th className="headerCellStyle22"></th>
              <td className="cellStyle"></td>
            </tr>
            <tr>
              <th className="headerCellStyle">주민등록번호</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <div className="GtradeFlex">
                    <SelectBox
                      data={['내국인', '외국인']}
                      name="for_YN"
                      width={100}
                      state={state.selectForYN}
                      setState={state.setSelectForYN}
                      setChangeFormData={state.setChangeFormData}
                    />
                    <InputMask
                      mask="999999-9999999"
                      alwaysShowMask={true}
                      //onFocus={onFocusErrors}
                      name="ppl_NB"
                      {...register('ppl_NB')}
                      onChange={actions.onFocusError}
                    >
                      {() => (
                        <input
                          type="text"
                          name="ppl_NB"
                          className="inputStylePPL"
                          style={{
                            border:
                              errors.ppl_NB &&
                              (state.checkDBErrorYN.ppl_NB_ERROR ||
                                state.errorName === 'ppl_NB')
                                ? '1px solid red'
                                : '1px solid #ccc',
                          }}
                          maxLength="15"
                        />
                      )}
                    </InputMask>
                    {
                      <ErrorMessage
                        errors={errors}
                        name="ppl_NB"
                        as="p"
                        className="TRPplErrorBox"
                      />
                    }
                  </div>
                </div>
              </td>
              <th className="headerCellStyle">대표자명</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="ceo_NM"
                  className="inputStyle"
                  {...register('ceo_NM')}
                  maxLength="20"
                  defaultValue={state.data.ceo_NM}
                  onChange={actions.onChangeDBDataSearch}
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">업태</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name="business"
                    className="inputStyle"
                    {...register('business')}
                    maxLength="50"
                    defaultValue={state.data.business}
                  />
                </div>
              </td>
              <th className="headerCellStyle">업종</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="jongmok"
                  maxLength="20"
                  className="inputStyle"
                  {...register('jongmok')}
                  defaultValue={state.data.jongmok}
                />
              </td>
            </tr>
            <tr className="totalEmpCellStyle">
              <th className="headerCellStyle" rowSpan="2">
                사업장주소
              </th>
              <td colSpan="3" className="cellEmpAddrStyle">
                <input
                  type="text"
                  className="addressInputStyle"
                  name="zip"
                  maxLength="7"
                  {...register('zip')}
                  defaultValue={state.address ? state.address : state.data.zip}
                />
                <EventButton
                  data={'우편번호'}
                  onClickEvent={actions.onChangeOpenPost}
                ></EventButton>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="cellStyle">
                <input
                  type="text"
                  className="addrNum"
                  name="addr"
                  {...register('addr')}
                  maxLength="140"
                  defaultValue={
                    state.addressDetail ? state.addressDetail : state.data.addr
                  }
                />
              </td>
              <td className="cellStyle">
                <input
                  type="text"
                  className="inputStyle"
                  name="addr_NUM"
                  {...register('addr_NUM')}
                  maxLength="140"
                  defaultValue={state.data.addr_NUM}
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">전화번호</th>
              <td className="cellStyle">
                <input
                  type="text"
                  className="inputStyle"
                  name="phone_NB"
                  {...register('phone_NB')}
                  onChange={actions.onChangeTel}
                  defaultValue={state.data.phone_NB}
                  maxLength="13"
                />
              </td>
              <th className="headerCellStyle">팩스번호</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="fax"
                  className="inputStyle"
                  {...register('fax')}
                  onChange={actions.onChangeHomeTel}
                  defaultValue={state.data.fax}
                  maxLength="13"
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">홈페이지</th>
              <td className="cellStyle">
                <input
                  type="text"
                  className="inputStyle"
                  name="website"
                  {...register('website')}
                  maxLength="28"
                  defaultValue={state.data.website}
                />
              </td>
              <th className="headerCellStyle">메일주소</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="email"
                  className="inputStyle"
                  {...register('email')}
                  maxLength="70"
                  defaultValue={state.data.email}
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">주류코드</th>
              <td className="cellStyle">
                <div className="errorWrapperliq">
                  <input
                    type="text"
                    className="reqInputStyleLiq"
                    name="liq_CD"
                    maxLength="1"
                    {...register('liq_CD')}
                    defaultValue={
                      state.liquorCDChangeData
                        ? `${state.liquorCDChangeData?.liq_CD}. ${state.liquorCDChangeData?.wholesale}`
                        : state.liquorCDData
                    }
                    onChange={actions.onChangeDBDataSearch}
                    //onBlur={actions.onBlurfinanceCDData}
                    onKeyDown={actions.onKeyDownEnterFin}
                  />
                  <FaRegListAlt
                    className="FFInputIconStyle"
                    size={20}
                    onClick={actions.liquorCDModalButton}
                  />
                </div>
              </td>
              <th className="headerCellStyle22"></th>
              <td className="cellStyle"></td>
            </tr>
          </tbody>
        </table>

        {/* 거래기간 정보 */}
        <div className="titleTrade">거래기간정보</div>
        <table className="tableStyle">
          <tbody>
            <tr>
              <th className="headerCellStyle">거래시작일</th>
              <td className="cellStyle">
                <DatePicker
                  selected={state.openDate}
                  name="start_DT"
                  onChange={actions.handleOpenDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="datePickerInputStyleTrade"
                />
              </td>
              <th className="headerCellStyle">거래종료일</th>
              <td className="cellStyle">
                <DatePicker
                  name="end_DT"
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
                  register={state.register}
                  errors={state.errors}
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
        <div className="titleTradeRole">거래처 조회권한</div>
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
      {state.liquorCDModal && (
        <LiquorcodeModal
          onChangeModalClose={actions.liquorCDModalButton}
          setState={state.setLiquorCDData}
          setValue={setValue}
          setLiquorCDChangeData={state.setLiquorCDChangeData}
          setChangeFormData={state.setChangeFormData}
        />
      )}
    </>
  );
};

export default GtradeInfoBox;
