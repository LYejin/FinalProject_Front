import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, rows } from './FixedFund-data';
import 'realgrid/dist/realgrid-style.css';
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import { WorkpTextFieldBox } from '../../../../common/Index';

function FixedFundGrid() {
  const [chDataProvider, setChDataProvider] = useState(null);
  const [chGridView, setChGridView] = useState(null);
  const [inputValue, setInputValue] = useState(''); // 입력 값 관리를 위한 state
  const realgridElement = useRef(null);

  const queryParams = new URLSearchParams();
  queryParams.append('DIV_CD', '001');
  queryParams.append('DISP_SQ', '1');

  useEffect(() => {
    const container = realgridElement.current;
    const dataProvider = new LocalDataProvider(true);
    const gridView = new GridView(container);

    gridView.setDataSource(dataProvider);
    dataProvider.setFields(fields);
    gridView.setColumns(columns);

    // 행 추가,삽입 옵션을 설정합니다.
    gridView.setEditOptions({
      insertable: true, //행 삽입 가능 여부
      deletable: true, //행 삭제 가능 여부
      appendable: true, //행 추가 가능 여부
      commitWhenExitLast: false, //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
      appendWhenExitLast: false, //Tap, Enter키 입력시 행추가 가능
      crossWhenExitLast: true, //Tab이 이나 Enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동할지의 여부
      //displayEmptyEditRow: true, //마지막행에 항상 빈 행을 추가하는 기능
      enterToNextRow: true, //셀 편집 중 Enter 키를 입력하면 편집을 완료하고 다음 행으로 이동할지의 여부
      enterToTab: true, //셀에 데이터 입력 후 다음 셀로 이동하기 여부 기능
      hintOnError: false, //편집 중에 에러가 있는 셀에 마우스가 위치할 때 에러 힌트 툴팁 표시 여부
      skipReadOnly: true, //readOnly, editable로 설정되 있는 컬럼 Enter키 입력시 foucs 스킵하는 기능
      useArrowKeys: true, //방향키로 셀 간 이동 가능 여부 기능
      confirmWhenDelete: true, //삭제여부를 묻는 대화 상자의 호출 여부
      //deleteRowsMessage: '', //삭제 대화 상자에 표시할 메세지 문자 설정 여부;
      //commitByCell: true, //셀 단위 수정 후 commit 설정 여부
      //commitWhenLeave: true, //편집중에 그리드 외부 영역을 클릭하였을때 commit 설정 여부
      commitLevel: 'error',
    });

    //페이지 로딩시 지출 데이터
    gridView.showProgress();
    authAxiosInstance
      .get(`/system/user/AcashFixManage/getList?${queryParams.toString()}`)
      .then(responseData => {
        gridView.closeProgress();
        console.log('이번에가져온것', responseData.data);
        dataProvider.fillJsonData(responseData.data, {
          fillMode: 'set',
        });
      })
      .catch(error => {
        console.error(error);
      });

    // 그리드의 상태 바를 숨깁니다.
    gridView.setStateBar({ visible: false });

    //컬럼 너비 자동 조절 설정
    gridView.setDisplayOptions({ fitStyle: 'evenFill' });

    setChDataProvider(dataProvider);
    setChGridView(gridView);

    return () => {
      dataProvider.clearRows();
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  return (
    <div>
      <div
        ref={realgridElement}
        style={{ height: '600px', width: '100%', margin: '0 auto' }}
      ></div>
    </div>
  );
}

export default FixedFundGrid;
