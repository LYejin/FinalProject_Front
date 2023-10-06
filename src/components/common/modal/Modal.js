import React from 'react';
import { Title } from '../Index';

const Modal = ({
  width,
  height,
  children,
  onClickEvent,
  title,
  buttonYN,
  onClickBottomButtonEvent,
}) => {
  const modalBox = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    height: height,
    backgroundColor: 'white',
    zIndex: 20,
  };

  const onClickBottomButtonFunction = () => {
    onClickBottomButtonEvent();
  };

  const onClickEventFunction = () => {
    onClickEvent();
  };

  return (
    <>
      <div style={modalBox}>
        <div className="topModalWrapper">
          <Title titleName={title}>
            <div onClick={onClickEventFunction}>
              <i className="fa-solid fa-xmark modelX"></i>
            </div>
          </Title>
          {children}
        </div>
        <div className="bottomModalWrapper">
          {buttonYN && (
            <>
              <button
                type="button"
                className="WhiteButton"
                onClick={onClickEventFunction}
              >
                취소
              </button>
              <button
                type="button"
                className="BlueButton"
                onClick={onClickBottomButtonFunction}
              >
                확인
              </button>
            </>
          )}
        </div>
      </div>
      <div className="modalWrapper" onClick={onClickEventFunction}></div>
    </>
  );
};

export default Modal;
