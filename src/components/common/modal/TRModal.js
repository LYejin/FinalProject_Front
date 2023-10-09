import React from 'react';
import { Title } from '../Index';

const TitleXModal = ({
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
        <div className="topModalWrapper">{children}</div>
        <div className="bottomTRModalWrapper">
          {buttonYN && (
            <>
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
      <div className="modalWrapper"></div>
    </>
  );
};

export default TitleXModal;
