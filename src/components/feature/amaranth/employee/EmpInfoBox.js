import React, { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventButton from './../../../common/button/EventButton';
import EmpInfoCompanySelectBox from './EmpInfoCompanySelectBox';
import { ErrorMessage } from '@hookform/error-message';
import EmpInfoWorkplaceSelectBox from './EmpInfoWorkplaceSelectBox';
import EmpInfoEnrlSelectBox from './EmpInfoEnrlSelectBox';
import EmpEmailSelectBox from './EmpEmailPersonalSelectBox';
import EmpEmailPersonalSelectBox from './EmpEmailPersonalSelectBox';
import EmpEmailSalarySelectBox from './EmpEmailSalarySelectBox';
import { ko } from 'date-fns/esm/locale';

const EmpInfoBox = ({
  register,
  errors,
  state,
  actions,
  setValue,
  clearErrors,
  setError,
  getValues,
}) => {
  const imgRef = useRef();

  // // 프로필 이미지 미리보기 기능
  const imgPreview = fileBlob => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(resolve => {
      reader.onload = () => {
        state.setImgPriviewFile(reader.result);
        console.log('base64:', reader.result);
        resolve();
      };
    });
  };
  console.log(errors);

  return (
    <div className="selectListWrapper">
      <table className="tableStyle">
        <tbody>
          <tr>
            <th className="headerCellStyle">사진</th>
            <td colSpan="3" className="cellStyle">
              <div className="userAvaterWrapper">
                <div className="userAvater">
                  <input
                    id="fileImageUpload"
                    className="userImage"
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      state.setImage(e.target.files[0]);
                      imgPreview(e.target.files[0]);
                    }}
                    ref={imgRef}
                  />
                  <div className="userImageLabel">
                    {state.imgPriviewFile ? (
                      <img src={state.imgPriviewFile} alt="userImage" />
                    ) : (
                      <img
                        src={
                          state.imgFile
                            ? state.imgFile
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                        }
                        alt="userImage"
                      />
                    )}
                  </div>
                  <label
                    id="imageButtonWrapper"
                    htmlFor="fileImageUpload"
                    className="imageButtonWrapper"
                  >
                    <i className="fa-solid fa-paperclip"></i>
                  </label>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <th className="headerCellStyle">회사/사업장</th>
            <td colSpan="3" className="cellStyle">
              <div className="inputWrapperStyle">
                <div className="empInfoCompanySelectBox">
                  <EmpInfoCompanySelectBox
                    width={230}
                    data={state.companyList}
                    setWorkplaceSelect={state.setWorkplaceSelect}
                    setCompany={state.setCompany}
                    company={state.company}
                    setWorkplaceList={state.setWorkplaceList}
                    clickYN={state.clickYN}
                    register={register}
                    errors={errors}
                    errorName={state.errorName}
                    setError={setError}
                    getValues={getValues}
                    clearErrors={clearErrors}
                  />
                </div>
                <div className="empInfoWorkplaceSelectBox">
                  <EmpInfoWorkplaceSelectBox
                    width={'calc(100% - 7px)'}
                    data={state.workplaceList || []}
                    workplaceSelect={state.workplaceSelect}
                    setWorkplaceSelect={state.setWorkplaceSelect}
                    clickYN={state.clickYN}
                    register={register}
                    errors={errors}
                    errorName={state.errorName}
                    setChangeFormData={state.setChangeFormData}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사번</th>
            <td colSpan="3" className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="text"
                  className="reqInputStyle"
                  name="emp_CD"
                  placeholder="사원번호를 입력해주세요(최대 10글자)"
                  {...register(
                    'emp_CD',
                    !state.clickYN && {
                      required: '사번을 입력해주세요.',
                    }
                  )}
                  maxLength="10"
                  defaultValue={state.data?.emp_CD}
                  style={{
                    border:
                      errors?.emp_CD &&
                      (state.checkDBErrorYN?.emp_CD_ERROR ||
                        state.errorName === 'emp_CD')
                        ? '1px solid red'
                        : '1px solid #ccc',
                    backgroundColor: state.clickYN ? '#f2f2f2' : '#fef4f4',
                  }}
                  disabled={state.clickYN}
                  onFocus={actions.onFocusError}
                  onChange={actions.onChangeDBDataSearch}
                />
                {(state.checkDBErrorYN.emp_CD_ERROR ||
                  state.errorName === 'emp_CD') && (
                  <ErrorMessage
                    errors={errors}
                    name="emp_CD"
                    as="p"
                    className="errorBox"
                  />
                )}
              </div>
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">이름</th>
            <td colSpan="3" className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="text"
                  name="kor_NM"
                  className="reqInputStyle"
                  placeholder="사용자 이름을 입력해주세요"
                  {...register(
                    'kor_NM',
                    !state.clickYN && { required: '이름을 입력해주세요.' }
                  )}
                  defaultValue={state.data.kor_NM}
                  style={{
                    border:
                      errors.kor_NM && state.errorName === 'kor_NM'
                        ? '1px solid red'
                        : '1px solid #ccc',
                  }}
                  onFocus={actions.onFocusError}
                />
                {state.errorName === 'kor_NM' && (
                  <ErrorMessage
                    errors={errors}
                    name="kor_NM"
                    as="p"
                    className="errorBox"
                  />
                )}
              </div>
            </td>
          </tr>

          <tr>
            <th className="headerCellStyle">로그인 ID</th>
            <td className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="text"
                  className="reqInputStyle"
                  name="username"
                  {...register(
                    'username',
                    !state.clickYN && { required: 'ID를 입력해주세요.' }
                  )}
                  defaultValue={state.data?.username}
                  maxLength="16"
                  style={{
                    border:
                      errors?.username &&
                      (state.checkDBErrorYN?.username_ERROR ||
                        state.errorName === 'username')
                        ? '1px solid red'
                        : '1px solid #ccc',
                    backgroundColor: state.clickYN ? '#f2f2f2' : '#fef4f4',
                  }}
                  disabled={state.clickYN}
                  onFocus={actions.onFocusError}
                  onChange={actions.onChangeDBDataSearch}
                />
                {(state.checkDBErrorYN?.username_ERROR ||
                  state.errorName === 'username') && (
                  <ErrorMessage
                    errors={errors}
                    name="username"
                    as="p"
                    className="errorBox"
                  />
                )}
              </div>
            </td>
            <th className="headerCellStyle">메일 ID</th>
            <td className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="text"
                  name="email_ADD"
                  className="reqInputStyle"
                  {...register(
                    'email_ADD',
                    !state.clickYN && {
                      required: 'ID를 입력해주세요.',
                      pattern: {
                        value: /\w+/,
                        message: '한글을 포함할 수 없습니다.',
                      },
                    }
                  )}
                  defaultValue={state.data.email_ADD}
                  style={{
                    border:
                      errors?.email_ADD &&
                      (state.checkDBErrorYN?.email_ADD_ERROR ||
                        state.errorName === 'email_ADD')
                        ? '1px solid red'
                        : '1px solid #ccc',
                    backgroundColor: state.clickYN ? '#f2f2f2' : '#fef4f4',
                  }}
                  disabled={state.clickYN}
                  onFocus={actions.onFocusError}
                  onChange={actions.onChangeDBDataSearch}
                />
                {(state.checkDBErrorYN?.email_ADD_ERROR ||
                  state.errorName === 'email_ADD') && (
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
            <th className="headerCellStyle">로그인 비밀번호</th>
            <td className="cellStyle">
              <div className="errorWrapper">
                <input
                  type="password"
                  name="password"
                  className="reqInputStyle"
                  {...register(
                    'password',
                    !state.clickYN && {
                      required: '비밀번호를 입력해주세요.',
                    }
                  )}
                  style={{
                    border:
                      errors.password && state.errorName === 'password'
                        ? '1px solid red'
                        : '1px solid #ccc',
                  }}
                  onFocus={actions.onFocusError}
                />
                {state.errorName === 'password' && (
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    as="p"
                    className="errorBox"
                  />
                )}
              </div>
            </td>
            <th className="headerCellStyle">결재 비밀번호</th>
            <td className="cellStyle">
              <input type="password" className="reqInputStyle" />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">성별</th>
            <td className="cellStyle">
              <div>
                <input
                  className="radioStyle"
                  type="radio"
                  name="gender_FG"
                  value="W"
                  checked={state.selectedValue === 'W'}
                  onChange={actions.handleRadioChange}
                />
                여자
                <input
                  className="radioStyle"
                  type="radio"
                  name="gender_FG"
                  value="M"
                  checked={state.selectedValue === 'M'}
                  onChange={actions.handleRadioChange}
                />
                남자
              </div>
            </td>
            <th className="headerCellStyle">재직구분</th>
            <td className="cellStyle">
              <EmpInfoEnrlSelectBox
                width={'calc(100% - 7px)'}
                data={['재직', '휴직', '퇴직']}
                infoBoxEnrlData={state.infoBoxEnrlData}
                setInfoBoxEnrlData={state.setInfoBoxEnrlData}
                clickYN={state.clickYN}
                register={register}
                errors={errors}
                errorName={state.errorName}
                setChangeFormData={state.setChangeFormData}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">개인메일</th>
            <td colSpan="3" className="cellStyle">
              <div className="inputWrapperStyle">
                <input
                  type="text"
                  className="mailInputStyle"
                  name="personal_MAIL"
                  {...register('personal_MAIL')}
                  defaultValue={state.data?.personal_MAIL}
                  maxLength="32"
                />
                @
                <input
                  type="text"
                  className="mailInputStyle2"
                  name="personal_MAIL_CP"
                  maxLength="32"
                  {...register('personal_MAIL_CP')}
                  defaultValue={state.data?.personal_MAIL_CP}
                />
                <EmpEmailPersonalSelectBox
                  width={'calc(100% - 300px)'}
                  onClickEvent={actions.onChangePersonalMAIL}
                  emailPersonalData={state.emailPersonalData}
                  setEmailPersonalData={state.setEmailPersonalData}
                  setChangeFormData={state.setChangeFormData}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">급여메일</th>
            <td colSpan="3" className="cellStyle">
              <div className="inputWrapperStyle">
                <input
                  type="text"
                  className="mailInputStyle"
                  name="salary_MAIL"
                  maxLength="32"
                  {...register('salary_MAIL')}
                  defaultValue={state.data?.salary_MAIL}
                />
                @
                <input
                  type="text"
                  className="mailInputStyle2"
                  name="salary_MAIL_CP"
                  maxLength="32"
                  {...register('salary_MAIL_CP')}
                  defaultValue={state.data?.salary_MAIL_CP}
                />
                <EmpEmailSalarySelectBox
                  width={'calc(100% - 300px)'}
                  onClickEvent={actions.onChangeSalaryMAIL}
                  emailSalaryData={state.emailSalaryData}
                  setEmailSalaryData={state.setEmailSalaryData}
                  setChangeFormData={state.setChangeFormData}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">휴대전화</th>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                name="tel"
                {...register('tel')}
                onChange={actions.onChangeTel}
                defaultValue={state.data?.tel}
                maxLength="13"
              />
            </td>
            <th className="headerCellStyle">전화번호(집)</th>
            <td className="cellStyle">
              <input
                type="text"
                name="home_TEL"
                className="inputStyle"
                {...register('home_TEL')}
                onChange={actions.onChangeHomeTel}
                defaultValue={state.data?.home_TEL}
                maxLength="13"
              />
            </td>
          </tr>
          <tr className="totalEmpCellStyle">
            <th className="headerCellStyle" rowSpan="2">
              주소
            </th>
            <td colSpan="3" className="cellEmpAddrStyle">
              <input
                type="text"
                className="addressInputStyle"
                name="zipcode"
                {...register('zipcode')}
                defaultValue={
                  state.address ? state.address : state.data?.zipcode
                }
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
                defaultValue={
                  state.addressDetail ? state.addressDetail : state.data?.addr
                }
              />
            </td>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                name="addr_NUM"
                {...register('addr_NUM')}
                defaultValue={state.data.addr_NUM}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">입사일</th>
            <td className="cellStyle">
              <DatePicker
                selected={state.openDate}
                name="join_DT"
                onChange={actions.handleOpenDateChange}
                dateFormat="yyyy-MM-dd"
                className="datePickerInputStyle"
                locale={ko}
              />
            </td>
            <th className="headerCellStyle">퇴사일</th>
            <td className="cellStyle">
              {/* <DatePicker
                selected={closeDate}
                onChange={handleCloseDateChange}
                dateFormat="yyyy-MM-dd"
                className="datePickerStyle"
                locale={ko} 
              /> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmpInfoBox;
