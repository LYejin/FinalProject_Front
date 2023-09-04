import React, { useRef, useState } from 'react';
import axios from '../../../../node_modules/axios/index';
import CompanyBoxItem from './CompanyBoxItem';
import { authAxiosInstance } from '../../../axios/axiosInstance';

const CompanySelectListWrapper = ({
  width,
  title,
  dataCount,
  data,
  formData,
  formDataSet,
  ch_listData,
  listData,
  listDataSet,
  listCountSet,
  searchCompanyOnClick,
  reSetData,
}) => {
  const selectListWrapper = {
    position: 'relative',
    width: width,
    height: '100%',
    border: '1px solid #ebebeb',
  };

  const asyncRequest = async (url, methodType, data, headers) => {
    const cookies = document.cookie;
    const token = cookies.split('=')[1];
    try {
      const response = await axios({
        method: methodType,
        url: url,
        data: data,
        withCredentials: true,
        headers: { Authorization: token },
      });
      console.log(response.data);

      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  const clickEmp = async (co_CD, focusElement) => {
    const empData = '';
    try {
      const empData = await authAxiosInstance(
        'system/admin/groupManage/CompanyDetail/' + co_CD
      );
      formDataSet(empData.data);
      console.log('상세:', empData.data);
      console.log('상세 포커스:', focusElement.current);
    } catch (error) {
      console.error(error);
    }
    return empData;
  };

  const clickAddBtn = () => {
    console.log('안녕'.formData);

    formDataSet(prevFormData => ({
      ...prevFormData,
      ...reSetData.current,
    }));
  };
  React.useEffect(() => {
    searchCompanyOnClick();
  }, [ch_listData]);

  return (
    <div style={selectListWrapper}>
      <div className="listBoxHeader">
        <span className="listBoxtitle">{title}</span>
        <span className="listBoxDataCount">{dataCount}</span>건
        <span className="listBoxSort">정렬순</span>
      </div>
      <div className="listWrapper">
        {listData &&
          listData.map(data => (
            <CompanyBoxItem
              clickEmp={clickEmp}
              key={data.co_CD}
              leftTop={data.co_CD}
              rightBotton={data.co_FG}
              rightTop={data.co_NM}
              leftBottom={data.ceo_NM}
            />
          ))}
      </div>
      <div className="footerBox" onClick={clickAddBtn}>
        <i class="fa-solid fa-circle-plus"></i>추가
      </div>
    </div>
  );
};

export default CompanySelectListWrapper;
