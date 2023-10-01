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
    display: isOpen ? 'block' : 'none',
  };

  const modalBackground = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    zIndex: 9999,
    display: isOpen ? 'block' : 'none', // This line ensures that the modal background only shows when the modal is open
  };

  return (
    <>
      <div style={modalBox}>
        <div className="topModalWrapper">
          <Title titleName={title} />
          {children}
        </div>
        <div className="bottomModalWrapper">
          {buttonYN && (
            <>
              <button className="WhiteButton" onClick={onClose}>
                취소
              </button>
              <button className="BlueButton" onClick={onClose}>
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
