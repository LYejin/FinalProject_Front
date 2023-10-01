import React, { useRef, useState } from 'react';
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
  handleRadioChange,
  selectedRadioValue,
  insertButtonClick,
  onCompleteRegNb,
  onCompletePplNb,
  gridViewStrade,
  setGridViewStrade,
  dataProviderStrade,
  setDataProviderStrade,
  setDeleteCheck,
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
                <div className="errorWrapper">
                  <input
                    type="text"
                    className="inputStyle"
                    name="tr_CD"
                    {...register(
                      'tr_CD',
                      selectedValue !== 'auto' &&
                        !clickYN && {
                          required: '거래처코드를 입력해주세요.',
                        }
                    )}
                    style={{
                      border:
                        errors.tr_CD &&
                        (checkDBErrorYN.tr_CD_ERROR || errorName === 'tr_CD')
                          ? '1px solid red'
                          : '1px solid #ccc',
                      backgroundColor:
                        clickYN || selectedValue === 'auto'
                          ? '#f2f2f2'
                          : '#fef4f4',
                    }}
                    disabled={selectedValue === 'auto' || clickYN}
                    onChange={onChangeDBDataSearch}
                    defaultValue={data?.tr_CD}
                    onFocus={onFocusError}
                  />
                  {(checkDBErrorYN.tr_CD_ERROR || errorName === 'tr_CD') && (
                    <ErrorMessage
                      errors={errors}
                      name="tr_CD"
                      as="p"
                      className="errorBox"
                    />
                  )}
                </div>
                <button type="button" onClick={trCDModalButton}>
                  코드
                </button>
                {insertButtonClick && (
                  <div>
                    <label>
                      <input
                        className="radioStyle"
                        type="radio"
                        name="trCdFg"
                        value="manual"
                        checked={selectedValue === 'manual'}
                        onChange={handleRadioChange}
                      />
                      수동
                    </label>
                    <label>
                      <input
                        className="radioStyle"
                        type="radio"
                        name="trCdFg"
                        value="auto"
                        checked={selectedValue === 'auto'}
                        onChange={handleRadioChange}
                      />
                      자동
                    </label>
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
                      !clickYN && {
                        required: 'ID를 입력해주세요.',
                      }
                    )}
                    defaultValue={data?.tr_NM}
                    style={{
                      border:
                        errors.tr_NM &&
                        (checkDBErrorYN.tr_NM_ERROR || errorName === 'tr_NM')
                          ? '1px solid red'
                          : '1px solid #ccc',
                    }}
                    onFocus={onFocusError}
                    onChange={onChangeDBDataSearch}
                  />
                  {(checkDBErrorYN.tr_NM_ERROR || errorName === 'tr_NM') && (
                    <ErrorMessage
                      errors={errors}
                      name="tr_NM"
                      as="p"
                      className="errorBox"
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
                    onChange={onFocusError}
                  >
                    {() => (
                      <input
                        type="text"
                        name="reg_NB"
                        className="inputStyle"
                        style={{
                          border:
                            errors.reg_NB &&
                            (checkDBErrorYN.reg_NB_ERROR ||
                              errorName === 'reg_NB')
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
                    className="errorBox"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">주민등록번호</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <SelectBox data={['내국인', '외국인']} width={120} />
                  <InputMask
                    mask="999999-9999999"
                    alwaysShowMask={true}
                    //onFocus={onFocusErrors}
                    name="ppl_NB"
                    {...register('ppl_NB')}
                    onChange={onFocusError}
                  >
                    {() => (
                      <input
                        type="text"
                        name="ppl_NB"
                        className="inputStyle"
                        style={{
                          border:
                            errors.ppl_NB &&
                            (checkDBErrorYN.ppl_NB_ERROR ||
                              errorName === 'ppl_NB')
                              ? '1px solid red'
                              : '1px solid #ccc',
                        }}
                        maxlength="15"
                      />
                    )}
                  </InputMask>
                  {
                    <ErrorMessage
                      errors={errors}
                      name="ppl_NB"
                      as="p"
                      className="errorBox"
                    />
                  }
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
        <StradeRollManageRealGrid
          tr_CD={tr_CD}
          gridViewStrade={gridViewStrade}
          setGridViewStrade={setGridViewStrade}
          dataProviderStrade={dataProviderStrade}
          setDataProviderStrade={setDataProviderStrade}
          setDeleteCheck={setDeleteCheck}
        />
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
