import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import {
  columns,
  fields,
  rows,
  fundTypeLayout,
} from './StradeRollManageRealgridData';
import 'realgrid/dist/realgrid-style.css'; // RealGrid CSS 추가
import { authAxiosInstance } from '../../../../../../axios/axiosInstance';
import EmpCodeHelpModal from '../../../Modal/EmpCodeHelpModal/EmpCodeHelpModal';

const StradeRollManageRealGrid = ({ tr_CD, FtradeGridData }) => {
  const [dataProviderState, setDataProviderState] = useState(null);
  const [gridViewState, setGridViewState] = useState(null);
  const [empMenuButton, setEmpMenuButton] = useState(false);
  const [empCodeHelpData, setEmpCodeHelpData] = useState({}); // empCodeHelp modal에서 선택된 data
  const [cellClickData, setCellClickData] = useState(''); // 현재 클릭한 CellData
  const [gridViewStrade, setGridViewStrade] = useState(); //
  const realgridElement = useRef(null);
  // RealGrid 컨테이너 엘리먼트를 참조합니다.

  // 모달창 Close
  const onChangeModalClose = () => {
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

    authAxiosInstance('accounting/user/Strade/stradeRollManageSearchList', {
      params,
    }).then(response => {
      console.log('reeeeeeeeee : ', response);
      if (response.data !== null && response.data.length > 0) {
        dataProvider.fillJsonData(response.data, {
          fillMode: 'set',
        });
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

    //onRowInserted
    dataProvider.onRowInserted = (provider, newCount) => {
      var current = gridView.getCurrent();
      console.log(current);
      var jsonData = dataProvider.getJsonRow(current.itemIndex);
      console.log('VALUE : ', jsonData);
      authAxiosInstance
        .post('accounting/user/Strade/stradeRollManageInsert', {
          ...jsonData,
          tr_CD: tr_CD,
          use_YN: '1',
        })
        .then(response => {
          console.log('hiiiiiiiiii:', response.data);
        });
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
      setEmpMenuButton(true);
      var current = gridView.getCurrent();
      console.log('current: ', current);
      setCellClickData(preview => current.itemIndex);
    };

    // time option
    dataProvider.setFields({
      fieldName: 'insert_DT',
      dataType: 'datetime',
      datetimeFormat: 'yyyyMMdd',
    });

    // 그리드의 컬럼 레이아웃을 설정합니다.
    gridView.setColumnLayout(fundTypeLayout);

    // 그리드의 상태 바를 숨깁니다.
    gridView.setStateBar({ visible: false });

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
      crossWhenExitLast: true, // tab/enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동한다.
    });

    // 데이터 프로바이더와 그리드 뷰를 상태에 저장합니다.
    setDataProviderState(dataProvider);
    setGridViewState(gridView);

    setGridViewStrade(gridView);

    // 컴포넌트가 언마운트될 때 정리 작업을 수행합니다.
    return () => {
      dataProvider.clearRows();
      gridView.destroy();
      dataProvider.destroy(); // useEffect는 한 번만 실행되도록 빈 배열을 의존성으로 설정합니다.
    };
  }, [tr_CD, empCodeHelpData]);

  return (
    <>
      <div ref={realgridElement} className="StradeRealGridCSS"></div>
      {empMenuButton && (
        <EmpCodeHelpModal
          onChangeModalClose={onChangeModalClose}
          tr_CD={tr_CD}
          setEmpMenuButton={setEmpMenuButton}
          setEmpCodeHelpData={setEmpCodeHelpData}
          gridViewStrade={gridViewStrade}
          cellClickData={cellClickData}
        />
      )}
    </>
  );
};

export default StradeRollManageRealGrid;
