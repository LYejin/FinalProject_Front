import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../../../common/Index';
import EventButton from './../../../common/button/EventButton';

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
}) => {
  const [closeDate, setCloseDate] = useState(null); // 폐업일 선택 상태 관리

  // 이미지
  const [imgPriviewFile, setImgPriviewFile] = useState();
  const imgRef = useRef();

  // 개업일 선택 시 처리 함수
  const handleOpenDateChange = date => {
    setOpenDate(date);
  };

  // 폐업일 선택 시 처리 함수
  const handleCloseDateChange = date => {
    setCloseDate(date);
  };

  // const submitButton = async () => {
  //   const userInfo = new FormData();

  //   const userData = {
  //     userId: currnetId,
  //     id: fixId,
  //     password: password,
  //     phoneNumber: phoneNumber,
  //     address: address,
  //   };

  //   const blob = new Blob([JSON.stringify(userData)], {
  //     type: "application/json",
  //   });
  //   userInfo.append("request", blob);

  //   await axios
  //     .patch(`/profile/profile/${userId}`, userInfo, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       removeAccessKey();
  //       setAccessKey(fixId);
  //       setUserId(fixId);
  //       alert("프로필이 수정되었습니다");
  //       if (res.data.code === "1" && currnetId && fixId && password) {
  //         removeAccessToken();
  //         removeRefreshToken();
  //         axios
  //           .post("/login", { id: fixId, password: password })
  //           .then((response) => {
  //             if (response.data.code === "-1") {
  //               console.log(response);
  //               return alert("로그인에 실패했습니다");
  //             }
  //             setRefreshToken(response.data.refreshToken);
  //             setAccessToken(response.data.accessToken);
  //           })
  //           .catch((err) => {
  //             return alert("이미 존재하는 아이디입니다.");
  //           });
  //       }
  //     })
  //     .catch((err) => alert("프로필 수정 실패"));
  // };

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

  // 프로필 이미지 저장 기능
  // const userImgSubmit = (e) => {
  //   e.preventDefault();
  //   const userInfo = new FormData();
  //   userInfo.append("image", image);

  //   axios
  //     .patch(`/profile/profile/${userId}`, userInfo, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       alert("프로필 사진이 변경되었습니다");
  //       if (res.data.code === "1" && currnetId && password) {
  //         axios
  //           .post("/login", { id: currnetId, password: password })
  //           .then((response) => {
  //             if (response.data.code === "-1") {
  //               return alert("로그인 실패");
  //             }
  //           })
  //           .catch((err) => {
  //             return alert("로그인 실패");
  //           });
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

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
                  <label className="userImageLabel" htmlFor="fileImageUpload">
                    {imgPriviewFile ? (
                      <img src={imgPriviewFile} alt="userImage" />
                    ) : (
                      <img
                        src={
                          imgFile
                            ? `data:image/jpeg;base64,${imgFile}`
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                        }
                        alt="userImage"
                      />
                    )}
                  </label>
                  <div
                    id="imageButtonWrapper"
                    className="imageButtonWrapper"
                    // onClick={userImgSubmit}
                  >
                    <i className="fa-solid fa-paperclip"></i>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사번</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="reqInputStyle"
                {...register('emp_CD')}
                defaultValue={data.emp_CD}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">이름</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="reqInputStyle"
                {...register('kor_NM')}
                defaultValue={data.kor_NM}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">로그인 ID</th>
            <td className="cellStyle">
              <input
                type="text"
                className="reqInputStyle"
                {...register('username')}
                defaultValue={data.username}
              />
            </td>
            <th className="headerCellStyle">메일 ID</th>
            <td className="cellStyle">
              <input
                type="text"
                className="reqInputStyle"
                {...register('email_ADD')}
                defaultValue={data.email_ADD}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">로그인 비밀번호</th>
            <td className="cellStyle">
              <input
                type="password"
                className="reqInputStyle"
                {...register('password')}
              />
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
                {...register('personal_MAIL')}
                defaultValue={data.personal_MAIL}
              />
              @
              <input
                type="text"
                className="mailInputStyle"
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
                {...register('salary_MAIL')}
                defaultValue={data.salary_MAIL}
              />
              @
              <input
                type="text"
                className="mailInputStyle"
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
                {...register('tel')}
                defaultValue={data.tel}
              />
            </td>
            <th className="headerCellStyle">전화번호(집)</th>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                {...register('home_TEL')}
                defaultValue={data.home_TEL}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle" rowSpan="2">
              주소
            </th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="addressInputStyle"
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
                className="reqInputStyle"
                {...register('addr')}
                defaultValue={addressDetail ? addressDetail : data.addr}
              />
            </td>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
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
                onChange={handleOpenDateChange}
                dateFormat="yyyy-MM-dd"
                className="datePickerStyle"
              />
            </td>
            <th className="headerCellStyle">퇴사일</th>
            <td className="cellStyle">
              <DatePicker
                selected={closeDate}
                onChange={handleCloseDateChange}
                dateFormat="yyyy-MM-dd"
                className="datePickerStyle"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmpInfoBox;
