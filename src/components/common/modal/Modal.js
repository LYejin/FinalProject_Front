import React from 'react';
import { Title } from '../Index';

const Modal = ({ width, height, children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

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

  return (
    <div className="modalWrapper" onClick={onClose}>
      <div style={modalBox} onClick={e => e.stopPropagation()}>
        {' '}
        {/* 이벤트 버블링 방지 */}
        <Title titleName={title} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
