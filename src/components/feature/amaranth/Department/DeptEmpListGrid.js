import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, rows } from './EmpList-data';
import 'realgrid/dist/realgrid-style.css';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import NoData from './noEmp.png';

function DeptEmpListGrid({ CoCd, DeptCd }) {
  const [chDataProvider, setChDataProvider] = useState(null);
  const [chGridView, setChGridView] = useState(null);
  const [isData, setIsData] = useState(false);

  const realgridElement = useRef(null);

  console.log('부서리얼그리드', CoCd, DeptCd);

  useEffect(() => {
    const container = realgridElement.current;
    const dataProvider = new LocalDataProvider(true);
    const gridView = new GridView(container);

    gridView.setDataSource(dataProvider);
    dataProvider.setFields(fields);
    gridView.setColumns(columns);

    const queryParams = new URLSearchParams();
    queryParams.append('CO_CD', CoCd);
    queryParams.append('DEPT_CD', DeptCd);

    authAxiosInstance
      .get(`/system/user/departments/list?${queryParams.toString()}`)
      .then(responseData => {
        const transformedData = responseData.data.map(item => {
          return {
            ...item,
            enrl_FG:
              item.enrl_FG === '0'
                ? '재직'
                : item.enrl_FG === '1'
                ? '휴직'
                : item.enrl_FG,
          };
        });

        dataProvider.fillJsonData(transformedData, {
          fillMode: 'set',
        });

        if (transformedData.length === 0) {
          setIsData(false);
        } else {
          setIsData(true);
        }
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

    gridView.setDisplayOptions({
      fitStyle: 'evenFill',
      rowHeight: 35,
      columnMovable: false,
      selectionStyle: 'none',
    });

    gridView.setDisplayOptions({ fitStyle: 'evenFill' });

    //헤더 높이 자동 조절 설정
    gridView.setHeader({
      height: 35,
      background: 'red',
      foreground: '#fff',
      fontSize: 14,
      paddingLeft: 10,
    });

    setChDataProvider(dataProvider);
    setChGridView(gridView);

    gridView.onCellDblClicked = (grid, oldRowIndex, newRowIndex) => {
      var current = gridView.getCurrent();
      var jsonData = dataProvider.getJsonRow(current.itemIndex);
      //onRowSelected(jsonData);
    };

    return () => {
      dataProvider.clearRows();
      gridView.destroy();
      dataProvider.destroy();
    };
  }, [CoCd, DeptCd]);

  return (
    <div style={{ position: 'relative', height: '610px' }}>
      <div
        ref={realgridElement}
        style={{
          position: 'absolute', // 이 부분도 absolute로 설정
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          border: '2px solid #ccc',
        }}
      ></div>

      {!isData && (
        <img
          src={NoData}
          alt="No Data"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 12,
          }}
        />
      )}
    </div>
  );
}

export default DeptEmpListGrid;
