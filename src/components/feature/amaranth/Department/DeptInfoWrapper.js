import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ButtonW, DetailTitle, SelectBox } from '../../../common/Index';
import 'react-datepicker/dist/react-datepicker.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const DeptInfoWrapper = ({
  data,
  openDate,
  setOpenDate,
  closeDate,
  handleOpenDateChange,
  handleCloseDateChange,
}) => {
  return (
    <div className="selectListWrapper">
      <table className="tableStyle">
        <tbody>
          <tr>
            <th className="headerCellStyle">회사</th>
            <td colSpan="3" className="cellStyle">
              마이그레이션테스트회사
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사업장</th>
            <td colSpan="3" className="cellStyle">
              부산지점
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">상위부서</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_NM || '' : ''}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">대내수신여부</th>
            <td colSpan="3" className="cellStyle">
            <select>
                <option value="사용">사용</option>
                <option value="미사용">미사용</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">행정표준코드</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_NM || '' : ''}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">발신인명</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_NM || '' : ''}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서코드</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="reqInputStyle"
                defaultValue={data ? data.div_NM || '' : ''}
                placeholder="부서코드를 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서유형</th>
            <td colSpan="3" className="cellStyle">
              <select>
                <option value="부서">부서</option>
                <option value="팀">팀</option>
                <option value="일시">일시</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서명</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="reqInputStyle"
                defaultValue={data ? data.div_NM || '' : ''}
                placeholder="부서명을 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서약칭</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_NM || '' : ''}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">결재관리자</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_NM || '' : ''}
                placeholder="사용자 이름을 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서관리자</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_NM || '' : ''}
                placeholder="사용자 이름을 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">조직장</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.div_NM || '' : ''}
                placeholder="사용자 이름을 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle" rowSpan="2">
              사업장주소
            </th>
            <td colSpan="3" className="cellStyle">
              <input type="text" className="postInputStyle" />

              <ButtonW data={'우편번호'}></ButtonW>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
            <td className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                placeholder="직접입력"
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사용여부</th>
            <td className="cellStyle">
              <input
                className="radioStyle"
                type="radio"
                name="display"
                value="사용"
              />{' '}
              사용
              <input
                className="radioStyle"
                type="radio"
                name="display"
                value="미사용"
              />{' '}
              미사용
            </td>
            <th className="headerCellStyle">관리부서</th>
            <td className="cellStyle">
              <input
                className="radioStyle"
                type="radio"
                name="display"
                value="표시"
              />{' '}
              신청
              <input
                className="radioStyle"
                type="radio"
                name="display"
                value="미표시"
              />{' '}
              미신청
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">조직도표시</th>
            <td className="cellStyle">
              <input
                className="radioStyle"
                type="radio"
                name="display"
                value="사용"
              />{' '}
              표시
              <input
                className="radioStyle"
                type="radio"
                name="display"
                value="미사용"
              />{' '}
              미표시
            </td>
            <th className="headerCellStyle">정렬</th>
            <td className="cellStyle">
              <input type="text" className="inputStyle" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DeptInfoWrapper;
