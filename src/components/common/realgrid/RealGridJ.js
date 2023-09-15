import { useEffect, useRef, useState } from 'react';
import { GridView, LocalDataProvider } from 'realgrid';
import { columns, fields, rows } from './realgrid-data';
import 'realgrid/dist/realgrid-style.css';
import { authAxiosInstance } from '../../../axios/axiosInstance';
function RealGrid(Workpdata) {
  const [chDataProvider, setChDataProvider] = useState(null);
  const [chGridView, setChGridView] = useState(null);
  const realgridElement = useRef(null);

  useEffect(() => {
    const container = realgridElement.current;
    const dataProvider = new LocalDataProvider(true);
    const gridView = new GridView(container);

    gridView.setDataSource(dataProvider);
    dataProvider.setFields(fields);
    gridView.setColumns(columns);
    gridView.showProgress();

    if (Workpdata.Workpdata && Workpdata.Workpdata !== '') {
      const queryParams = new URLSearchParams();
      queryParams.append('DIV_CD', Workpdata.Workpdata);
      queryParams.append('DIV_NM', Workpdata.Workpdata);

      authAxiosInstance
        .get(`/system/user/WorkplaceManage/getList?${queryParams.toString()}`)
        .then(responseData => {
          gridView.closeProgress();
          console.log('가져온것', responseData.data);
          dataProvider.fillJsonData(responseData.data, {
            fillMode: 'set',
          });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      authAxiosInstance
        .get('/system/user/WorkplaceManage/getList')
        .then(responseData => {
          gridView.closeProgress();
          console.log('가져온것', responseData.data);
          dataProvider.fillJsonData(responseData.data, {
            fillMode: 'set',
          });
        })
        .catch(error => {
          console.error(error);
        });
    }

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

    return () => {
      dataProvider.clearRows();
      gridView.destroy();
      dataProvider.destroy();
    };
  }, [Workpdata]);

  return (
    <div
      ref={realgridElement}
      style={{ height: '450px', width: '90%', margin: '0 auto' }}
    ></div>
  );
}

export default RealGrid;
