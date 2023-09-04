import React from 'react';
import { Title } from '../../../../common/Index';

const ComModel = ({ width, height, children, onClickEvent, title }) => {
  const modalBox = {
    position: 'fixed', // 모달 창이 화면 스크롤과 독립적으로 고정되도록 변경
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    width: width,
    maxHeight: '85%', // 모달 내용이 화면을 넘어가지 않도록 최대 높이 설정 (선택 사항)
    backgroundColor: 'white',
    //padding: '20px', // 모달 내용과의 간격을 추가 (선택 사항)
    borderRadius: '8px', // 모달의 모서리를 둥글게 만듭니다 (선택 사항)
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 모달에 그림자 효과 추가 (선택 사항)
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

export default ComModel;
