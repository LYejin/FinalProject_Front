import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventButton from './../../../common/button/EventButton';
import EmpInfoCompanySelectBox from './EmpInfoCompanySelectBox';
import { ErrorMessage } from '@hookform/error-message';
import EmpInfoSelectBox from './EmpInfoCompanySelectBox';
import EmpInfoWorkplaceSelectBox from './EmpInfoWorkplaceSelectBox';

const EmpInfoBox = ({
  data,
  register,
  setOpenDate,
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
}) => {
  const [closeDate, setCloseDate] = useState(null); // 폐업일 선택 상태 관리

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
                      setImage(e.target.files[0]);
                      imgPreview(e.target.files[0]);
                    }}
                    ref={imgRef}
                  />
                  <div className="userImageLabel">
                    {imgPriviewFile ? (
                      <img src={imgPriviewFile} alt="userImage" />
                    ) : (
                      <img
                        src={
                          imgFile
                            ? imgFile
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
                    !clickYN && {
                      required: '사번을 입력해주세요.',
                    }
                  )}
                  maxLength="10"
                  defaultValue={data.emp_CD}
                  style={{
                    border:
                      errors.emp_CD && errorName === 'emp_CD'
                        ? '1px solid red'
                        : '1px solid #ccc',
                    backgroundColor: clickYN ? '#f2f2f2' : '#fef4f4',
                  }}
                  disabled={clickYN}
                  onFocus={onFocusError}
                />
                {errorName === 'emp_CD' && (
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
            <th className="headerCellStyle">회사/사업장</th>
            <td colSpan="3" className="cellStyle">
              <div className="empInfoCompanySelectBox">
                <EmpInfoCompanySelectBox
                  width={230}
                  data={companyList}
                  setCompany={setCompany}
                  company={company}
                  setWorkplaceList={setWorkplaceList}
                  clickYN={clickYN}
                  register={register}
                  errors={errors}
                  errorName={errorName}
                />
              </div>
              <div className="empInfoWorkplaceSelectBox">
                <EmpInfoWorkplaceSelectBox
                  width={495}
                  data={workplaceList || []}
                  workplaceSelect={workplaceSelect}
                  setWorkplaceSelect={setWorkplaceSelect}
                  clickYN={clickYN}
                  register={register}
                  errors={errors}
                  errorName={errorName}
                />
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
                    !clickYN && { required: '이름을 입력해주세요.' }
                  )}
                  defaultValue={data.kor_NM}
                  style={{
                    border:
                      errors.kor_NM && errorName === 'kor_NM'
                        ? '1px solid red'
                        : '1px solid #ccc',
                  }}
                  onFocus={onFocusError}
                />
                {errorName === 'kor_NM' && (
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
                    !clickYN && { required: 'ID를 입력해주세요.' }
                  )}
                  defaultValue={data.username}
                  maxLength="16"
                  style={{
                    border:
                      errors.username && errorName === 'username'
                        ? '1px solid red'
                        : '1px solid #ccc',
                    backgroundColor: clickYN ? '#f2f2f2' : '#fef4f4',
                  }}
                  disabled={clickYN}
                  onFocus={onFocusError}
                />
                {errorName === 'username' && (
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
                      errors.email_ADD && errorName === 'email_ADD'
                        ? '1px solid red'
                        : '1px solid #ccc',
                    backgroundColor: clickYN ? '#f2f2f2' : '#fef4f4',
                  }}
                  disabled={clickYN}
                  onFocus={onFocusError}
                />
                {errorName === 'email_ADD' && (
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
            <th className="headerCellStyle">결재 비밀번호</th>
            <td className="cellStyle">
              <input type="password" className="reqInputStyle" />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">성별</th>
            <td className="cellStyle">
              <div>
                <label>
                  <input
                    className="radioStyle"
                    type="radio"
                    name="gender_FG"
                    value="W"
                    checked={selectedValue === 'W'}
                    onChange={handleRadioChange}
                  />
                  여자
                </label>
                <label>
                  <input
                    className="radioStyle"
                    type="radio"
                    name="gender_FG"
                    value="M"
                    checked={selectedValue === 'M'}
                    onChange={handleRadioChange}
                  />
                  남자
                </label>
              </div>
            </td>
            <th className="headerCellStyle">사용언어</th>
            <td className="cellStyle">
              <input type="text" className="reqInputStyle" />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">개인메일</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="mailInputStyle"
                name="personal_MAIL"
                {...register('personal_MAIL')}
                defaultValue={data.personal_MAIL}
                maxLength="32"
              />
              @
              <input
                type="text"
                className="mailInputStyle2"
                name="personal_MAIL_CP"
                maxLength="32"
                {...register('personal_MAIL_CP')}
                defaultValue={data.personal_MAIL_CP}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">급여메일</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="mailInputStyle"
                name="salary_MAIL"
                maxLength="32"
                {...register('salary_MAIL')}
                defaultValue={data.salary_MAIL}
              />
              @
              <input
                type="text"
                className="mailInputStyle2"
                name="salary_MAIL_CP"
                maxLength="32"
                {...register('salary_MAIL_CP')}
                defaultValue={data.salary_MAIL_CP}
              />
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
                defaultValue={data.tel}
              />
            </td>
            <th className="headerCellStyle">전화번호(집)</th>
            <td className="cellStyle">
              <input
                type="text"
                name="home_TEL"
                className="inputStyle"
                {...register('home_TEL')}
                defaultValue={data.home_TEL}
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
            <th className="headerCellStyle">입사일</th>
            <td className="cellStyle">
              <DatePicker
                selected={openDate}
                name="join_DT"
                onChange={handleOpenDateChange}
                dateFormat="yyyy-MM-dd"
                className="datePickerStyle"
              />
            </td>
            <th className="headerCellStyle">퇴사일</th>
            <td className="cellStyle">
              {/* <DatePicker
                selected={closeDate}
                onChange={handleCloseDateChange}
                dateFormat="yyyy-MM-dd"
                className="datePickerStyle"
              /> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmpInfoBox;
