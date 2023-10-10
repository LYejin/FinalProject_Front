import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, rows } from './FixedFund-data';
import 'realgrid/dist/realgrid-style.css';
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import { WorkpTextFieldBox } from '../../../../common/Index';
import Swal from 'sweetalert2';

function FixedFundGrid({
  onChangeOpenCash,
  setMarsterGrid,
  DISQ,
  onChangeOpenStrade,
  setGridViewStrade,
  values,
  setHandleDeleteRows,
  isOpenCash,
  setInputFixedCashCD,
  setChartShow,
}) {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const [inputValue, setInputValue] = useState(''); // 입력 값 관리를 위한 state
  const [gridHeight, setGridHeight] = useState('600px');
  const realgridElement = useRef(null);

  const toggleGridHeight = () => {
    if (gridHeight === '200px') {
      setGridHeight('600px');
      setChartShow(false);
    } else {
      setGridHeight('200px');
      setChartShow(true);
    }
  };

  const queryParams = new URLSearchParams();

  console.log('그럼 잘와야지?', values);
  console.log('오픈캐시', isOpenCash);

  const createQueryParams = values => {
    const queryParams = new URLSearchParams();
    queryParams.append('DISP_SQ', DISQ);
    queryParams.append('DIV_CD', values.divCode);
    queryParams.append('TR_CD', values.gtradeCode);
    queryParams.append('FTR_CD', values.ftradeCode);
    queryParams.append('CASH_CD', values.cashCode);
    queryParams.append('FR_DT1', values.startStart);
    queryParams.append('FR_DT2', values.startEnd);
    queryParams.append('TO_DT1', values.endStart);
    queryParams.append('TO_DT2', values.endEnd);
    return queryParams;
  };

  const fetchGridData = async () => {
    console.log('패치함');
    const queryParams = createQueryParams(values);
    authAxiosInstance
      .get(`/accounting/user/AcashFixManage/getList?${queryParams.toString()}`)
      .then(responseData => {
        console.log('드드드드드드 : ', queryParams.toString());
        console.log('이번에가져온것', responseData.data);

        // yyyymmdd의 형태를 yyyy-mm-dd로 변환하는 함수
        const formatDate = dateStr => {
          return `${dateStr.substring(0, 4)}-${dateStr.substring(
            4,
            6
          )}-${dateStr.substring(6, 8)}`;
        };

        // responseData.data의 각 아이템에 대한 변환 수행
        responseData.data.forEach(item => {
          if (item.fr_DT) {
            item.fr_DT = formatDate(item.fr_DT);
          }
          if (item.to_DT) {
            item.to_DT = formatDate(item.to_DT);
          }
        });

        dataProvider.fillJsonData(responseData.data, {
          fillMode: 'set',
        });

        let lastRowIndex = dataProvider.getRowCount();
        gridView.setCurrent({ itemIndex: lastRowIndex });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteRows = async () => {
    // 체크된 행들의 sq_NB값을 수집
    gridView.cancel();
    const checkedRows = gridView.getCheckedItems();
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
      const sqNbValue = dataProvider.getValue(row, 'sq_NB');
      return sqNbValue;
    });

    console.log('여기서확인하래요', sqNbsToDelete);
    try {
      // 서버에 삭제 요청
      const response = await authAxiosInstance.delete(
        '/accounting/user/AcashFixManage/delete',
        {
          params: {
            DIV_CD: values.divCode,
          },
          paramsSerializer: params => {
            const sqNbQuery = sqNbsToDelete.map(n => `SQ_NB=${n}`).join('&');
            return `DIV_CD=${params.DIV_CD}&${sqNbQuery}`;
          },
        }
      );
      //삭제된 데이터만 안보이게
      dataProvider.removeRows(checkedRows);
      // 알림 표시
      Swal.fire({
        icon: 'success',
        title: '성공적으로 삭제되었습니다!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Failed to delete rows:', error);
    }
  };

  // 자금과목이 입력되었는지 체크
  // const checkRequireColumn = rowData => {
  //   if (!rowData['CASH_CD']) {
  //     return { CASH_CD: '자금과목코드' };
  //   }
  //   return {};
  // };

  const formatToSimpleDate = dateStr => {
    return dateStr.replace(/-/g, '');
  };

  const formatRowDate = rowData => {
    if (rowData['fr_DT']) {
      rowData['fr_DT'] = formatToSimpleDate(rowData['fr_DT']);
    }
    if (rowData['to_DT']) {
      rowData['to_DT'] = formatToSimpleDate(rowData['to_DT']);
    }
  };

  const rowInsert = rowData => {
    rowData['div_CD'] = values.divCode;
    rowData['disp_SQ'] = DISQ;
    formatRowDate(rowData);
    console.log('Insert 동작/ 지수 : ', DISQ);
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .post('accounting/user/AcashFixManage/insert', rowData)
        .then(response => {
          const stateValue = response.data;
          resolve(stateValue);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };

  const rowUpdate = rowData => {
    rowData['div_CD'] = values.divCode;
    rowData['disp_SQ'] = DISQ;
    formatRowDate(rowData);
    console.log('이게 내 데이터', rowData);
    return new Promise((resolve, reject) => {
      authAxiosInstance
        .put('accounting/user/AcashFixManage/update', rowData)
        .then(response => {
          const stateValue = response.data;
          resolve(stateValue);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    console.log('useEffect running');
    const container = realgridElement.current;
    const provider = new LocalDataProvider(true);
    const grid = new GridView(container);

    grid.setDataSource(provider);
    provider.setFields(fields);
    grid.setColumns(columns);

    //타 컴포넌트에서도 마스터 그리드를 참조(공유) 가능하게 전역 state변수 초기화
    setMarsterGrid(prveData => ({
      ...prveData,
      grid: grid,
      provider: provider,
    }));

    setGridViewStrade(prveData => ({
      ...prveData,
      grid: grid,
      provider: provider,
    }));

    // 행 추가,삽입 옵션을 설정합니다.
    grid.setEditOptions({
      insertable: true, //행 삽입 가능 여부
      deletable: true, //행 삭제 가능 여부
      appendable: true, //행 추가 가능 여부
      commitWhenExitLast: false, //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
      appendWhenExitLast: false, //Tap, Enter키 입력시 행추가 가능
      crossWhenExitLast: true, //Tab이 이나 Enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동할지의 여부
      //displayEmptyEditRow: true, //마지막행에 항상 빈 행을 추가하는 기능
      //enterToNextRow: true, //셀 편집 중 Enter 키를 입력하면 편집을 완료하고 다음 행으로 이동할지의 여부
      enterToTab: true, //셀에 데이터 입력 후 다음 셀로 이동하기 여부 기능
      hintOnError: false, //편집 중에 에러가 있는 셀에 마우스가 위치할 때 에러 힌트 툴팁 표시 여부
      skipReadOnly: true, //readOnly, editable로 설정되 있는 컬럼 Enter키 입력시 foucs 스킵하는 기능
      useArrowKeys: true, //방향키로 셀 간 이동 가능 여부 기능
      confirmWhenDelete: true, //삭제여부를 묻는 대화 상자의 호출 여부
      //deleteRowsMessage: '', //삭제 대화 상자에 표시할 메세지 문자 설정 여부;
      //commitByCell: true, //셀 단위 수정 후 commit 설정 여부
      //commitWhenLeave: true, //편집중에 그리드 외부 영역을 클릭하였을때 commit 설정 여부
      commitLevel: 'error',
      displayEmptyEditRow: true, //비어있는 새로운 행을 나타내도록 설정
    });
    const queryParams = createQueryParams(values);

    //페이지 로딩시 지출 데이터
    grid.showProgress();
    grid.cancel();
    if (values.divCode) {
      authAxiosInstance
        .get(
          `/accounting/user/AcashFixManage/getList?${queryParams.toString()}`
        )
        .then(responseData => {
          grid.closeProgress();
          console.log('드드드드드드 : ', queryParams.toString());
          console.log('이번에가져온것', responseData.data);

          // yyyymmdd의 형태를 yyyy-mm-dd로 변환하는 함수
          const formatDate = dateStr => {
            return `${dateStr.substring(0, 4)}-${dateStr.substring(
              4,
              6
            )}-${dateStr.substring(6, 8)}`;
          };

          // responseData.data의 각 아이템에 대한 변환 수행
          responseData.data.forEach(item => {
            if (item.fr_DT) {
              item.fr_DT = formatDate(item.fr_DT);
            }
            if (item.to_DT) {
              item.to_DT = formatDate(item.to_DT);
            }
          });

          provider.fillJsonData(responseData.data, {
            fillMode: 'set',
          });

          let lastRowIndex = provider.getRowCount();
          grid.setCurrent({ itemIndex: lastRowIndex });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      grid.closeProgress();
    }

    grid.onValidateRow = (grid, itemIndex, dataRow, inserting, values) => {
      const error = {};
      console.log('이게뭘까?', values);

      if (values.sq_NB && values.cash_CD) {
        rowUpdate(grid.getValues(itemIndex))
          .then(() => {
            console.log('rowUpdate 실행');
            return fetchDataAndUpdateGrid();
          })
          .catch(error => {
            console.error('Error updating row:', error);
          });
      } else if (values.cash_CD) {
        rowInsert(grid.getValues(itemIndex))
          .then(() => {
            console.log('rowInsert 실행');
            return fetchDataAndUpdateGrid(1);
          })
          .catch(error => {
            console.error('Error inserting row:', error);
          });
      } else {
        error.level = 'error';
        error.message = '[자금과목코드] 반드시 입력해 주십시요.';
        grid.setCurrent({ itemIndex: itemIndex, column: 'CASH_CD' });
      }
      return error;
    };

    const fetchDataAndUpdateGrid = async state => {
      try {
        const response = await authAxiosInstance.get(
          `/accounting/user/AcashFixManage/getList?${createQueryParams(
            values
          ).toString()}`
        );
        console.log('Response: ', response.data);

        const formatDate = dateStr =>
          `${dateStr.substring(0, 4)}-${dateStr.substring(
            4,
            6
          )}-${dateStr.substring(6, 8)}`;

        response.data.forEach(item => {
          if (item.fr_DT) item.fr_DT = formatDate(item.fr_DT);
          if (item.to_DT) item.to_DT = formatDate(item.to_DT);
        });
        grid.cancel();
        provider.fillJsonData(response.data, { fillMode: 'set' });

        const lastRowIndex = provider.getRowCount();
        if (state === 1) {
          grid.setCurrent({ itemIndex: lastRowIndex });
        }
      } catch (error) {
        console.error(error);
      }
    };

    //버튼을 눌렀을 때, 코드 피커 창 띄우기
    grid.onCellButtonClicked = (grid, index, column) => {
      if (column.name === 'cash_CD') {
        //자금과목 선택
        onChangeOpenCash();
      } else if (column.name === 'TR_CD') {
        //일반거래처 선택
        onChangeOpenStrade(1);
      } else if (column.name === 'FTR_CD') {
        //금융거래처 선택
        onChangeOpenStrade(3);
      }
    };

    grid.onEditRowChanged = (
      grid,
      itemIndex,
      dataRow,
      field,
      oldValue,
      newValue
    ) => {
      const current = grid.getCurrent();

      console.log('Event triggered'); // 이벤트가 트리거되는지 확인

      if (current.fieldName === 'cash_CD') {
        console.log('CASH_CD changed to:', newValue); // CASH_CD의 새로운 값 출력

        if (newValue && newValue !== '') {
          grid.editOptions.commitWhenExitLast = true; // Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
          grid.editOptions.appendWhenExitLast = true;
        }

        onChangeOpenCash();
        setInputFixedCashCD(newValue);
      }
    };

    grid.onCurrentRowChanged = (grid, oldIndex, newIndex) => {
      if (newIndex !== oldIndex) {
        // 행이 변경되었을 때만
        grid.setCurrent({
          itemIndex: newIndex,
          column: 'Cash_CD', // 여기에 원하는 열의 이름을 넣습니다. Cash_CD로 예를 들었습니다.
        });
      }
    };

    grid.editOptions.commitWhenExitLast = true; //Tap, Enter키 입력시 커밋(행이동 or 행 추가) 가능
    grid.editOptions.appendWhenExitLast = true;
    // 그리드의 상태 바를 숨깁니다.
    grid.setStateBar({ visible: false });

    //컬럼 너비 자동 조절 설정
    grid.setDisplayOptions({ fitStyle: 'evenFill' });

    //헤더 높이 자동 조절 설정
    grid.setHeader({
      height: 35,
      background: 'red',
      foreground: '#fff',
      fontSize: 14,
      paddingLeft: 10,
    });

    //체크바 너비  옵션 설정
    grid.setCheckBar({ width: 30 });

    //푸터 높이 자동 조절 설정
    grid.setFooter({ height: 35 });

    grid.setRowIndicator({
      showAll: false,
      headText: '',
      footText: '',
    });

    grid.setDisplayOptions({
      fitStyle: 'evenFill',
      rowHeight: 35,
      columnMovable: false,
      selectionStyle: 'none',
    });

    setDataProvider(provider);
    setGridView(grid);

    return () => {
      grid.cancel();
      provider.clearRows();
      grid.destroy();
      provider.destroy();
    };
  }, [DISQ, values]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (isOpenCash) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenCash]);

  return (
    <div>
      <div
        style={{
          marginBottom: '20px',
          marginLeft: 'auto',
          marginTop: -50,
          display: 'flex',
          justifyContent: 'flex-end',
          width: 500,
          height: 30,
        }}
      >
        <button className="NewBlueChartButton" onClick={toggleGridHeight}>
          기간별 차트확인
        </button>
        <button className="WhiteButton" onClick={handleDeleteRows}>
          행 삭제
        </button>
      </div>
      <div
        ref={realgridElement}
        style={{
          height: gridHeight,
          width: '100%',
          margin: '0 auto',
          borderTop: '1.5px solid #555',
          transition: 'height 0.6s ease-in-out', // 애니메이션 효과 추가
        }}
      ></div>
    </div>
  );
}

export default FixedFundGrid;
