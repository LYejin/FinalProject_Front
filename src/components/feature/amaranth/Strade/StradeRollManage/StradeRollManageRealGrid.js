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
import Swal from 'sweetalert2';

const StradeRollManageRealGrid = ({ tr_CD }) => {
  const [gridViewStrade, setGridViewStrade] = useState(null); // gridView 저장
  const [dataProviderStrade, setDataProviderStrade] = useState(null); // DataProvider 저장
  const [empMenuButton, setEmpMenuButton] = useState(false);
  const [empGridValue, setEmpGridValue] = useState(false);
  const [deptMenuButton, setDeptMenuButton] = useState(false); // deptCodeHelp modal 클릭 상태
  const [deptGridValue, setDeptGridValue] = useState(''); // deptCodeHelp modal 클릭 상태
  const [cellClickData, setCellClickData] = useState(''); // 현재 클릭한 CellData
  const [empCheckDataList, setEmpCheckDataList] = useState(); // gridView 저장
  const [deptCheckDataList, setDeptCheckDataList] = useState(); // gridView 저장
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
    gridView.commit();
    gridView.cancel();

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
        const newDataList = response.data?.map(data =>
          data.roll_FG === '1'
            ? { ...data, roll_FG: '부서' }
            : data.roll_FG === '2'
            ? { ...data, roll_FG: '사용자' }
            : data
        );
        newDataList.map(
          data => (data.insert_DT = String(data.insert_DT).slice(0, 10))
        );
        console.log('----------------', newDataList);
        dataProvider.fillJsonData(newDataList, {
          fillMode: 'set',
        });

        // update 상태로 변경
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          dataProvider.setRowState(i, 'updated');
        }
      }
    });
    gridView.closeProgress();

    //마지막행에 항상 빈 행을 추가하는 기능
    gridView.setEditOptions({ displayEmptyEditRow: true });
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

    dataProvider.onRowMoving = function (provider, row, newRow) {
      alert('provider.onRowMoving: ' + row + ' to ' + newRow);

      return true;
    };

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
      alert('onRowInserting ');
      let editItem = gridView.getEditingItem();
      if (
        editItem?.values.dept_CD === undefined &&
        editItem?.values.emp_CD === undefined
      ) {
        return false;
      } else if (
        editItem?.values.dept_CD !== undefined ||
        editItem?.values.emp_CD !== undefined
      ) {
        return true;
      } else {
        return false;
      }
    };

    gridView.onEditCanceled = function (grid, index) {
      console.log(
        'grid.onEditCanceled driven, edit index=' + JSON.stringify(index)
      );
    };

    //onRowInserted
    dataProvider.onRowInserted = (provider, newCount) => {
      console.log(`onRowInserted`, newCount, provider);
      let editItem = gridView.getEditingItem();
      let rollFG;
      if (editItem?.values.roll_FG === '부서') {
        rollFG = '1';
      } else if (editItem?.values.roll_FG === '사용자') {
        rollFG = '2';
      }
      if (editItem?.values.dept_CD !== '' || editItem?.values.emp_CD !== '') {
        gridView.setEditOptions({ insertable: true });
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

    // row 업데이트 시
    dataProvider.onRowUpdated = function (provider, row) {
      var current = gridView.getCurrent();
      var jsonData = dataProvider.getJsonRow(current.itemIndex);
      authAxiosInstance
        .post('accounting/user/Strade/stradeRollManageUpdate', {
          ...jsonData,
          tr_CD: tr_CD,
          trmg_SQ: jsonData.trmg_SQ,
          use_YN: '1',
        })
        .then(response => {
          console.log('onRowUpdated Error :', response.data);
        });
    };

    // 메뉴 클릭시 이벤트
    gridView.onCellButtonClicked = function (grid, index, column) {
      console.log('--------------------', grid, index, column);
      var current = gridView.getCurrent();
      setEmpGridValue('');
      console.log('current: ', current);
      if (index.fieldIndex === 2) {
        setDeptMenuButton(true);
      } else if (index.fieldIndex === 4) {
        setEmpMenuButton(true);
      }
      setCellClickData(preview => current.itemIndex);
    };

    // 셀이 수정되었을 시
    gridView.onCellEdited = async (grid, itemIndex, row, field) => {
      let rowValue = gridView.getValue(row, 'dept_CD');
      let editItem = gridView.getEditingItem();
      if (field === 2 && rowValue !== '') {
        const response = await authAxiosInstance(
          'accounting/user/Strade/gridDeptCd',
          { params: { TR_CD: tr_CD, DEPT_CD: editItem.values.dept_CD } }
        );
        if (response.data !== null) {
          const data = {
            dept_CD: editItem.values.dept_CD,
            dept_NM: response.data,
          };
          gridView.setValues(itemIndex, data, false);
        } else {
          // 모달창 띄우기
          setDeptMenuButton(true);
          setDeptGridValue(editItem.values.dept_CD);
          setCellClickData(itemIndex);
        }
      }
      if (field === 4 && rowValue !== '') {
        const response = await authAxiosInstance(
          'accounting/user/Strade/gridEmpCode',
          { params: { TR_CD: tr_CD, EMP_CD: editItem.values.emp_CD } }
        );
        if (response.data !== null) {
          const data = {
            emp_CD: editItem.values.emp_CD,
            kor_NM: response.data,
          };
          gridView.setValues(itemIndex, data, false);
        } else {
          // 모달창 띄우기
          setEmpGridValue(editItem.values.emp_CD);
          setEmpMenuButton(true);
          setCellClickData(itemIndex);
        }
      }
      if (field === 6) {
        gridView.commit();
        // //포커스된 셀 변경
        gridView.setCurrent({
          itemIndex: itemIndex + 1,
          column: 'roll_FG',
        });
      }
    };

    // 변경되면 이벤트 발생
    gridView.onEditChange = (grid, index, value) => {
      console.log('iiiii');
      if (value === '부서' || value === '1') {
        const data = {
          emp_CD: '',
          kor_NM: '',
        };
        gridView.setValues(index.itemIndex, data, false);
        gridView.columnByName('dept_CD').editable = true;
        gridView.columnByName('emp_CD').editable = false;
        gridView.columnByName('dept_CD').buttonVisibility = 'default';
        gridView.columnByName('emp_CD').buttonVisibility = 'hidden';
      } else if (value === '사용자' || value === '2') {
        const data = {
          dept_CD: '',
          dept_NM: '',
        };
        gridView.setValues(index.itemIndex, data, false);
        gridView.columnByName('emp_CD').editable = true;
        gridView.columnByName('dept_CD').editable = false;
        gridView.columnByName('emp_CD').buttonVisibility = 'default';
        gridView.columnByName('dept_CD').buttonVisibility = 'hidden';
      }
    };

    // 셀 클릭시 이벤트
    gridView.onCellClicked = function (grid, clickData) {
      if (
        clickData.dataRow >= 0 &&
        dataProvider.getRowState(clickData.dataRow) === 'updated'
      ) {
        console.log(dataProvider.getRowState(clickData.dataRow));
        grid.editOptions.editable = false;
      } else {
        grid.editOptions.editable = true;
      }
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

    gridView.onCurrentChanging = (grid, oldIndex, newIndex) => {
      console.log('jiii');
      // let current = gridView.getCurrent();
      // let editItem = gridView.getEditingItem(); // 변경중인 데이터 가져오기
      // let rollFGData = editItem?.values ? editItem.values?.roll_FG : false;
      // const stradeRows = dataProvider.getJsonRows(0, -1); // 마지막행 row
      // var value = gridView.getEditValue();

      // console.log('value: ' + value);
      // console.log('current : ', current);
      // if (oldIndex.fieldName === 'roll_FG' && rollFGData === '부서') {
      //   gridView.columnByName('dept_CD').editable = true;
      //   gridView.columnByName('emp_CD').editable = false;
      //   gridView.columnByName('dept_CD').buttonVisibility = 'default';
      //   gridView.columnByName('emp_CD').buttonVisibility = 'hidden';
      //   console.log(grid, newIndex);
      //   console.log('vla : ', value);
      //   gridView.setCurrent({
      //     itemIndex: Object.keys(stradeRows).length,
      //     column: 'dept_CD',
      //   });
      //   newIndex.fieldIndex = 1;
      // } else if (oldIndex.fieldName === 'roll_FG' && rollFGData === '사용자') {
      //   gridView.columnByName('emp_CD').editable = true;
      //   gridView.columnByName('dept_CD').editable = false;
      //   gridView.columnByName('emp_CD').buttonVisibility = 'default';
      //   gridView.columnByName('dept_CD').buttonVisibility = 'hidden';
      //   gridView.setCurrent({
      //     itemIndex: Object.keys(stradeRows).length,
      //     column: 'emp_CD',
      //   });
      //   newIndex.fieldIndex = 3;
      // }
    };

    // commit 되었을 시
    gridView.onEditCommit = function (grid, index, oldValue, newValue) {
      if (index.fieldIndex === 6) {
        var curr = gridView.getCurrent();
        dataProvider.setRowState(curr.itemIndex, 'created', true);

        // //포커스된 셀 변경
        // gridView.setCurrent({
        //   itemIndex: index.itemIndex + 1,
        //   column: 'roll_FG',
        // });
      }
    };

    // // 현재 셀 값이 변경되었을 시 발생되는 이벤트
    gridView.onCurrentChanged = function (grid, newIndex) {
      console.log(grid, newIndex);
      if (newIndex.fieldIndex === 6) {
        grid.editOptions.insertable = true;
        grid.editOptions.appendWhenExitLast = true;
        //dataProvider.setRowState(newIndex.itemIndex, 'created');
      }
    };

    gridView.onColumnPropertyChanged = function (
      grid,
      column,
      property,
      newValue,
      oldValue
    ) {
      console.log(column + 's props werer changed!');
    };

    gridView.onCurrentRowChanged = function (grid, oldRow, newRow) {
      // console.log(newRow);
      // console.log('Ggggggggg', grid);
      // var current = gridView.getCurrent();
      // console.log('currentcurrentcurrentcurrent', current);
      // if (current.dataRow >= 0) {
      //   grid.editOptions.editable = false;
      // } else {
      //   grid.editOptions.editable = true;
      //   gridView.setEditOptions({ appendable: false });
      // }
      // if (!editable) {
      //   // 신규행이 아니면. 전체컬럼 editable:false
      //   columns.forEach(function (obj) {
      //     grid.setColumnProperty(obj, 'editable', false);
      //   });
      // }
      // columns.forEach(function (obj) {
      //   grid.setColumnProperty(obj, 'editable', true);
      // });
    };

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

    // GridView에서 삭제를 사용하는 경우 반드시 설정
    gridView.editOptions.deletable = true;

    //등록일 입력 비활성화
    gridView.columnByName('insert_DT').editable = false;
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
      appendWhenExitLast: true, //Tap, Enter키 입력시 행추가 가능
      //displayEmptyEditRow: true, //마지막행에 항상 빈 행을 추가하는 기능
      enterToTab: true, //셀에 데이터 입력 후 다음 셀로 이동하기 여부 기능
      hintOnError: false, //편집 중에 에러가 있는 셀에 마우스가 위치할 때 에러 힌트 툴팁 표시 여부
      skipReadOnly: true, //readOnly, editable로 설정되 있는 컬럼 Enter키 입력시 foucs 스킵하는 기능
      useArrowKeys: true, //방향키로 셀 간 이동 가능 여부 기능
      enterToNextRow: true,
      breakMergeOnEmpty: true, // 빈 셀일 때 머지 중단 여부
      crossWhenExitLast: true, // tab/enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동한다.
    });

    // 데이터 프로바이더와 그리드 뷰를 상태에 저장합니다.
    setDataProviderStrade(dataProvider);
    setGridViewStrade(gridView);

    gridView.commit();
    gridView.cancel();

    // 컴포넌트가 언마운트될 때 정리 작업을 수행합니다.
    return () => {
      gridView.cancel();
      dataProvider.clearRows();
      gridView.destroy();
      dataProvider.destroy(); // useEffect는 한 번만 실행되도록 빈 배열을 의존성으로 설정합니다.
    };
  }, [tr_CD, empCheckDataList, deptCheckDataList]);

  const onClickRemoveButton = () => {
    console.log('hiiiiiiii');

    //체크된 행 가져오기
    var rows = gridViewStrade.getCheckedRows();
    console.log('rows: ' + rows);
    dataProviderStrade.softDeleting = true;

    //행 삭제하기
    dataProviderStrade.removeRows(rows);

    //체크 해제하기
    //gridViewStrade.checkRows(rows, false);
  };

  const handleDeleteRows = async () => {
    // 체크된 행들의 sq_NB값을 수집
    gridViewStrade.cancel();
    const checkedRows = gridViewStrade.getCheckedItems(); // 실제 메소드 이름은 realgrid 문서를 참고해주세요.
    console.log('요고얌', checkedRows);

    // 체크된 행이 없거나 20개를 초과한 경우 alert을 띄움
    if (checkedRows.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    if (checkedRows.length > 20) {
      alert('한 번에 20개 이하의 항목만 삭제할 수 있습니다.');
      return;
    }
    const sqNbsToDelete = checkedRows.map(row => {
      // 데이터 프로바이더에서 해당 행의 sq_NB 컬럼의 값을 가져옵니다.
      const sqNbValue = dataProviderStrade.getValue(row, 'trmg_SQ');
      return sqNbValue;
    });

    console.log('여기서확인하래요', sqNbsToDelete); // 이 부분에서 제대로 된 sq_NB 값들이 출력되는지 확인하세요.
    try {
      // 서버에 삭제 요청
      const response = await authAxiosInstance.delete(
        'accounting/user/Strade/stradeRollManageDelete',
        { data: { trmg_SQ: sqNbsToDelete, tr_CD: tr_CD } }
      );
      // 알림 표시
      Swal.fire({
        icon: 'success',
        title: '성공적으로 삭제되었습니다!',
        showConfirmButton: false,
        timer: 1500,
      });
      dataProviderStrade.removeRows(checkedRows);
    } catch (error) {
      console.error('Failed to delete rows:', error);
    }
  };

  return (
    <>
      <button onClick={handleDeleteRows} type="button">
        삭제
      </button>
      <div ref={realgridElement} className="StradeRealGridCSS"></div>
      {empMenuButton && (
        <EmpCodeHelpModal
          onChangeModalClose={onChangeModalClose}
          tr_CD={tr_CD}
          setEmpMenuButton={setEmpMenuButton}
          gridViewStrade={gridViewStrade}
          cellClickData={cellClickData}
          dataProviderStrade={dataProviderStrade}
          setEmpCheckDataList={setEmpCheckDataList}
          empGridValue={empGridValue}
          setEmpGridValue={setEmpGridValue}
        />
      )}
      {deptMenuButton && (
        <DeptCodeHelpModal
          onChangeModalClose={onChangeModalClose}
          tr_CD={tr_CD}
          setDeptMenuButton={setDeptMenuButton}
          gridViewStrade={gridViewStrade}
          cellClickData={cellClickData}
          dataProviderStrade={dataProviderStrade}
          setDeptCheckDataList={setDeptCheckDataList}
          deptGridValue={deptGridValue}
          setDeptGridValue={setDeptGridValue}
        />
      )}
    </>
  );
};

export default StradeRollManageRealGrid;
