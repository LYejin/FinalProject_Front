import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';

import {
  WidthColumns,
  WidthFields,
  columns,
  fields,
  fundTypeSearchLayout,
  fundTypeWidthViewLayout,
  s_columns,
} from './Realgrid-Data-FundType';
import './FundTypeWidthView.css';
const FundTypeWidthView = ({
  loadTreeRowData,
  excelExport,
  excelImport,
  setMenuGrid,
}) => {
  // RealGrid 컨테이너 엘리먼트를 참조합니다.
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const realgridElement = useRef(null);
  const fileInput = useRef();

  const handleFileInputClick = (e, grid) => {
    fileInput.current.click(); // Trigger file input click
  };
  useEffect(() => {
    // RealGrid 컨테이너 엘리먼트를 참조합니다.
    const container = realgridElement.current;

    // 데이터 프로바이더 및 그리드 뷰를 초기화합니다.
    const provider = new LocalDataProvider(true);
    const grid = new GridView(container);

    //타 컴포넌트에서도 서치 그리드를 참조(공유) 가능하게 전역 state변수 초기화

    // 그리드에 데이터 소스를 설정합니다.
    grid.setDataSource(provider);

    // 필드 및 열 정의를 설정합니다.
    provider.setFields(WidthFields);
    grid.setColumns(WidthColumns);

    //마운트 시 로드될 행 데이터 출력

    grid.showProgress();
    loadTreeRowData()
      .then(loadData => {
        grid.closeProgress();
        provider.fillJsonData(loadData, { fillMode: 'set' });
        grid.setCurrent({
          itemIndex: 0,
          column: 'CASH_FG',
        });
        grid.setFocus();
      })
      .catch(error => {
        console.error(error);
      });

    // // 그리드의 컬럼 레이아웃을 설정합니다.
    grid.setColumnLayout(fundTypeWidthViewLayout);

    // 그리드의 상태 바를 숨깁니다.
    grid.setStateBar({ visible: false });

    // 그리드의 고정 옵션을 설정합니다.
    grid.setFixedOptions({ rowEditable: true });

    // 정렬 옵션을 비활성화합니다.
    grid.setSortingOptions({ enabled: false });

    //행 번호를 1부터 시작하게 설정합니다.
    grid.setRowIndicator({ zeroBase: false, headText: '' });

    //그리드 체크바 비활성화
    grid.setCheckBar({ visible: false });

    //그리드 푸터 생성 비활성화
    grid.setFooter({ visible: false });

    //컬럼 너비 자동 조절 설정
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

    // 행 수정 데이터 기능 비활성화
    grid.setEditOptions({ editable: false });

    //(컬럼 너비) + (행 높이) 자동 조절 설정
    grid.setDisplayOptions({ fitStyle: 'evenFill', rowHeight: 30 });

    //헤더 높이 자동 조절 설정
    grid.setHeader({ height: 30 });

    //포커스된 행의 배경색 스타일 적용
    grid.setDisplayOptions({ useFocusClass: true });

    grid.setContextMenu([
      {
        label: '엑셀 내보내기',
        tag: 'excelExport',
      },
      {
        label: '엑셀 가져오기',
        tag: 'excelImport',
      },
    ]);

    // 그리드 내에서 컨텍스트 메뉴 항목이 클릭될 때 실행되는 함수를 정의합니다.
    grid.onContextMenuItemClicked = function (grid, item, clickData) {
      //handleXlsFile; excelExport excelImport
      if (item.tag === 'excelExport') {
        excelExport(grid);
      } else if (item.tag === 'excelImport') {
        setMenuGrid(prveData => ({
          ...prveData,
          grid: grid,
        }));
        handleFileInputClick(grid);
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

    // 데이터 프로바이더와 그리드 뷰를 상태에 저장합니다.
    setDataProvider(provider);
    setGridView(grid);

    // 컴포넌트가 언마운트될 때 정리 작업을 수행합니다.
    return () => {
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
        style={{ display: 'none' }}
        onChange={excelImport}
      />
      <div ref={realgridElement} className="fundTypeWidthView"></div>
    </>
  );
};

export default FundTypeWidthView;