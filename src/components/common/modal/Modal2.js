import React from 'react';
import { Title } from '../Index';

const Modal2 = ({
  width,
  height,
  children,
  title,
  buttonYN,
  onClose,
  isOpen,
  updateMdeptCDInInfoWrapper,
}) => {
  const modalBox = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    height: height,
    backgroundColor: 'white',
    zIndex: 20000,
    display: isOpen ? 'block' : 'none',
  };

  const modalBackground = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    display: isOpen ? 'block' : 'none',
  };

  const closeButtonStyle = {
    position: 'absolute',
    right: '10px',
    top: '5px',
    fontSize: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    marginTop: '25px',
    marginRight: '13px',
  };

  const onClickOkButton = () => {
    updateMdeptCDInInfoWrapper();
  };

  return (
    <>
      <div style={modalBox}>
        <button style={closeButtonStyle} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="topModalWrapper2">
          <Title titleName={title} />
          {children}
        </div>
        <div className="bottomModalWrapper">
          {buttonYN && (
            <>
              <button className="WhiteMenuButton" onClick={onClose}>
                취소
              </button>
              <button className="BlueButton" onClick={onClickOkButton}>
                확인
              </button>
            </>
          )}
        </div>
      </div>
      <div style={modalBackground} onClick={onClose}></div>
    </>
  );
};

export default Modal2;
