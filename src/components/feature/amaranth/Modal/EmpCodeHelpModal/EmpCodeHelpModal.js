import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, fundTypeLayout } from './EmpCodeHelpRealGridData';
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import Modal from '../../../../common/modal/Modal';
import SelectBoxWrapper from '../../../../layout/amaranth/SelectBoxWrapper';
import EventButton from '../../../../common/button/EventButton';
import SelectBox from './../../../../common/box/SelectBox';
import { getNowJoinTime } from '../../../../../util/time';

const EmpCodeHelpModal = ({
  onChangeModalClose,
  tr_CD,
  setEmpMenuButton,
  setEmpCodeHelpData,
  gridViewStrade,
  cellClickData,
  dataProviderStrade,
  setEmpCheckDataList,
  empGridValue,
  setBottomButtonClick,
  setEmpGridValue,
  setDeptCheckDataList,
}) => {
  const { register, getValues } = useForm({
    mode: 'onChange',
  });
  const [dataProviderState, setDataProviderState] = useState(null);
  const [gridViewState, setGridViewState] = useState(null);
  const [enrlFGSelectData, setEnrlFGSelectData] = useState(0); // select 내 enrl 재직구분 데이터
  const realgridElement = useRef(null);

  const onClickSearchEmpList = () => {
    const { selectValue } = getValues();
    const params = {};
    params.ENRL_FG = enrlFGSelectData;

    if (selectValue !== '') {
      params.VALUE = selectValue;
    }

    authAxiosInstance('accounting/user/Strade/empCodeHelpList', {
      params,
    }).then(response => {
      dataProviderState.setRows(response.data);
    });
  };

  useEffect(() => {
    // RealGrid 컨테이너 엘리먼트를 참조합니다.
    const container = realgridElement.current;

    // 데이터 프로바이더 및 그리드 뷰를 초기화합니다.
    const dataProvider = new LocalDataProvider(true);
    const gridView = new GridView(container);

    // 그리드에 데이터 소스를 설정합니다.
    gridView.setDataSource(dataProvider);

    // 필드 및 열 정의를 설정합니다.
    dataProvider.setFields(fields);
    gridView.setColumns(columns);

    const params = {};
    params.TR_CD = tr_CD;
    params.ENRL_FG = enrlFGSelectData;
    if (empGridValue !== '') {
      params.VALUE = empGridValue;
    }

    authAxiosInstance('accounting/user/Strade/empCodeHelpList', {
      params,
    }).then(response => {
      dataProvider.setRows(response?.data);
    });

    setEmpGridValue('');
    //
    gridView.onCellDblClicked = function (grid, index) {
      var current = gridView.getCurrent();
      var jsonData = dataProvider.getJsonRow(current.itemIndex);
      const stradeRows = dataProviderStrade.getJsonRows(0, -1); // 마지막행 row
      const row = {
        emp_CD: jsonData.emp_CD,
        kor_NM: jsonData.kor_NM,
      };
      gridViewStrade.setCurrent({
        itemIndex: Object.keys(stradeRows).length,
        column: 'note',
      });
      gridViewStrade.setValues(cellClickData, row, false);
      gridViewStrade.setCurrent({
        itemIndex: cellClickData + 1,
        fieldName: 'note',
      });
      gridViewStrade.setFocus();
      gridViewStrade.setEditOptions({
        commitWhenExitLast: true, //Tap, Enter키 입력시 커밋(행행 유효성동 or 행 추가) 가능
        appendWhenExitLast: true, //Tap, Enter키 입력시 행추가 가능
        crossWhenExitLast: true,
      });
      setEmpMenuButton(false);
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
    gridView.setRowIndicator({ zeroBase: false });

    //그리드 푸터 생성 비활성화
    gridView.setFooter({ visible: false });

    //입력 비활성화
    gridView.columnByName('emp_CD').editable = false;
    gridView.columnByName('kor_NM').editable = false;
    gridView.columnByName('dept_NM').editable = false;
    gridView.columnByName('div_NM').editable = false;

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

    gridView.commit();
    gridView.cancel();

    // 컴포넌트가 언마운트될 때 정리 작업을 수행합니다.
    return () => {
      dataProvider.clearRows();
      gridView.destroy();
      dataProvider.destroy(); // useEffect는 한 번만 실행되도록 빈 배열을 의존성으로 설정합니다.
    };
  }, []);

  const onClickBottomButtonEvent = () => {
    gridViewStrade.editOptions.insertable = false;
    var rowDatas = [];
    const checkRows = gridViewState.getCheckedRows();
    const stradeRows = dataProviderState.getJsonRows(0, -1);
    var today = new Date();
    const date = getNowJoinTime(today);
    for (var i in checkRows) {
      var data = dataProviderState.getJsonRow(checkRows[i]);
      let rowData = {
        tr_CD: tr_CD,
        roll_FG: '2',
        dept_CD: null,
        dept_NM: null,
        emp_CD: data.emp_CD,
        kor_NM: data.kor_NM,
        insert_DT: date,
      };
      gridViewStrade.commit();
      gridViewStrade.cancel();
      rowDatas.push(rowData);
    }

    authAxiosInstance.post(
      'accounting/user/Strade/stradeRollInEmpInsert',
      rowDatas
    );

    const newDataList = rowDatas?.map(data =>
      data.roll_FG === '1'
        ? { ...data, roll_FG: '부서' }
        : data.roll_FG === '2'
        ? { ...data, roll_FG: '사용자' }
        : data
    );

    dataProviderStrade.insertRows(cellClickData, newDataList);
    dataProviderStrade.setRowState(cellClickData + rowDatas.length, 'none');
    setEmpCheckDataList(rowDatas);
    onChangeModalClose();
    setBottomButtonClick(false);
    gridViewStrade.setEditOptions({
      insertable: true, //행 삽입 가능 여부
      appendable: true, //행 추가 가능 여부
      commitWhenExitLast: true, //Tap, Enter키 입력시 커밋(행행 유효성동 or 행 추가) 가능
      appendWhenExitLast: true, //Tap, Enter키 입력시 행추가 가능
      crossWhenExitLast: true,
    });
  };

  return (
    <Modal
      width={'600px'}
      height={'600px'}
      title={'사원코드도움'}
      onClickEvent={onChangeModalClose}
      buttonYN={true}
      onClickBottomButtonEvent={onClickBottomButtonEvent}
    >
      <SelectBoxWrapper>
        <span className="liqModalTitle">검색어</span>
        <input
          type="text"
          className="textInputBox"
          {...register('selectValue')}
          defaultValue={empGridValue && empGridValue}
        />
        {/* <span className="rightSelectBoxPadding">재직여부</span>
        <SelectBox
          width={'100px'}
          data={['재직', '휴직', '퇴직']}
          state={enrlFGSelectData}
          setState={setEnrlFGSelectData}
        /> */}
        <div className="selectBoxButtonWrapper">
          <EventButton
            data={<i className="fa-solid fa-magnifying-glass"></i>}
            width={'-10px'}
            height={30}
            onClickEvent={onClickSearchEmpList}
          />
        </div>
      </SelectBoxWrapper>
      <div ref={realgridElement} className="StradeRealGridCSS"></div>
    </Modal>
  );
};

export default EmpCodeHelpModal;
