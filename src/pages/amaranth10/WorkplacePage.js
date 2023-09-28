import React, { useRef } from 'react';
import {
  Button,
  CheckSelectBox,
  DetailTitle,
  Header,
  MainSidebar,
  MainTitle,
  PasswordInputBox,
  ScrollWrapper,
  SelectBox,
  Sidebar,
  Title,
  WorkpHeadTitle,
  CompSelectBox,
  WorkpTextFieldBox,
  UseSelectBox,
} from '../../components/common/Index';
import {
  ContentWrapper,
  DetailContentWrapper,
  MainContentWrapper,
  RightContentWrapper,
  SelectBoxWrapper,
  SelectWorkplaceListWrapper,
  WorkPlaceInfoWrapper,
  WorkpSelectBoxWrapper,
} from '../../components/layout/amaranth/Index';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { parseDateString, parseDateToString } from '../../util/time';
import { useFetcher } from '../../../node_modules/react-router-dom/dist/index';
import Modal from '../../components/common/modal/Modal';
import DaumPostcode from 'react-daum-postcode';
import { authAxiosInstance } from '../../axios/axiosInstance';

const WorkplacePage = () => {
  const [companyData, setCompanyData] = useState([]);
  const [workplaceData, setWorkplaceData] = useState([]);
  const [workplaceDetailData, setWorkplaceDetailData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCompanyForInsert, setSelectedCompanyForInsert] = useState('');
  const [openDate, setOpenDate] = useState(null);
  const [closeDate, setCloseDate] = useState(null);
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState();
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [SearchCocd, setSearchCocd] = useState('');
  const [SearchDivYN, setSearchDivYN] = useState('');
  const [SearchDivInfo, setSearchDivInfo] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadDiv, setShowUploadDiv] = useState(true);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [inputDivValue, setInputDivValue] = useState('');

  // 이미지 선택 시 실행되는 함수
  const handleImageSelect = imageData => {
    setSelectedImage(imageData);
    setShowUploadDiv(false);
    setIsImageUploaded(true);
    console.log('Selected Image Data:', imageData);
  };

  const handleClick = () => {
    document.getElementById('imageInput').click();
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setSelectedImage(e.target.result);
        setShowUploadDiv(false);
        setIsImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제 시 실행되는 함수
  const deleteImage = () => {
    setSelectedImage('');
    setShowUploadDiv(true);
    setIsImageUploaded(false);
  };

  useEffect(() => {
    fetchWorkplaceData();
    FetchWorkplaceDetailInfo('002', '1232');
    fetchCompanyData();
  }, []);

  // 우편번호
  const onChangeOpenPost = () => {
    console.log(isOpenPost);
    setIsOpenPost(!isOpenPost);
  };

  // 우편번호 검색 시 처리
  const onCompletePost = data => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    console.log(data.zonecode);
    setAddressDetail(fullAddr);
    console.log(fullAddr);
    setIsOpenPost(false);
  };

  const handleOpenDateChange = date => {
    setOpenDate(date);
  };

  const handleCloseDateChange = date => {
    setCloseDate(date);
  };

  const onSearchButtonClick = () => {};

  const inputRefs = {
    divCDRef: useRef(null),
    divNMRef: useRef(null),
    addrCDRef: useRef(null),
    divADDRRef: useRef(null),
    addrNUMRef: useRef(null),
    divTELRef: useRef(null),
    regNBRef: useRef(null),
    divTOCDRef: useRef(null),
    divNMKRef: useRef(null),
    businessRef: useRef(null),
    jongmokRef: useRef(null),
    masNMRef: useRef(null),
    divFAXRef: useRef(null),
    copNBRef: useRef(null),
    divYNRef: useRef(null),
  };

  const fetchWorkplaceData = async () => {
    try {
      const response = await authAxiosInstance.get(
        '/system/user/WorkplaceManage/getList'
      );
      setWorkplaceData(response.data);
      console.log('데이터입니다', workplaceData);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  const SearchWorkplace = async (divCd1, divYn1, coCd1) => {
    console.log('부르셨습니까?');
    if (divCd1 === '' && divYn1 === '' && coCd1 === '') {
      try {
        const response = await authAxiosInstance.get(
          '/system/user/WorkplaceManage/getList'
        );
        setWorkplaceData(response.data);
        console.log(response.data.length);
        if (response.data.length > 0) {
          const firstDivCd = response.data[0].div_CD;
          const firstCoCd = response.data[0].co_CD;
          FetchWorkplaceDetailInfo(firstDivCd, firstCoCd);
        } else if ((response.data.length = 0)) {
          Swal.fire({
            icon: 'error',
            title: '검색 실패',
            text: '조건에 맞는 사업장이 존재하지 않습니다.',
          });
        }
        console.log(workplaceData);
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    } else {
      const queryParams = new URLSearchParams();

      if (divCd1 !== '') queryParams.append('DIV_CD', divCd1);
      if (divCd1 !== '') queryParams.append('DIV_NM', divCd1);
      if (divYn1 !== '') queryParams.append('DIV_YN', divYn1);
      if (coCd1 !== '') queryParams.append('CO_CD', coCd1);

      try {
        const response = await authAxiosInstance.get(
          `/system/user/WorkplaceManage/getList?${queryParams.toString()}`
        );
        console.log(queryParams.toString());
        setWorkplaceData(response.data);
        console.log(response.data, '는 뭘까용?');
        console.log(response.data.length);
        if (response.data.length > 0) {
          const firstDivCd = response.data[0].div_CD;
          const firstCoCd = response.data[0].co_CD;
          FetchWorkplaceDetailInfo(firstDivCd, firstCoCd);
        } else {
          Swal.fire({
            icon: 'error',
            title: '검색 실패',
            text: '조건에 맞는 사업장이 존재하지 않습니다.',
          });
        }
        console.log(workplaceData);
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    }
  };

  const FetchWorkplaceDetailInfo = async (divCd, coCd) => {
    try {
      const response = await authAxiosInstance.get(
        `system/user/WorkplaceManage/getWorkpInfo`,
        {
          params: {
            divCd: divCd,
            coCd: coCd,
          },
        }
      );

      const fetchedWorkplaceDetailData = response.data;
      const openDate = parseDateString(fetchedWorkplaceDetailData.open_DT);
      const closeDate = parseDateString(fetchedWorkplaceDetailData.close_DT);

      try {
        const companyResponse = await authAxiosInstance.get(
          `system/admin/groupManage/CompanyDetail/${fetchedWorkplaceDetailData.co_CD}`
        );

        const companyData = companyResponse.data;
        const updatedWorkplaceDetailData = {
          ...fetchedWorkplaceDetailData,
          co_NM: companyData.co_NM,
          isAdding: false,
        };
        deleteImage();
        setWorkplaceDetailData(updatedWorkplaceDetailData);
        setOpenDate(new Date(openDate) || '');
        setCloseDate(new Date(closeDate) || '');
        setIsAdding(false);
        setAddress('');
        setAddressDetail('');
        handleImageSelect(updatedWorkplaceDetailData.cop_SL);
      } catch (error) {
        console.error('Error fetching company detail:', error);
      }
    } catch (error) {
      console.error('Error fetching workplace info:', error);
    }
  };

  const initialWorkplaceDetailData = {
    business: '',
    close_DT: '',
    co_CD: '',
    co_NM: '',
    cop_NB: '',
    div_ADDR: '',
    div_CD: '',
    div_FAX: '',
    div_NM: '',
    div_NMK: '',
    div_TEL: '',
    div_TO_CD: '',
    div_YN: '',
    fill_YN: '',
    jongmok: '',
    mas_NM: '',
    open_DT: '',
    reg_NB: '',
    addr_CD: '',
    addr_NUM: '',
    isAdding: true,
  };

  const handleAddClick = () => {
    setWorkplaceDetailData(initialWorkplaceDetailData);
    setIsAdding(true);
    fetchCompanyData();
    setOpenDate(new Date());
    setCloseDate('');
    setSelectedImage('');
  };

  const createWorkplaceData = (inputRefs, div_CD, co_CD, selectedImage) => {
    return {
      div_CD: div_CD || '',
      co_CD: co_CD || '',
      div_NM: inputRefs.divNMRef?.current?.value || '',
      div_ADDR: inputRefs.divADDRRef?.current?.value || '',
      addr_CD: inputRefs.addrCDRef?.current?.value || '',
      addr_NUM: inputRefs.addrNUMRef?.current?.value || '',
      div_TEL: inputRefs.divTELRef?.current?.value || '',
      reg_NB: inputRefs.regNBRef?.current?.value || '',
      div_TO_CD: '121', // 업태코드 업데이트 필요 시 추가
      div_NMK: inputRefs.divNMKRef?.current?.value || '',
      business: inputRefs.businessRef?.current?.value || '',
      jongmok: inputRefs.jongmokRef?.current?.value || '',
      mas_NM: inputRefs.masNMRef?.current?.value || '',
      open_DT: parseDateToString(openDate) || '',
      close_DT: parseDateToString(closeDate) || '',
      div_FAX: inputRefs.divFAXRef?.current?.value || '',
      cop_NB: inputRefs.copNBRef?.current?.value || '',
      cop_SL: selectedImage,
    };
  };

  const handleInsert = async () => {
    const data = createWorkplaceData(
      inputRefs,
      inputRefs.divCDRef.current.value,
      selectedCompanyForInsert,
      selectedImage
    );

    console.log(data);
    try {
      const response = await authAxiosInstance.post(
        '/system/user/WorkplaceManage/insert',
        data
      );

      console.log('Insert response:', response.data);

      Swal.fire({
        icon: 'success',
        title: '저장 완료',
        text: '사업장 정보가 성공적으로 저장되었습니다.',
      });
      FetchWorkplaceDetailInfo(data.div_CD, data.co_CD);
    } catch (error) {
      console.error('Error inserting workplace:', error);
      Swal.fire({
        icon: 'error',
        title: '저장 실패',
        text: '사업장 정보 저장에 실패했습니다. 다시 시도해주세요.',
      });
    }
  };

  const handleUpdate = async () => {
    console.log(inputRefs.divNMRef.current.value);
    console.log(inputRefs.copNBRef.current.value);
    console.log('update 함수 실행!');
    const data = createWorkplaceData(
      inputRefs,
      workplaceDetailData.div_CD,
      workplaceDetailData.co_CD,
      selectedImage
    );
    try {
      console.log(data);
      const response = await authAxiosInstance.put(
        '/system/user/WorkplaceManage/update',
        data
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '업데이트 완료',
          text: '사업장 정보가 성공적으로 업데이트되었습니다.',
        });

        Swal.fire({
          title: '업데이트 완료',
          text: '사업장 정보가 성공적으로 업데이트되었습니다.',
          icon: 'success',
        }).then(result => {
          if (result.isConfirmed) {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          }
        });
        fetchWorkplaceData();
        FetchWorkplaceDetailInfo(data.div_CD, data.co_CD);
        console.log('이게궁금합니다', data.div_CD);
      } else {
        Swal.fire({
          icon: 'error',
          title: '업데이트 실패',
          text: '사업장 정보 업데이트에 실패했습니다. 다시 시도해주세요.',
        });
      }
    } catch (error) {
      console.error('Error updating workplace:', error);
      Swal.fire({
        icon: 'error',
        title: '업데이트 실패',
        text: '사업장 정보 업데이트에 실패했습니다. 다시 시도해주세요.',
      });
    }
  };

  const deleteDiv = async () => {
    try {
      const { div_CD, co_CD } = workplaceDetailData;
      const response = await authAxiosInstance.put(
        `system/user/WorkplaceManage/delete/${div_CD}/${co_CD}`,
        null
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '삭제완료',
          text: '사업장 정보가 삭제되었습니다.',
        });
        FetchWorkplaceDetailInfo(
          workplaceDetailData.div_CD,
          workplaceDetailData.co_CD
        );
        console.log('Workplace deleted successfully');
      } else {
        console.log('Error deleting workplace');
      }
    } catch (error) {
      console.error('Error deleting workplace:', error);
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await authAxiosInstance.get(
        'system/user/groupManage/employee/getCompanyList'
      );
      const mappedCompanyData = response.data.map(company => ({
        value: company.co_CD,
        label: company.co_NM,
      }));

      setCompanyData(mappedCompanyData);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const handleValidationAndShowMessages = () => {
    let hasError = false;

    // ... (이전 코드 생략)

    if (hasError) {
      // 에러 발생 시 에러 메시지 표시 및 커서 이동 로직 구현
      if (!selectedCompanyForInsert) {
        inputRefs.companyRef.current.focus(); // 회사 선택 필드로 포커스 이동
        //setCompanyError(true); // 회사 선택 에러 메시지 표시
      } else if (!inputRefs.divCDRef.current.value) {
        inputRefs.divCDRef.current.focus(); // div_CD 필드로 포커스 이동
        //setDivCDError(true); // div_CD 에러 메시지 표시
      } else if (!inputRefs.divNMRef?.current?.value) {
        inputRefs.divNMRef.current.focus(); // div_NM 필드로 포커스 이동
        //setDivNMError(true); // div_NM 에러 메시지 표시
      }

      // 나머지 필드들에 대해서도 동일한 방식으로 처리 가능
    }

    return hasError;
  };

  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
      <MainTitle mainTitle={'시스템 설정'} />
      <ContentWrapper>
        <Title titleName={'사업장관리'}></Title>
        <DetailContentWrapper>
          <WorkpSelectBoxWrapper>
            <CompSelectBox
              title={'회사선택'}
              data={companyData}
              height={28}
              width={200}
              selectMenu={'전체'}
              onSelectChange={selectedCoCd => setSearchCocd(selectedCoCd)}
              state={1}
            />
            <WorkpTextFieldBox
              width={'300px'}
              title={'사업장'}
              onInputChange={inputValue => setSearchDivInfo(inputValue)}
              value={inputDivValue}
              setValue={setInputDivValue}
            />
            <UseSelectBox
              title={'사용여부'}
              onChange={selectedValue => setSearchDivYN(selectedValue)}
              defaultUse={SearchDivYN}
            />
            <button
              onClick={() =>
                SearchWorkplace(SearchDivInfo, SearchDivYN, SearchCocd)
              }
              className="customButton"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </WorkpSelectBoxWrapper>
          <MainContentWrapper>
            <SelectWorkplaceListWrapper
              width={'295px'}
              title={'사업장'}
              dataCount={workplaceData.length}
              data={workplaceData}
              FetchWorkplaceDetailInfo={FetchWorkplaceDetailInfo}
              handleAddClick={handleAddClick}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              onSearchButtonClick={onSearchButtonClick}
            />
            <RightContentWrapper>
              <WorkpHeadTitle
                titleName={isAdding ? '사업장 등록' : '기본정보'}
                isAdding={isAdding}
                onClickInsert={handleInsert}
                onClickUpdate={handleUpdate}
                deleteDiv={deleteDiv}
              ></WorkpHeadTitle>
              <ScrollWrapper width={'100%'} deptH={-40}>
                <WorkPlaceInfoWrapper
                  data={workplaceDetailData}
                  inputRefs={inputRefs}
                  companyData={companyData}
                  onCompanyChange={setSelectedCompanyForInsert}
                  openDate={openDate}
                  setOpenDate={setOpenDate}
                  closeDate={closeDate}
                  setCloseDate={setCloseDate}
                  handleOpenDateChange={handleOpenDateChange}
                  handleCloseDateChange={handleCloseDateChange}
                  onChangeOpenPost={onChangeOpenPost}
                  address={address}
                  addressDetail={addressDetail}
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  isImageUploaded={isImageUploaded}
                  deleteImage={deleteImage}
                  showUploadDiv={showUploadDiv}
                  handleImageChange={handleImageChange}
                  handleClick={handleClick}
                  setShowUploadDiv={setShowUploadDiv}
                />
              </ScrollWrapper>
            </RightContentWrapper>
          </MainContentWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
      {isOpenPost ? (
        <Modal
          width={'560px'}
          height={'600px'}
          title={'우편번호'}
          onClickEvent={onChangeOpenPost}
        >
          <DaumPostcode autoClose onComplete={onCompletePost} />
        </Modal>
      ) : null}
    </div>
  );
};

export default WorkplacePage;
