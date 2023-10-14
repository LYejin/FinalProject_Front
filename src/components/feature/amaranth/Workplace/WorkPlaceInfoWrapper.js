import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  ButtonW,
  DetailTitle,
  InfoInput,
  SelectBox,
} from '../../../common/Index';
import 'react-datepicker/dist/react-datepicker.css';
import clipImage from './clipBtn.png';
import delImage from './deleteBtn.png';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
  selectedImage,
  isImageUploaded,
  deleteImage,
  showUploadDiv,
  handleImageChange,
  handleClick,
  setShowUploadDiv,
  register,
  errors,
  selectedCompany,
  setSelectedCompany,
}) => {
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

  const handleMouseEnter = () => {
    if (!selectedImage) {
      setShowUploadDiv(true);
    }
  };

  return (
    <div className="selectListWrapper">
      <table className="tableStyle">
        <tbody>
          <tr>
            <th className="headerCellStyle2">회사선택</th>
            <td className="cellStyle">
              {data.isAdding ? (
                <Select
                  className="selectListStyle"
                  id="companySelect"
                  value={selectedCompany}
                  onChange={handleCompanyChange}
                  sx={{
                    height: '28px',
                    fontSize: '0.8rem',
                    width: '250px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #CCC',
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 250,
                        width: '250px',
                      },
                    },
                  }}
                >
                  <MenuItem
                    value=""
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      borderBottom: '1px solid #CCC',
                    }}
                  >
                    <em>전체</em>
                  </MenuItem>
                  {companyData.map(company => (
                    <MenuItem
                      key={company.value}
                      value={company.value}
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #CCC',
                      }}
                    >
                      {company.value} | {company.label}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                data.co_NM || ''
              )}
            </td>
            {/* <th className="headerCellStyle">본점여부</th>
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
            </td> */}
            <th className="headerCellStyle">사용여부</th>
            <td className="cellStyle">
              <input
                className="radioStyle"
                type="radio"
                name="status"
                value="1"
                // ref={inputRefs.divYNRef}
                checked={data.div_YN === '1'}
                readOnly
              />{' '}
              사용
              <input
                className="radioStyle"
                type="radio"
                name="status"
                value="0"
                // ref={inputRefs.divYNRef}
                checked={data.div_YN === '0'}
                readOnly
              />{' '}
              미사용
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle2">사업장코드</th>
            <td colSpan="3" className="cellStyle">
              {data.isAdding ? (
                <InfoInput
                  type="number"
                  defaultValue={data ? data.div_CD || '' : ''}
                  placeholder="사업장 코드를 입력해주세요."
                  register={register('div_CD', {
                    required: '사업장 코드를 입력해주세요.',
                  })}
                  errors={errors}
                  maxLength={20}
                  name="div_CD"
                />
              ) : data ? (
                data.div_CD || ''
              ) : (
                ''
              )}
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사업장명</th>
            <td colSpan="3" className="cellStyle">
              <InfoInput
                valid={'text'}
                defaultValue={data ? data.div_NM || '' : ''}
                placeholder="사업장명을 입력해주세요."
                register={register('div_NM', {
                  required: '사업장명을 입력해주세요.',
                })}
                errors={errors}
                maxLength={20}
                name="div_NM"
              />
            </td>
          </tr>

          <tr>
            <th className="headerCellStyle">사업장 약칭</th>
            <td colSpan="3" className="cellStyle">
              <InfoInput
                name="div_NMK"
                defaultValue={data ? data.div_NMK || '' : ''}
                register={register('div_NMK')}
                maxLength={10}
              />
            </td>
            {/* <th className="headerCellStyle">조작도표시</th>
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
            </td> */}
          </tr>
          <tr>
            <th className="headerCellStyle">업태</th>
            <td className="cellStyle">
              <InfoInput
                name="business"
                defaultValue={data ? data.business || '' : ''}
                register={register('business')}
                maxLength={10}
              />
            </td>
            <th className="headerCellStyle">종목</th>
            <td className="cellStyle">
              <InfoInput
                name="jongmok"
                defaultValue={data ? data.jongmok || '' : ''}
                register={register('jongmok')}
                maxLength={10}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">대표전화</th>
            <td className="cellStyle">
              <InfoInput
                name="div_TEL"
                defaultValue={data ? data.div_TEL || '' : ''}
                register={register('div_TEL')}
                maxLength={10}
              />
            </td>
            <th className="headerCellStyle">대표팩스</th>
            <td className="cellStyle">
              <InfoInput
                name="div_FAX"
                defaultValue={data ? data.div_FAX || '' : ''}
                register={register('div_FAX')}
                maxLength={10}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사업자번호</th>
            <td className="cellStyle">
              <InfoInput
                name="reg_NB"
                defaultValue={data ? data.reg_NB || '' : ''}
                register={register('reg_NB')}
                maxLength={10}
              />
            </td>
            <th className="headerCellStyle">법인번호</th>
            <td className="cellStyle">
              <InfoInput
                name="cop_NB"
                defaultValue={data ? data.cop_NB || '' : ''}
                register={register('cop_NB')}
                maxLength={10}
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
            <td colSpan="3" className="cellStyle">
              <InfoInput
                name="mas_NM"
                defaultValue={data ? data.mas_NM || '' : ''}
                register={register('mas_NM')}
                maxLength={10}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle" rowSpan="2">
              사업장주소
            </th>
            <td colSpan="3" className="cellStyle">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <InfoInput
                  register={register('addr_CD')}
                  defaultValue={address ? address : data.addr_CD}
                  style={{ width: '150px' }}
                  maxLength={5}
                  name="addr_CD"
                />
                <ButtonW
                  data={'우편번호'}
                  onClickEvent={onChangeOpenPost}
                ></ButtonW>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="cellStyle">
              <input
                type="text"
                className={`reqInputStyle ${divADDRError ? 'inputError' : ''}`}
                defaultValue={addressDetail ? addressDetail : data.div_ADDR}
                key={addressDetail ? addressDetail : data.div_ADDR}
              />
            </td>

            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                placeholder="직접입력"
                defaultValue={addressDetail ? '' : data.addr_NUM}
                key={addressDetail ? '' : data.addr_NUM}
              />
            </td>
          </tr>

          {/* <tr>
            <th className="headerCellStyle">정렬</th>

            { <th className="headerCellStyle">
              <div className="tooltip">
                정렬
                <span className="tooltiptext">말풍선 텍스트</span>
              </div>
            </th> 
            <td colSpan="3" className="cellStyle">
              <input type="text" className="inputStyle" disabled />
            </td>
          </tr> */}
        </tbody>
      </table>
      <br></br>
      {/* <div>
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
      {/*<input
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
      </table> */}
      <div>
        <DetailTitle detailTitle={'인감 정보'}></DetailTitle>
      </div>
      {/* <table className="tableStyle">
        <tbody>
          <tr>
            <th className="headerCellStyle"> 발신명의</th>
            <td colSpan="3" className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
          </tr>
        </tbody>
      </table>
      <br /> */}
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
                  <>
                    <img
                      src={selectedImage}
                      alt="Selected"
                      width="70"
                      height="70"
                    />
                    {isImageUploaded ? (
                      <div className="deleteButton" onClick={deleteImage}>
                        <img src={delImage} alt="Delete" />
                      </div>
                    ) : null}
                  </>
                ) : (
                  '70x70'
                )}
                {showUploadDiv && (
                  <div className="uploadDiv" onClick={e => e.stopPropagation()}>
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
