import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import {
  columns,
  fields,
  fundTypeLayout,
} from './StradeRollManageRealgridData';
//import 'realgrid/dist/realgrid-style.css'; // RealGrid CSS 추가
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import EmpCodeHelpModal from '../../Modal/EmpCodeHelpModal/EmpCodeHelpModal';
import DeptCodeHelpModal from '../../Modal/DeptCodeHelpModal/DeptCodeHelpModal';
import StradeCodeHelpModal from '../../Modal/StradeCodeHelpModal/StradeCodeHelpModal';

const StradeRollManageRealGrid = ({ tr_CD }) => {
  const [dataProviderState, setDataProviderState] = useState(null);
  const [gridViewState, setGridViewState] = useState(null);
  const [empMenuButton, setEmpMenuButton] = useState(false);
  const [deptMenuButton, setDeptMenuButton] = useState(false); // deptCodeHelp modal 클릭 상태
  const [cellClickData, setCellClickData] = useState(''); // 현재 클릭한 CellData
  const [gridViewStrade, setGridViewStrade] = useState(); // gridView 저장
  const [dataProvider, setDataProvider] = useState(); // gridView 저장
  const realgridElement = useRef(null);
  // RealGrid 컨테이너 엘리먼트를 참조합니다.

  // 모달창 Close
  const onChangeModalClose = () => {
    setDeptMenuButton(false);
    setEmpMenuButton(false);
  };

  //   const FtradeList = ({ dataProvider, gridView }) => {
  //     const params = {};
  //     params.TR_CD = tr_CD;

  //     authAxiosInstance('accounting/user/Strade/stradeRollManageSearchList', {
  //       params,
  //     }).then(response => {
  //       console.log('reeeeeeeeee : ', response);
  //       dataProvider.fillJsonData(response.data, {
  //         fillMode: 'set',
  //       });
  //       //마지막행에 항상 빈 행을 추가하는 기능
  //       gridView.setEditOptions({ displayEmptyEditRow: true });
  //     });
  //   };

  useEffect(() => {
    const container = realgridElement.current;

    // 데이터 프로바이더 및 그리드 뷰를 초기화합니다.
    const dataProvider = new LocalDataProvider(true);
    const gridView = new GridView(container);

    // 그리드에 데이터 소스를 설정합니다.
    gridView.setDataSource(dataProvider);

    // 필드 및 열 정의를 설정합니다.
    dataProvider.setFields(fields);
    gridView.setColumns(columns);

    // FtradeList(dataProvider, gridView);

    const params = {};
    params.TR_CD = tr_CD;

    gridView.showProgress();
    authAxiosInstance('accounting/user/Strade/stradeRollManageSearchList', {
      params,
    }).then(response => {
      console.log('reeeeeeeeee : ', response.data);
      if (response.data !== null && Object.keys(response.data).length > 0) {
        gridView.closeProgress();
        const newDataList = response.data?.map(data =>
          data.roll_FG === '1'
            ? { ...data, roll_FG: '부서' }
            : data.roll_FG === '2'
            ? { ...data, roll_FG: '사용자' }
            : data
        );
        dataProvider.fillJsonData(newDataList, {
          fillMode: 'set',
        });

        // update 상태로 변경
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          dataProvider.setRowState(i, 'updated');
        }
      }
      //마지막행에 항상 빈 행을 추가하는 기능
      gridView.setEditOptions({ displayEmptyEditRow: true });
    });

    // async function getFtradeGridData() {
    //   const data = await authAxiosInstance(
    //     'accounting/user/Strade/stradeRollManageSearchList',
    //     {
    //       params,
    //     }
    //   ).then(response => {
    //     console.log('reeeeeeeeee : ', response);
    //     dataProvider.fillJsonData(response, {
    //       fillMode: 'set',
    //     });
    //     //마지막행에 항상 빈 행을 추가하는 기능
    //     gridView.setEditOptions({ displayEmptyEditRow: true });
    //     //뷰 마운트 시 커서 포커스를 마지막 행 첫번째 셀에 위치하게 설정
    //     gridView.setCurrent({
    //       itemIndex: dataProvider.getRowCount(),
    //       column: 'CASH_FG',
    //     });
    //   });
    // }

    const onClickRemoveButton = (gridView, dataProvider) => {
      console.log('hiiiiiiii');

      //체크된 행 가져오기
      var rows = gridView.getCheckedRows();
      console.log('rows: ' + rows);

      //행 삭제하기
      dataProvider.removeRows(rows);
      dataProvider.softDeleting = true;

      //체크 해제하기
      gridView.checkRows(rows, false);
    };

    // onRowInserting insert 전 확인 과정
    dataProvider.onRowInserting = function (provider, row, values) {
      let editItem = gridView.getEditingItem();
      if (
        editItem?.values.dept_CD !== undefined ||
        editItem?.values.emp_CD !== undefined
      ) {
        return true;
      } else {
        return false;
      }
    };

    //onRowInserted
    dataProvider.onRowInserted = (provider, newCount) => {
      console.log(`onRowInserted`, newCount, provider);
      let editItem = gridView.getEditingItem();
      console.log(editItem?.values.dept_CD);
      console.log(editItem?.values.emp_CD);
      console.log(editItem?.values.roll_FG);
      let rollFG;
      if (editItem?.values.roll_FG === '부서') {
        rollFG = '1';
      } else if (editItem?.values.roll_FG === '사용자') {
        rollFG = '2';
      }
      if (editItem?.values.dept_CD !== '' || editItem?.values.emp_CD !== '') {
        gridView.setEditOptions({ insertable: true });
        console.log('zzzzzzzzzzzz', editItem);
        var current = gridView.getCurrent();
        console.log(current);
        authAxiosInstance
          .post('accounting/user/Strade/stradeRollManageInsert', {
            ...editItem.values,
            tr_CD: tr_CD,
            use_YN: '1',
            roll_FG: rollFG,
          })
          .then(response => {
            console.log('hiiiiiiiiii:', response.data);
          });
      }
    };

    dataProvider.onRowUpdated = function (provider, row) {
      var current = gridView.getCurrent();
      console.log(current);
      var jsonData = dataProvider.getJsonRow(current.itemIndex);
      console.log('VALUE : ', jsonData);
      authAxiosInstance
        .post('accounting/user/Strade/stradeRollManageUpdate', {
          ...jsonData,
          tr_CD: tr_CD,
          trmg_SQ: current.itemIndex + 1,
          use_YN: '1',
        })
        .then(response => {
          console.log('hiiiiiiiiii:', response.data);
        });
    };

    // 메뉴 클릭시 이벤트
    gridView.onCellButtonClicked = function (grid, index, column) {
      console.log('--------------------', grid, index, column);
      var current = gridView.getCurrent();
      console.log('current: ', current);
      if (index.fieldIndex === 1) {
        setDeptMenuButton(true);
      } else if (index.fieldIndex === 3) {
        setEmpMenuButton(true);
      }
      setCellClickData(preview => current.itemIndex);
    };

    // 셀 클릭시 이벤트
    gridView.onCellClicked = function (grid, clickData) {
      console.log('clickData', clickData);
      console.log('--------------------', gridView.getCheckedRows());
      if (
        clickData.dataRow >= 0 &&
        dataProvider.getRowState(clickData.dataRow) === 'updated'
      ) {
        console.log(dataProvider.getRowState(clickData.dataRow));
        grid.editOptions.editable = false;
      } else {
        grid.editOptions.editable = true;
      }

      // if (
      //   dataProvider.getRowState(clickData.dataRow) === 'created' ||
      //   dataProvider.getRowState(clickData.dataRow) === 'none'
      // ) {
      //   console.log(dataProvider.getRowState(clickData.dataRow));
      //   grid.editOptions.editable = true;
      // }
      // else {
      //   grid.editOptions.editable = true;
      //   gridView.setEditOptions({ appendable: false });
      // }
    };

    // gridView.onValueChanged = function (grid, newIndex) {
    //   console.log('iiiiiiiiiiiiiiiiiiiiiiiii');
    //   // if (newIndex.fieldName === 'emp_CD' || newIndex.fieldName === 'kor_NM') {
    //   //   gridView.setEditOptions({ appendable: false });
    //   // }
    // };

    dataProvider.onValueChanged = function (provider) {
      alert('dataChanged!');
    };

    // 현재 셀 값이 변경되었을 시 발생되는 이벤트
    gridView.onCurrentChanged = function (grid, newIndex) {
      let current = gridView.getCurrent();
      let editItem = gridView.getEditingItem(); // 변경중인 데이터 가져오기
      let rollFGData = editItem?.values ? editItem.values?.roll_FG : false;
      var value = gridView.getEditValue();
      console.log('value: ' + value);
      console.log('current : ', current);
      if (newIndex.fieldName !== 'roll_FG' && rollFGData === '부서') {
        gridView.columnByName('dept_CD').editable = true;
        gridView.columnByName('emp_CD').editable = false;
        gridView.columnByName('dept_CD').buttonVisibility = 'default';
        gridView.columnByName('emp_CD').buttonVisibility = 'hidden';
        console.log(grid, newIndex);
        console.log('vla : ', value);
      } else if (newIndex.fieldName !== 'roll_FG' && rollFGData === '사용자') {
        gridView.columnByName('emp_CD').editable = true;
        gridView.columnByName('dept_CD').editable = false;
        gridView.columnByName('emp_CD').buttonVisibility = 'default';
        gridView.columnByName('dept_CD').buttonVisibility = 'hidden';
      }
      //포커스된 셀 변경
      //gridView.setCurrent({ itemIndex: 1, column: 'emp_CD' });
    };

    // gridView.onCurrentRowChanged = function (grid, oldRow, newRow) {
    //   console.log(newRow);
    //   console.log('Ggggggggg', grid);

    //   var current = gridView.getCurrent();
    //   console.log('currentcurrentcurrentcurrent', current);

    //   if (current.dataRow >= 0) {
    //     grid.editOptions.editable = false;
    //   } else {
    //     grid.editOptions.editable = true;
    //     gridView.setEditOptions({ appendable: false });
    //   }

    //   // if (!editable) {
    //   //   // 신규행이 아니면. 전체컬럼 editable:false
    //   //   columns.forEach(function (obj) {
    //   //     grid.setColumnProperty(obj, 'editable', false);
    //   //   });
    //   // }
    //   // columns.forEach(function (obj) {
    //   //   grid.setColumnProperty(obj, 'editable', true);
    //   // });
    // };

    // dataProvider.onRowDeleted = function (provider, row) {
    //   gridView.onCurrentRowChanged(
    //     gridView,
    //     gridView.getCurrent().dataRow,
    //     gridView.getCurrent().dataRow
    //   );
    //   // 데이터가 삭제되는 경우 onCurrentRowChange가 발생하지 않게 때문에 이벤트를 실행하는 코드를 추가.
    // };
    // dataProvider.onRowsDeleted = function (provider, rows) {
    //   gridView.onCurrentRowChanged(
    //     gridView,
    //     gridView.getCurrent().dataRow,
    //     gridView.getCurrent().dataRow
    //   );
    //   //
    // };

    // time option
    dataProvider.setFields({
      fieldName: 'insert_DT',
      dataType: 'datetime',
      datetimeFormat: 'yyyyMMdd',
    });

    // 그리드의 컬럼 레이아웃을 설정합니다.
    gridView.setColumnLayout(fundTypeLayout);

    // 그리드의 상태 바를 숨깁니다.
    //gridView.setStateBar({ visible: false });

    // 그리드의 고정 옵션을 설정합니다.
    gridView.setFixedOptions({});

    // 정렬 옵션을 비활성화합니다.
    gridView.setSortingOptions({ enabled: false });

    //행 번호를 1부터 시작하게 설정합니다.
    //gridView.setRowIndicator({ zeroBase: false });

    //그리드 푸터 생성 비활성화
    gridView.setFooter({ visible: false });

    //등록일 입력 비활성화
    //gridView.columnByName('insert_DT').editable = false;
    gridView.columnByName('dept_CD').editable = false;
    gridView.columnByName('dept_NM').editable = false;
    gridView.columnByName('emp_CD').editable = false;
    gridView.columnByName('kor_NM').editable = false;

    //컬럼 너비 자동 조절 설정
    gridView.setDisplayOptions({ fitStyle: 'evenFill' });

    // 행 추가,삽입 옵션을 설정합니다.
    gridView.setEditOptions({
      insertable: true, //행 삽입 가능 여부
      appendable: true, //행 추가 가능 여부
      commitWhenExitLast: true, //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
      //appendWhenExitLast: true, //Tap, Enter키 입력시 행추가 가능
      //displayEmptyEditRow: true, //마지막행에 항상 빈 행을 추가하는 기능
      enterToTab: true, //셀에 데이터 입력 후 다음 셀로 이동하기 여부 기능
      hintOnError: false, //편집 중에 에러가 있는 셀에 마우스가 위치할 때 에러 힌트 툴팁 표시 여부
      skipReadOnly: true, //readOnly, editable로 설정되 있는 컬럼 Enter키 입력시 foucs 스킵하는 기능
      useArrowKeys: true, //방향키로 셀 간 이동 가능 여부 기능
      //enterToNextRow: true,
      breakMergeOnEmpty: true, // 빈 셀일 때 머지 중단 여부
      crossWhenExitLast: true, // tab/enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동한다.
    });

    // 데이터 프로바이더와 그리드 뷰를 상태에 저장합니다.
    setDataProviderState(dataProvider);
    setGridViewState(gridView);

    setGridViewStrade(gridView);
    setDataProvider(dataProvider);

    // 컴포넌트가 언마운트될 때 정리 작업을 수행합니다.
    return () => {
      dataProvider.clearRows();
      gridView.destroy();
      dataProvider.destroy(); // useEffect는 한 번만 실행되도록 빈 배열을 의존성으로 설정합니다.
    };
  }, [tr_CD]);

  const onClickRemoveButton = () => {
    console.log('hiiiiiiii');

    //체크된 행 가져오기
    var rows = gridViewStrade.getCheckedRows();
    console.log('rows: ' + rows);
    dataProvider.softDeleting = true;

    //행 삭제하기
    dataProvider.removeRows(rows);

    //체크 해제하기
    //gridViewStrade.checkRows(rows, false);
  };

  return (
    <>
      <button onClick={onClickRemoveButton}>삭제</button>
      <div ref={realgridElement} className="StradeRealGridCSS"></div>
      {empMenuButton && (
        <EmpCodeHelpModal
          onChangeModalClose={onChangeModalClose}
          tr_CD={tr_CD}
          setEmpMenuButton={setEmpMenuButton}
          gridViewStrade={gridViewStrade}
          cellClickData={cellClickData}
        />
      )}
      {deptMenuButton && (
        <StradeCodeHelpModal
          onChangeModalClose={onChangeModalClose}
          setDeptMenuButton={setDeptMenuButton}
          gridViewStrade={gridViewStrade}
          cellClickData={cellClickData}
        />
        // <DeptCodeHelpModal
        //   onChangeModalClose={onChangeModalClose}
        //   tr_CD={tr_CD}
        //   setDeptMenuButton={setDeptMenuButton}
        //   gridViewStrade={gridViewStrade}
        //   cellClickData={cellClickData}
        // />
      )}
    </>
  );
};

export default StradeRollManageRealGrid;
