import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, fundTypeLayout } from './FinancecodeHelpRealGridData';
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import Modal from '../../../../common/modal/Modal';
import SelectBoxWrapper from '../../../../layout/amaranth/SelectBoxWrapper';
import EventButton from '../../../../common/button/EventButton';

const FinancecodeModal = ({
  onChangeModalClose,
  setState,
  inputData,
  setValue,
  setChangeFormData,
  setFinanceChangeCDData,
}) => {
  const { register, getValues } = useForm({
    mode: 'onChange',
  });
  const [dataProviderState, setDataProviderState] = useState(null);
  const [gridViewState, setGridViewState] = useState(null);
  const realgridElement = useRef(null);

  const onClickSearchEmpList = () => {
    const { selectValue } = getValues();
    const params = {};

    if (selectValue !== '') {
      params.VALUE = selectValue;
    }

    authAxiosInstance('accounting/user/Strade/financecodeHelpList', {
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

    authAxiosInstance('accounting/user/Strade/financecodeHelpList', {}).then(
      response => {
        dataProvider.setRows(response?.data);
      }
    );

    //
    gridView.onCellDblClicked = function (grid, index) {
      var current = gridView.getCurrent();
      var jsonData = dataProvider.getJsonRow(current.itemIndex);
      const row = {
        finance_CD: jsonData.finance_CD,
        bank_NAME: jsonData.bank_NAME,
      };
      setFinanceChangeCDData(financeCDChangeData => ({
        ...financeCDChangeData,
        bank_CD: jsonData.finance_CD,
      }));
      setChangeFormData(changeFormData => ({
        ...changeFormData,
        bank_CD: jsonData.finance_CD,
      }));

      setValue('bank_CD', `${row?.finance_CD}. ${row?.bank_NAME}`);
      //gridViewStrade.setValues(cellClickData, row, false);
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
    gridView.columnByName('finance_CD').editable = false;
    gridView.columnByName('bank_NAME').editable = false;

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
      width={'560px'}
      height={'600px'}
      title={'금융기관코드도움'}
      onClickEvent={onChangeModalClose}
    >
      <SelectBoxWrapper>
        <span className="liqModalTitle">검색어</span>
        <input
          type="text"
          className="textInputBox"
          {...register('selectValue')}
          defaultValue={inputData && inputData}
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

export default FinancecodeModal;
