import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ButtonW, DetailTitle, SelectBox } from "../../common/Index";
import "react-datepicker/dist/react-datepicker.css";

const WorkPlaceInfoWrapper = () => {
  const selectListWrapper = {
    position: "relative",
    width: "100%",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    borderTop: "2px solid darkgray",
  };

  const headerCellStyle = {
    backgroundColor: "#fafafa",
    padding: "10px",
    fontWeight: "bold",
    borderBottom: "1px solid #ccc",
    textAlign: "right",
    verticalAlign: "middle",
    fontSize: "13px",
    width: "180px",
  };

  const cellStyle = {
    padding: "7px",
    borderBottom: "1px solid #ccc",
    verticalAlign: "middle",
    fontSize: "13px",
  };

  const radioStyle = {
    marginLeft: "10px",
    color: "blue",
    verticalAlign: "middle",
  };

  const inputStyle = {
    width: "100%",
    height: "26px",
    border: "1px solid #ccc",
  };

  const reqInputStyle = {
    width: "100%",
    height: "26px",
    border: "1px solid #ccc",
    background: "#fef4f4",
  };

  const tableStyle2 = {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
  };

  const headerRowStyle = {
    backgroundColor: "#F0F0F0",
    color: "black",
    fontSize: "13px",
    fontWeight: "bold",
    verticalAlign: "middle",
  };

  const cellStyle2 = {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "center",
    verticalAlign: "middle",
    width: "180px",
  };

  const cellStyle3 = {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const imageCellStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    height: "120px",
    alignItems: "center",
    justifyContent: "center",
  };

  const [openDate, setOpenDate] = useState(null); // 개업일 선택 상태 관리
  const [closeDate, setCloseDate] = useState(null); // 폐업일 선택 상태 관리

  // 개업일 선택 시 처리 함수
  const handleOpenDateChange = (date) => {
    setOpenDate(date);
  };

  // 폐업일 선택 시 처리 함수
  const handleCloseDateChange = (date) => {
    setCloseDate(date);
  };

  return (
    <div style={selectListWrapper}>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={headerCellStyle}>회사선택</th>
            <td style={cellStyle}>*솔루션사업부문*</td>
            <th style={headerCellStyle}>본점여부</th>
            <td style={cellStyle}>
              <input
                style={radioStyle}
                type="radio"
                name="location"
                value="본점"
              />{" "}
              본점
              <input
                style={radioStyle}
                type="radio"
                name="location"
                value="지점"
              />{" "}
              지점
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>사업장코드</th>
            <td style={cellStyle}>0599</td>
            <th style={headerCellStyle}>사용여부</th>
            <td style={cellStyle}>
              <input
                style={radioStyle}
                type="radio"
                name="status"
                value="사용"
              />{" "}
              사용
              <input
                style={radioStyle}
                type="radio"
                name="status"
                value="미사용"
              />{" "}
              미사용
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>사업장명</th>
            <td colSpan="3" style={cellStyle}>
              <input type="text" style={reqInputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>사업장 약칭</th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
            <th style={headerCellStyle}>조작도표시</th>
            <td style={cellStyle}>
              <input
                style={radioStyle}
                type="radio"
                name="display"
                value="표시"
              />{" "}
              표시
              <input
                style={radioStyle}
                type="radio"
                name="display"
                value="미표시"
              />{" "}
              미표시
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>업태</th>
            <td style={cellStyle}>
              <input type="text" style={reqInputStyle} />
            </td>
            <th style={headerCellStyle}>종목</th>
            <td style={cellStyle}>
              <input type="text" style={reqInputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>대표전화</th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
            <th style={headerCellStyle}>대표팩스</th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>사업자번호</th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
            <th style={headerCellStyle}>법인번호</th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>개업일</th>
            <td style={cellStyle}>
              <DatePicker
                selected={openDate}
                onChange={handleOpenDateChange}
                dateFormat="yyyy-MM-dd"
                style={{ width: "100%", border: "1px solid #ccc" }}
              />
            </td>
            <th style={headerCellStyle}>폐업일</th>
            <td style={cellStyle}>
              <DatePicker
                selected={closeDate}
                onChange={handleCloseDateChange}
                dateFormat="yyyy-MM-dd"
              />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>대표자명</th>
            <td style={cellStyle}>
              <input type="text" style={reqInputStyle} />
            </td>
            <th style={headerCellStyle}>관할세무서</th>
            <td style={cellStyle}>
              <input type="text" style={reqInputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle} rowSpan="2">
              사업장주소
            </th>
            <td colSpan="3" style={cellStyle}>
              <input
                type="text"
                style={{
                  border: "1px solid #ccc",
                  height: "26px",
                  background: "#fef4f4",
                }}
              />
              <ButtonW data={"우편번호"}></ButtonW>
            </td>
          </tr>
          {/* <tr style={{borderTop: "3px solid whihe"}}> */}
          <tr>
            <td colSpan="2" style={cellStyle}>
              <input type="text" style={reqInputStyle} />
            </td>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>정렬</th>
            <td colSpan="3" style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div>
        <DetailTitle detailTitle={"신고 관련 정보"}></DetailTitle>
      </div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={headerCellStyle}> 주업종코드</th>
            <td colSpan="3" style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>
              지방세신고지
              <br />
              (행정동)
            </th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
            <th style={headerCellStyle}>
              지방세신고지
              <br />
              (법정동)
            </th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>전자신고ID</th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
            <th style={headerCellStyle}>주류코드</th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle} rowSpan="2">
              전자신고용주소
            </th>
            <td colSpan="3" style={cellStyle}>
              <input
                type="text"
                style={{
                  border: "1px solid #ccc",
                  height: "26px",
                  width: "120px",
                }}
              />
              <ButtonW data={"우편번호"}></ButtonW>
              <SelectBox style={{ verticalAlign: "middle" }} />
              <input
                type="text"
                style={{
                  border: "1px solid #ccc",
                  height: "26px",
                  width: "120px",
                  marginLeft: "10px",
                }}
              />
              <input
                type="text"
                style={{
                  border: "1px solid #ccc",
                  height: "26px",
                  width: "120px",
                  marginLeft: "10px",
                }}
              />
              <input
                type="text"
                style={{
                  border: "1px solid #ccc",
                  height: "26px",
                  width: "120px",
                  marginLeft: "10px",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}>신고용대표번호</th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
            <th style={headerCellStyle}>신고용휴대전화</th>
            <td style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
          <tr>
            <th style={headerCellStyle}> Email</th>
            <td colSpan="3" style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <div>
        <DetailTitle detailTitle={"인감 정보"}></DetailTitle>
      </div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={headerCellStyle}> 발신명의</th>
            <td colSpan="3" style={cellStyle}>
              <input type="text" style={inputStyle} />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table style={tableStyle2}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={cellStyle2}>법인인감</th>
            <th style={cellStyle2}>사용인감</th>
            <th style={cellStyle2}>사업장직인</th>
            <th style={cellStyle3}>양식로고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={imageCellStyle}>
              <img src="your_image_url_here" alt="Image 1" />
            </td>
            <td style={imageCellStyle}>
              <img src="your_image_url_here" alt="Image 2" />
            </td>
            <td style={imageCellStyle}>
              <img src="your_image_url_here" alt="Image 3" />
            </td>
            <td style={imageCellStyle}>
              <img src="your_image_url_here" alt="Image 4" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WorkPlaceInfoWrapper;
