import React, { useState } from 'react';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const FundTypeModel = () => {
  const [CASH_CD, setCASH_CD] = useState();
  const [checkList, setCheckList] = useState([]); //체크된 행들의 CASH_CD 데이터
  const [marsterGrid, setMarsterGrid] = useState();
  const uppercase = lodaData => {
    return lodaData.map(obj => {
      const upperObj = {};
      for (const key in obj) {
        const uppercaseKey = key.toUpperCase();
        upperObj[uppercaseKey] = obj[key];
      }

      return upperObj;
    });
  };

  //DB서버 행 데이터 요청 실행 로직
  const loadRowData = searchData => {
    return new Promise((resolve, reject) => {
      authAxiosInstance('/accounting/user/fundType/searchRow', searchData, {
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          const upper_lodaData = uppercase(response.data);
          //console.log('로드?', upper_lodaData);
          resolve(upper_lodaData);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };

  const deleteBtnClick = () => {
    if (window.confirm('선택된 행(들)을 삭제하시겠습니까??') === true) {
      console.log('체크리스트', checkList);
      return new Promise((resolve, reject) => {
        authAxiosInstance
          .delete('/accounting/user/fundType/fundTypeDelete', {
            data: checkList,
          })
          .then(response => {
            setCheckList([]); //삭제 완료시 데이터 초기화
            //체크된 행 가져오기
            const rows = marsterGrid.grid.getCheckedRows();
            //행 삭제하기
            marsterGrid.provider.removeRows(rows);
            //체크 해제하기
            marsterGrid.grid.checkRows(rows, false);
            resolve(response);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
    }
  };

  return {
    loadRowData,
    CASH_CD,
    setCASH_CD,
    marsterGrid,
    setMarsterGrid,
    checkList,
    setCheckList,
    deleteBtnClick,
  };
};

export default FundTypeModel;
