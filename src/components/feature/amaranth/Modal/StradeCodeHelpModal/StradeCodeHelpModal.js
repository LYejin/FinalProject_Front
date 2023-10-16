import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, fundTypeLayout } from './StradeCodeHelpRealGridData';
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import Modal from '../../../../common/modal/Modal';
import SelectBoxWrapper from '../../../../layout/amaranth/SelectBoxWrapper';
import EventButton from '../../../../common/button/EventButton';
import StradeCodeHelpUseYNSelectBox from './StradeCodeHelpUseYNSelectBox';
import { json } from '../../../../../../node_modules/react-router-dom/dist/index';

const StradeCodeHelpModal = ({
  onChangeModalClose,
  gridViewStrade,
  cellClickData,
  tr_FG,
  marsterGrid,
  onRowSelected,
  InputState,
}) => {
  const { register, getValues } = useForm({
    mode: 'onChange',
  });
  const [dataProviderState, setDataProviderState] = useState(null);
  const [gridViewState, setGridViewState] = useState(null);
  const [useYNSelectData, setUseYNSelectData] = useState(1); // selectbox 사용여부
  const realgridElement = useRef(null);

  const onClickSearchEmpList = () => {
    const { selectValue } = getValues();
    const params = {};
    params.USE_YN = useYNSelectData;

    if (selectValue !== '') {
      params.VALUE = selectValue;
    }

    if (tr_FG !== '') {
      params.TR_FG = tr_FG;
    }

    authAxiosInstance('accounting/user/Strade/stradeCodeHelpList', {
      params,
    }).then(response => {
      if (response.data !== null && Object.keys(response.data).length > 0) {
        dataProviderState.setRows(response.data);
      }
    });
  };

  let responseData = [];

  useEffect(() => {
    // RealGrid 컨테이너 엘리먼트를 참조합니다.
    const container = realgridElement.current;

    // 데이터 프로바이더 및 그리드 뷰를 초기화합니다.
    const dataProvider = new LocalDataProvider(true);
    const gridView = new GridView(container);

    // 그리드에 데이터 소스를 설정합니다.
    gridView.setDataSource(dataProvider);

    // 처음 List 요청 시 거래처 구분에 따라 요청
    const params = {};

    if (tr_FG !== '') {
      params.TR_FG = tr_FG;
    }

    // 필드 및 열 정의를 설정합니다.
    dataProvider.setFields(fields);
    gridView.setColumns(columns);

    authAxiosInstance('accounting/user/Strade/stradeCodeHelpList', {
      params,
    }).then(response => {
      //문제가 생겼다면 지워도 무방해요
      dataProvider.setRows(response?.data);
      console.log('설마?', response.data);
      responseData = response.data;
      ///////////////
      //수신변경사항
      if (response.data !== null && Object.keys(response.data).length > 0) {
        dataProvider.setRows(response?.data);
      }
      /////////////
    });

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
    //
    gridView.onCellDblClicked = function (grid, clickData) {
      if (InputState === 1) {
        var current = gridView.getCurrent();
        var jsonData = dataProvider.getJsonRow(current.itemIndex);
        onRowSelected(jsonData);
        onChangeModalClose();
        return;
      }

      // 주석 부분은 더블 클릭시 입력되어야되는 상황일 떄 사용
      const cellClickData = gridViewStrade.grid.getCurrent().itemIndex;
      var current = gridView.getCurrent();
      console.log(current);
      var jsonData = dataProvider.getJsonRow(current.itemIndex);
      console.log('jsonData: ' + jsonData.tr_cd);

      //BANK_NAME을 JsonData에 넣어주기
      const matchedData = responseData.find(
        item => item.tr_CD === jsonData.tr_CD
      );

      if (matchedData) {
        jsonData.bank_NAME = matchedData.bank_NAME;
      }

      if (tr_FG === 1) {
        const row = {
          tr_CD: jsonData.tr_CD,
          tr_NM: jsonData.tr_NM,
        };
        gridViewStrade.grid.setValues(cellClickData, row, false);
        console.log('일반거래처 jsonData', jsonData);
      } else {
        const row = {
          ftr_CD: jsonData.tr_CD,
          ftr_NM: jsonData.tr_NM,
          ba_NB_TR: jsonData.ba_NB_TR,
          bank_NAME: jsonData.bank_NAME,
        };
        gridViewStrade.grid.setValues(cellClickData, row, false);
        console.log('금융거래처 jsonData', jsonData);
      }
      //setEmpMenuButton(false);
      gridViewStrade.grid.setFocus();
      onChangeModalClose();
    };

    // 그리드의 컬럼 레이아웃을 설정합니다.
    gridView.setColumnLayout(fundTypeLayout);

    // 그리드의 상태 바를 숨깁니다.
    gridView.setStateBar({ visible: false });

    // 그리드의 고정 옵션을 설정합니다.
    gridView.setFixedOptions({});

    // 정렬 옵션을 비활성화합니다.
    gridView.setSortingOptions({ enabled: false });

    //행 번호를 1부터 시작하게 설정합니다.
    gridView.setRowIndicator({ zeroBase: false });

    //그리드 푸터 생성 비활성화
    gridView.setFooter({ visible: false });

    //입력 비활성화
    gridView.columnByName('tr_CD').editable = false;
    gridView.columnByName('tr_NM').editable = false;
    gridView.columnByName('tr_FG').editable = false;
    gridView.columnByName('reg_NB').editable = false;
    gridView.columnByName('ceo_NM').editable = false;
    gridView.columnByName('ba_NB_TR').editable = false;

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

    // 컴포넌트가 언마운트될 때 정리 작업을 수행합니다.
    return () => {
      dataProvider.clearRows();
      gridView.destroy();
      dataProvider.destroy(); // useEffect는 한 번만 실행되도록 빈 배열을 의존성으로 설정합니다.
    };
  }, []);

  return (
    <Modal
      width={'870px'}
      height={'600px'}
      title={'거래처코드도움'}
      onClickEvent={onChangeModalClose}
    >
      <SelectBoxWrapper>
        <span className="trModalTitle">거래처코드</span>
        <input
          type="text"
          className="textInputBox"
          {...register('selectValue')}
        />
        <span className="ynModalTitle">사용여부</span>
        <StradeCodeHelpUseYNSelectBox
          width={150}
          register={register}
          state={useYNSelectData}
          setState={setUseYNSelectData}
        />
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

export default StradeCodeHelpModal;
