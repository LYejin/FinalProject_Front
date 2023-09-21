import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, rows } from './FixedFund-data';
import 'realgrid/dist/realgrid-style.css';
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import { WorkpTextFieldBox } from '../../../../common/Index';

function FixedFundGrid({
  onChangeOpenCash,
  setMarsterGrid,
  DISQ,
  onChangeOpenStrade,
  setGridViewStrade,
  values,
}) {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const [inputValue, setInputValue] = useState(''); // 입력 값 관리를 위한 state
  const realgridElement = useRef(null);

  const queryParams = new URLSearchParams();

  console.log('그럼 잘와야지?', values);

  // 자금과목이 입력되었는지 체크
  // const checkRequireColumn = rowData => {
  //   if (!rowData['CASH_CD']) {
  //     return { CASH_CD: '자금과목코드' };
  //   }
  //   return {};
  // };

  const formatToSimpleDate = dateStr => {
    return dateStr.replace(/-/g, '');
  };

  const formatRowDate = rowData => {
    if (rowData['fr_DT']) {
      rowData['fr_DT'] = formatToSimpleDate(rowData['fr_DT']);
    }
    if (rowData['to_DT']) {
      rowData['to_DT'] = formatToSimpleDate(rowData['to_DT']);
    }
  };

  const rowInsert = rowData => {
    rowData['div_CD'] = values.divCode;
    rowData['disp_SQ'] = DISQ;
    formatRowDate(rowData);
    console.log('Insert 동작/ 지수 : ', DISQ);
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .post('accounting/user/AcashFixManage/insert', rowData)
        .then(response => {
          const stateValue = response.data;
          resolve(stateValue);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };

  const rowUpdate = rowData => {
    rowData['div_CD'] = values.divCode;
    rowData['disp_SQ'] = DISQ;
    formatRowDate(rowData);
    console.log('이게 내 데이터', rowData);
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .put('accounting/user/AcashFixManage/update', rowData)
        .then(response => {
          const stateValue = response.data;
          resolve(stateValue);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };

  // const searchFixedFundData = async () => {
  //   const grid = gridRef.current;
  //   const provider = providerRef.current;
  //   if (!grid || !provider) return;
  //   console.log('함수 실행?');
  //   grid.cancel();
  //   const queryParams = new URLSearchParams();
  //   queryParams.append('DISP_SQ', DISQ);
  //   queryParams.append('DIV_CD', values.divCode);
  //   queryParams.append('TR_CD', values.gtradeCode);
  //   queryParams.append('FTR_CD', values.ftradeCode);
  //   queryParams.append('CASH_CD', values.cashCode);
  //   // queryParams.append('FR_DT1', values.startStart);
  //   // queryParams.append('FR_DT2', values.startEnd);
  //   // queryParams.append('TO_DT1', values.endStart);
  //   // queryParams.append('TO_DT2', values.endEnd);

  //   try {
  //     const response = await authAxiosInstance.get(
  //       `/accounting/user/AcashFixManage/getList?${queryParams.toString()}`
  //     );
  //     console.log('searchFixedFundData : ', response.data);
  //     provider.fillJsonData(response.data, {
  //       fillMode: 'set',
  //     });
  //     let lastRowIndex = provider.getRowCount();
  //     grid.setCurrent({ itemIndex: lastRowIndex });
  //   } catch (error) {
  //     console.error('Error fetching searchFixedFundData :', error);
  //   }
  // };

  useEffect(() => {
    const container = realgridElement.current;
    const provider = new LocalDataProvider(true);
    const grid = new GridView(container);

    grid.setDataSource(provider);
    provider.setFields(fields);
    grid.setColumns(columns);

    //타 컴포넌트에서도 마스터 그리드를 참조(공유) 가능하게 전역 state변수 초기화
    setMarsterGrid(prveData => ({
      ...prveData,
      grid: grid,
      provider: provider,
    }));

    setGridViewStrade(prveData => ({
      ...prveData,
      grid: grid,
      provider: provider,
    }));

    // 행 추가,삽입 옵션을 설정합니다.
    grid.setEditOptions({
      insertable: true, //행 삽입 가능 여부
      deletable: true, //행 삭제 가능 여부
      appendable: true, //행 추가 가능 여부
      commitWhenExitLast: false, //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
      appendWhenExitLast: false, //Tap, Enter키 입력시 행추가 가능
      crossWhenExitLast: true, //Tab이 이나 Enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동할지의 여부
      //displayEmptyEditRow: true, //마지막행에 항상 빈 행을 추가하는 기능
      enterToNextRow: true, //셀 편집 중 Enter 키를 입력하면 편집을 완료하고 다음 행으로 이동할지의 여부
      enterToTab: true, //셀에 데이터 입력 후 다음 셀로 이동하기 여부 기능
      hintOnError: false, //편집 중에 에러가 있는 셀에 마우스가 위치할 때 에러 힌트 툴팁 표시 여부
      skipReadOnly: true, //readOnly, editable로 설정되 있는 컬럼 Enter키 입력시 foucs 스킵하는 기능
      useArrowKeys: true, //방향키로 셀 간 이동 가능 여부 기능
      confirmWhenDelete: true, //삭제여부를 묻는 대화 상자의 호출 여부
      //deleteRowsMessage: '', //삭제 대화 상자에 표시할 메세지 문자 설정 여부;
      //commitByCell: true, //셀 단위 수정 후 commit 설정 여부
      //commitWhenLeave: true, //편집중에 그리드 외부 영역을 클릭하였을때 commit 설정 여부
      commitLevel: 'error',
      displayEmptyEditRow: true, //비어있는 새로운 행을 나타내도록 설정
    });

    //페이지 로딩시 지출 데이터
    grid.showProgress();
    grid.cancel();
    if (values.divCode) {
      const queryParams = new URLSearchParams();
      queryParams.append('DISP_SQ', DISQ);
      queryParams.append('DIV_CD', values.divCode);
      // queryParams.append('DIV_CD', '001');
      queryParams.append('TR_CD', values.gtradeCode);
      queryParams.append('FTR_CD', values.ftradeCode);
      queryParams.append('CASH_CD', values.cashCode);
      queryParams.append('FR_DT1', values.startStart);
      queryParams.append('FR_DT2', values.startEnd);
      queryParams.append('TO_DT1', values.endStart);
      queryParams.append('TO_DT2', values.endEnd);
      authAxiosInstance
        .get(
          `/accounting/user/AcashFixManage/getList?${queryParams.toString()}`
        )
        .then(responseData => {
          grid.closeProgress();
          console.log('드드드드드드 : ', queryParams.toString());
          console.log('이번에가져온것', responseData.data);

          // yyyymmdd의 형태를 yyyy-mm-dd로 변환하는 함수
          const formatDate = dateStr => {
            return `${dateStr.substring(0, 4)}-${dateStr.substring(
              4,
              6
            )}-${dateStr.substring(6, 8)}`;
          };

          // responseData.data의 각 아이템에 대한 변환 수행
          responseData.data.forEach(item => {
            if (item.fr_DT) {
              item.fr_DT = formatDate(item.fr_DT);
            }
            if (item.to_DT) {
              item.to_DT = formatDate(item.to_DT);
            }
          });

          provider.fillJsonData(responseData.data, {
            fillMode: 'set',
          });

          let lastRowIndex = provider.getRowCount();
          grid.setCurrent({ itemIndex: lastRowIndex });
        })
        .catch(error => {
          console.error(error);
        });
    }

    //페이지 로딩시 지출 데이터 수정중
    // const searchFixedFundData = async () => {
    //   console.log('함수 실행?');
    //   grid.cancel();
    //   const queryParams = new URLSearchParams();
    //   queryParams.append('DISP_SQ', DISQ);
    //   queryParams.append('DIV_CD', values.divCode);
    //   queryParams.append('TR_CD', values.gtradeCode);
    //   queryParams.append('FTR_CD', values.ftradeCode);
    //   queryParams.append('CASH_CD', values.cashCode);
    //   // queryParams.append('FR_DT1', values.startStart);
    //   // queryParams.append('FR_DT2', values.startEnd);
    //   // queryParams.append('TO_DT1', values.endStart);
    //   // queryParams.append('TO_DT2', values.endEnd);
    //   grid.showProgress();
    //   try {
    //     const response = await authAxiosInstance.get(
    //       `/accounting/user/AcashFixManage/getList?${queryParams.toString()}`
    //     );
    //     console.log('searchFixedFundData : ', response.data);
    //     provider.fillJsonData(response.data, {
    //       fillMode: 'set',
    //     });
    //     let lastRowIndex = provider.getRowCount();
    //     grid.setCurrent({ itemIndex: lastRowIndex });
    //   } catch (error) {
    //     console.error('Error fetching searchFixedFundData :', error);
    //   }
    // };

    grid.onValidateRow = (grid, itemIndex, dataRow, inserting, values) => {
      const error = {};
      console.log('이게뭘까?', values);
      if (values.sq_NB && values.cash_CD) {
        // sq_NB 값과 CASH_CD 값 모두 있는 경우
        rowUpdate(grid.getValues(itemIndex));
        console.log('rowUpdate 실행');
      } else if (values.cash_CD) {
        // CASH_CD 값이 있는 경우
        rowInsert(grid.getValues(itemIndex));
        console.log('왜신남?');
        grid.editOptions.appendable = true;
        grid.editOptions.commitWhenExitLast = true; //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
        grid.editOptions.appendWhenExitLast = true; //Tap, Enter키 입력시 행추가 가능
        grid.beginAppendRow();
      } else {
        error.level = 'error';
        error.message = '[자금과목코드] 반드시 입력해 주십시요.';
        grid.setCurrent({ itemIndex: itemIndex, column: 'CASH_CD' });
      }

      return error;
    };

    //버튼을 눌렀을 때, 코드 피커 창 띄우기
    grid.onCellButtonClicked = (grid, index, column) => {
      if (column.name === 'cash_CD') {
        //자금과목 선택
        onChangeOpenCash();
      } else if (column.name === 'TR_CD') {
        //일반거래처 선택
        onChangeOpenStrade(1);
      } else if (column.name === 'FTR_CD') {
        //금융거래처 선택
        onChangeOpenStrade(3);
      }
    };

    // 그리드의 상태 바를 숨깁니다.
    grid.setStateBar({ visible: false });

    //컬럼 너비 자동 조절 설정
    grid.setDisplayOptions({ fitStyle: 'evenFill' });

    setDataProvider(provider);
    setGridView(grid);

    return () => {
      grid.cancel();
      provider.clearRows();
      grid.destroy();
      provider.destroy();
    };
  }, [DISQ, values]);

  return (
    <div>
      <div
        ref={realgridElement}
        style={{ height: '600px', width: '100%', margin: '0 auto' }}
      ></div>
    </div>
  );
}

export default FixedFundGrid;
