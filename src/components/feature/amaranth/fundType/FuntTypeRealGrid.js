import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, fundTypeLayout } from './Realgrid-Data-FundType';
// import 'realgrid/dist/realgrid-style.css'; // RealGrid CSS 추가
import './FuntTypeRealGrid.css';
import { authAxiosInstance } from '../../../../axios/axiosInstance';

function RealGrid({
  onChangeOpenPost,
  setSelectedViewOption,
  loadRowData,
  setCASH_CD,
  setLEVEL_CD,
  setMarsterGrid,
  setCheckList,
  deleteBtnClick,
  excelExport,
  excelImport,
  setMenuGrid,
  setInputData,
  highFundsList,
}) {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const realgridElement = useRef(null);
  const fileInput = useRef();
  const searchValue = useRef('');

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
        console.log('포커스', emptyProperties);
        break; // 첫 번째 빈 값만 찾으면 더 이상 검사하지 않고 루프를 종료합니다.
      }
    }
    return emptyProperties;
  };

  //데이터가 아예 없는 빈 행(low) 검사 함수
  const columnUndefinedCount = lowData => {
    let undefinedCount = 0;

    for (const key in lowData) {
      if (lowData.hasOwnProperty(key) && lowData[key] === undefined) {
        undefinedCount++;
      }
    }
    return undefinedCount >= 10 ? false : true;
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
  const highFundsNameUpdate = rowData => {
    console.log('엽데이터', rowData);
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .put('accounting/user/fundType/highFundsNameUpdate', rowData)
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
  const handleViewOptionChange = () => {
    setSelectedViewOption('가로형태조회');
  };

  const setDataCellContextMenu = grid => {
    var contextMenu = [
      {
        label: '엑셀 내보내기',
        tag: 'excelExport',
      },
      {
        label: '엑셀 가져오기',
        tag: 'excelImport',
      },
    ];
  };
  const handleFileInputClick = (e, grid) => {
    fileInput.current.click(); // Trigger file input click
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
      //deletable: true, //행 삭제 가능 여부
      appendable: true, //행 추가 가능 여부
      commitWhenExitLast: false, //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
      appendWhenExitLast: false, //Tap, Enter키 입력시 행추가 가능
      crossWhenExitLast: true, //Tab이 이나 Enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동할지의 여부
      //displayEmptyEditRow: true, //마지막행에 항상 빈 행을 추가하는 기능
      //enterToNextRow: true, //셀 편집 중 Enter 키를 입력하면 편집을 완료하고 다음 행으로 이동할지의 여부
      enterToTab: true, //셀에 데이터 입력 후 다음 셀로 이동하기 여부 기능
      hintOnError: false, //편집 중에 에러가 있는 셀에 마우스가 위치할 때 에러 힌트 툴팁 표시 여부
      skipReadOnly: true, //readOnly, editable로 설정되 있는 컬럼 Enter키 입력시 foucs 스킵하는 기능
      useArrowKeys: true, //방향키로 셀 간 이동 가능 여부 기능
      confirmWhenDelete: true, //삭제여부를 묻는 대화 상자의 호출 여부
      //deleteRowsMessage: '', //삭제 대화 상자에 표시할 메세지 문자 설정 여부;
      //commitByCell: true, //셀 단위 수정 후 commit 설정 여부
      //commitWhenLeave: true, //편집중에 그리드 외부 영역을 클릭하였을때 commit 설정 여부
      commitLevel: 'error',
      //hideDeletedRows: true,
    });

    // 그리드에 데이터 소스를 설정합니다.
    grid.setDataSource(provider);

    // 필드 및 열 정의를 설정합니다.
    provider.setFields(fields);
    grid.setColumns(columns);

    //그리드에 컨텍스트 메뉴를 생성해줍니다
    grid.setContextMenu([
      {
        label: '엑셀 내보내기',
        tag: 'excelExport',
      },
    ]);

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
    grid.setRowIndicator({ zeroBase: false, headText: '' });

    //그리드 푸터 생성 비활성화
    grid.setFooter({ visible: false });

    //상위자금과목명 입력 비활성화
    grid.columnByName('SUM_NM').editable = false;

    //(컬럼 너비) + (행 높이) 자동 조절 설정
    grid.setDisplayOptions({
      fitStyle: 'evenFill',
      rowHeight: 35,
      columnMovable: false,
      selectionStyle: 'none',
    });

    //헤더 높이 자동 조절 설정
    grid.setHeader({ height: 35 });

    //체크바 너비  옵션 설정
    grid.setCheckBar({ width: 30 });

    //전체행 유효성 검사 여부 설정
    grid.validateCells(null, false);

    //포커스된 행의 배경색 스타일 적용
    grid.setDisplayOptions({ useFocusClass: true });

    // 그리드 내에서 컨텍스트 메뉴 항목이 클릭될 때 실행되는 함수를 정의합니다.
    grid.onContextMenuItemClicked = function (grid, item, clickData) {
      //handleXlsFile; excelExport excelImport
      if (item.tag === 'excelExport') {
        excelExport(grid, '자금종목');
      }
    };
    // 그리드 내에서 컨텍스트 메뉴 팝업이 열릴 때 실행되는 함수를 정의합니다.
    grid.onContextMenuPopup = function (grid, x, y, elementName) {
      if (elementName.cellType === 'data') {
        // 데이터 셀에서 컨텍스트 메뉴 팝업을 엽니다.
        //setDataCellContextMenu(grid);
      } else {
        return false;
      }
    };

    //추가 행에 대한 자금종목코드 수정가능 여부 동적 설정 : 셀 커서 이동시 이벤트 발생
    grid.onCurrentChanging = (grid, oldIndex, newIndex) => {
      if (grid.getItemCount() === newIndex.itemIndex + 1) {
        grid.columnByName('CASH_CD').editable = true;
      } else {
        grid.columnByName('CASH_CD').editable = false;
      }

      const LEVEL_CD = grid.getValue(newIndex.itemIndex, 'LEVEL_CD');
      console.log(
        '셀버튼(커서이동)',
        LEVEL_CD,
        LEVEL_CD !== 1 || newIndex.dataRow === -1,
        (LEVEL_CD !== 1 && LEVEL_CD !== undefined) || newIndex.dataRow === -1
      );
      if (LEVEL_CD !== 1) {
        grid.columnByName('SUM_CD').editable = true;
        grid.setColumnProperty('SUM_CD', 'button', 'action');
      } else {
        grid.columnByName('SUM_CD').editable = false;
        grid.setColumnProperty('SUM_CD', 'button', 'none');
      }

      console.log(
        '포커스2',
        grid.getValues(grid.getCurrent().itemIndex),
        oldIndex,
        newIndex,
        newIndex.dataRow,
        grid.getCurrent(),
        grid.getItemState(grid.getCurrent().itemIndex),
        grid.getModelAs(grid.getCurrent().itemIndex, 'row', true),
        grid.getEditOptions(),
        grid.getEditingItem(),
        grid.getEditValue(),
        grid.getEditingItem(),
        grid.getValues(grid.getCurrent().itemIndex),
        oldIndex.fieldName
      );

      const values = grid.getValues(grid.getCurrent().itemIndex);
      if (
        newIndex.fieldName === 'USE_YN' &&
        columnUndefinedCount(values) &&
        values !== null
      ) {
        const emptyColumn = checkRequireColumn(values);
        if (emptyColumn !== '') {
          const columlName = Object.keys(emptyColumn);
          alert('[' + emptyColumn[columlName] + ']반드시 입력해 주십시요.');

          setTimeout(() => {
            grid.setCurrent({
              dataRow: newIndex.dataRow,
              fieldName: columlName[0],
            });
            grid.setFocus();
            grid.showEditor();
          }, 1);
        }
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
      const current = grid.getCurrent();
      const values = grid.getValues(grid.getCurrent().itemIndex);
      const inputData = grid.getCurrent();
      const emptyColumn = checkRequireColumn(values);
      if (
        current.dataRow === -1 &&
        current.fieldIndex >= 3 &&
        current.fieldIndex <= 4 &&
        emptyColumn === ''
      ) {
        grid.editOptions.commitWhenExitLast = true; //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
        grid.editOptions.appendWhenExitLast = true; //Tap, Enter키 입력시 행추가 가능
      } else if (current.dataRow === -1 && current.fieldIndex < 5) {
        grid.editOptions.commitWhenExitLast = false; //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
        grid.editOptions.appendWhenExitLast = false; //Tap, Enter키 입력시 행추가 가능
        grid.editOptions.checkable = false;
      }

      // if (
      //   inputData.fieldName === 'LEVEL_CD' &&
      //   values.LEVEL_CD === 1 &&
      //   inputData.dataRow === -1
      // ) {
      //   console.log('테스트1');
      //   grid.columnByName('SUM_CD').editable = true;
      //   grid.setColumnProperty('SUM_CD', 'button', 'none');
      // }

      console.log(
        '체인지',
        values,
        emptyColumn,
        grid,
        itemIndex,
        dataRow,
        field,

        checkRequireColumn(grid.getValues(itemIndex)) === '',
        grid.getValue(itemIndex, 'LEVEL_CD'),
        grid.getValue(itemIndex, 'LEVEL_CD') > 5,
        grid.getValue(itemIndex, 'CASH_CD'),
        grid.getValue(itemIndex, 'CASH_CD') !== undefined,
        '(전):',
        oldValue,
        '(후):',
        newValue,
        field !== 5,
        grid.getEditValue()
      );

      const CASH_CD = grid.getValue(itemIndex, 'CASH_CD');
      const LEVEL_CD = grid.getValue(itemIndex, 'LEVEL_CD');
      const SUM_CD = grid.getValue(itemIndex, 'SUM_CD');
      console.log(
        '체인지 컬럼',
        inputData,
        inputData.fieldName,
        SUM_CD,
        SUM_CD !== undefined
      );
      setCASH_CD();
      setLEVEL_CD();

      if (
        inputData.fieldName === 'SUM_CD' &&
        SUM_CD !== undefined &&
        LEVEL_CD !== 1
      ) {
        if (typeof CASH_CD === 'number') {
          setCASH_CD(CASH_CD.toString());
        } else if (typeof CASH_CD === 'string') {
          setCASH_CD(CASH_CD);
        }
        if (LEVEL_CD !== undefined) {
          setLEVEL_CD(LEVEL_CD.toString());
        } else if (SUM_CD !== undefined) {
          console.log('체인지 컬럼(조건)', inputData.fieldName, SUM_CD);
          setInputData(SUM_CD.toString());
        }
        onChangeOpenPost();
      } else if (inputData.fieldName === 'SUM_CD' && SUM_CD === undefined) {
        console.log('체인지()');
        grid.setValue(dataRow, 'SUM_CD', '');
        grid.setValue(dataRow, 'SUM_NM', '');
      }

      //setSearchData(searchData);
      //현재 행의 상태값을 확인하는 데이터
      const itemState = grid.getItemState(grid.getCurrent().itemIndex);
      const nowRowData = grid.getValues(itemIndex);
      console.log('들어옴1', grid.getCurrent(), nowRowData, itemIndex);
      if (
        checkRequireColumn(nowRowData) === '' &&
        itemState === 'updating' &&
        field !== 5 &&
        !(grid.getValue(itemIndex, 'LEVEL_CD') >= 4) &&
        grid.getValue(itemIndex, 'LEVEL_CD') !== undefined
      ) {
        if (nowRowData.SUM_CD === undefined) {
          nowRowData.SUM_CD = '';
        }
        rowUpdate(nowRowData);
        if (inputData.fieldName === 'CASH_NM') {
          highFundsNameUpdate(nowRowData);
        }
      }
    };

    grid.onEditCommit = function (grid, index, oldValue, newValue) {
      const rowValue = grid.getValues(grid.getCurrent().itemIndex);
      console.log(
        '체인지(커밋):',
        rowValue,
        index.dataRow,
        grid,
        index,
        oldValue,
        newValue
      );

      if (index.fieldName === 'SUM_CD') {
        if (oldValue === undefined) {
          setTimeout(() => {
            grid.setValue(index.itemIndex, 'SUM_CD', '');
            searchValue.current = '';
            setInputData();
          }, 30);
        } else {
          if (newValue === undefined) {
            grid.setValue(index.itemIndex, 'SUM_CD', '');
            grid.setValue(index.itemIndex, 'SUM_NM', '');
            searchValue.current = '';
            setInputData();
          } else {
            console.log('확인(커밋)');
            setTimeout(() => {
              grid.setValue(index.itemIndex, 'SUM_CD', oldValue);
              setInputData();
            }, 30);
          }
        }
      }
    };

    //setValue()로 셀의 값이 변경되었을 떄 호출되는 이벤트
    // provider.onDataChanged = function (provider) {
    //   const itemState = grid.getItemState(grid.getCurrent().itemIndex);
    //   const nowRowData = grid.getValues(grid.getCurrent().itemIndex);
    //   console.log(
    //     'onDataChanged',
    //     grid.getCurrent().itemIndex,
    //     nowRowData,
    //     itemState
    //   );
    //   if (checkRequireColumn(nowRowData) === '' && itemState === 'focused') {
    //     console.log('들어옴(set)?', nowRowData);
    //     rowUpdate(nowRowData);
    //   }
    // };
    provider.onRowUpdated = function (provider, row) {
      const itemState = grid.getItemState(grid.getCurrent().itemIndex);
      const nowRowData = grid.getValues(grid.getCurrent().itemIndex);
      console.log(
        'onDataChanged',
        grid.getCurrent().itemIndex,
        nowRowData,
        itemState
      );
      if (checkRequireColumn(nowRowData) === '' && itemState === 'focused') {
        console.log('들어옴(set)?', nowRowData);
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
        grid.getCurrent(),
        column.fieldName === 'CASH_CD',
        grid.getValue(itemIndex, 'CASH_CD') !== undefined,
        grid.getCurrent().dataRow === -1,
        '------------------',
        column.fieldName === 'CASH_CD',
        grid.getValue(itemIndex, 'CASH_CD') !== undefined,
        grid.getCurrent().dataRow === -1
      );

      if (
        column.fieldName === 'CASH_CD' &&
        grid.getValue(itemIndex, 'CASH_CD') !== undefined &&
        grid.getCurrent().dataRow === -1 &&
        grid.getCurrent().fieldIndex === 2
      ) {
        console.log('컬럼이다 ', column.fieldName, value);
        dupDataCheck(value)
          .then(dupValue => {
            if (dupValue !== '') {
              //grid.setEditOptions({ enterToTab: false });
              grid.setCurrent({ dataRow: dataRow, column: 'CASH_CD' });
              grid.setValue(itemIndex, 'CASH_CD', '');
              grid.setValue(itemIndex, 'CASH_NM', '');
              grid.setValue(itemIndex, 'TYPE_NM', '');
              grid.setValue(itemIndex, 'DISP_SQ', '');
              alert('이미 등록된 자금코드입니다');
              console.log('컬럼중복');
              return;
            }
          })
          .catch(error => {
            console.error(error);
          });
      } else if (column.fieldName === 'LEVEL_CD' && value !== undefined) {
        if (value > 3) {
          console.log('Level영역');
          setTimeout(() => {
            grid.setCurrent({
              dataRow: dataRow,
              column: 'LEVEL_CD',
            });
          }, 30);
          grid.setValue(itemIndex, 'LEVEL_CD', '');
          alert('LEVEL값은 최대 3 까지만 입력 가능합니다.');
          return;
        } else if (
          grid.getValue(itemIndex, 'SUM_CD') !== undefined &&
          value === 1
        ) {
          grid.setValue(itemIndex, 'SUM_CD', '');
          grid.setValue(itemIndex, 'SUM_NM', '');
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
        grid.editOptions.appendable = true;
        grid.editOptions.commitWhenExitLast = true; //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
        grid.editOptions.appendWhenExitLast = true; //Tap, Enter키 입력시 행추가 가능
        grid.editOptions.checkable = true;
        if (dataRow === -1) {
          rowInsert(grid.getValues(itemIndex));
          grid.beginAppendRow();
        }
      } else {
        const columlName = Object.keys(emptyColumn);

        error.level = 'error';
        error.message =
          '[' + emptyColumn[columlName] + ']반드시 입력해 주십시요.';
        setTimeout(() => {
          grid.setCurrent({ itemIndex: itemIndex, column: columlName[0] });
        }, 30);
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
    grid.onGetEditValue = (ds, row, editResult) => {
      console.log('값 존재유무 확인', provider.hasData(5)); //값 존재 유무 확인 : 컬럼 순서 변경후 하기

      const current = grid.getCurrent();
      //const value = provider.getValue(current.dataRow, current.fieldName);
      const copyText = grid.getValue(row.fieldIndex, row.column);
      const values = grid.getValues(grid.getCurrent().itemIndex);
      console.log(
        'DB 저장 정보',
        grid.getValue(grid.getCurrent().dataRow, 'SUM_CD'),
        editResult,
        values,
        row,
        grid.getValue(row.itemIndex, 'SUM_CD'),
        // copyText,
        // row.fieldIndex <= 4,
        // row.column,
        // grid.getCurrent().itemIndex,
        // typeof current.dataRow,
        // current.fieldName,
        // '옵션',
        // grid.getEditOptions(),
        // grid.getEditingItem(),
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
        grid.setValue(row.itemIndex, 'TYPE_NM', editResult.text);
        grid.setValue(row.itemIndex, 'USE_YN', '여');
      } else if (row.column === 'CASH_CD') {
        grid.setValue(row.itemIndex, 'DISP_SQ', editResult.text);
      }

      console.log('행데이터:', JSON.stringify(provider.getRows(1, 1)));
    };

    //셀에 입력값이 실시간으로 들어왔을 때마다 실행되는(셀 반영되기 전) 이벤트
    grid.onEditChange = function (grid, index, value) {
      console.log('서치(onEditChange)', grid, index, value);
      const SUM_CD = grid.getValue(index.itemIndex, 'SUM_CD');
      if (index.column === 'SUM_CD' && value === undefined) {
        setInputData();
        searchValue.current = '';
      } else if (index.column === 'SUM_CD' && value !== undefined) {
        setInputData(value.toString());
        searchValue.current = value;
      }
    };

    //셀 버튼을 클릭 했을 때 발생하는 이벤트
    grid.onCellButtonClicked = (grid, index, column) => {
      setCASH_CD();
      setLEVEL_CD();
      const CASH_CD = grid.getValue(index.itemIndex, 'CASH_CD');
      const LEVEL_CD = grid.getValue(index.itemIndex, 'LEVEL_CD');
      const SUM_CD = grid.getValue(index.itemIndex, 'SUM_CD');
      console.log(
        '셀버튼',
        typeof LEVEL_CD,
        SUM_CD,
        searchValue.current === '',
        searchValue.current
      );
      if (index.dataRow !== -1) {
        if (typeof CASH_CD === 'number') {
          setCASH_CD(CASH_CD.toString());
        } else if (typeof CASH_CD === 'string') {
          setCASH_CD(CASH_CD);
        }
      }

      if (LEVEL_CD !== 1) {
        onChangeOpenPost();
        if (LEVEL_CD !== undefined) {
          setLEVEL_CD(LEVEL_CD.toString());
        }
      }
      if (searchValue.current === '') {
        setInputData();
      }
    };

    //ctrl+del 버튼 클릭 시 => 행 삭제 요청 발생하는 이벤트
    grid.onRowsDeleting = async function (grid, rows) {
      // const checkData = [];
      // checkData.push(grid.getValue(rows.join(), 'CASH_CD').toString());
      // const highFundsData = await highFundsList(checkData);
      // console.log('체크된', checkData);
      // // setCheckList 함수 내에서 deleteBtnClick 호출
      // // await setCheckList(prevCheckList => [...prevCheckList, checkData]);
      // // console.log('체크된2');
      // if (highFundsData === '') {
      //   await deleteBtnClick(checkData);
      // } else {
      //   alert(
      //     '[' +
      //       highFundsData +
      //       ']상위자금과목에 설정되어 있는 자금과목코드는 삭제할 수 없습니다.'
      //   );
      // }
      // console.log('체크된3');
    };

    provider.onRowDeleting = async function (provider, row) {};

    grid.onKeyDown = async (grid, event) => {
      console.log('삭제', event.key);
      const nowLow = grid.getCurrent();
      if (event.ctrlKey && event.key === 'Delete' && nowLow.dataRow !== -1) {
        const checkData = [];
        checkData.push(grid.getValue(nowLow.dataRow, 'CASH_CD').toString());
        const highFundsData = await highFundsList(checkData);
        console.log('체크된1231231233', nowLow, checkData);
        if (window.confirm('선택한 1개의 행을 삭제하시겠습니까??') === true) {
          if (highFundsData === '') {
            provider.removeRow(nowLow.dataRow);
            await deleteBtnClick(checkData);
          } else {
            alert(
              '[' +
                highFundsData +
                ']상위자금과목에 설정되어 있는 자금과목코드는 삭제할 수 없습니다.'
            );
          }
        }
      }

      if (event.key === 'Escape' && searchValue.current !== '') {
        searchValue.current = '';
      }
      if (event.key === 'F9') {
        handleViewOptionChange();
      }
    };

    //체크박스 체크시 => 행 삭제 요청 발생하는 이벤트
    grid.onItemChecked = function (grid, item, checked) {
      const checkData = grid.getValue(item, 'CASH_CD')?.toString();
      if (checked) {
        // 체크된 행(CASH_CD)을 추가
        setCheckList(prevCheckList => [...prevCheckList, checkData]);
      } else {
        console.log('삭제검사(체크해제)', checkData);
        // 체크 헤재된 행(CASH_CD)을 삭제
        setCheckList(prevCheckList =>
          prevCheckList.filter(checkItem => checkItem !== checkData)
        );
      }
    };
    //체크박스 전체 체크시 => 행 삭제 요청 발생하는 이벤트
    grid.onItemAllChecked = function (grid, checked) {
      const checkedData = provider.getFieldValues('CASH_CD', 0, -1);
      const checked_CHSH_CD = checkedData.map(num => num.toString());
      if (checked) {
        setCheckList([]);
        setCheckList(prevCheckList => [...prevCheckList, ...checked_CHSH_CD]);
      } else {
        setCheckList([]);
      }
    };

    // 데이터 프로바이더와 그리드 뷰를 상태에 저장합니다.
    setDataProvider(provider);
    setGridView(grid);

    // 컴포넌트가 언마운트될 때 정리 작업을 수행합니다.
    return () => {
      grid.cancel();
      provider.clearRows();
      grid.destroy();
      provider.destroy();
    };
  }, []); // useEffect는 한 번만 실행되도록 빈 배열을 의존성으로 설정합니다.

  return (
    <>
      <input
        type="file"
        id="fileInput"
        ref={fileInput}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        style={{ display: 'none' }}
        onChange={excelImport}
      />
      <div ref={realgridElement} className="fundTypeSetting"></div>
    </>
  );
}

export default RealGrid;
