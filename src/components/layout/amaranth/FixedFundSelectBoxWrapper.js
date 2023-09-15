import React from 'react';
import { useState } from 'react';
import Modal from '../../common/modal/Modal';
import SelectBoxWrapper from './SelectBoxWrapper';
import { WorkpTextFieldBox } from '../../common/Index';
import ModalBoxWrapper from './ModalBoxWrapper';
import { authAxiosInstance } from '../../../axios/axiosInstance';
import RealGrid from '../../common/realgrid/RealGridJ';
import { useEffect } from 'react';

const FixedFundSelectBoxWrapper = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [SearchDivInfo, setSearchDivInfo] = useState('');
  const [workpInfo, setWorkpInfo] = useState('');
  const [sendInfo, setSendInfo] = useState('');

  useEffect(() => {
    getWorkplace();
  }, []);

  console.log(SearchDivInfo);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearchClick = () => {
    setSendInfo(SearchDivInfo);
  };

  const getWorkplace = async divCd => {
    try {
      const response = await authAxiosInstance.get(
        '/system/user/WorkplaceManage/getList'
      );
      console.log('처음 가져온 데이터', response.data);
      setWorkpInfo(response.data);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  const SearchWorkplace = async divCd => {
    const queryParams = new URLSearchParams();
    queryParams.append('DIV_CD', divCd);
    try {
      const response = await authAxiosInstance.get(
        `/system/user/WorkplaceManage/getList?${queryParams.toString()}`
      );
      console.log('가져온 데이터', response.data);
      setWorkpInfo(response.data);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  return (
    <div
      className="deptSelectBoxWrapper"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      회계단위
      <input type="text" onClick={handleOpenModal}></input>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={'사업장관리'}
        width={500}
        height={600}
      >
        <ModalBoxWrapper>
          <WorkpTextFieldBox
            width={'100px'}
            title={'사업장'}
            onInputChange={inputValue => setSearchDivInfo(inputValue)}
          />
          <button onClick={handleSearchClick}>검색</button>
        </ModalBoxWrapper>
        <RealGrid />
      </Modal>
    </div>
  );
};

export default FixedFundSelectBoxWrapper;
