import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../../../../node_modules/axios/index';
import './CompanyInputBox.css';

const CompanyNameSelect = ({
  searchCompanyData,
  setSearchCompanyData,
  onComplete,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setFocus,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({ mode: 'onChange', shouldFocusError: true });

  const searchOption = ['회사명', '법인번호', '사업자번호'];
  const searchNum = ['3', '2', '1'];
  const [companyData, setCompanyData] = useState([]);

  const headerOnSubmit = async data => {
    const { key, q, gb, status, ceo, area } = data;
    const listData = [];
    console.log(data);
    // 쿼리스트링 생성
    let queryString = `?key=${encodeURIComponent(key)}&q=${encodeURIComponent(
      q
    )}&gb=${encodeURIComponent(gb)}&status=${encodeURIComponent(status)}`;

    if (data?.ceo) {
      // 사업자번호 검색일 경우
      queryString += `&ceo=${encodeURIComponent(ceo)}`;
    } else if (data?.area) {
      // 법인번호 검색일 경우
      queryString += `&area=${encodeURIComponent(area)}`;
    }

    try {
      // Axios를 사용하여 GET 요청 보내기

      const response = await axios.get(
        `https://bizno.net/api/fapi/${queryString}&type=json`
      );

      // 응답 데이터 처리
      console.log(response.data);
      response.data.items.forEach(item => {
        if (item.bsttcd === '01') {
          listData.push(item);
        } else if (item.bsttcd === '') {
          listData.push(item);
        }
      });
      console.log('사업중', listData);
      setCompanyData(listData);
    } catch (error) {
      // 에러 처리
      console.error('에러:', error);
    }
  };
  const headerOnClick = item => {
    console.log('클릭', item);
    //setSearchCompanyData(item);
    onComplete(item);
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(headerOnSubmit)}>
        <div>
          <label className="small-label">[검색유형]</label>
          <select name="gb" {...register('gb')}>
            {searchOption.map((option, index) => (
              <option key={index} value={searchNum[index]}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="q"
            {...register('q')}
            className="small-input"
          />
          <label className="small-label">[대표자명]</label>
          <input
            type="text"
            name="ceo"
            {...register('ceo')}
            className="small-input"
          />
          <label className="small-label">[지역명]</label>
          <input
            type="text"
            name="area"
            {...register('area')}
            className="small-input"
          />

          <input
            type="hidden"
            name="status"
            value="Y"
            {...register('status')}
          />
          <input
            type="hidden"
            name="key"
            value="YXdkcmd5amlsMTk5QG5hdmVyLmNvbSAg"
            {...register('key')}
          />
          <input type="submit" value="검색" />
        </div>
      </form>

      <div id="sectionG01" class="section section-grid">
        <div class="section-header">
          <div class="right"></div>
        </div>
        <div class="section-body">
          <table id="tableG01" class="table table-striped table-hover">
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className="bordered-th">회사명</th>
                <th className="bordered-th">사업자번호</th>
                <th className="bordered-th">법인번호</th>
              </tr>
            </thead>
            <tbody>
              {companyData.map((item, index) => (
                <tr key={index} onDoubleClick={() => headerOnClick(item)}>
                  <td align="center" width="50">
                    {item.company}
                  </td>
                  <td align="center" width="50">
                    {item.bno}
                  </td>
                  <td align="center" width="50">
                    {item.cno}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="text-center">
            <div class="meta-pagination"></div>
          </div>
        </div>
        <div class="section-footer">
          <div class="left"></div>
          <div class="right"></div>
          <div class="center"></div>
        </div>
      </div>
    </div>
  );
};

export default CompanyNameSelect;
