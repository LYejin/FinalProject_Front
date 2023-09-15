import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  ButtonW,
  DeptSelectBox,
  DetailTitle,
  SelectBox,
  UseSelectBox,
} from '../../../common/Index';
import 'react-datepicker/dist/react-datepicker.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EventButton from '../../../common/button/EventButton';

const DeptInfoWrapper = ({
  data,
  openDate,
  setOpenDate,
  closeDate,
  handleOpenDateChange,
  handleCloseDateChange,
  register,
}) => {
  console.log('데이터', data);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedDeptCT, setSelectedDeptCT] = useState('');

  // data가 변경될 때마다 선택된 값을 업데이트
  useEffect(() => {
    if (data && (data.call_YN === '1' || data.call_YN === '0')) {
      setSelectedValue(data.call_YN);
    } else {
      setSelectedValue(''); // 기본값으로 설정
    }
  }, [data]);

  return (
    <div className="selectListWrapper">
      <table className="tableStyle">
        <tbody>
          <tr>
            <th className="headerCellStyle">회사</th>
            <td colSpan="3" className="cellStyle">
              {data.co_NM}
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">사업장</th>
            <td colSpan="3" className="cellStyle">
              {data.div_NM}
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">상위부서</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                placeholder="-"
                defaultValue={data ? data.mdept_CD || '' : ''}
                {...register('mdept_CD')}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">대내수신여부</th>
            <td colSpan="3" className="cellStyle">
              <select
                className="deptSelectStyle"
                value={selectedValue}
                onChange={e => setSelectedValue(e.target.value)}
              >
                <option value="" disabled hidden>
                  선택하세요
                </option>
                <option value="1">사용</option>
                <option value="0">미사용</option>
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
                defaultValue={data ? data.call_NM || '' : ''}
                {...register('call_NM')}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서코드</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="reqInputStyle"
                defaultValue={data ? data.dept_CD || '' : ''}
                placeholder="부서코드를 입력해주세요."
                {...register('dept_CD')}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서유형</th>
            <td colSpan="3" className="cellStyle">
              <select
                className="deptSelectStyle"
                value={selectedDeptCT}
                onChange={e => setSelectedDeptCT(e.target.value)}
                {...register('dept_CT')}
              >
                <option value="" disabled hidden>
                  선택하세요
                </option>
                <option value="2">부서</option>
                <option value="1">팀</option>
                <option value="0">임시</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서명</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="reqInputStyle"
                defaultValue={data ? data.dept_NM || '' : ''}
                placeholder="부서명을 입력해주세요."
                {...register('dept_NM')}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서약칭</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.dept_NMK || '' : ''}
                {...register('dept_NMK')}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">결재관리자</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.appr_NM || '' : ''}
                placeholder="사용자 이름을 입력해주세요."
                {...register('appr_NM')}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">부서관리자</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.mgr_NM || '' : ''}
                placeholder="사용자 이름을 입력해주세요."
                {...register('mgr_NM')}
              />
            </td>
          </tr>
          <tr>
            <th className="headerCellStyle">조직장</th>
            <td colSpan="3" className="cellStyle">
              <input
                type="text"
                className="inputStyle"
                defaultValue={data ? data.mgr_NM || '' : ''}
                placeholder="사용자 이름을 입력해주세요."
              />
            </td>
          </tr>

          <tr>
            <th className="headerCellStyle" rowSpan="2">
              주소
            </th>
            <td colSpan="3" className="cellEmpAddrStyle">
              <input
                type="text"
                className="addressInputStyle"
                name="zipcode"
                {...register('zipcode')}
              />
              <EventButton data={'우편번호'}></EventButton>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="cellStyle">
              <input
                type="text"
                className="addrNum"
                name="addr"
                {...register('addr')}
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
