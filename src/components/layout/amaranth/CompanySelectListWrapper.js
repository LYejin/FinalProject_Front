import React, { useRef, useState } from 'react';
import axios from '../../../../node_modules/axios/index';
import CompanyBoxItem from './CompanyBoxItem';
import { authAxiosInstance } from '../../../axios/axiosInstance';
import Swal from 'sweetalert2';

const CompanySelectListWrapper = ({
  width,
  title,
  dataCount,
  data,
  formData,
  formDataSet,
  insertCheck,
  ch_listData,
  ch_listDataSet,
  listData,
  listDataSet,
  listCountSet,
  searchCompanyOnClick,
  reSetData,
  listRef,
}) => {
  const selectListWrapper = {
    position: 'relative',
    width: width,
    minWidth: width,
    height: '100%',
    border: '1px solid #ebebeb',
  };
  const [clickedBoxID, setClickedBoxID] = useState('');

  React.useEffect(() => {
    if (listData && listData.length > 0) {
      setClickedBoxID(listData[0]?.co_CD);
    }
  }, [listData]);
  React.useEffect(() => {
    searchCompanyOnClick();
  }, []); ///wjnfnowevoinweinovwionveionion

  React.useEffect(() => {
    reSetCompanyList();
    console.log('리스트 리셋');
  }, [insertCheck]);

  const clickEmp = async (co_CD, focusElement) => {
    console.log('검증확인', ch_listData, co_CD, formData.co_CD, focusElement);
    const empData = '';
    if (ch_listData > 0) {
      Swal.fire({
        text: '작성중인 내용이 있습니다. 취소하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            const empData = await authAxiosInstance(
              'system/admin/groupManage/CompanyDetail/' + co_CD
            );
            formDataSet(empData.data);
            ch_listDataSet(0);
            console.log('상세:', empData.data);
            console.log('상세 포커스:', focusElement.current);
            console.log('리스트', listData[0].co_CD);
          } catch (error) {
            console.error(error);
          }
          return empData;
        }
      });
    } else {
      try {
        const empData = await authAxiosInstance(
          'system/admin/groupManage/CompanyDetail/' + co_CD
        );
        formDataSet(empData.data);
        console.log('상세:', empData.data);
        console.log('상세 포커스:', focusElement.current);
        console.log('리스트', listData[0].co_CD);
      } catch (error) {
        console.error(error);
      }
      return empData;
    }
  };

  const reSetCompanyList = async () => {
    console.log('adivndnkvskndvknsdvnklsd');
    try {
      const response = await authAxiosInstance.post(
        'system/admin/groupManage/CompanySelect'
      );

      if (response.data) {
        listDataSet(response.data);
        listCountSet(response.data.length);
      }
    } catch (error) {
      if (error !== '') {
        listDataSet();
        formDataSet(reSetData.current);
        listCountSet(0);
      }
    }
  };

  const clickAddBtn = () => {
    console.log('안녕'.formData);
    setClickedBoxID('');
    ch_listDataSet(0);
    formDataSet();
    formDataSet(prevFormData => ({
      ...prevFormData,
      ...reSetData.current,
    }));
  };

  return (
    <div style={selectListWrapper}>
      <div className="listBoxHeader">
        <span className="listBoxtitle">{title}</span>
        <span className="listBoxDataCount">{dataCount}</span>건
        <span className="listBoxSort">정렬순</span>
      </div>
      <div className="listWrapper" ref={listRef}>
        {listData &&
          listData.map(data => (
            <CompanyBoxItem
              clickEmp={clickEmp}
              key={data.co_CD}
              leftTop={data.co_CD}
              rightBotton={data.co_FG}
              rightTop={data.co_NM}
              leftBottom={data.ceo_NM}
              clickedBoxID={clickedBoxID}
              setClickedBoxID={setClickedBoxID}
            />
          ))}
      </div>
      <div className="footerBox" onClick={clickAddBtn}>
        <i className="fa-solid fa-circle-plus"></i>추가
      </div>
    </div>
  );
};

export default CompanySelectListWrapper;
