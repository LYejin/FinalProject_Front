import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, rows } from './FixedFund-data';
import 'realgrid/dist/realgrid-style.css';
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import { WorkpTextFieldBox } from '../../../../common/Index';

function FixedFundGrid({ onChangeOpenPost, setMarsterGrid, DISQ }) {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const [inputValue, setInputValue] = useState(''); // 입력 값 관리를 위한 state
  const realgridElement = useRef(null);

  const queryParams = new URLSearchParams();
  queryParams.append('DIV_CD', '001');
  queryParams.append('DISP_SQ', DISQ);

  // 자금과목이 입력되었는지 체크
  const checkRequireColumn = rowData => {
    if (!rowData['CASH_CD']) {
      return { CASH_CD: '자금과목코드' };
    }
    return {}; // CASH_CD 값이 존재하면 빈 객체 반환
  };

  const rowInsert = rowData => {
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .post('system/user/AcashFixManage/insert', rowData)
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
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .put('system/user/AcashFixManage/update', rowData)
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
    authAxiosInstance
      .get(`/system/user/AcashFixManage/getList?${queryParams.toString()}`)
      .then(responseData => {
        grid.closeProgress();
        console.log('이번에가져온것', responseData.data);
        provider.fillJsonData(responseData.data, {
          fillMode: 'set',
        });
      })
      .catch(error => {
        console.error(error);
      });

    grid.onValidateRow = (grid, itemIndex, dataRow, inserting, values) => {
      const error = {};

      if (values.CASH_CD) {
        // CASH_CD 값이 있는 경우
        rowInsert(grid.getValues(itemIndex));
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

    grid.onEditRowPended = (grid, itemIndex) => {
      console.log('onEditRowPended event triggered');
      const item = provider.getItem(itemIndex);
      if (item && item.CASH_CD) {
        // CASH_CD 값이 있으면
        rowInsert(item)
          .then(response => {
            // 추가 처리 작업 (예: 요청에 대한 응답 처리)
          })
          .catch(error => {
            console.error('Row insertion failed:', error);
          });
      }
    };

    //셀 버튼을 클릭 했을 때 발생하는 이벤트
    grid.onCellButtonClicked = (grid, index, column) => {
      grid.setValue(index.itemIndex, 'SUM_CD', '');
      onChangeOpenPost();
    };

    // 그리드의 상태 바를 숨깁니다.
    grid.setStateBar({ visible: false });

    //컬럼 너비 자동 조절 설정
    grid.setDisplayOptions({ fitStyle: 'evenFill' });

    setDataProvider(provider);
    setGridView(grid);

    return () => {
      provider.clearRows();
      grid.destroy();
      provider.destroy();
    };
  }, [DISQ]);

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
