import React, { useCallback, useState } from 'react';
import CompanyNameRearGrid from './CompanyNameRearGrid';
import SelectBoxWrapper from '../../../../layout/amaranth/SelectBoxWrapper';
import ChangeHistorySelectCategory from '../../../ChangeHistory/box/ChangeHistorySelectCategory';

import { useForm } from 'react-hook-form';
import './CompanyName.css';
import axios from '../../../../../../node_modules/axios/index';
import BeatLoader from 'react-spinners/BeatLoader';
import CompanyNameSelectCategory from './CompanyNameSelectCategory';
import './Paging.css';

import Pagination from 'react-js-pagination';

const CompanyNameSelect = ({
  searchCompanyData,
  setSearchCompanyData,
  onComplete,
  closeModal,
  isOpenCompanyName,
  onChangeOpenCompanyName,
  onCompleteCompanyName,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setFocus,
    trigger,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({ mode: 'onChange', shouldFocusError: true });

  const searchOption = ['회사명', '법인번호', '사업자번호'];
  const searchNum = ['3', '2', '1'];
  const [companyData, setCompanyData] = useState([]);
  const [clickYN, setClickYN] = useState(true);
  const [selectCategory, setSelectCategory] = useState('3'); // 사용여부 select box state
  const [companyNameGrid, setCompanyNameGrid] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handlePageChange = page => {
    companyNameGrid.grid.setPage(page - 1);
    setPage(page);
  };

  React.useEffect(() => {
    reset();
    setSelectCategory('3');
    setTotalPage(0);
    setPage(1);
  }, [isOpenCompanyName]);

  const onCompanyNameSubmit = async data => {
    setLoading(true);
    setTotalPage(0);
    setPage(1);
    const { key, q, gb, status, pagecnt, ceo, area } = data;
    const listData = [];

    console.log('회사이름', data);
    console.log(companyNameGrid.grid.getItemCount());
    // 쿼리스트링 생성
    let queryString = `?key=${encodeURIComponent(key)}&q=${encodeURIComponent(
      q
    )}&gb=${encodeURIComponent(gb)}&status=${encodeURIComponent(
      status
    )}&pagecnt=${encodeURIComponent(pagecnt)}`;

    if (data?.ceo) {
      // 사업자번호 검색일 경우
      queryString += `&ceo=${encodeURIComponent(ceo)}`;
    } else if (data?.area) {
      // 법인번호 검색일 경우
      queryString += `&area=${encodeURIComponent(area)}`;
    }

    try {
      // Axios를 사용하여 GET 요청 보내기

      const response = await axios.get(
        `https://bizno.net/api/fapi/${queryString}&type=json`
      );

      // 응답 데이터 처리
      console.log(response.data.items);
      response.data.items.forEach(item => {
        if (item !== null) {
          listData.push(item);
        }
      });
      console.log(
        '확인!!!!!!!!!!!!!!!!',
        loading,
        listData,
        typeof listData.length,
        listData.length / 12
      );
      setTotalPage(listData.length);
      companyNameGrid.grid.showProgress(); //데이터 로딩바 생성
      companyNameGrid.grid.cancel();
      companyNameGrid.provider.clearRows();
      companyNameGrid.grid.resetCurrent();
      companyNameGrid.grid.cancel();
      companyNameGrid.grid.setPage(1);

      companyNameGrid.grid.closeProgress(); // 서버 데이터 로드 완료시 로딩바 제거

      companyNameGrid.provider.fillJsonData(listData, {
        fillMode: 'set',
      });
    } catch (error) {
      // 에러 처리
      console.error('에러:', error);
    } finally {
      setLoading(false); // 요청 완료 시 로딩 상태를 false로 설정
    }

    console.log(listData);
  };

  const headerOnClick = item => {
    console.log('클릭', item);
    //setSearchCompanyData(item);
    onComplete(item);
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onCompanyNameSubmit)}>
        <SelectBoxWrapper>
          <span className="companyNameTypeLableText">검색유형</span>
          <CompanyNameSelectCategory
            width={'calc(0% - -95px)'}
            state={selectCategory}
            setState={setSelectCategory}
            register={register}
            clickYN={clickYN}
            total={true}
          />
          <input
            type="text"
            className="companyNameSearchInputBox"
            {...register('q')}
          />
          <span className="companyNameLableText">대표자명</span>
          <input
            type="text"
            className="companyNameInputBox"
            {...register('ceo')}
          />
          <span className="companyNameLableText">지역</span>
          <input
            type="text"
            className="companyNameInputBox"
            {...register('area')}
          />
          <input
            type="hidden"
            name="status"
            value="N"
            {...register('status')}
          />
          <input
            type="hidden"
            name="key"
            value="YXdkcmd5amlsMTk5QG5hdmVyLmNvbSAg"
            {...register('key')}
          />
          <input
            type="hidden"
            name="pagecnt"
            value="100"
            {...register('pagecnt')}
          />
          <div className="selectBoxButtonWrapper">
            <button type="submit" className="companyFFcustomButton">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </SelectBoxWrapper>
      </form>
      {loading ? (
        <div className="loadingContainer ">
          <h2>검색 중입니다. 잠시 기다려주세요</h2>
          <BeatLoader color="#010201" className="loadingText" />
        </div>
      ) : null}
      <CompanyNameRearGrid
        setCompanyNameGrid={setCompanyNameGrid}
        onCompleteCompanyName={onCompleteCompanyName}
        onChangeOpenCompanyName={onChangeOpenCompanyName}
        style={{
          display: loading ? 'block' : 'none',
          zIndex: loading ? 1 : -1,
        }}
      />

      <Pagination
        activePage={page}
        totalItemsCount={totalPage}
        itemsCountPerPage={12}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CompanyNameSelect;
