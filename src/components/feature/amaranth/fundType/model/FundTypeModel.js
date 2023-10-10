import React, { useState } from 'react';
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import JSZip from 'jszip';
import * as XLSX from 'xlsx';
const FundTypeModel = () => {
  const [CASH_CD, setCASH_CD] = useState();
  const [LEVEL_CD, setLEVEL_CD] = useState();
  const [inputData, setInputData] = useState();
  const [checkList, setCheckList] = useState([]); //체크된 행들의 CASH_CD 데이터
  const [reqCASH_CD, setreqCASH_CD] = useState(false);
  const [marsterGrid, setMarsterGrid] = useState();
  const [searchGrid, setSearchGrid] = useState();
  const [menuGrid, setMenuGrid] = useState();

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

  const highFundsList = checkData => {
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .post('accounting/user/fundType/highFundsList', checkData)
        .then(response => {
          const highFundsList = response.data;
          console.log('상위자금', highFundsList);
          resolve(highFundsList);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };

  //DB서버 행 데이터 요청 실행 로직
  const loadRowData = searchData => {
    const sendData = searchData ? searchData : { CO_CD: '' };
    console.log('서치서브밋', sendData);
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .post('accounting/user/fundType/searchRow', sendData)
        .then(response => {
          const upper_lodaData = uppercase(response.data);
          console.log('로드?', upper_lodaData);
          resolve(upper_lodaData);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };

  const deleteBtnClick = checkData => {
    console.log('삭제검사', checkData, checkList);
    if (checkData !== undefined) {
      return new Promise((resolve, reject) => {
        authAxiosInstance
          .delete('/accounting/user/fundType/fundTypeDelete', {
            data: checkData,
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
    } else {
      const checkLowNumber = checkList.length;
      if (checkLowNumber !== 0) {
        if (
          window.confirm(
            '선택된 ' + checkLowNumber + '개의 행(들)을 삭제하시겠습니까??'
          ) === true
        ) {
          highFundsList(checkList)
            .then(highFundsData => {
              console.log('체크된<비동기>(없음)', highFundsData);
              if (highFundsData === '') {
                return new Promise((resolve, reject) => {
                  authAxiosInstance
                    .delete('/accounting/user/fundType/fundTypeDelete', {
                      data: checkList,
                    })
                    .then(response => {
                      setCheckList([]); // 삭제 완료시 데이터 초기화
                      // 체크된 행 가져오기
                      marsterGrid.grid.cancel();
                      const rows = marsterGrid.grid.getCheckedRows();
                      // 행 삭제하기
                      marsterGrid.provider.removeRows(rows);
                      // 체크 해제하기
                      marsterGrid.grid.checkRows(rows, false);

                      resolve(response);
                    })
                    .catch(error => {
                      console.error(error);
                      reject(error);
                    });
                });
              } else {
                console.log('체크된<비동기>(있음)', highFundsData);
                alert(
                  '[' +
                    highFundsData +
                    ']은 상위자금과목으로 설정되어 있어 삭제할 수 없습니다.'
                );
              }
            })
            .catch(error => {
              // highFundsList()가 실패한 경우 처리
              console.error(error);
            });
        }
      }
    }
  };

  //DB서버 트리자금과목 데이터 요청 실행 로직
  const loadTreeRowData = checkData => {
    return new Promise((resolve, reject) => {
      authAxiosInstance('accounting/user/fundType/fundTypeTreeList')
        .then(response => {
          const upper_lodaData = uppercase(response.data);
          console.log('로드?', upper_lodaData);
          resolve(upper_lodaData);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };

  //그리드 데이터를 엑셀문서화 시켜주는 함수
  const excelExport = (targetgrid, fileName) => {
    console.log('엑셀화', targetgrid);
    window.JSZip = window.JSZip || JSZip;
    targetgrid.exportGrid({
      type: 'excel',
      target: 'local',
      fileName: fileName + '.xlsx',
      progressMessage: '엑셀 Export중입니다.',
      header: true,
      compatibility: true,
      //hideColumns: ['CASH_CD'],
      //onlyCheckedItems: true,
      //hideChildHeaders: true,
      //items: ['CASH_CD', 'CASH_NM'],
      done: function () {
        //내보내기 완료 후 실행되는 함수
      },
    });
  };

  const fixdata = data => {
    var o = '',
      l = 0,
      w = 10240;
    for (; l < data.byteLength / w; ++l)
      o += String.fromCharCode.apply(
        null,
        new Uint8Array(data.slice(l * w, l * w + w))
      );
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  };

  const excelImport = e => {
    menuGrid.grid.cancel();
    // marsterGrid.provider.clearRows();
    // menuGrid.grid.resetCurrent();
    // menuGrid.grid.cancel();

    var files = e.target.files;
    var i, f;
    for (i = 0, f = files[i]; i != files.length; ++i) {
      const reader = new FileReader();
      const name = f.name;
      reader.onload = e => {
        var data = e.target.result;

        let workbook = XLSX.read(data, { type: 'binary' });
        var arr = fixdata(data);
        workbook = XLSX.read(btoa(arr), {
          type: 'base64',
          cellText: true,
          cellDates: true,
        });

        process_wb(workbook);
        /* DO SOMETHING WITH workbook HERE */
      };
      //reader.readAsBinaryString(f);
      reader.readAsArrayBuffer(f);
    }
  };

  const process_wb = wb => {
    let output = '';
    output = to_json(wb);
    const sheetNames = Object.keys(output);

    if (sheetNames.length > 0) {
      var colsObj = output[sheetNames][0];

      if (colsObj) {
        const data = output[sheetNames];
        console.log(
          '엑셀',
          sheetNames,
          data,
          marsterGrid.provider.getRowCount()
        );
        let mappedData = data.map(item => {
          return {
            CASH_FG: item.수지구분,
            LEVEL_CD: item.LEVEL,
            CASH_CD: item.자금과목, //이거 빼면 됨
            CASH_NM: item.__EMPTY,
            TYPE_NM: item.용도,
            SUM_CD: item.상위자금과목,
            SUM_NM: item.__EMPTY_1,
            LOW_YN: item.최하위여부,
            USE_YN: item.사용여부,
            DISP_SQ: item.정렬구분,
          };
        });

        mappedData = mappedData.filter(item => columnUndefinedCount(item));
        marsterGrid.provider.fillJsonData(mappedData, {
          start: 0,
          count: -1,
          fillMode: 'append',
        });
        console.log('불러오기', mappedData);
      }
    }
  };

  const to_json = workbook => {
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
      var roa = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheetName],
        { rawNumbers: true }
      );

      if (roa.length > 0) {
        result[sheetName] = roa;
      }
    });
    return result;
  };

  const columnUndefinedCount = lowData => {
    let undefinedCount = 0;

    for (const key in lowData) {
      if (lowData.hasOwnProperty(key) && lowData[key] === undefined) {
        undefinedCount++;
      }
    }

    return undefinedCount >= 10 ? false : true;
  };

  return {
    loadRowData,
    CASH_CD,
    setCASH_CD,
    marsterGrid,
    setMarsterGrid,
    searchGrid,
    setSearchGrid,
    checkList,
    setCheckList,
    deleteBtnClick,
    excelExport,
    excelImport,
    setMenuGrid,
    inputData,
    setInputData,
    loadTreeRowData,
    LEVEL_CD,
    setLEVEL_CD,
    reqCASH_CD,
    setreqCASH_CD,
    highFundsList,
  };
};

export default FundTypeModel;
