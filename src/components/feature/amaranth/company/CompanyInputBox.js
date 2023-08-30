import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Row, Col } from 'react-bootstrap';
import { TextFieldBox } from '../../../common/Index';
import DatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';
import 'react-datepicker/dist/react-datepicker.css';
import './CompanyInputBox.css';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import { getNowJoinTime } from '../../../../util/time';
import Modal from '../../../common/modal/Modal';

import { Label } from '../../../../../node_modules/@mui/icons-material/index';
import CompanyNameSelect from './CompanyNameSelect';
import EventButton from './button/EventButton';
import SubmitButton from './button/SubmitButton';
import EditButton from './button/EditButton';

const CompanyInputBox = ({ formData, ch_listData, ch_listDataSet }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setFocus,
    trigger,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({ mode: 'onChange', shouldFocusError: true });

  const labels = {
    PIC_FILE_ID: 'PIC_FILE_ID',
    CO_CD: 'CO_CD',
    USE_YN: 'USE_YN',
    CO_NM: 'CO_NM',
    CO_NMK: 'CO_NMK',
    BUSINESS: 'BUSINESS',
    JONGMOK: 'JONGMOK',
    REG_NB: 'REG_NB',
    CEO_NM: 'CEO_NM',
    HO_FAX: 'HO_FAX',
    CEO_TEL: 'CEO_TEL',
    PPL_NB: 'PPL_NB',
    HO_ZIP: 'HO_ZIP',
    HO_ADDR: 'HO_ADDR',
    HO_ADDR1: 'HO_ADDR1',
    CO_FG: 'CO_FG',
    CO_NB: 'CO_NB',
    EST_DT: 'EST_DT',
    OPEN_DT: 'OPEN_DT',
    CLOSE_DT: 'CLOSE_DT',
    ACCT_FG: 'ACCT_FG',
  };

  const regexPatterns = {
    CO_CD: [/^\d{4}$/, '4자리 숫자로 입력하세요'],
    CO_NM: [/^.{1,17}$/, '10자리 이내로 입력하세요'],
    CO_NMK: [/^.{1,10}$/, '10자리 이내로 입력하세요'],
    BUSINESS: [/^.{1,10}$/, '10자리 이내로 입력하세요'],
    JONGMOK: [/^.{1,10}$/, '10자리 이내로 입력하세요'],
    REG_NB: [/^\d{3}-\d{2}-\d{5}$/, '000-00-00000형식에 맞춰서 입력하세요'],
    CEO_NM: [/^[가-힣]{3,4}$/, '3~4자리 이내로 입력하세요'],
    HO_FAX: [/^\d{3}-\d{3,4}-\d{4}$/, '000-0000-000형식에 맞춰 입력하세요'],
    CEO_TEL: [/^0\d{2}-\d{3,4}-\d{4}$/, '전화번호 형식에 맞게 입력하세요'],
    PPL_NB: [
      /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])-\d{7}$/,
      '주민번호 형식에 맞게 입력하세요',
    ],
    HO_ZIP: [/^\d{5}$/, '우편번호 형식에 맞게 입력하세요'],
    HO_ADDR: [/^.{1,}$/, '존재하지 않는 주소입니다'],
    CO_NB: [/^\d{6}-\d{7}$/, '000000-0000000 형식에 맞게 입력하세요'],
    required: '필수 입력입니다',
  };

  const ACCT_FG_OP = [
    '일반 의료기관',
    '일반비영리',
    '학교(교비)',
    '산학협력단',
  ];
  const CO_FG_OP = ['개인', '법인'];
  const dupColmn = ['CO_CD', 'CEO_TEL', 'PPL_NB', 'REG_NB'];
  const transformColme = ['REG_NB', 'HO_FAX', 'PPL_NB', 'CO_NB', 'CEO_TEL'];
  const [selectedImage, setSelectedImage] = useState();
  const [ch_formData, setChFormData] = useState({});
  const up_FormData = useRef(); //{ EST_DT: "", OPEN_DT: "", CLOSE_DT: "" }
  const message = React.useRef();
  const [selectedDate, setSelectedDate] = useState();
  const [isOpenPost, setIsOpenPost] = useState(false); // 우편번호 모달창
  const [isOpenCompanyName, setIsOpenCompanyName] = useState(false); // 우편번호 모달창

  React.useEffect(() => {
    if (formData) {
      console.log('마운틴', formData);
      setSelectedImage(formData.pic_FILE_ID);

      setChFormData(prevChFormData => ({
        ...prevChFormData,
        CO_CD: formData.co_CD,
        CEO_TEL: formData.ceo_TEL,
        PPL_NB: formData.ppl_NB,
        CO_NB: formData.co_NB,
      }));

      for (const key in formData) {
        const uppercaseKey = key.toUpperCase();
        up_FormData[uppercaseKey] = formData[key]; //hyphenation(uppercaseKey, formData[key]);
        if (transformColme.includes(uppercaseKey)) {
          hyphenation(up_FormData[uppercaseKey], uppercaseKey);
        } else if (!transformColme.includes(uppercaseKey)) {
          setValue(uppercaseKey, up_FormData[uppercaseKey]);
        }
      }
      console.log('qudrud', up_FormData);
      setSelectedDate(getValues()); //

      clearErrors();
    }
  }, [formData]);

  const asyncRequest = async (url, methodType, data, headers) => {
    console.log(data);
    const cookies = document.cookie;
    const token = cookies.split('=')[1];
    try {
      const response = await axios({
        method: methodType,
        url: url,
        data: data,
        withCredentials: true,

        headers: { Authorization: token, ...headers },
      });

      console.log('가져온 값', response.data);
      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const onFocusErrors = e => {
    console.log('------------------------------------');
    console.log(errors[0]?.message);
    console.log(e.target.name);
    console.log(Object.keys(errors).length);
    console.log(errors[e.target.name]?.message);

    if (
      Object.keys(errors).length >= 0 &&
      errors[e.target.name] !== undefined
    ) {
      clearErrors();
      setError(
        e.target.name,
        { message: errors[e.target.name]?.message } // 에러 메세지
      );
    }
  };
  const onBlurClearErrors = () => {
    clearErrors();
  };

  //이미지 데이터 인코딩
  //base64 = 이미지URL을 문자형으로
  //Blob = base64를 정수형 베열형태 => 원시 데이터로
  const blobToByteArray = blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('로그');
        const base64Data = reader.result;
        //const byteArray = new Uint8Array(base64Data);
        resolve(base64Data);
      };
      reader.onerror = reject;
      //reader.readAsArrayBuffer(blob);   //BLOB형으로 변환
      reader.readAsDataURL(blob); //base64형으로 변환
    });
  };

  const handleDateChange = (key, date) => {
    if (ch_formData.CO_CD !== '') {
      setChFormData(prevChFormData => ({
        ...prevChFormData,
        [key]: date,
      }));
    }

    setSelectedDate(prevState => ({
      ...prevState,
      [key]: date,
    }));
    console.log(selectedDate);
  };

  // 회사명 검색
  const onChangeOpenCompanyName = () => {
    console.log(!isOpenCompanyName);
    setIsOpenCompanyName(!isOpenCompanyName);
  };
  // 회사명 검색 시 처리
  const onCompleteCompanyName = searckCompanyData => {
    console.log('모달', searckCompanyData);
    console.log('번호', searckCompanyData.bno, searckCompanyData.cno);
    setIsOpenPost(false);
    const fieldUpdates = [
      { name: labels.CO_NM, value: searckCompanyData.company },
      { name: labels.REG_NB, value: searckCompanyData.bno },
      { name: labels.CO_NB, value: searckCompanyData.cno },
    ];

    fieldUpdates.forEach(field => {
      setValue(field.name, field.value);
      onChangeInput({ target: { name: field.name, value: field.value } });
    });
  };
  const handleOverlayClick = e => {
    e.stopPropagation(); // 이벤트 전파 중단
  };
  // 우편번호 검색 시 처리
  const onCompletePost = data => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setValue(labels.HO_ZIP, data.zonecode);
    console.log(data.zonecode);
    setValue(labels.HO_ADDR, fullAddr);
    console.log(fullAddr);
    setIsOpenPost(false);
  };
  const onChangeOpenPost = () => {
    console.log(isOpenPost);
    setIsOpenPost(!isOpenPost);
  };

  const handleImageChange = async e => {
    setSelectedImage('');
    const imageFile = await blobToByteArray(e.target.files[0]);
    if (imageFile) {
      setSelectedImage(imageFile); // 선택한 이미지 파일의 URL로 업데이트
    }
  };

  const onSubmit = async (empdata, e) => {
    const transformColme = ['REG_NB', 'HO_FAX', 'PPL_NB', 'CO_NB', 'CEO_TEL'];
    console.log(empdata);
    console.log(selectedImage);
    console.log('에러', errors);

    if (formData.co_CD === '' && getValues() !== '') {
      try {
        const n_formData = new FormData();
        for (const key in empdata) {
          if (transformColme.includes(key)) {
            empdata[key] = empdata[key].replace(/-/g, ''); // 하이픈 제거
            n_formData.append(key, empdata[key]);
          } else if (!transformColme.includes(key)) {
            n_formData.append(key, empdata[key]);
          }
        }

        if (selectedImage) {
          const imageByteArray = selectedImage;
          console.log('이미지', imageByteArray);
          n_formData.append('PIC_FILE_ID', imageByteArray);
        }

        console.log('전달데이터', n_formData);
        for (let pair of n_formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await asyncRequest(
          'system/admin/groupManage/CompanyInsert',
          'post',
          n_formData,
          { 'Content-Type': 'multipart/form-data' } // 이부분 코드 확인하기
        );
        if (response.data !== '') {
          ch_listDataSet(prveData => prveData + 1);
        }
        console.log('전달된:', response.data);
      } catch (error) {
        console.error('데이터 전송 실패:', error);
      }
    }
  };

  const onChangeInput = async e => {
    const dup = { [e.target.name]: e.target.value };
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const parts = fieldName.split('_'); // "_"를 기준으로 문자열을 나눕니다.
    const transformedString = parts[0].toLowerCase() + '_' + parts[1]; // 첫 번째 부분은 소문자로 변환하고, 두 번째 부분은 소문자로 변환한 후 다시 "_"와 합칩니다.

    console.log(transformedString); // "co_CD"
    console.log('타냐?', Object.keys(errors).length);
    console.log('라벨', getValues(e.target.name), 'dup', dup[e.target.name]);
    console.log(errors);
    console.log(errors[e.target.name]?.message);
    console.log(regexPatterns[e.target.name]);
    console.log(
      '현재',
      dup[e.target.name].length,
      '과거',
      ch_formData[e.target.name]?.length
    );
    // console.log(
    //   '검사',
    //   regexPatterns[e.target.name][0].test(dup[e.target.name]),
    //   '에러 유무',
    //   errors[e.target.name],
    //   '해당 유무',
    //   dupColmn.includes(e.target.name)
    // );
    // //clearErrors(e.target.name);
    // if (prevData.count === 0) {
    //   console.log('타냐?');
    // }
    if (
      //Object.keys(errors).length <= 1 &&
      //errors[e.target.name] === undefined &&
      //regexPatterns[e.target.name][0] !== undefined &&
      dup[e.target.name] !== '' &&
      dup[e.target.name] !== formData[transformedString] &&
      dupColmn.includes(e.target.name) &&
      regexPatterns[e.target.name][0].test(dup[e.target.name])
    ) {
      console.log('주민인증', etIsRegistFieldRight(dup[e.target.name]));
      if (
        e.target.name === 'PPL_NB' &&
        !etIsRegistFieldRight(dup[e.target.name])
      ) {
        return;
      }

      dup[e.target.name] = dup[e.target.name].replace(/-/g, '');
      try {
        const response = await asyncRequest(
          'system/admin/groupManage/CompanyDup',
          'post',
          dup,
          { 'Content-Type': 'multipart/form-data' } // 이부분 코드 확인하기
        );

        if (response.data !== '') {
          setError(
            e.target.name,
            { message: '이미 존재합니다.' }, // 에러 메세지
            { shouldFocus: true }
          );
        }
      } catch (error) {
        console.error('데이터 전송 실패:', error);
      }
    } else if (
      dup[e.target.name] !== '' &&
      dup[e.target.name] !== formData[transformedString] &&
      transformColme.includes(e.target.name) &&
      !regexPatterns[e.target.name][0].test(dup[e.target.name]) &&
      dup[e.target.name].length >= ch_formData[e.target.name]?.length
    ) {
      hyphenation(dup[e.target.name], e.target.name);
    }
    if (ch_formData.CO_CD !== '') {
      setChFormData(prevChFormData => ({
        ...prevChFormData,
        [fieldName]: fieldValue,
      }));
    } else if (transformColme.includes(e.target.name)) {
      setChFormData(prevChFormData => ({
        ...prevChFormData,
        [fieldName]: fieldValue,
      }));
    }
  };

  const etIsRegistFieldRight = registNum => {
    const TODAY_YEAR = parseInt(new Date().getFullYear().toString().substr(-2));

    if (registNum.length !== 14)
      // 대시 있는 경우 14로 변경
      return false;

    // 연도에 해당하는 숫자와 성별에 해당하는 숫자 비교
    const yearNum = registNum.slice(0, 2);
    const sexNum = registNum.slice(7, 8); // 대시 있는 경우 7로 변경
    console.log(
      yearNum,
      sexNum,
      TODAY_YEAR,
      yearNum < TODAY_YEAR,
      yearNum > TODAY_YEAR
    );
    if (sexNum === '1' || sexNum === '2') {
      if (yearNum < TODAY_YEAR) {
        return false;
      }
    } else if (sexNum === '3' || sexNum === '4') {
      if (yearNum > TODAY_YEAR) return false;
    } else return false;

    return true;
  };
  const hyphenation = (inputData, type) => {
    const transformPattern = {
      REG_NB: /(\d{3})(?:-?)(\d{0,2})(?:-?)(\d{0,5})/, // 000-00-00000
      HO_FAX: /(\d{3})(?:-?)(\d{0,4})(?:-?)(\d{0,4})/, // 000-0000-000
      CO_NB: /(\d{6})(?:-?)(\d{0,7})/, // 000000-0000000
      PPL_NB: /(\d{6})(?:-?)(\d{0,7})/, // 000000-0000000
      CEO_TEL: /(\d{3})(?:-?)(\d{0,4})(?:-?)(\d{0,4})/, // 000-0000-0000
    };

    const match = inputData.match(transformPattern[type]); // 정규식으로 그룹화
    //console.log('변환 타냐?>', inputData, type, match, match === '');
    if (match) {
      const formattedNumber = [match[1], match[2], match[3]]
        .filter(Boolean)
        .join('-');

      setValue(type, formattedNumber);
    } else if (inputData === '') {
      setValue(type, '');
    }
  };

  const updateBtnClick = async () => {
    const isValid = await trigger();
    if (ch_formData.CO_CD !== '' && isValid) {
      const c_formData = new FormData();

      if (ch_formData.PIC_FILE_ID !== '') {
        ch_formData.PIC_FILE_ID = selectedImage;
      }

      for (const key in ch_formData) {
        if (transformColme.includes(key)) {
          ch_formData[key] = ch_formData[key].replace(/-/g, ''); // 하이픈 제거
          c_formData.append(key, ch_formData[key]);
        } else if (!transformColme.includes(key)) {
          c_formData.append(key, ch_formData[key]);
        }
      }

      try {
        const response = await asyncRequest(
          'system/admin/groupManage/CompanyUpdate',
          'put',
          c_formData,
          { 'Content-Type': 'multipart/form-data' }
        );
        console.log(response.data);
        if (response.data !== '') {
          ch_listDataSet(prveData => prveData + 1);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(ch_formData);
    }
  };

  const removeBtnClick = async () => {
    const CO_CD = formData.co_CD;
    try {
      const response = await asyncRequest(
        'system/admin/groupManage/CompanyRemove/' + CO_CD,
        'put'
      );
      if (response.data !== '') {
        ch_listDataSet(prveData => prveData + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const E_selectedDateValue =
    selectedDate && selectedDate[labels.EST_DT]
      ? new Date(selectedDate[labels.EST_DT])
      : null;
  const O_selectedDateValue =
    selectedDate && selectedDate[labels.OPEN_DT]
      ? new Date(selectedDate[labels.OPEN_DT])
      : null;
  const C_selectedDateValue =
    selectedDate && selectedDate[labels.CLOSE_DT]
      ? new Date(selectedDate[labels.CLOSE_DT])
      : null;

  return (
    <div className="company-form">
      <form
        onChange={onChangeInput}
        onSubmit={handleSubmit(onSubmit)}
        onBlur={onBlurClearErrors}
      >
        <div className="button-container">
          <SubmitButton data={'추가'} width={'-10px'} height={30} />
          <EditButton
            data={'수정'}
            width={'-10px'}
            height={30}
            onClickEvent={() => {
              trigger(); // 유효성 검사를 실행한 후 onSubmit 호출
              handleSubmit(updateBtnClick)();
            }}
          />
          <EventButton
            data={'삭제'}
            width={'-10px'}
            height={30}
            onClickEvent={removeBtnClick}
          />
        </div>
        <table className="tableStyle">
          <tbody>
            <tr>
              <th className="headerCellStyle">회사로고</th>
              <td colSpan="3" className="cellStyle">
                <div className="userAvaterWrapper">
                  <div className="userAvater">
                    <input
                      type="file"
                      id="fileImageUpload"
                      className="userImage"
                      name={labels.PIC_FILE_ID}
                      onChange={handleImageChange}
                    />
                    <div className="userImageLabel">
                      {selectedImage ? (
                        <img src={selectedImage} alt="Company Logo" />
                      ) : (
                        <img
                          src="https://cdn.logo.com/hotlink-ok/logo-social.png"
                          alt="Default Company Logo"
                        />
                      )}
                    </div>
                    <label
                      id="imageButtonWrapper"
                      className="imageButtonWrapper"
                      htmlFor="fileImageUpload"
                      // onClick={userImgSubmit}
                    >
                      <i className="fa-solid fa-paperclip"></i>
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">회사코드</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  {up_FormData.CO_CD ? (
                    <input
                      type="text"
                      name={labels.CO_CD}
                      className="companyReqInputStyle"
                      readOnly
                      style={{ backgroundColor: 'gray' }}
                      {...register(labels.CO_CD, {
                        pattern: {
                          value: regexPatterns.CO_CD[0],
                          message: regexPatterns.CO_CD[1],
                        },
                        required: regexPatterns.required,
                      })}
                    />
                  ) : (
                    <input
                      type="text"
                      name={labels.CO_CD}
                      maxlength="4"
                      className="companyReqInputStyle"
                      {...register(labels.CO_CD, {
                        pattern: {
                          value: regexPatterns.CO_CD[0],
                          message: regexPatterns.CO_CD[1],
                        },
                        required: regexPatterns.required,
                      })}
                      onFocus={onFocusErrors}
                    />
                  )}
                  {errors[labels.CO_CD] && (
                    <p className="errorBox">{errors?.CO_CD?.message}</p>
                  )}
                </div>
              </td>
              <th className="headerCellStyle">사용여부</th>
              <td className="cellStyle">
                <label>
                  <input type="radio" value="1" {...register(labels.USE_YN)} />
                  사용
                </label>
                <label>
                  <input type="radio" value="0" {...register(labels.USE_YN)} />
                  미사용
                </label>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">회사명</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name={labels.CO_NM}
                    maxlength="17"
                    className="addressInputStyle"
                    {...register(labels.CO_NM, {
                      pattern: {
                        value: regexPatterns.CO_NM[0],
                        message: regexPatterns.CO_NM[1],
                      },
                      required: regexPatterns.required,
                    })}
                    onFocus={onFocusErrors}
                  />
                  {errors[labels.CO_NM] && (
                    <p className="errorBox">{errors?.CO_NM?.message}</p>
                  )}
                  <EventButton
                    data={'검색'}
                    onClickEvent={onChangeOpenCompanyName}
                  ></EventButton>
                </div>
              </td>
              <th className="headerCellStyle">회사약칭</th>
              <td colSpan="3" className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name={labels.CO_NMK}
                    maxlength="10"
                    className="inputStyle"
                    {...register(labels.CO_NMK, {
                      pattern: {
                        value: regexPatterns.CO_NMK[0],
                        message: regexPatterns.CO_NMK[1],
                      },
                    })}
                    onFocus={onFocusErrors}
                  />
                  {errors[labels.CO_NMK] && (
                    <p className="errorBox">{errors?.CO_NMK?.message}</p>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">사업자번호</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name={labels.REG_NB}
                    maxlength="12"
                    className="companyReqInputStyle"
                    {...register(labels.REG_NB, {
                      pattern: {
                        value: regexPatterns.REG_NB[0],
                        message: regexPatterns.REG_NB[1],
                      },
                      required: regexPatterns.required,
                    })}
                    onFocus={onFocusErrors}
                  />
                  {errors[labels.REG_NB] && (
                    <p className="errorBox">{errors?.REG_NB?.message}</p>
                  )}
                </div>
              </td>
              <th className="headerCellStyle">법인번호</th>
              <td className="cellStyle">
                <div className="inline-input-group">
                  <select name={labels.CO_FG} {...register(labels.CO_FG)}>
                    {CO_FG_OP.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="errorWrapper">
                    <input
                      type="text"
                      name={labels.CO_NB}
                      maxlength="14"
                      className="companyReqInputStyle"
                      {...register(labels.CO_NB, {
                        pattern: {
                          value: regexPatterns.CO_NB[0],
                          message: regexPatterns.CO_NB[1],
                        },
                        required: regexPatterns.required,
                      })}
                      onFocus={onFocusErrors}
                    />
                    {errors[labels.CO_NB] && (
                      <p className="errorBox">{errors?.CO_NB?.message}</p>
                    )}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">업태</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name={labels.BUSINESS}
                    maxlength="10"
                    className="companyReqInputStyle"
                    {...register(labels.BUSINESS, {
                      pattern: {
                        value: regexPatterns.BUSINESS[0],
                        message: regexPatterns.BUSINESS[1],
                      },
                      required: regexPatterns.required,
                    })}
                    onFocus={onFocusErrors}
                  />
                  {errors[labels.BUSINESS] && (
                    <p className="errorBox">{errors?.BUSINESS?.message}</p>
                  )}
                </div>
              </td>
              <th className="headerCellStyle">종목</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name={labels.JONGMOK}
                    maxlength="10"
                    className="companyReqInputStyle"
                    {...register(labels.JONGMOK, {
                      pattern: {
                        value: regexPatterns.JONGMOK[0],
                        message: regexPatterns.JONGMOK[1],
                      },
                      required: regexPatterns.required,
                    })}
                    onFocus={onFocusErrors}
                  />

                  {errors[labels.JONGMOK] && (
                    <p className="errorBox">{errors?.JONGMOK?.message}</p>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">대표자명</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name={labels.CEO_NM}
                    maxlength="4"
                    className="companyReqInputStyle"
                    {...register(labels.CEO_NM, {
                      pattern: {
                        value: regexPatterns.CEO_NM[0],
                        message: regexPatterns.CEO_NM[1],
                      },
                      required: regexPatterns.required,
                    })}
                    onFocus={onFocusErrors}
                  />
                  {errors[labels.CEO_NM] && (
                    <p className="errorBox">{errors?.CEO_NM?.message}</p>
                  )}
                </div>
              </td>
              <th className="headerCellStyle">대표전화</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <input
                    type="text"
                    name={labels.CEO_TEL}
                    maxlength="13"
                    className="companyReqInputStyle"
                    {...register(labels.CEO_TEL, {
                      pattern: {
                        value: regexPatterns.CEO_TEL[0],
                        message: regexPatterns.CEO_TEL[1],
                      },
                      required: regexPatterns.required,
                    })}
                    onFocus={onFocusErrors}
                  />
                  {errors[labels.CEO_TEL] && (
                    <p className="errorBox">{errors?.CEO_TEL?.message}</p>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">대표주민번호</th>
              <td className="cellStyle">
                <div className="errorWrapper">
                  <InputMask
                    mask="999999-9999999"
                    alwaysShowMask={true}
                    onFocus={onFocusErrors}
                    {...register(labels.PPL_NB, {
                      pattern: {
                        value: regexPatterns.PPL_NB[0],
                        message: regexPatterns.PPL_NB[1],
                      },
                      required: regexPatterns.required,
                    })}
                  >
                    {() => (
                      <input
                        type="text"
                        name={labels.PPL_NB}
                        maxlength="15"
                        className="companyReqInputStyle"
                      />
                    )}
                  </InputMask>
                  {/* <input
                    type="text"
                    name={labels.PPL_NB}
                    maxlength="14"
                    className="companyReqInputStyle"
                    {...register(labels.PPL_NB, {
                      pattern: {
                        value: regexPatterns.PPL_NB[0],
                        message: regexPatterns.PPL_NB[1],
                      },
                      required: regexPatterns.required,
                    })}
                    onFocus={onFocusErrors}
                  /> */}
                  {errors[labels.PPL_NB] && (
                    <p className="errorBox">{errors?.PPL_NB?.message}</p>
                  )}
                </div>
              </td>
              <th className="headerCellStyle">대표팩스</th>
              <td className="cellStyle">
                <input
                  type="text"
                  name={labels.HO_FAX}
                  maxlength="13"
                  className="inputStyle"
                  {...register(labels.HO_FAX, {
                    pattern: {
                      value: regexPatterns.HO_FAX[0],
                      message: regexPatterns.HO_FAX[1],
                    },
                  })}
                />
                {errors[labels.HO_FAX] && <p>{errors?.HO_FAX?.message}</p>}
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">설립일</th>
              <td className="cellStyle">
                <DatePicker
                  selected={E_selectedDateValue}
                  onChange={date => {
                    handleDateChange(labels.EST_DT, getNowJoinTime(date));
                    setValue(labels.EST_DT, getNowJoinTime(date));
                  }}
                  dateFormat="yyyy-MM-dd"
                  calendarIcon={<i className="fa fa-calendar" />} // 달력 아이콘 설정
                />
              </td>
              <th className="headerCellStyle">개/폐업일</th>
              <td className="cellStyle">
                <div className="inline-input-group">
                  <DatePicker
                    selected={O_selectedDateValue}
                    onChange={date => {
                      handleDateChange(labels.OPEN_DT, getNowJoinTime(date));
                      setValue(labels.OPEN_DT, getNowJoinTime(date));
                    }}
                    dateFormat="yyyy-MM-dd"
                    calendarIcon={<i className="fa fa-calendar" />} // 달력 아이콘 설정
                  />
                  /
                  <DatePicker
                    selected={C_selectedDateValue}
                    onChange={date => {
                      handleDateChange(labels.CLOSE_DT, getNowJoinTime(date));
                      setValue(labels.CLOSE_DT, getNowJoinTime(date));
                    }}
                    dateFormat="yyyy-MM-dd"
                    calendarIcon={<i className="fa fa-calendar" />} // 달력 아이콘 설정
                  />
                </div>
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
                  {...register(labels.HO_ZIP)}
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
                  {...register(labels.HO_ADDR)}
                />
              </td>
              <td className="cellStyle">
                <input
                  type="text"
                  className="inputStyle"
                  {...register(labels.HO_ADDR1)}
                />
              </td>
            </tr>
            <tr>
              <th className="headerCellStyle">회사계정유형</th>
              <td colSpan="3" className="cellStyle">
                <select name={labels.ACCT_FG} {...register(labels.ACCT_FG)}>
                  {ACCT_FG_OP.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {isOpenPost ? (
        <Modal
          width={'560px'}
          height={'600px'}
          title={'우편번호'}
          onClickEvent={onChangeOpenPost}
        >
          <DaumPostcode autoClose onComplete={onCompletePost} />
        </Modal>
      ) : null}

      {isOpenCompanyName ? (
        <Modal
          width={'560px'}
          height={'600px'}
          title={'회사명검색'}
          onClickEvent={onChangeOpenCompanyName}
        >
          <div onClick={handleOverlayClick}>
            <CompanyNameSelect
              onComplete={onCompleteCompanyName}
              closeModal={() => setIsOpenCompanyName(false)}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default CompanyInputBox;
