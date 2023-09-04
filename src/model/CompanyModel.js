import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import axios from '../../node_modules/axios/index';
import { getNowJoinTime } from '../util/time';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../cookie/Cookie';
import { authAxiosInstance } from '../axios/axiosInstance';

const CompanyModel = () => {
  const [formData, formDataSet] = useState();
  const [listData, listDataSet] = useState();
  const [ch_listData, ch_listDataSet] = useState(0);
  const [listCount, listCountSet] = useState(0);
  const [searchData, SearchDataSet] = useState();
  const reSetData = useRef({
    acct_FG: '일반 의료기관',
    business: '',
    ceo_NM: '',
    ceo_TEL: '',
    close_DT: '',
    co_CD: '',
    co_FG: '개인',
    co_NB: '',
    co_NM: '',
    co_NMK: '',
    est_DT: getNowJoinTime(new Date()),
    ho_ADDR: '',
    ho_ADDR1: '',
    ho_FAX: '',
    ho_ZIP: '',
    jongmok: '',
    open_DT: '',
    pic_FILE_ID: '',
    ppl_NB: '',
    reg_NB: '',
    use_YN: '1',
  });

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

  const searchCompanyOnClick = async () => {
    const s_formData = new FormData();
    for (const key in searchData) {
      s_formData.append(key, searchData[key]);
    }

    console.log('adivndnkvskndvknsdvnklsd', searchData);
    try {
      const response = await authAxiosInstance.post(
        'system/admin/groupManage/CompanySelect',
        s_formData,
        { 'Content-Type': 'multipart/form-data' }
      );
      const first_formData = await authAxiosInstance(
        'system/admin/groupManage/CompanyDetail/' + response.data[0].co_CD
      );

      if (response.data) {
        listDataSet(response.data);
        formDataSet(first_formData.data);
        listCountSet(response.data.length);
        console.log('검색된 데이터', response.data);
      }
    } catch (error) {
      if (error !== '') {
        listDataSet();
        formDataSet(reSetData.current);
        listCountSet(0);
      }
    }
  };
  const print = useCallback(() => {
    console.log('모델', formData);
  }, [formData]);

  return {
    formData,
    formDataSet,
    ch_listData,
    ch_listDataSet,
    listData,
    listDataSet,
    listCount,
    listCountSet,
    searchData,
    SearchDataSet,
    searchCompanyOnClick,
    reSetData,
  };
};

export default CompanyModel;
