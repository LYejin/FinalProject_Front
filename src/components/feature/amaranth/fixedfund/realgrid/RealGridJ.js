import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, rows } from './realgrid-data';
import 'realgrid/dist/realgrid-style.css';
import { authAxiosInstance } from '../../../../../axios/axiosInstance';
import { WorkpTextFieldBox } from '../../../../common/Index';

function RealGrid({
  onRowSelected,
  firstRowSelected,
  divInputValue,
  onClose,
  onOpen,
}) {
  const [chDataProvider, setChDataProvider] = useState(null);
  const [chGridView, setChGridView] = useState(null);
  const [inputValue, setInputValue] = useState(''); // 입력 값 관리를 위한 state

  const realgridElement = useRef(null);

  // 입력 값 업데이트 함수
  const handleInputChange = value => {
    setInputValue(value);
  };

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearchClick = () => {
    if (inputValue) {
      fetchData(inputValue);
    } else {
      fetchData();
    }
  };

  // API 요청을 보내는 함수
  const fetchData = Workpdata => {
    const gridView = chGridView;
    const dataProvider = chDataProvider;

    if (Workpdata) {
      gridView.showProgress();
      const queryParams = new URLSearchParams();
      queryParams.append('DIV_CD', Workpdata);
      queryParams.append('DIV_NM', Workpdata);

      authAxiosInstance
        .get(`/system/user/WorkplaceManage/getList?${queryParams.toString()}`)
        .then(responseData => {
          gridView.closeProgress();
          dataProvider.fillJsonData(responseData.data, {
            fillMode: 'set',
          });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      gridView.showProgress();
      authAxiosInstance
        .get('/system/user/WorkplaceManage/getList')
        .then(responseData => {
          gridView.closeProgress();
          dataProvider.fillJsonData(responseData.data, {
            fillMode: 'set',
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const fetchDataOnInputChange = async inputValue => {
    try {
      const response = await authAxiosInstance.get(
        '/system/user/WorkplaceManage/getList',
        {
          params: {
            DIV_CD: inputValue,
            DIV_NM: inputValue,
          },
        }
      );

      if (response.data.length === 0) {
        onRowSelected('');
      } else if (response.data.length === 1) {
        console.log('데이터가 하나 있습니다.', response.data[0]);
        onRowSelected(response.data[0]); // 데이터가 하나 있는 경우 onRowSelected 호출
      } else {
        // 데이터가 여러개 경우 onRowSelected 호출
        console.log('데이터가 여러 개 있습니다.');
        onOpen();
        fetchData(inputValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const container = realgridElement.current;
    const dataProvider = new LocalDataProvider(true);
    const gridView = new GridView(container);

    gridView.setDataSource(dataProvider);
    dataProvider.setFields(fields);
    gridView.setColumns(columns);

    gridView.showProgress();
    authAxiosInstance
      .get('/system/user/WorkplaceManage/getList')
      .then(responseData => {
        gridView.closeProgress();
        dataProvider.fillJsonData(responseData.data, {
          fillMode: 'set',
        });
        const divData = dataProvider.getJsonRow(0);
        firstRowSelected(divData);
      })
      .catch(error => {
        console.error(error);
      });

    //인덱스넘버를 숨깁니다.
    gridView.setRowIndicator({
      visible: false,
    });

    // 그리드의 상태 바를 숨깁니다.
    gridView.setStateBar({ visible: false });

    //푸터를 숨깁니다.
    gridView.setFooters({
      visible: false,
    });

    //체크바를 숨깁니다.
    gridView.setCheckBar({
      visible: false,
    });

    setChDataProvider(dataProvider);
    setChGridView(gridView);

    gridView.onCellDblClicked = (grid, oldRowIndex, newRowIndex) => {
      var current = gridView.getCurrent();
      var jsonData = dataProvider.getJsonRow(current.itemIndex);
      onRowSelected(jsonData);
      setInputValue('');
      onClose();
    };

    return () => {
      dataProvider.clearRows();
      gridView.destroy();
      dataProvider.destroy();
    };
  }, []);

  useEffect(() => {
    if (divInputValue) {
      fetchDataOnInputChange(divInputValue);
    }
  }, [divInputValue]);

  return (
    <div>
      <div
        className="FFSelectBoxWrapper"
        style={{ display: 'flex', flexWrap: 'wrap', paddingLeft: '70px' }}
      >
        <WorkpTextFieldBox
          width={'300px'}
          title={'사업장'}
          onInputChange={handleInputChange}
          value={inputValue}
          setValue={setInputValue}
        />
        <button className="FFcustomButtonStyle" onClick={handleSearchClick}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div
        ref={realgridElement}
        style={{ height: '390px', width: '100%', margin: '0 auto' }}
      ></div>
    </div>
  );
}

export default RealGrid;
