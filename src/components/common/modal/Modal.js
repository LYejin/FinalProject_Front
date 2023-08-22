import React from 'react';
import { Title } from '../Index';

const Modal = ({ width, height, children, onClickEvent, title }) => {
  const modalBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    width: width,
    height: height,
    backgroundColor: 'white',
  };

  const onClickEventFunction = () => {
    onClickEvent();
  };

  return (
    <div className="modalWrapper" onClick={onClickEventFunction}>
      <div style={modalBox}>
        <Title titleName={title} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
