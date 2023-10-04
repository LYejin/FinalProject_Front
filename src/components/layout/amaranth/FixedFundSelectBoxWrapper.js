import React from 'react';
import { useState } from 'react';
import Modal2 from '../../common/modal/Modal2';
import { authAxiosInstance } from '../../../axios/axiosInstance';
import RealGrid from '../../feature/amaranth/fixedfund/realgrid/RealGridJ';
import { useEffect } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import StradeCodeHelpModal from '../../feature/amaranth/Modal/StradeCodeHelpModal/StradeCodeHelpModal';

import FundTypeSearchGrid from '../../feature/amaranth/fixedfund/realgrid/FixedTypeSearchGrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRef } from 'react';
import FundTypeModal from '../../feature/amaranth/fundType/Modal/FundTypeModal';
import FundTypeModel from '../../feature/amaranth/fundType/model/FundTypeModel';
import { ko } from 'date-fns/esm/locale';

const FixedFundSelectBoxWrapper = ({ onValuesChange }) => {
  const [isModalOpen, setModalOpen] = useState(false); //사업장 모달 State
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false); //거래처 모달 State
  const [isOpenCash, setIsOpenCash] = useState(false); //자금과목 모달 State
  const [inputValue, setInputValue] = useState(''); //사업장 Input 값 설정
  const [funtTypeValue, setFuntTypeValue] = useState(''); //자금과목 Input 값 설정
  const [gtradeValue, setGtradeValue] = useState(''); //거래처 Input 값 설정
  const [ftradeValue, setFtradeValue] = useState(''); //금융거래처 Input 값
  const [TRcode, setTRcode] = useState(''); //거래처 종류 선택
  const [transmittedValue, setTransmittedValue] = useState(''); // 사업장 input 값 입력

  //시작일 선택
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  //종료일 선택
  const [endStartDate, setEndStartDate] = useState(null);
  const [endEndDate, setEndEndDate] = useState(null);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const [divCode, setDivCode] = useState(null);
  const [divName, setDivName] = useState(null);
  const [cashCode, setCashCode] = useState(null);
  const [gtradeCode, setGtradeCode] = useState(null);
  const [ftradeCode, setFtradeCode] = useState(null);
  const [startStart, setStartStart] = useState(null);
  const [startEnd, setStartEnd] = useState(null);
  const [endStart, setEndStart] = useState(null);
  const [endEnd, setEndEnd] = useState(null);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const setStartDate1 = data => {
    // console.log('데이트', formatDate(startDate), formatDate(data));
    setStartStart(formatDate(startDate));
    setStartEnd(formatDate(data));
  };

  const setEndDate1 = data => {
    // console.log('데이트2', formatDate(endStartDate), formatDate(data));
    setEndStart(formatDate(endStartDate));
    setEndEnd(formatDate(data));
  };

  //시작일 선택창
  const handleCalendarClick = () => {
    setIsOpen(!isOpen);
  };
  //종료일 선택창
  const handleEndCalendarClick = () => {
    setIsEndOpen(!isEndOpen);
  };

  //자금과목 Modal 정보
  const {
    loadRowData,
    CASH_CD,
    setCASH_CD,
    marsterGrid,
    setMarsterGrid,
    setCheckList,
    deleteBtnClick,
  } = FundTypeModel();

  const hasSent = useRef(false);

  useEffect(() => {
    if (divCode !== null && !hasSent.current) {
      // divCode가 초기값(null)이 아니고, 아직 sendValuesToParent를 호출하지 않았을 때
      sendValuesToParent();
      hasSent.current = true; // 함수를 호출했으므로 flag를 true로 설정
    }
  }, [divCode]);

  const handleFisrtSelected = data => {
    setInputValue(data.div_CD + '. ' + data.div_NM);
    setDivCode(data.div_CD);
    setDivName(data.div_NM);
  };

  //사업장 모달창
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //초기사업장 설정
  // const handleFisrtSelected = data => {
  //   setInputValue(data.div_CD + '. ' + data.div_NM);
  //   setDivCode(data.div_CD);
  //   sendValuesToParent();
  //   console.log('실행했니?????????');
  // };

  //사업장 GRID에서 데이터 Input 에 넣기
  const handleBlur = () => {
    if (divCode === '') {
      setInputValue('');
      setDivCode('');
    } else {
      setInputValue(divCode + '. ' + divName);
    }
  };

  const handleRowSelected = data => {
    setInputValue('');
    setDivCode('');
    if (data) {
      setInputValue(data.div_CD + '. ' + data.div_NM);
      setDivCode(data.div_CD);
      setDivName(data.div_NM);
    }
    handleCloseModal();
  };

  //자금과목 GRID에서 데이터 Input 에 넣기
  const handleFTRowSelected = data => {
    setFuntTypeValue(data.cash_CD + '. ' + data.cash_NM);
    setCashCode(data.cash_CD);
  };

  //거래처 Grid에서 데이터 Input 에 넣기
  const handleTradeSelected = data => {
    if (TRcode === 1) {
      setGtradeValue(data.tr_CD + '. ' + data.tr_NM);
      setGtradeCode(data.tr_CD);
    } else {
      setFtradeValue(data.tr_CD + '. ' + data.tr_NM);
      setFtradeCode(data.tr_CD);
    }
  };

  //자금과목 모달 state 변경 함수
  const onChangeOpenCash = () => {
    setIsOpenCash(!isOpenCash);
  };

  //일반거래처 모달 state 변경 함수
  const handleGtradeIconClick = () => {
    setIsTradeModalOpen(true);
    setTRcode(1);
  };

  //금융거래처 모달 state 변경 함수
  const handleFtradeIconClick = () => {
    setIsTradeModalOpen(true);
    setTRcode(3);
  };

  // 모달 닫기 함수
  const onChangeModalClose = () => {
    setIsTradeModalOpen(false);
  };

  const handleSDateReset = () => {
    setStartDate(null);
    setEndDate(null);
    setStartStart(null);
    setStartEnd(null);
  };

  const handleDateReset = () => {
    setEndStartDate(null);
    setEndEndDate(null);
    setEndStart(null);
    setEndEnd(null);
  };

  const sendValuesToParent = () => {
    console.log('버튼을 눌러보았다', {
      divCode,
      cashCode,
      gtradeCode,
      ftradeCode,
      startStart,
      startEnd,
      endStart,
      endEnd,
    });
    onValuesChange({
      divCode,
      cashCode,
      gtradeCode,
      ftradeCode,
      startStart,
      startEnd,
      endStart,
      endEnd,
    });
  };

  const handleEnter = () => {
    // 값이 변경될 때마다 RealGrid 컴포넌트로 값을 전달
    if (inputValue) {
      setTransmittedValue(inputValue);
    }
    //div_CD가 없는 경우는 없으니 이렇게 설정
    // if (inputValue === '') {
    //   setDivCode('');
    // }
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
            value={inputValue} // defaultValue 대신 value를 사용하여 inputValue와 바인딩
            onChange={e => setInputValue(e.target.value)} // 사용자의 입력을 상태에 반영
            onBlur={handleBlur} // onBlur 이벤트가 발생할 때 handleBlurOrEnter 함수 실행
            onKeyDown={e => e.key === 'Enter' && handleEnter()} // onKeyDown 이벤트를 처리
            style={{ backgroundColor: 'pink' }}
          />
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
          <RealGrid
            onRowSelected={handleRowSelected}
            firstRowSelected={handleFisrtSelected}
            divInputValue={transmittedValue}
            onClose={handleCloseModal}
            onOpen={handleOpenModal}
          />
        </Modal2>
        <div className="inputDivStyle" style={{ position: 'relative' }}>
          자금과목{' '}
          <input
            className="FixedInputStyle"
            type="text"
            placeholder="자금과목코드도움"
            defaultValue={funtTypeValue}
          ></input>
          <FaRegListAlt
            className="FFInputIconStyle"
            size={20}
            onClick={onChangeOpenCash}
          />
        </div>
        {isOpenCash ? (
          <FundTypeModal
            width={'700px'}
            height={'750px'}
            title={'자금과목코드도움'}
            onClickEvent={onChangeOpenCash}
            buttonYN="true"
          >
            <FundTypeSearchGrid
              loadRowData={loadRowData}
              setCASH_CD={setCASH_CD}
              onChangeOpenCash={onChangeOpenCash}
              marsterGrid={marsterGrid}
              setMarsterGrid={setMarsterGrid}
              FixedFuntState={1}
              onRowSelected={handleFTRowSelected}
            />
          </FundTypeModal>
        ) : null}
        <div className="inputDivStyle" style={{ position: 'relative' }}>
          거래처{' '}
          <input
            className="FixedInputStyle"
            type="text"
            placeholder="거래처코드도움"
            defaultValue={gtradeValue}
          ></input>
          <FaRegListAlt
            className="FFInputIconStyle"
            size={20}
            onClick={handleGtradeIconClick}
          />
        </div>

        {isTradeModalOpen && (
          <StradeCodeHelpModal
            onChangeModalClose={onChangeModalClose}
            tr_FG={TRcode}
            onRowSelected={handleTradeSelected}
            InputState={1}
          />
        )}
        <div className="inputDivStyle3" style={{ position: 'relative' }}>
          금융거래처{' '}
          <input
            className="FixedInputStyle"
            type="text"
            placeholder="거래처코드도움"
            defaultValue={ftradeValue}
          ></input>
          <FaRegListAlt
            className="FFInputIconStyle"
            size={20}
            onClick={handleFtradeIconClick}
          />
        </div>
        <button className="FFcustomButton" onClick={sendValuesToParent}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="secondDiv">
        <div className="inputDivStyle2" style={{ position: 'relative' }}>
          시작일
          <input
            className="FixedInputStyle"
            type="text"
            readOnly
            value={
              startDate && endDate
                ? `${startDate.toLocaleDateString(
                    'fr-CA'
                  )}~${endDate.toLocaleDateString('fr-CA')}`
                : ''
            }
            onClick={handleCalendarClick}
          />
          <FaRegCalendarAlt
            className="FFInputIconStyle"
            size={20}
            onClick={handleCalendarClick}
          />
          {isOpen && (
            <div className="date-picker-container">
              <DatePicker
                className="date-picker"
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                inline
                locale={ko}
              />
              {startDate && (
                <DatePicker
                  className="date-picker"
                  selected={endDate}
                  onChange={date => {
                    setEndDate(date);
                    setIsOpen(false);
                    setStartDate1(date);
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}
                  inline
                  locale={ko}
                />
              )}
            </div>
          )}
        </div>
        {startDate && (
          <button
            onClick={handleSDateReset}
            style={{
              marginLeft: -60,
              marginRight: 30,
            }}
          >
            취소
          </button>
        )}

        <div className="inputDivStyle" style={{ position: 'relative' }}>
          종료일
          <input
            className="FixedInputStyle"
            type="text"
            readOnly
            value={
              endStartDate && endEndDate
                ? `${endStartDate.toLocaleDateString(
                    'fr-CA'
                  )}~${endEndDate.toLocaleDateString('fr-CA')}`
                : ''
            }
            onClick={handleEndCalendarClick}
          />
          <FaRegCalendarAlt
            className="FFInputIconStyle"
            size={20}
            onClick={handleEndCalendarClick}
          />
          {isEndOpen && (
            <div className="date-picker-container">
              <DatePicker
                className="date-picker"
                selected={endStartDate}
                onChange={date => setEndStartDate(date)}
                selectsStart
                startDate={endStartDate}
                endDate={endEndDate}
                inline
              />
              {endStartDate && (
                <DatePicker
                  className="date-picker"
                  selected={endEndDate}
                  onChange={date => {
                    setEndEndDate(date);
                    setIsEndOpen(false);
                    setEndDate1(date);
                  }}
                  selectsEnd
                  startDate={endStartDate}
                  endDate={endEndDate}
                  minDate={
                    new Date(endStartDate.getTime() + 24 * 60 * 60 * 1000)
                  }
                  inline
                />
              )}
            </div>
          )}
        </div>
        {endStartDate && (
          <button
            onClick={handleDateReset}
            style={{
              marginLeft: -40,
            }}
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
};

export default FixedFundSelectBoxWrapper;
