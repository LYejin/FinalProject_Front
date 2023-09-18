import React from 'react';
import { useState } from 'react';
import Modal2 from '../../common/modal/Modal2';
import { authAxiosInstance } from '../../../axios/axiosInstance';
import RealGrid from '../../feature/amaranth/fixedfund/realgrid/RealGridJ';
import { useEffect } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';

const FixedFundSelectBoxWrapper = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {}, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="FPSelectBoxWrapper">
      <div className="firstDiv">
        <div className="inputDivStyle" style={{ position: 'relative' }}>
          회계단위{' '}
          <input
            type="text"
            className="FixedInputStyle"
            placeholder="사업장코드도움"
          ></input>
          <FaRegListAlt
            className="FFInputIconStyle"
            size={20}
            onClick={handleOpenModal}
          />
        </div>
        <Modal2
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={'사업장관리'}
          width={500}
          height={600}
          buttonYN={true}
        >
          <RealGrid />
        </Modal2>
        <div className="inputDivStyle" style={{ position: 'relative' }}>
          자금과목{' '}
          <input
            className="FixedInputStyle"
            type="text"
            placeholder="자금과목코드도움"
          ></input>
          <FaRegListAlt className="FFInputIconStyle" size={20} />
        </div>
        <div className="inputDivStyle" style={{ position: 'relative' }}>
          거래처{' '}
          <input
            className="FixedInputStyle"
            type="text"
            placeholder="거래처코드도움"
          ></input>
          <FaRegListAlt className="FFInputIconStyle" size={20} />
        </div>
        <div className="inputDivStyle3" style={{ position: 'relative' }}>
          금융거래처{' '}
          <input
            className="FixedInputStyle"
            type="text"
            placeholder="거래처코드도움"
          ></input>
          <FaRegListAlt className="FFInputIconStyle" size={20} />
        </div>
        <button className="FFcustomButton">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="secondDiv">
        <div className="inputDivStyle2" style={{ position: 'relative' }}>
          시작일 <input className="FixedInputStyle" type="text"></input>
          <FaRegCalendarAlt className="FFInputIconStyle" size={20} />
        </div>
        <div className="inputDivStyle" style={{ position: 'relative' }}>
          종료일 <input className="FixedInputStyle" type="text"></input>
          <FaRegCalendarAlt className="FFInputIconStyle" size={20} />
        </div>
      </div>
    </div>
  );
};

export default FixedFundSelectBoxWrapper;
