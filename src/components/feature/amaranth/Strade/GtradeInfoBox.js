import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventButton from '../../../common/button/EventButton';
import { ErrorMessage } from '@hookform/error-message';
import { InputMask } from 'react-input-mask';
import SelectBoxUSEYN from '../../../common/box/SelectBoxUSEYN';
import StradeRollManageRealGrid from './StradeRollManage/StradeRollManageRealGrid';
import StradeCodeHelpModal from '../Modal/StradeCodeHelpModal/StradeCodeHelpModal';
import LiquorcodeModal from '../Modal/LiquorcodeModal/LiquorcodeModal';

const GtradeInfoBox = ({
  data,
  register,
  openDate,
  selectedValue,
  onChangeOpenPost,
  address,
  addressDetail,
  errors,
  clickYN,
  onFocusError,
  errorName,
  handleOpenDateChange,
  handleCloseDateChange,
  closeDate,
  onChangeTel,
  onChangeHomeTel,
  setChangeFormData,
  onChangeDBDataSearch,
  getValues,
  setError,
  clearErrors,
  checkDBErrorYN,
  setUseYN,
  useYN,
  tr_CD,
}) => {
  const [trCDModal, setTrCDModal] = useState(false);
  const [liquorCDModal, setLiquorCDModal] = useState(false);
  const [liquorCDData, setLiquorCDData] = useState(false);

  const trCDModalButton = () => {
    setTrCDModal(!trCDModal);
  };

  const liquorCDModalButton = () => {
    setLiquorCDModal(!liquorCDModal);
  };

  console.log('kkk', liquorCDModal);

  return (
    <>
      <div className="selectListWrapper">
        <div>기본정보</div>
        <table className="tableStyle">
          <tbody>
            <tr>
              <th className="headerCellStyle">거래처코드</th>
              <td className="cellStyle">
                <input
                  type="text"
                  className="inputStyle"
                  name="tr_CD"
                  {...register('tr_CD', {
                    required: '거래처코드를 입력해주세요.',
                  })}
                  onChange={onChangeTel}
                  defaultValue={data.tr_CD}
                />
                <button type="button" onClick={trCDModalButton}>
                  코드
                </button>
              </td>
              <th className="headerCellStyle">거래처명</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name="email_ADD"
                    className="reqInputStyle"
                    {...register(
                      'tr_NM',
                      !clickYN && {
                        required: 'ID를 입력해주세요.',
                      }
                    )}
                    defaultValue={data.tr_NM}
                    style={{
                      border:
                        errors.email_ADD &&
                        (checkDBErrorYN.email_ADD_ERROR ||
                          errorName === 'email_ADD')
                          ? '1px solid red'
                          : '1px solid #ccc',
                    }}
                    onFocus={onFocusError}
                    onChange={onChangeDBDataSearch}
                  />
                  {(checkDBErrorYN.email_ADD_ERROR ||
                    errorName === 'email_ADD') && (
                    <ErrorMessage
                      errors={errors}
                      name="email_ADD"
                      as="p"
                      className="errorBox"
                    />
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">사업자등록번호</th>
              <td colSpan="3" className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    maxlength="12"
                    name="reg_NB"
                    className="companyReqInputStyle"
                    {...register('reg_NB')}
                    defaultValue={data.reg_NB}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">주민등록번호</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  {/* <InputMask
                  mask="999999-9999999"
                  alwaysShowMask={true}
                  //onFocus={onFocusErrors}
                  // {...register(labels.PPL_NB, {
                  //   pattern: {
                  //     value: regexPatterns.PPL_NB[0],
                  //     message: regexPatterns.PPL_NB[1],
                  //   },
                  //   required: regexPatterns.required,
                  // })}
                >
                  {() => (
                    <input
                      type="text"
                      //name={labels.PPL_NB}
                      maxlength="15"
                      className="companyReqInputStyle"
                    />
                  )}
                </InputMask> */}
                  <input
                    type="text"
                    className="inputStyle"
                    name="ppl_NB"
                    {...register('ppl_NB')}
                    onChange={onChangeTel}
                    defaultValue={data.ppl_NB}
                  />
                </div>
              </td>
              <th className="headerCellStyle">대표자명</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="ceo_NM"
                  className="reqInputStyle"
                  {...register('ceo_NM')}
                  defaultValue={data.ceo_NM}
                  onChange={onChangeDBDataSearch}
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
                    className="reqInputStyle"
                    {...register('business')}
                    defaultValue={data.business}
                  />
                </div>
              </td>
              <th className="headerCellStyle">업종</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="jongmok"
                  className="reqInputStyle"
                  {...register('jongmok')}
                  defaultValue={data.jongmok}
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
                  {...register('zip')}
                  defaultValue={address ? address : data.zip}
                />
                <EventButton
                  data={'우편번호'}
                  onClickEvent={onChangeOpenPost}
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
                  defaultValue={addressDetail ? addressDetail : data.addr}
                />
              </td>
              <td className="cellStyle">
                <input
                  type="text"
                  className="inputStyle"
                  name="addr_NUM"
                  {...register('addr_NUM')}
                  defaultValue={data.addr_NUM}
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
                  onChange={onChangeTel}
                  defaultValue={data.phone_NB}
                />
              </td>
              <th className="headerCellStyle">팩스번호</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="fax"
                  className="inputStyle"
                  {...register('fax')}
                  onChange={onChangeHomeTel}
                  defaultValue={data.fax}
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
                  onChange={onChangeTel}
                  defaultValue={data.website}
                />
              </td>
              <th className="headerCellStyle">메일주소</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="email"
                  className="inputStyle"
                  {...register('email')}
                  onChange={onChangeHomeTel}
                  defaultValue={data.email}
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">주류코드</th>
              <td colSpan="3" className="cellStyle">
                <input
                  type="text"
                  className="inputStyle"
                  name="liq_CD"
                  {...register('liq_CD')}
                  onChange={onChangeTel}
                  defaultValue={
                    liquorCDData
                      ? `${liquorCDData?.liq_CD}. ${liquorCDData?.wholesale}`
                      : data.liq_CD
                  }
                />
                <button type="button" onClick={liquorCDModalButton}>
                  코드
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <br />

        {/* 거래기간 정보 */}
        <div>거래기간정보</div>
        <table className="tableStyle">
          <tbody>
            <tr>
              <th className="headerCellStyle">거래시작일</th>
              <td className="cellStyle">
                <DatePicker
                  selected={openDate}
                  name="start_DT"
                  onChange={handleOpenDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="datePickerInputStyle"
                />
              </td>
              <th className="headerCellStyle">거래종료일</th>
              <td className="cellStyle">
                <DatePicker
                  name="end_DT"
                  selected={closeDate}
                  onChange={handleCloseDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="datePickerInputStyle"
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">사용여부</th>
              <td className="cellStyle">
                <SelectBoxUSEYN
                  width={'calc(100% - 7px)'}
                  state={useYN}
                  setState={setUseYN}
                  clickYN={clickYN}
                  register={register}
                  errors={errors}
                  errorName={errorName}
                  setChangeFormData={setChangeFormData}
                />
              </td>
            </tr>
            <br />
          </tbody>
        </table>

        {/* 거래처 담당자 관리 */}
        <div>관리 담당자</div>
        <StradeRollManageRealGrid tr_CD={tr_CD} />
      </div>
      {trCDModal && (
        <StradeCodeHelpModal
          onChangeModalClose={trCDModalButton}
          tr_CD={tr_CD}
        />
      )}
      {liquorCDModal && (
        <LiquorcodeModal
          onChangeModalClose={liquorCDModalButton}
          setState={setLiquorCDData}
        />
      )}
    </>
  );
};

export default GtradeInfoBox;
