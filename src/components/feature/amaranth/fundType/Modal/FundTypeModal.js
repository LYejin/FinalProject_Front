import React from 'react';
import { Title } from '../../../../common/Index';

const FundTypeModal = ({
  width,
  height,
  children,
  onClickEvent,
  title,
  buttonYN,
}) => {
  const modalBox = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    height: height,
    backgroundColor: 'white',
    zIndex: 10000,
  };

  const onClickEventFunction = () => {
    onClickEvent();
  };

  return (
    <>
      <div style={modalBox}>
        <div className="topModalWrapper">
          <Title titleName={title}>
            <i className="fa-solid fa-xmark"></i>
          </Title>
          {children}
        </div>
        <div className="bottomModalWrapper">
          {buttonYN && (
            <>
              <button className="WhiteMenuButton">취소</button>
              <button className="BlueButton">확인</button>
            </>
          )}
        </div>
      </div>
      <div className="modalWrapper" onClick={onClickEventFunction}></div>
    </>
  );
};

export default FundTypeModal;
