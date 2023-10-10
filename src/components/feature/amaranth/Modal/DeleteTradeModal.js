import React from 'react';
import Modal from '../../../common/modal/Modal';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import TRModal from '../../../common/modal/TRModal';
import { ScrollWrapper } from '../../../common/Index';

const DeleteTradeModal = ({
  name,
  onClickEvent,
  deleteListCount,
  deleteStradeInfo,
}) => {
  return (
    <TRModal
      width={'440px'}
      height={'410px'}
      buttonYN={true}
      onClickBottomButtonEvent={onClickEvent}
    >
      <BsFillCheckCircleFill className="deleteTRIcon" />
      <div className="deleteTRTitle">
        {name}거래처 삭제 요청이 완료되었습니다.
      </div>
      <div className="deleteTRResultBox">
        <span className="deleteTRBox1">
          요청{' '}
          <span className="deleteTRSpanColor1">
            <span className="deleteTRSpanCount">{deleteListCount}</span>건
          </span>
        </span>
        <span className="deleteTRBox2">
          성공{' '}
          <span className="deleteTRSpanColor2">
            <span className="deleteTRSpanCount">
              {Math.abs(deleteListCount - deleteStradeInfo.length)}
            </span>
            건
          </span>
        </span>
        <span className="deleteTRBox3">
          실패{' '}
          <span className="deleteTRSpanColor3">
            <span className="deleteTRSpanCount">{deleteStradeInfo.length}</span>
            건
          </span>
        </span>
      </div>
      <div className="deleteTRResultBoxBottom">
        <ScrollWrapper widht={'100%'} height="154px">
          {deleteStradeInfo.map((info, index) => (
            <div className="deleteBoxTR">
              <div className="deleteBoxTRCD">
                {index + 1}. 거래처 코드{' '}
                <span className="deleteBoxTRCDBlue">{info.tr_CD}</span>
              </div>
              <div className="deleteBoxData">
                고정자금등록에 {info.count}건 등록된 데이터가 존재하여 삭제할 수
                없습니다.
              </div>
            </div>
          ))}
        </ScrollWrapper>
      </div>
    </TRModal>
  );
};

export default DeleteTradeModal;
