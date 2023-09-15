import React, { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventButton from '../../../common/button/EventButton';
import EmpInfoCompanySelectBox from './EmpInfoCompanySelectBox';
import { ErrorMessage } from '@hookform/error-message';
import EmpInfoWorkplaceSelectBox from './EmpInfoWorkplaceSelectBox';
import EmpInfoEnrlSelectBox from './EmpInfoEnrlSelectBox';
import EmpEmailSelectBox from './EmpEmailPersonalSelectBox';
import EmpEmailPersonalSelectBox from './EmpEmailPersonalSelectBox';
import EmpEmailSalarySelectBox from './EmpEmailSalarySelectBox';
import { InputMask } from 'react-input-mask';

const FtradeInfoBox = ({
  data,
  register,
  openDate,
  selectedValue,
  handleRadioChange,
  onChangeOpenPost,
  address,
  addressDetail,
  setImage,
  imgFile,
  companyList,
  errors,
  clickYN,
  onFocusError,
  errorName,
  imgPriviewFile,
  setImgPriviewFile,
  handleOpenDateChange,
  setCompany,
  company,
  workplaceList,
  setWorkplaceList,
  workplaceSelect,
  setWorkplaceSelect,
  onChangeTel,
  onChangeHomeTel,
  infoBoxEnrlData,
  setInfoBoxEnrlData,
  setChangeFormData,
  onChangePersonalMAIL,
  onChangeSalaryMAIL,
  setEmailPersonalData,
  emailPersonalData,
  emailSalaryData,
  setEmailSalaryData,
  onChangeDBDataSearch,
  getValues,
  setError,
  clearErrors,
  checkDBErrorYN,
}) => {
  const imgRef = useRef();

  // // 프로필 이미지 미리보기 기능
  const imgPreview = fileBlob => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(resolve => {
      reader.onload = () => {
        setImgPriviewFile(reader.result);
        console.log('base64:', reader.result);
        resolve();
      };
    });
  };
  console.log(errors);

  return (
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
                name="tel"
                {...register('tel')}
                onChange={onChangeTel}
                defaultValue={data.tel}
              />
            </td>
            <th className="headerCellStyle">거래처명</th>
            <td className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="text"
                  name="email_ADD"
                  className="reqInputStyle"
                  {...register(
                    'email_ADD',
                    !clickYN && {
                      required: 'ID를 입력해주세요.',
                      pattern: {
                        value: /\w+/,
                        message: '한글을 포함할 수 없습니다.',
                      },
                    }
                  )}
                  defaultValue={data.email_ADD}
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
            <th className="headerCellStyle">계좌번호</th>
            <td className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="text"
                  className="inputStyle"
                  name="tel"
                  {...register('tel')}
                  onChange={onChangeTel}
                  defaultValue={data.tel}
                />
              </div>
            </td>
            <th className="headerCellStyle">금융기관코드</th>
            <td className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="text"
                  name="email_ADD"
                  className="reqInputStyle"
                  {...register(
                    'email_ADD',
                    !clickYN && {
                      required: 'ID를 입력해주세요.',
                      pattern: {
                        value: /\w+/,
                        message: '한글을 포함할 수 없습니다.',
                      },
                    }
                  )}
                  defaultValue={data.email_ADD}
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
            <th className="headerCellStyle">예금주</th>
            <td className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="password"
                  name="password"
                  className="reqInputStyle"
                  {...register(
                    'password',
                    !clickYN && {
                      required: '비밀번호를 입력해주세요.',
                    }
                  )}
                  style={{
                    border:
                      errors.password && errorName === 'password'
                        ? '1px solid red'
                        : '1px solid #ccc',
                  }}
                  onFocus={onFocusError}
                />
                {errorName === 'password' && (
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    as="p"
                    className="errorBox"
                  />
                )}
              </div>
            </td>
            <th className="headerCellStyle">예금종류</th>
            <td className="cellStyle">
              <input type="password" className="reqInputStyle" />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">예금명</th>
            <td className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="password"
                  name="password"
                  className="reqInputStyle"
                  {...register(
                    'password',
                    !clickYN && {
                      required: '비밀번호를 입력해주세요.',
                    }
                  )}
                  style={{
                    border:
                      errors.password && errorName === 'password'
                        ? '1px solid red'
                        : '1px solid #ccc',
                  }}
                  onFocus={onFocusError}
                />
                {errorName === 'password' && (
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    as="p"
                    className="errorBox"
                  />
                )}
              </div>
            </td>
            <th className="headerCellStyle">계좌개설점</th>
            <td className="cellStyle">
              <input type="password" className="reqInputStyle" />
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
            <th className="headerCellStyle">입사일</th>
            <td className="cellStyle">
              <DatePicker
                selected={openDate}
                name="join_DT"
                onChange={handleOpenDateChange}
                dateFormat="yyyy-MM-dd"
                className="datePickerInputStyle"
              />
            </td>
            <th className="headerCellStyle">퇴사일</th>
            <td className="cellStyle">
              <DatePicker
                //selected={closeDate}
                //onChange={handleCloseDateChange}
                dateFormat="yyyy-MM-dd"
                className="datePickerInputStyle"
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사용여부</th>
            <td className="cellStyle">
              <EmpInfoEnrlSelectBox
                width={'calc(100% - 7px)'}
                data={['재직', '휴직', '퇴직']}
                infoBoxEnrlData={infoBoxEnrlData}
                setInfoBoxEnrlData={setInfoBoxEnrlData}
                clickYN={clickYN}
                register={register}
                errors={errors}
                errorName={errorName}
                setChangeFormData={setChangeFormData}
              />
            </td>
          </tr>

          <br />

          {/* 거래처 담당자 관리 */}
          <div>금융거래처 조회권한</div>
        </tbody>
      </table>
    </div>
  );
};

export default FtradeInfoBox;
