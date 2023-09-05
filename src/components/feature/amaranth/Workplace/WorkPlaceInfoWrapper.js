import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ButtonW, DetailTitle, SelectBox } from '../../../common/Index';
import 'react-datepicker/dist/react-datepicker.css';
import clipImage from './clipBtn.png';

const WorkPlaceInfoWrapper = ({
  data,
  inputRefs,
  companyData,
  onCompanyChange,
  openDate,
  setOpenDate,
  closeDate,
  setCloseDate,
  handleOpenDateChange,
  handleCloseDateChange,
  onChangeOpenPost,
  address,
  addressDetail,
}) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [divCdError, setDivCdError] = useState(null);
  const [divNameError, setDivNameError] = useState(false);
  const [businessError, setBusinessError] = useState(false);
  const [jongmokError, setJongmokError] = useState(false);
  const [masNMError, setMasNMError] = useState(false);
  const [addrCDError, setAddrCDError] = useState(false);
  const [divADDRError, setDivADDRError] = useState(false);

  function handleValidation(inputRef, setErrorState) {
    const inputValue = inputRef.current.value;
    if (inputValue.trim() === '') {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
  }

  const handleCompanyChange = event => {
    setSelectedCompany(event.target.value);
    onCompanyChange(event.target.value);
  };

  //////////////////////////////////////////////      이미지넣기       ////////////////////////////////////////////////////////////////

  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadDiv, setShowUploadDiv] = useState(false);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseEnter = () => {
    setShowUploadDiv(true);
  };

  const handleMouseLeave = () => {
    setShowUploadDiv(false);
  };

  const handleClick = () => {
    if (showUploadDiv) {
      document.getElementById('imageInput').click();
    }
  };

  // 이미지 로그
  // const inputElement = document.getElementById('imageInput');

  // inputElement.addEventListener('change', e => {
  //   const selectedFile = e.target.files[0];

  //   if (selectedFile) {
  //     console.log('파일 이름:', selectedFile.name);
  //     console.log('파일 크기 (바이트):', selectedFile.size);
  //     console.log('MIME 유형:', selectedFile.type);
  //   }
  // });

  //////////////////////////////////////////////      이미지넣기       ////////////////////////////////////////////////////////////////

  return (
    <div className="selectListWrapper">
      <table className="tableStyle">
        <tbody>
          <tr>
            <th className="headerCellStyle2">회사선택</th>
            <td className="cellStyle">
              {data.isAdding ? (
                <select
                  className="selectListStyle"
                  id="companySelect"
                  value={selectedCompany}
                  onChange={handleCompanyChange}
                >
                  <option value="">선택하세요</option>
                  {companyData.map(company => (
                    <option key={company.value} value={company.value}>
                      {company.value}. {company.label}
                    </option>
                  ))}
                </select>
              ) : (
                data.co_NM || ''
              )}
            </td>
            <th className="headerCellStyle">본점여부</th>
            <td className="cellStyle">
              <input
                className="radioStyle"
                type="radio"
                name="location"
                value="본점"
              />{' '}
              본점
              <input
                className="radioStyle"
                type="radio"
                name="location"
                value="지점"
              />{' '}
              지점
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle2">사업장코드</th>
            <td className="cellStyle">
              {data.isAdding ? (
                <input
                  type="text"
                  className="reqInputStyle"
                  ref={inputRefs.divCDRef}
                />
              ) : data ? (
                data.div_CD || ''
              ) : (
                ''
              )}
            </td>

            <th className="headerCellStyle">사용여부</th>
            <td className="cellStyle">
              <input
                className="radioStyle"
                type="radio"
                name="status"
                value="1"
                ref={inputRefs.divYNRef}
                checked={data.div_YN === '1'}
                readOnly
              />{' '}
              사용
              <input
                className="radioStyle"
                type="radio"
                name="status"
                value="0"
                ref={inputRefs.divYNRef}
                checked={data.div_YN === '0'}
                readOnly
              />{' '}
              미사용
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사업장명</th>
            <td colSpan="3" className="cellStyle">
              <div
                className={`errorWrapper ${divNameError ? 'inputError' : ''}`}
              >
                <input
                  type="text"
                  className={`reqInputStyle ${
                    divNameError ? 'inputError' : ''
                  }`}
                  defaultValue={data ? data.div_NM || '' : ''}
                  ref={inputRefs.divNMRef}
                  key={data.div_NM}
                  onBlur={() => {
                    handleValidation(inputRefs.divNMRef, setDivNameError);
                    if (divNameError && inputRefs.divNMRef.current) {
                      inputRefs.divNMRef.current.focus();
                    }
                  }}
                />
                {divNameError && (
                  <div className="errorBox">
                    <div className="errorMessage">값을 입력해주세요.</div>
                  </div>
                )}
              </div>
            </td>
          </tr>

          <tr>
            <th className="headerCellStyle">사업장 약칭</th>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_NMK || '' : ''}
                ref={inputRefs.divNMKRef}
                key={data.div_NMK}
              />
            </td>
            <th className="headerCellStyle">조작도표시</th>
            <td className="cellStyle">
              <input
                className="radioStyle"
                type="radio"
                name="display"
                value="표시"
              />{' '}
              표시
              <input
                className="radioStyle"
                type="radio"
                name="display"
                value="미표시"
              />{' '}
              미표시
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">업태</th>
            <td className="cellStyle">
              <div
                className={`errorWrapper ${businessError ? 'inputError' : ''}`}
              >
                <input
                  type="text"
                  className={`reqInputStyle ${
                    businessError ? 'inputError' : ''
                  }`}
                  defaultValue={data ? data.business || '' : ''}
                  key={data.business}
                  ref={inputRefs.businessRef}
                  onBlur={() => {
                    handleValidation(inputRefs.businessRef, setBusinessError);
                    if (businessError && inputRefs.businessRef.current) {
                      inputRefs.businessRef.current.focus();
                    }
                  }}
                />
                {businessError && (
                  <div className="errorBox">
                    <div className="errorMessage">값을 입력해주세요.</div>
                  </div>
                )}
              </div>
            </td>
            <th className="headerCellStyle">종목</th>
            <td className="cellStyle">
              <div
                className={`errorWrapper ${jongmokError ? 'inputError' : ''}`}
              >
                <input
                  type="text"
                  className={`reqInputStyle ${
                    jongmokError ? 'inputError' : ''
                  }`}
                  defaultValue={data ? data.jongmok || '' : ''}
                  ref={inputRefs.jongmokRef}
                  key={data.jongmok}
                  onBlur={() => {
                    handleValidation(inputRefs.jongmokRef, setJongmokError);
                    if (jongmokError && inputRefs.jongmokRef.current) {
                      inputRefs.jongmokRef.current.focus();
                    }
                  }}
                />
                {jongmokError && (
                  <div className="errorBox">
                    <div className="errorMessage">값을 입력해주세요.</div>
                  </div>
                )}
              </div>
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">대표전화</th>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_TEL || '' : ''}
                key={data.div_TEL}
                ref={inputRefs.divTELRef}
              />
            </td>
            <th className="headerCellStyle">대표팩스</th>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_FAX || '' : ''}
                key={data.div_FAX}
                ref={inputRefs.divFAXRef}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사업자번호</th>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.reg_NB || '' : ''}
                key={data.reg_NB}
                ref={inputRefs.regNBRef}
              />
            </td>
            <th className="headerCellStyle">법인번호</th>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.cop_NB || '' : ''}
                key={data.cop_NB}
                ref={inputRefs.copNBRef}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">개업일</th>
            <td className="cellStyle">
              <DatePicker
                selected={openDate}
                onChange={handleOpenDateChange}
                dateFormat="yyyy-MM-dd"
                className="inputStyle"
              />
            </td>
            <th className="headerCellStyle">폐업일</th>
            <td className="cellStyle">
              <DatePicker
                selected={closeDate}
                onChange={handleCloseDateChange}
                dateFormat="yyyy-MM-dd"
                className="inputStyle"
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">대표자명</th>
            <td className="cellStyle">
              <div className={`errorWrapper ${masNMError ? 'inputError' : ''}`}>
                <input
                  type="text"
                  className={`reqInputStyle ${masNMError ? 'inputError' : ''}`}
                  defaultValue={data ? data.mas_NM || '' : ''}
                  key={data.mas_NM}
                  ref={inputRefs.masNMRef}
                  onBlur={() => {
                    handleValidation(inputRefs.masNMRef, setMasNMError);
                    if (masNMError && inputRefs.masNMRef.current) {
                      inputRefs.masNMRef.current.focus();
                    }
                  }}
                />
                {masNMError && (
                  <div className="errorBox">
                    <div className="errorMessage">값을 입력해주세요.</div>
                  </div>
                )}
              </div>
            </td>
            <th className="headerCellStyle">관할세무서</th>
            <td className="cellStyle">
              <input
                type="text"
                className="reqInputStyle"
                placeholder="추가필요"
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle" rowSpan="2">
              사업장주소
            </th>
            <td colSpan="3" className="cellStyle">
              <div
                className={`errorWrapper ${addrCDError ? 'inputError' : ''}`}
              >
                <input
                  type="text"
                  className={`postInputStyle ${
                    addrCDError ? 'inputError' : ''
                  }`}
                  defaultValue={address ? address : data.addr_CD}
                  key={address ? address : data.addr_CD}
                  ref={inputRefs.addrCDRef}
                  onBlur={() => {
                    handleValidation(inputRefs.addrCDRef, setAddrCDError);
                    if (addrCDError && inputRefs.addrCDRef.current) {
                      inputRefs.addrCDRef.current.focus();
                    }
                  }}
                />
                {addrCDError && (
                  <div className="errorBox">
                    <div className="errorMessage">값을 입력해주세요.</div>
                  </div>
                )}

                <ButtonW
                  data={'우편번호'}
                  onClickEvent={onChangeOpenPost}
                ></ButtonW>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="cellStyle">
              <div
                className={`errorWrapper ${divADDRError ? 'inputError' : ''}`}
              >
                <input
                  type="text"
                  className={`reqInputStyle ${
                    divADDRError ? 'inputError' : ''
                  }`}
                  defaultValue={addressDetail ? addressDetail : data.div_ADDR}
                  key={addressDetail ? addressDetail : data.div_ADDR}
                  ref={inputRefs.divADDRRef}
                  onBlur={() => {
                    handleValidation(inputRefs.divADDRRef, setDivADDRError);
                    if (divADDRError && inputRefs.divADDRRef.current) {
                      inputRefs.divADDRRef.current.focus();
                    }
                  }}
                />
                {divADDRError && (
                  <div className="errorBox">
                    <div className="errorMessage">값을 입력해주세요.</div>
                  </div>
                )}
              </div>
            </td>

            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                placeholder="직접입력"
                defaultValue={addressDetail ? '' : data.addr_NUM}
                key={addressDetail ? '' : data.addr_NUM}
                ref={inputRefs.addrNUMRef}
              />
            </td>
          </tr>

          <tr>
            <th className="headerCellStyle">정렬</th>

            {/* <th className="headerCellStyle">
              <div className="tooltip">
                정렬
                <span className="tooltiptext">말풍선 텍스트</span>
              </div>
            </th> */}
            <td colSpan="3" className="cellStyle">
              <input type="text" className="inputStyle" disabled />
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <div>
        <DetailTitle detailTitle={'신고 관련 정보'}></DetailTitle>
      </div>
      <table className="tableStyle">
        <tbody>
          <tr>
            <th className="headerCellStyle"> 주업종코드</th>
            <td colSpan="3" className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">
              지방세신고지
              <br />
              (행정동)
            </th>
            <td className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
            <th className="headerCellStyle">
              지방세신고지
              <br />
              (법정동)
            </th>
            <td className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">전자신고ID</th>
            <td className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
            <th className="headerCellStyle">주류코드</th>
            <td className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle" rowSpan="2">
              전자신고용주소
            </th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                style={{
                  border: '1px solid #ccc',
                  height: '26px',
                  width: '120px',
                }}
              />
              <ButtonW data={'우편번호'}></ButtonW>
              {/* <SelectBox
                className="inputStyle"
                style={{ verticalAlign: 'middle' }}
              /> */}
              <input
                type="text"
                className="inputStyle"
                style={{
                  border: '1px solid #ccc',
                  height: '26px',
                  width: '120px',
                  marginLeft: '10px',
                }}
              />
              <input
                type="text"
                className="inputStyle"
                style={{
                  border: '1px solid #ccc',
                  height: '26px',
                  width: '120px',
                  marginLeft: '10px',
                }}
              />
              <input
                type="text"
                className="inputStyle"
                style={{
                  border: '1px solid #ccc',
                  height: '26px',
                  width: '120px',
                  marginLeft: '10px',
                }}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2" className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
            <td className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">신고용대표번호</th>
            <td className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
            <th className="headerCellStyle">신고용휴대전화</th>
            <td className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle"> Email</th>
            <td colSpan="3" className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <div>
        <DetailTitle detailTitle={'인감 정보'}></DetailTitle>
      </div>
      <table className="tableStyle">
        <tbody>
          <tr>
            <th className="headerCellStyle"> 발신명의</th>
            <td colSpan="3" className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="tableStyle2">
        <thead>
          <tr className="headerRowStyle">
            <th className="cellStyle2">법인인감</th>
            <th className="cellStyle2">사용인감</th>
            <th className="cellStyle2">사업장직인</th>
            <th className="cellStyle3">양식로고</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bodyRowStyle">
            <td className="imageCellStyle_Workplace">
              <div className="imageDIV" onMouseEnter={handleMouseEnter}>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    width="70"
                    height="70"
                  />
                ) : (
                  '70x70'
                )}
                {showUploadDiv && (
                  <div className="uploadDiv" onClick={e => e.stopPropagation()}>
                    {/* 30x30 크기의 div를 클릭하면 파일 선택 창이 열립니다 */}
                    <input
                      type="file"
                      accept="image/*"
                      id="imageInput"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                    <img src={clipImage} alt="Clip" onClick={handleClick} />
                  </div>
                )}
              </div>
            </td>
            <td className="imageCellStyle_Workplace">
              <div className="imageDIV">70x70</div>
            </td>
            <td className="imageCellStyle_Workplace">
              <div className="imageDIV">70x70</div>
            </td>
            <td className="imageCellStyle_Workplace">
              <div className="imageDIV2">210x70</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default WorkPlaceInfoWrapper;
