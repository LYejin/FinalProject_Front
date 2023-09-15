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

const GtradeInfoBox = ({
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
            <th className="headerCellStyle">사업자등록번호</th>
            <td colSpan="3" className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="text"
                  maxlength="12"
                  className="companyReqInputStyle"
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
                  name="tel"
                  {...register('tel')}
                  onChange={onChangeTel}
                  defaultValue={data.tel}
                />
              </div>
            </td>
            <th className="headerCellStyle">대표자명</th>
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
            <th className="headerCellStyle">업태</th>
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
            <th className="headerCellStyle">업종</th>
            <td className="cellStyle">
              <input type="password" className="reqInputStyle" />
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
                name="zipcode"
                {...register('zipcode')}
                defaultValue={address ? address : data.zipcode}
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
                name="tel"
                {...register('tel')}
                onChange={onChangeTel}
                defaultValue={data.tel}
              />
            </td>
            <th className="headerCellStyle">팩스번호</th>
            <td className="cellStyle">
              <input
                type="text"
                name="home_TEL"
                className="inputStyle"
                {...register('home_TEL')}
                onChange={onChangeHomeTel}
                defaultValue={data.home_TEL}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">홈페이지</th>
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
            <th className="headerCellStyle">메일주소</th>
            <td className="cellStyle">
              <input
                type="text"
                name="home_TEL"
                className="inputStyle"
                {...register('home_TEL')}
                onChange={onChangeHomeTel}
                defaultValue={data.home_TEL}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">주류코드</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                name="tel"
                {...register('tel')}
                onChange={onChangeTel}
                defaultValue={data.tel}
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
          <div>관리 담당자</div>
        </tbody>
      </table>
    </div>
  );
};

export default GtradeInfoBox;
