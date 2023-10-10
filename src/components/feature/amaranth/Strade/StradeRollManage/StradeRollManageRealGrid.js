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
import { getNowJoinTime } from '../../../../../util/time';

const StradeRollManageRealGrid = ({
  tr_CD,
  gridViewStrade,
  setGridViewStrade,
  dataProviderStrade,
  setDataProviderStrade,
  setDeleteCheck,
  setDeleteYN,
  setDeleteListCount,
}) => {
  const [empMenuButton, setEmpMenuButton] = useState(false);
  const [empGridValue, setEmpGridValue] = useState(false);
  const [deptMenuButton, setDeptMenuButton] = useState(false); // deptCodeHelp modal 클릭 상태
  const [deptGridValue, setDeptGridValue] = useState(''); // deptCodeHelp modal 클릭 상태
  const [cellClickData, setCellClickData] = useState(''); // 현재 클릭한 CellData
  const [empCheckDataList, setEmpCheckDataList] = useState(); // gridView 저장
  const [deptCheckDataList, setDeptCheckDataList] = useState(); // gridView 저장
  const [bottomButtonClick, setBottomButtonClick] = useState(false); // gridView 저장
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

        if (Object.keys(newDataList).length > 0) {
          dataProvider.fillJsonData(newDataList, {
            fillMode: 'set',
          });
        }

        // update 상태로 변경
        for (let i = 0; i < Object.keys(response.data).length; i++) {
          dataProvider.setRowState(i, 'updated');
        }
      }
    });
    gridView.closeProgress();

    //마지막행에 항상 빈 행을 추가하는 기능
    gridView.setEditOptions({ displayEmptyEditRow: true });

    //행 내 부서, 사원 유효성 검사
    gridView.onValidateRow = (grid, itemIndex, dataRow, inserting, values) => {
      const error = {};
      let editItem = gridView.getEditingItem();
      let rollFG;
      // try {
      //   if (
      //     editItem?.values.roll_FG === '부서' &&
      //     editItem?.values.dept_CD === undefined &&
      //     empMenuButton === false &&
      //     deptMenuButton === false
      //   ) {
      //     gridView.editOptions.appendable = false;
      //     gridView.editOptions.insertable = false;

      //     error.level = 'error';
      //     //error.message = '부서코드를 반드시 입력해주세요.';
      //     alert('부서코드를 반드시 입력해주세요.');
      //     gridView.setCurrent({ itemIndex: itemIndex, column: 'dept_CD' });
      //   } else if (
      //     editItem?.values.roll_FG === '사용자' &&
      //     editItem?.values.emp_CD === undefined
      //   ) {
      //     gridView.editOptions.appendable = false;
      //     gridView.editOptions.insertable = false;
      //     error.level = 'error';
      //     //error.message = '사원코드를 반드시 입력해주세요.';
      //     alert('사원코드를 반드시 입력해주세요.');
      //     gridView.setCurrent({ itemIndex: itemIndex, column: 'emp_CD' });
      //   }
      // } catch (e) {
      //   console.log(e);
      // }
      return error;
    };

    //칼럼 별 유효성 검사를 발생하는 이벤트를 처리합니다.
    gridView.onValidateColumn = async (
      grid,
      column,
      inserting,
      value,
      itemIndex,
      dataRow
    ) => {
      let editItem = gridView.getEditingItem();
      const error = {};
      console.log(value);
      console.log(column);
      console.log(dataRow);

      if (
        column.fieldName === 'dept_CD' &&
        grid.getValue(itemIndex, 'dept_CD') !== undefined &&
        gridView.getCurrent().dataRow === -1
      ) {
        if (
          column.values === undefined ||
          value === '' ||
          value === undefined
        ) {
          return;
        }
        await authAxiosInstance
          .post('accounting/user/Strade/gridUseDeptCd', {
            tr_CD: tr_CD,
            dept_CD: value,
          })
          .then(response => {
            try {
              if (response.data === '사용중') {
                gridView.setCurrent({ dataRow: dataRow, column: 'dept_CD' });
                gridView.setValues(itemIndex, { dept_CD: '' }, false);
                error.level = 'error';
                error.message = '사용중인 부서코드입니다.';

                gridView.columnByName('emp_CD').editable = false;
                gridView.columnByName('dept_CD').editable = true;
                gridView.columnByName('emp_CD').buttonVisibility = 'hidden';
                gridView.columnByName('dept_CD').buttonVisibility = 'default';
                gridView.setCurrent({
                  itemIndex: itemIndex + 1,
                  fieldName: 'dept_CD',
                });
                gridView.setFocus();
                alert('사용중인 부서코드입니다.');
                return;
              } else if (response.data === '부서없음') {
                gridView.setCurrent({ dataRow: dataRow, column: 'emp_CD' });
                gridView.setValues(itemIndex, { emp_CD: '' }, false);
                gridView.columnByName('emp_CD').editable = false;
                gridView.columnByName('dept_CD').editable = true;
                gridView.columnByName('emp_CD').buttonVisibility = 'hidden';
                gridView.columnByName('dept_CD').buttonVisibility = 'default';
                gridView.setCurrent({ dataRow: dataRow, column: 'dept_CD' });
                gridView.setValues(itemIndex, { dept_CD: '' }, false);
                error.level = 'error';
                error.message = '존재하지 않는 부서코드입니다.';
                setTimeout(function () {
                  gridView.setCurrent({
                    itemIndex: itemIndex + 1,
                    fieldName: 'dept_CD',
                  });
                }, 30);
                gridView.setFocus();
                alert('존재하지 않는 부서코드입니다.');
              }
            } catch (e) {
              console.log(e);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }

      if (
        column.fieldName === 'emp_CD' &&
        grid.getValue(itemIndex, 'emp_CD') !== undefined &&
        gridView.getCurrent().dataRow === -1
      ) {
        if (column.values === undefined || value === '') {
          return;
        }
        await authAxiosInstance
          .post('accounting/user/Strade/gridUseEmpCd', {
            tr_CD: tr_CD,
            emp_CD: value,
          })
          .then(response => {
            if (response.data === '사용중') {
              gridView.setCurrent({ dataRow: dataRow, column: 'emp_CD' });
              gridView.setValues(itemIndex, { emp_CD: '' }, false);
              error.level = 'error';
              error.message = '사용중인 사원코드입니다.';

              gridView.columnByName('emp_CD').editable = true;
              gridView.columnByName('dept_CD').editable = false;
              gridView.columnByName('emp_CD').buttonVisibility = 'default';
              gridView.columnByName('dept_CD').buttonVisibility = 'hidden';
              gridView.setCurrent({
                itemIndex: itemIndex + 1,
                fieldName: 'emp_CD',
              });
              gridView.setFocus();
              alert('사용중인 사원코드입니다.');
              return;
            } else if (response.data === '사원없음') {
              gridView.setCurrent({ dataRow: dataRow, column: 'emp_CD' });
              gridView.setValues(itemIndex, { emp_CD: '' }, false);
              gridView.columnByName('emp_CD').editable = true;
              gridView.columnByName('dept_CD').editable = false;
              gridView.columnByName('emp_CD').buttonVisibility = 'default';
              gridView.columnByName('dept_CD').buttonVisibility = 'hidden';
              gridView.setCurrent({ dataRow: dataRow, column: 'dept_CD' });
              gridView.setValues(itemIndex, { dept_CD: '' }, false);
              error.level = 'error';
              error.message = '존재하지 않는 사원코드입니다.';
              gridView.setCurrent({
                itemIndex: itemIndex + 1,
                fieldName: 'emp_CD',
              });
              gridView.setFocus();
              alert('존재하지 않는 사원코드입니다.');
            }
          })
          .catch(error => {
            console.error(error);
          });
      }

      return error;
    };

    // onRowInserting insert 전 확인 과정
    dataProvider.onRowInserting = async (provider, row, values) => {
      let editItem = gridView.getEditingItem();
      if (
        (editItem?.values.dept_CD === undefined ||
          editItem?.values.dept_CD === '') &&
        (editItem?.values.emp_CD === undefined ||
          editItem?.values.emp_CD === '')
      ) {
        return false;
      } else if (
        editItem?.values.dept_CD !== undefined ||
        editItem?.values.emp_CD !== undefined
      ) {
        return true;
      }
    };

    //onRowInserted
    dataProvider.onRowInserted = async (provider, newCount) => {
      console.log(`onRowInserted`, newCount, provider);
      let editItem = gridView.getEditingItem();
      let rollFG;
      let data = {};
      if (editItem?.values.roll_FG === '부서') {
        rollFG = '1';
      } else if (editItem?.values.roll_FG === '사용자') {
        rollFG = '2';
      }
      if (
        (editItem?.values.dept_CD !== undefined &&
          editItem?.values.dept_CD !== '') ^
        (editItem?.values.emp_CD !== undefined &&
          editItem?.values.emp_CD !== '')
      ) {
        gridView.commit();
        var today = new Date();
        const date = getNowJoinTime(today);
        dataProvider.setValue(editItem.itemIndex, 'insert_DT', date);

        gridView.commit();
        gridView.setEditOptions({
          insertable: true,
          appendable: true,
          crossWhenExitLast: true,
        });
        gridView.commit();
        authAxiosInstance
          .post('accounting/user/Strade/stradeRollManageInsert', {
            ...editItem?.values,
            tr_CD: tr_CD,
            use_YN: '1',
            roll_FG: rollFG,
          })
          .then(response => {
            console.log('hiiiiiiiiii:', response.data);
          });
      }

      gridView.columnByName('emp_CD').editable = false;
      gridView.columnByName('dept_CD').editable = false;
      gridView.columnByName('emp_CD').buttonVisibility = 'hidden';
      gridView.columnByName('dept_CD').buttonVisibility = 'hidden';
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
      var current = gridView.getCurrent();
      setEmpGridValue('');
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
      gridView.editOptions.appendable = false;
      gridView.editOptions.crossWhenExitLast = false;
      gridView.editOptions.enterToTab = false;
      if (field === 2 && rowValue !== '') {
        const response = await authAxiosInstance(
          'accounting/user/Strade/gridDeptCd',
          { params: { TR_CD: tr_CD, DEPT_CD: editItem.values.dept_CD } }
        );
        if (response.data !== null && response.data !== '') {
          const data = {
            dept_CD: editItem.values.dept_CD,
            dept_NM: response.data,
          };
          gridView.setValues(itemIndex, data, false);
          gridView.editOptions.appendable = true;
        } else if (response.data === '') {
        } else {
          // 모달창 띄우기
          gridView.setValues(itemIndex, { dept_CD: '' }, false);
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
        if (response.data !== null && response.data !== '') {
          const data = {
            emp_CD: editItem.values.emp_CD,
            kor_NM: response.data,
          };
          gridView.setValues(itemIndex, data, false);
          gridView.editOptions.appendable = true;
        } else if (response.data === '') {
        } else {
          // 모달창 띄우기
          gridView.setValues(itemIndex, { emp_CD: '' }, false);
          setEmpMenuButton(true);
          setEmpGridValue(editItem.values.emp_CD);
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

      gridView.editOptions.crossWhenExitLast = true;
    };

    // 변경되면 이벤트 발생
    gridView.onEditChange = (grid, index, value) => {
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
        dataProvider.getRowState(clickData.dataRow) === 'updated' &&
        dataProvider.getRowState(clickData.dataRow) === 'created'
      ) {
        grid.editOptions.editable = false;
      } else {
        grid.editOptions.editable = true;
      }
    };

    // 마지막행 전에 insert
    gridView.onKeyDown = (grid, event) => {
      gridView.editOptions.appendable = false;
      gridView.editOptions.insertable = false;
      gridView.editOptions.crossWhenExitLast = false;
      gridView.editOptions.enterToTab = false;
      let editItem = gridView.getEditingItem();
      if (event.code === 'Tab' || event.code === 'Enter') {
        const displayCol = gridView.getDisplayColumns();
        let beforeReadOnlyCol;
        for (let i = 0; i < displayCol.length; i++) {
          if (displayCol[i].readOnly === true) {
            beforeReadOnlyCol = displayCol[i - 1].name;
          }
        }
        if (
          gridView.getCurrent().itemIndex + 1 === gridView.getItemCount() &&
          gridView.getCurrent().column === beforeReadOnlyCol &&
          ((editItem.values?.dept_NM !== undefined &&
            editItem.values?.dept_NM !== '') ||
            (editItem.values?.kor_NM !== '' &&
              editItem.values?.kor_NM !== undefined))
        ) {
          gridView.editOptions.appendable = true;
          gridView.editOptions.insertable = true;
          gridView.editOptions.crossWhenExitLast = true;
          gridView.editOptions.enterToTab = true;
          gridView.commit();
          var today = new Date();
          const date = getNowJoinTime(today);
          gridView.commit();
          dataProvider.setValue(grid.getItemCount() - 2, 'insert_DT', date);
          setTimeout(function () {
            gridView.setCurrent({
              itemIndex: grid.getItemCount() + 1,
              fieldName: 'roll_FG',
            });
          }, 30);
          gridView.commit();
        }
      }
    };

    gridView.setHeader({
      height: 35,
      background: 'red',
      foreground: '#fff',
      fontSize: 14,
      paddingLeft: 10,
    });
    gridView.setDisplayOptions({
      fitStyle: 'evenFill',
      rowHeight: 35,
      columnMovable: false,
      selectionStyle: 'none',
    });

    // commit 되었을 시
    gridView.onEditCommit = function (grid, index, oldValue, newValue) {
      if (index.fieldIndex === 6) {
        var curr = gridView.getCurrent();
        dataProvider.setRowState(curr.itemIndex, 'created', true);
        var today = new Date();
        const date = getNowJoinTime(today);
        gridView.commit();
        dataProvider.setValue(grid.getItemCount() - 2, 'insert_DT', date);
        gridView.commit();
        setTimeout(function () {
          gridView.setCurrent({
            itemIndex: grid.getItemCount() + 1,
            fieldName: 'roll_FG',
          });
        }, 30);
        gridView.commit();
      }
    };

    // check button click 시 삭제 우선 그리드로 변경
    gridView.onItemChecked = () => {
      const checkedRows = gridView.getCheckedItems();
      if (checkedRows.length > 0 || gridView.isAllChecked()) {
        setDeleteCheck('gridDelete');
        setDeleteListCount(checkedRows.length);
        setDeleteYN(true);
      } else {
        setDeleteCheck('');
        setDeleteYN(false);
      }
    };

    gridView.onItemAllChecked = (grid, checked) => {
      console.log('All checked as ' + checked);
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
    //gridView.columnByName('insert_DT').editable = false;
    gridView.columnByName('insert_DT').readOnly = true;
    gridView.columnByName('dept_CD').editable = false;
    gridView.columnByName('dept_NM').editable = false;
    gridView.columnByName('emp_CD').editable = false;
    gridView.columnByName('kor_NM').editable = false;

    gridView.editOptions.appendWhenExitLast = true; // Tab 또는 Enter 키로 마지막 셀을 벗어날 때 행 추가 여부
    gridView.editOptions.commitWhenExitLast = true; // Tab 이나 Enter 키로 셀을 벗어날 때 행을 commit 할지의 여부
    gridView.editOptions.crossWhenExitLast = true; // Tab이 이나 Enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동할지의 여부
    gridView.editOptions.skipReadOnly = true; // 컬럼간 이동시 readOnly 셀을 건너뛰고 이동할지에 대한 여부.

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
      //useArrowKeys: true, //방향키로 셀 간 이동 가능 여부 기능
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

  return (
    <>
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
          setDeptCheckDataList={setDeptCheckDataList}
          empGridValue={empGridValue}
          setEmpGridValue={setEmpGridValue}
          setBottomButtonClick={setBottomButtonClick}
          setDeleteYN={setDeleteYN}
          setDeleteListCount={setDeleteListCount}
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
          setBottomButtonClick={setBottomButtonClick}
          setDeleteYN={setDeleteYN}
          setDeleteListCount={setDeleteListCount}
        />
      )}
    </>
  );
};

export default StradeRollManageRealGrid;
