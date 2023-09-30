import React, { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputMask } from 'react-input-mask';
import SelectBoxUSEYN from '../../../common/box/SelectBoxUSEYN';
import StradeRollManageRealGrid from './StradeRollManage/StradeRollManageRealGrid';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import { useState } from 'react';
import EmpCodeHelpModal from '../Modal/EmpCodeHelpModal/EmpCodeHelpModal';
import StradeCodeHelpModal from '../Modal/StradeCodeHelpModal/StradeCodeHelpModal';
import FinancecodeModal from '../Modal/FinancecodeModal/FinancecodeModal';

const FtradeInfoBox = ({
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
  onChangeDBDataSearch,
  getValues,
  setError,
  clearErrors,
  setChangeFormData,
  checkDBErrorYN,
  useYN,
  setUseYN,
  tr_CD,
  setFinanceCDData,
  financeCDData,
  financeCDChangeData,
  setFinanceChangeCDData,
  gridViewStrade,
  setGridViewStrade,
  dataProviderStrade,
  setDataProviderStrade,
  setDeleteCheck,
}) => {
  const [trCDModal, setTrCDModal] = useState(false);
  const [financeCDModal, setFinanceCDModal] = useState(false);

  const trCDModalButton = () => {
    setTrCDModal(!trCDModal);
  };

  const financeCDModalButton = () => {
    setFinanceCDModal(!financeCDModal);
  };

  console.log('**********************', financeCDData);
  console.log(data);

  console.log(financeCDData);
  console.log(financeCDChangeData);

  // const params = {};
  // params.TR_CD = tr_CD;

  // const FtradeGridData = authAxiosInstance(
  //   'accounting/user/Strade/stradeRollManageSearchList',
  //   {
  //     params,
  //   }
  // ).then(response => console.log(response.data));
  //console.log('FtradeGridDataaaaaaaaaaaa : ', response.data);

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
                  {...register('tr_CD')}
                  onChange={onChangeTel}
                  defaultValue={data?.tr_CD}
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
                    name="tr_NM"
                    className="reqInputStyle"
                    {...register(
                      'tr_NM',
                      !clickYN && {
                        required: 'ID를 입력해주세요.',
                        pattern: {
                          value: /\w+/,
                          message: '한글을 포함할 수 없습니다.',
                        },
                      }
                    )}
                    defaultValue={data?.tr_NM}
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
                  {/* {(checkDBErrorYN.email_ADD_ERROR ||
                  errorName === 'email_ADD') && (
                  <ErrorMessage
                    errors={errors}
                    name="email_ADD"
                    as="p"
                    className="errorBox"
                  />
                )} */}
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
                    onChange={onChangeTel}
                    defaultValue={data?.ba_NB_TR}
                  />
                </div>
              </td>
              <th className="headerCellStyle">금융기관코드</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name="bank_CD"
                    className="reqInputStyle"
                    {...register('bank_CD')}
                    defaultValue={
                      financeCDChangeData
                        ? `${financeCDChangeData?.bank_CD}. ${financeCDChangeData?.bank_NAME}`
                        : financeCDData
                    }
                    onChange={onChangeDBDataSearch}
                  />
                  <button type="button" onClick={financeCDModalButton}>
                    코드
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">예금주</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="depositor"
                  className="reqInputStyle"
                  {...register('depositor')}
                  defaultValue={data?.depositor}
                />
              </td>
              <th className="headerCellStyle">예금명</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="deposit_NM"
                  className="reqInputStyle"
                  {...register('deposit_NM')}
                  defaultValue={data?.deposit_NM}
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">계좌개설점</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name="account_OPEN_BN"
                  className="reqInputStyle"
                  {...register('account_OPEN_BN')}
                  defaultValue={data?.account_OPEN_BN}
                />
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
              <th className="headerCellStyle">계좌개설일</th>
              <td className="cellStyle">
                <DatePicker
                  selected={openDate}
                  name="fstart_DT"
                  onChange={handleOpenDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="datePickerInputStyle"
                />
              </td>
              <th className="headerCellStyle">거래종료일</th>
              <td className="cellStyle">
                <DatePicker
                  name="fend_DT"
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
          </tbody>
        </table>

        {/* 거래처 담당자 관리 */}
        <div>금융거래처 조회권한</div>
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
      {financeCDModal && (
        <FinancecodeModal
          onChangeModalClose={financeCDModalButton}
          setState={setFinanceChangeCDData}
        />
      )}
    </>
  );
};

export default FtradeInfoBox;
