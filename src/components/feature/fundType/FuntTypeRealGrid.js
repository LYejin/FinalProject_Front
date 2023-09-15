import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import {
  columns,
  fields,
  fundTypeLayout,
  hideChildLayout,
  option,
  rows,
} from './Realgrid-Data-FundType';
import 'realgrid/dist/realgrid-style.css'; // RealGrid CSS 추가
import './FundType.css';
import { authAxiosInstance } from '../../../axios/axiosInstance';
function RealGrid({
  onChangeOpenPost,
  loadRowData,
  CASH_CD,
  setMarsterGrid,
  setCheckList,
  deleteBtnClick,
}) {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const realgridElement = useRef(null);

  //자금종목 데이터 추가 시 필수 칼럼 데이터 입력 유무 판별 함수
  const checkRequireColumn = rowData => {
    const obj = {
      CASH_FG: '수지구분',
      LEVEL_CD: 'LEVEL',
      CASH_CD: '자금과목코드',
      CASH_NM: '자금과목명',
      TYPE_NM: '용도',
    };
    let emptyProperties = '';

    for (const key of Object.keys(obj)) {
      if (!rowData.hasOwnProperty(key) || !rowData[key]) {
        emptyProperties = { [key]: obj[key] };
        console.log(emptyProperties);
        break; // 첫 번째 빈 값만 찾으면 더 이상 검사하지 않고 루프를 종료합니다.
      }
    }
    return emptyProperties;
  };

  //종목코드 DB데이터 중복 검사 로직
  const dupDataCheck = checkData => {
    return new Promise((resolve, reject) => {
      authAxiosInstance('accounting/user/fundType/dupCheck/' + checkData, '', {
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          const dupValue = response.data;
          resolve(dupValue);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };

  const rowInsert = rowData => {
    if (rowData.LOW_YN === undefined) {
      rowData.LOW_YN = '부';
    }
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .post('accounting/user/fundType/fundTypeInsert', rowData)
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
    console.log('엽데이터', rowData);
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .put('accounting/user/fundType/fundTypeUpdate', rowData)
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
    // RealGrid 컨테이너 엘리먼트를 참조합니다.
    const container = realgridElement.current;

    // 데이터 프로바이더 및 그리드 뷰를 초기화합니다.
    const provider = new LocalDataProvider(true);
    const grid = new GridView(container);

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
    });

    // 그리드에 데이터 소스를 설정합니다.
    grid.setDataSource(provider);

    // 필드 및 열 정의를 설정합니다.
    provider.setFields(fields);
    grid.setColumns(columns);

    //마운트 시 로드될 행 데이터 설정
    grid.showProgress(); //데이터 로딩바 생성
    loadRowData()
      .then(lodaData => {
        grid.closeProgress(); // 서버 데이터 로드 완료시 로딩바 제거
        provider.fillJsonData(lodaData, {
          fillMode: 'set',
        });
        //마지막행에 항상 빈 행을 추가하는 기능
        grid.setEditOptions({ displayEmptyEditRow: true });
        //뷰 마운트 시 커서 포커스를 마지막 행 첫번째 셀에 위치하게 설정
        grid.setCurrent({
          itemIndex: provider.getRowCount(),
          column: 'CASH_FG',
        });
        grid.setFocus();
      })
      .catch(error => {
        console.error(error);
      });

    // 그리드의 컬럼 레이아웃을 설정합니다.
    grid.setColumnLayout(fundTypeLayout);

    // 그리드의 상태 바를 숨깁니다.
    grid.setStateBar({ visible: false });

    // 그리드의 고정 옵션을 설정합니다.
    grid.setFixedOptions({});

    // 정렬 옵션을 비활성화합니다.
    grid.setSortingOptions({ enabled: false });

    //행 번호를 1부터 시작하게 설정합니다.
    grid.setRowIndicator({ zeroBase: false });

    //그리드 푸터 생성 비활성화
    grid.setFooter({ visible: false });

    //상위자금과목명 입력 비활성화
    grid.columnByName('SUM_NM').editable = false;

    //컬럼 너비 자동 조절 설정
    grid.setDisplayOptions({ fitStyle: 'evenFill' });

    //전체행 유효성 검사 여부 설정
    grid.validateCells(null, false);

    //포커스된 행의 배경색 스타일 적용
    grid.setDisplayOptions({ useFocusClass: true });

    //추가 행에 대한 자금종목코드 수정가능 여부 동적 설정 : 셀 커서 이동시 이벤트 발생
    grid.onCurrentChanged = (grid, newIndex) => {
      if (grid.getItemCount() === newIndex.itemIndex + 1) {
        grid.columnByName('CASH_CD').editable = true;
      } else {
        grid.columnByName('CASH_CD').editable = false;
      }

      if (grid.getCurrent().fieldName === 'LOW_YN') {
        console.log('포커스');
      }
    };

    //행의 셀의 값이 변경되었을 떄 호출되는 이벤트
    grid.onEditRowChanged = (
      grid,
      itemIndex,
      dataRow,
      field,
      oldValue,
      newValue
    ) => {
      const inputData = grid.getCurrent();
      if (inputData.fieldName === 'SUM_CD') {
        onChangeOpenPost();
      }
      //현재 행의 상태값을 확인하는 데이터
      const itemState = grid.getItemState(grid.getCurrent().itemIndex);
      const nowRowData = grid.getValues(itemIndex);

      // if (checkRequireColumn(nowRowData) === '') {
      //   if (itemState === 'appending') {
      //     rowInsert(nowRowData);
      //   } else if (itemState === 'updating') {
      //   }
      // }

      if (checkRequireColumn(nowRowData) === '' && itemState === 'updating') {
        rowUpdate(nowRowData);
      }
      console.log('들어옴', grid.getCurrent().itemIndex, nowRowData, itemIndex);
    };

    //setValue()로 셀의 값이 변경되었을 떄 호출되는 이벤트
    provider.onDataChanged = function (provider) {
      const itemState = grid.getItemState(grid.getCurrent().itemIndex);
      const nowRowData = grid.getValues(grid.getCurrent().itemIndex);
      if (checkRequireColumn(nowRowData) === '' && itemState === 'focused') {
        console.log(
          'onDataChanged',
          grid.getCurrent().itemIndex,
          nowRowData,
          itemState
        );
        rowUpdate(nowRowData);
      }
    };

    //칼럼 별 유효성 검사를 발생하는 이벤트를 처리합니다.
    grid.onValidateColumn = (
      grid,
      column,
      inserting,
      value,
      itemIndex,
      dataRow
    ) => {
      const error = {};
      console.log(
        '컬럼 유효성',
        column.fieldName,
        itemIndex,
        provider.getRowCount(),
        itemIndex === provider.getRowCount(),
        grid.getCurrent()
      );

      if (
        column.fieldName === 'CASH_CD' &&
        grid.getValue(itemIndex, 'CASH_CD') === undefined
      ) {
        console.log('컬럼이다', column.fieldName, value);
        dupDataCheck(value)
          .then(dupValue => {
            if (dupValue !== '') {
              //grid.setEditOptions({ enterToTab: false });
              grid.setCurrent({ dataRow: dataRow, column: 'CASH_CD' });
              grid.setValue(itemIndex, 'CASH_CD', '');
              grid.setValue(itemIndex, 'CASH_NM', '');
              grid.setValue(itemIndex, 'TYPE_NM', '');
              grid.setValue(itemIndex, 'DISP_SQ', '');
              error.level = 'error';
              error.message = '이미 등록된 자금코드입니다';
              alert('이미 등록된 자금코드입니다');
              return;
            }
          })
          .catch(error => {
            console.error(error);
          });
      } else if (column.fieldName === 'LEVEL_CD' && value !== undefined) {
        if (value > 4) {
          grid.setCurrent({
            itemIndex: itemIndex,
            column: 'LEVEL_CD',
          });
          grid.setValue(itemIndex, 'LEVEL_CD', '');
          alert('LEVEL값은 최대 4 까지만 입력 가능합니다.');
          return;
        }
      }

      return error;
    };

    //행 별 유효성 검사를 발생하는 이벤트를 처리합니다.
    grid.onValidateRow = (grid, itemIndex, dataRow, inserting, values) => {
      const error = {};
      const emptyColumn = checkRequireColumn(values);
      console.log('test');
      console.log(
        '행 유효성',
        grid,
        itemIndex,
        dataRow,
        inserting,
        values,
        grid.getItemState(grid.getCurrent().itemIndex),
        grid.getModelAs(grid.getCurrent().itemIndex, 'row', true),
        grid.getCheckedRows(),
        grid.getCheckedItems(true),
        grid.getCheckedItems(true),
        grid.getCheckedItems(false),
        grid.getCurrent(),
        grid.getCurrent().itemIndex,
        grid.getModel(itemIndex, true),
        grid.getEditingItem()
      );

      if (emptyColumn === '') {
        rowInsert(grid.getValues(itemIndex));
        grid.editOptions.appendable = true;
        grid.editOptions.commitWhenExitLast = true; //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
        grid.editOptions.appendWhenExitLast = true; //Tap, Enter키 입력시 행추가 가능
        grid.beginAppendRow();
      } else {
        const columlName = Object.keys(emptyColumn);
        error.level = 'error';
        error.message =
          '[' + emptyColumn[columlName] + ']반드시 입력해 주십시요.';
        grid.setCurrent({ itemIndex: itemIndex, column: columlName[0] });
      }
      return error;
    };

    //행이 새로 추가되었을 대 실행되는 이벤트
    provider.onRowInserted = function (provider, row) {};

    //유효성 위반으로 error객체 발생 시에 발생되는 이벤트 처리
    // grid.onValidationFail = function (grid, itemIndex, column, err) {
    //   if (column?.name != 'SUM_CD') {
    //     console.log('onValidationFail:', grid, itemIndex, column, err);
    //     return err;
    //   }
    // };

    // 셀 편집 시 발생하는 이벤트를 처리합니다.
    grid.onGetEditValue = (ds, row, field, value) => {
      console.log('값 존재유무 확인', provider.hasData(5)); //값 존재 유무 확인 : 컬럼 순서 변경후 하기

      const current = grid.getCurrent();
      //const value = provider.getValue(current.dataRow, current.fieldName);
      const copyText = grid.getValue(row.fieldIndex, row.column);
      console.log('포커스', JSON.stringify(grid.getCurrent()));
      if (current.dataRow === -1 && row.fieldIndex >= 3) {
        grid.editOptions.commitWhenExitLast = true; //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
        grid.editOptions.appendWhenExitLast = true; //Tap, Enter키 입력시 행추가 가능
      } else if (current.dataRow === -1 && row.fieldIndex < 3) {
        grid.editOptions.commitWhenExitLast = false; //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
        grid.editOptions.appendWhenExitLast = false; //Tap, Enter키 입력시 행추가 가능
      }
      console.log(
        'DB 저장 정보',
        copyText,
        row.fieldIndex <= 4,
        row.column,
        grid.getCurrent().itemIndex,
        typeof current.dataRow,
        current.fieldName,
        '옵션',
        grid.getEditOptions(),
        grid.getEditingItem(),
        // '----------------------',
        // row.dataRow,
        // row.fieldIndex, //셀 인덱스
        // row.itemIndex, //행 인덱스
        // row.column,
        // grid.getValue(current.dataRow, current.fieldName),
        grid.getValues(row.itemIndex) // 전체 데이터
        // field.text,
        // row.column === 'CASH_NM',
        // provider.hasData(5)
      );

      if (row.column === 'CASH_NM') {
        grid.setValue(row.itemIndex, 'TYPE_NM', field.text);
        grid.setValue(row.itemIndex, 'USE_YN', '여');
      } else if (row.column === 'CASH_CD') {
        grid.setValue(row.itemIndex, 'DISP_SQ', field.text);
      }
      const columKey = row.column;
      const sellValue = field.value;

      console.log('Total number of rows:', provider._dp._values);
      console.log('매개변수', ds, row.column, field.text, provider.hasData(4));
      console.log(ds, row, field, value);
      console.log('행데이터:', JSON.stringify(provider.getRows(1, 1)));
    };

    //셀 버튼을 클릭 했을 때 발생하는 이벤트
    grid.onCellButtonClicked = (grid, index, column) => {
      grid.setValue(index.itemIndex, 'SUM_CD', '');
      onChangeOpenPost();
    };

    //ctrl+del 버튼 클릭 시 => 행 삭제 요청 발생하는 이벤트
    grid.onRowsDeleting = function (grid, rows) {
      const checkData = grid.getValue(rows.join(), 'CASH_CD').toString();
      console.log('체크된', grid.getValue(rows.join(), 'CASH_CD').toString());
      setCheckList(
        prevCheckList => [...prevCheckList, checkData],
        () => {
          deleteBtnClick();
        }
      );
    };

    //체크박스 체크시 => 행 삭제 요청 발생하는 이벤트
    grid.onItemChecked = function (grid, item, checked) {
      const checkData = grid.getValue(item, 'CASH_CD')?.toString();
      if (checked) {
        // 체크된 행(CASH_CD)을 추가
        setCheckList(prevCheckList => [...prevCheckList, checkData]);
      } else {
        // 체크 헤재된 행(CASH_CD)을 삭제
        setCheckList(prevCheckList =>
          prevCheckList.filter(checkItem => checkItem !== checkData)
        );
      }
    };

    // 데이터 프로바이더와 그리드 뷰를 상태에 저장합니다.
    setDataProvider(provider);
    setGridView(grid);
    console.log('검색그디르', CASH_CD);

    // 컴포넌트가 언마운트될 때 정리 작업을 수행합니다.
    return () => {
      provider.clearRows();
      grid.destroy();
      provider.destroy();
    };
  }, []); // useEffect는 한 번만 실행되도록 빈 배열을 의존성으로 설정합니다.

  return <div ref={realgridElement} className="fundTypeSetting"></div>;
}

export default RealGrid;
