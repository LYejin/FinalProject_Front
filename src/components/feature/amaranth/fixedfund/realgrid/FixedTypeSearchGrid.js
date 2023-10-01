import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { GridView, LocalDataProvider, onChangeOpenCash } from 'realgrid';
import {
  columns,
  fields,
  fundTypeSearchLayout,
} from '../../fundType/Realgrid-Data-FundType';

const FundTypeSearchGrid = ({
  loadRowData,
  onChangeOpenCash,
  marsterGrid,
  FixedFuntState,
  onRowSelected,
}) => {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const realgridElement = useRef(null);

  useEffect(() => {
    // RealGrid 컨테이너 엘리먼트를 참조합니다.
    const container = realgridElement.current;

    // 데이터 프로바이더 및 그리드 뷰를 초기화합니다.
    const provider = new LocalDataProvider(true);
    const grid = new GridView(container);

    // 그리드에 데이터 소스를 설정합니다.
    grid.setDataSource(provider);

    // 필드 및 열 정의를 설정합니다.
    provider.setFields(fields);
    grid.setColumns(columns);

    //마운트 시 로드될 행 데이터 출력
    loadRowData()
      .then(loadData => {
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

    // 그리드의 컬럼 레이아웃을 설정합니다.
    grid.setColumnLayout(fundTypeSearchLayout);

    // 그리드의 상태 바를 숨깁니다.
    grid.setStateBar({ visible: false });

    // 그리드의 고정 옵션을 설정합니다.
    grid.setFixedOptions({ rowEditable: true });

    // 정렬 옵션을 비활성화합니다.
    grid.setSortingOptions({ enabled: false });

    //행 번호를 1부터 시작하게 설정합니다.
    grid.setRowIndicator({ zeroBase: false, visible: false });

    //그리드 체크바 비활성화
    grid.setCheckBar({ visible: false });

    //그리드 푸터 생성 비활성화
    grid.setFooter({ visible: false });

    //상위자금과목명 입력 비활성화
    grid.columnByName('SUM_NM').editable = false;

    //컬럼 너비 자동 조절 설정
    grid.setDisplayOptions({ fitStyle: 'evenFill' });

    // 행 수정 데이터 기능 비활성화
    grid.setEditOptions({ editable: false });

    //특정 행의 자금종목코드 데이터 불러오기 기능
    grid.onCellDblClicked = function (grid, clickData) {
      if (FixedFuntState === 1) {
        const clickRowData = grid.getValues(clickData.itemIndex);
        const insertData = {
          cash_CD: clickRowData?.CASH_CD,
          cash_NM: clickRowData?.CASH_NM,
        };
        onRowSelected(insertData);
        onChangeOpenCash();
        return;
      }
      const nowLow = marsterGrid.grid.getCurrent().itemIndex;
      const marsterGrid_CASH_CD = marsterGrid.grid.getValue(nowLow, 'CASH_CD');

      const clickRowData = grid.getValues(clickData.itemIndex);
      const insertData = {
        cash_CD: clickRowData?.CASH_CD,
        cash_NM: clickRowData?.CASH_NM,
      };

      onChangeOpenCash();
      //마스터 그리드에 자금종목코드 데이터 불러와 저장하기
      marsterGrid.grid.setValues(nowLow, insertData, true);
      marsterGrid.grid.setCurrent({
        itemIndex: nowLow,
        column: 'LOW_YN',
      });
      marsterGrid.grid.setFocus();

      marsterGrid.grid.setEditOptions({
        commitWhenExitLast: true, //Tap, Enter키 입력시 커밋(행행 유효성동 or 행 추가) 가능
        appendWhenExitLast: true, //Tap, Enter키 입력시 행추가 가능
        crossWhenExitLast: true,
      });
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

  return <div ref={realgridElement} className="fundTypeSerrchSetting"></div>;
};

export default FundTypeSearchGrid;
