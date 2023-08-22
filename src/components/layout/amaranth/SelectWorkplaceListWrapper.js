import React, { useEffect, useState } from 'react';
import ListBoxItem from './ListBoxItem';
import axios from '../../../../node_modules/axios/index';
import { WorkplaceListBoxItem } from './Index';

const SelectWorkplaceListWrapper = ({
  width,
  title,
  dataCount,
  data,
  FetchWorkplaceDetailInfo,
  handleAddClick,
  setIsAdding,
  isAdding,
}) => {
  const selectListWrapper = {
    position: 'relative',
    width: width,
    height: '100%',
    border: '1px solid #ebebeb',
  };
  // const [listData, listDataSet] = useState();
  // const asyncRequest = async (url, methodType, data, headers) => {
  //   const cookies = document.cookie;
  //   const token = cookies.split('=')[1];
  //   try {
  //     const response = await axios({
  //       method: methodType,
  //       url: url,
  //       data: data,
  //       withCredentials: true,
  //       headers: { Authorization: token },
  //     });
  //     console.log(response.data);

  //     return response;
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // };

  // const fetchWorkplaceInfo = async divCd => {
  //   try {
  //     const response = await asyncRequest(
  //       `system/user/WorkplaceManage/getWorkpInfo/${divCd}`,
  //       'get',
  //       null
  //     );
  //     console.log('Fetched workplace info:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching workplace info:', error);
  //   }
  // };

  return (
    <div style={selectListWrapper}>
      <div className="listBoxHeader">
        <span className="listBoxtitle">{title}</span>
        <span className="listBoxDataCount">{dataCount}</span>건
        <span className="listBoxSort">정렬순</span>
      </div>
      <div className="listWrapper">
        {data.map(data => (
          <WorkplaceListBoxItem
            key={data.div_CD}
            leftTop={data.div_CD}
            rightTop={data.co_CD}
            leftBottom={data.div_NM}
            //fetchWorkplaceInfo={fetchWorkplaceInfo}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            handleFetchWorkplaceInfo={FetchWorkplaceDetailInfo}
          />
        ))}
      </div>
      <div className="footerBox" onClick={handleAddClick}>
        <i className="fa-solid fa-circle-plus"></i>추가
      </div>
    </div>
  );
};

export default SelectWorkplaceListWrapper;
