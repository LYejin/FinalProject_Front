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
import _ from 'lodash';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { parseDateString, parseDateToString } from '../../util/time';
import { useFetcher } from '../../../node_modules/react-router-dom/dist/index';
import Modal from '../../components/common/modal/Modal';
import DaumPostcode from 'react-daum-postcode';
import { authAxiosInstance } from '../../axios/axiosInstance';
import ChangeHistoryModal from '../../components/common/modal/ChangeHistoryModal';
import {
  empAndWorkChangeHistoryLayout,
  workplaceLabels,
} from '../../components/feature/ChangeHistory/Realgrid-Data-ChangeHistory';
import { useForm } from 'react-hook-form';

const WorkplacePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    clearErrors,
    setValue,
    setError,
  } = useForm({
    mode: 'onChange',
  });

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
  const [isUpdate, setIsUpdate] = useState(false);
  const [changeFormData, setChangeFormData] = useState({}); // 변경된 form data
  const [data, setData] = useState({});
  const [changeHistoryOpenPost, setChangeHistoryOpenPost] = useState(false);
  const [onChangeForm, setChangeForm] = useState(false); // 폼 변경 사항 확인
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedDivCd, setSelectedDivCd] = useState(null);
  const [useCoCd, setUseCoCd] = useState('');

  const CATEGORY = useRef('사업장');

  const formRef = useRef(null);

  const onChangeFunction = e => {
    const updatedData = {
      ...changeFormData,
      [e.target.name]: e.target.value,
    };
    // setChangeFormData(updatedData);
    setChangeFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    const isChanged = Object.keys(updatedData).some(
      key => !_.isEqual(data[key], updatedData[key])
    );

    setChangeForm(isChanged);
  };

  // 이미지 선택 시 실행되는 함수
  const handleImageSelect = imageData => {
    setSelectedImage(imageData);
    setShowUploadDiv(false);
    setIsImageUploaded(true);
    // console.log('Selected Image Data:', imageData);
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
    FetchWorkplaceDetailInfo('1111', '1004');
    fetchCompanyData();
  }, []);

  // 우편번호
  const onChangeOpenPost = () => {
    // console.log(isOpenPost);
    setIsOpenPost(!isOpenPost);
  };
  const onCompletePost = data => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }
    setChangeForm(true);
    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setData(prevData => ({
      ...prevData,
      addr_NUM: '',
    }));

    setChangeFormData(prevChangeFormData => {
      const updatedData = {
        ...prevChangeFormData,
        addr_CD: data.zonecode,
        div_ADDR: fullAddr,
      };

      // 비교를 수행하여 setChangeForm 설정
      const isChanged =
        prevChangeFormData &&
        Object.keys(updatedData).some(
          key => !_.isEqual(prevChangeFormData[key], updatedData[key])
        );
      setChangeForm(!isChanged);

      return updatedData;
    });

    setIsOpenPost(false);
  };

  // 날짜 변경 핸들러
  const handleOpenDateChange = date => {
    setOpenDate(date);
    setChangeFormData(prevChangeFormData => {
      const newFormData = {
        ...prevChangeFormData,
        open_DT: parseDateToString(date),
      };

      // 비교를 수행하여 setChangeForm 설정
      const isChanged =
        prevChangeFormData &&
        Object.keys(newFormData).some(
          key => !_.isEqual(prevChangeFormData[key], newFormData[key])
        );
      setChangeForm(isChanged); // 만약 변경사항이 있다면 true로 설정

      return newFormData;
    });
  };

  const handleCloseDateChange = date => {
    setCloseDate(date);
    if (!date || isNaN(date.getTime())) {
      setChangeForm(prevChangeFormData => ({
        ...prevChangeFormData,
        close_DT: null,
      }));
    } else {
      setChangeFormData(prevChangeFormData => ({
        ...prevChangeFormData,
        close_DT: date,
      }));
    }
  };

  const onSearchButtonClick = () => {};

  const resetData = () => {
    setData({
      business: '',
      close_DT: '',
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
    });
  };

  const fetchWorkplaceData = async () => {
    try {
      const response = await authAxiosInstance.get(
        '/system/user/WorkplaceManage/getList'
      );
      setWorkplaceData(response.data);
      // console.log('데이터입니다', workplaceData);
      // console.log('데이터입니다아아앙', workplaceData[0].div_CD);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  const SearchWorkplace = async (divCd1, divYn1, coCd1) => {
    // console.log('부르셨습니까?');
    if (divCd1 === '' && divYn1 === '' && coCd1 === '') {
      try {
        const response = await authAxiosInstance.get(
          '/system/user/WorkplaceManage/getList'
        );
        setWorkplaceData(response.data);
        // console.log(response.data.length);
        if (response.data.length > 0) {
          const firstDivCd = response.data[0].div_CD;
          const firstCoCd = response.data[0].co_CD;
          FetchWorkplaceDetailInfo(firstDivCd, firstCoCd);
        } else if ((response.data.length = 0)) {
          Swal.fire({
            icon: 'error',
            title: '검색 실패',
            text: '조건에 맞는 사업장이 존재하지 않습니다.',
            showConfirmButton: false,
            timer: 1000,
          });
        }
        // console.log(workplaceData);
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
        // console.log(queryParams.toString());
        setWorkplaceData(response.data);
        // console.log(response.data, '는 뭘까용?');
        // console.log(response.data.length);
        if (response.data.length > 0) {
          const firstDivCd = response.data[0].div_CD;
          const firstCoCd = response.data[0].co_CD;
          FetchWorkplaceDetailInfo(firstDivCd, firstCoCd);
        } else {
          Swal.fire({
            icon: 'error',
            title: '검색 실패',
            // text: '조건에 맞는 사업장이 존재하지 않습니다.',
            showConfirmButton: false,
            timer: 1000,
          });
        }
        // console.log(workplaceData);
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    }
  };

  const FetchWorkplaceDetailInfo = async (divCd, coCd) => {
    reset();
    setAddress();
    setAddressDetail();
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
      // console.log('dfsdfasdfsfasdfsd', response.data);
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
        setData(updatedWorkplaceDetailData);
        if (openDate) {
          setOpenDate(new Date(openDate));
        } else {
          setOpenDate(null);
        }

        if (closeDate) {
          setCloseDate(new Date(closeDate));
        } else {
          setCloseDate(null);
        }
        setSelectedDivCd(divCd);
        setUseCoCd(coCd);
        setIsAdding(false);
        setAddress('');
        setAddressDetail('');
        handleImageSelect(updatedWorkplaceDetailData.pic_FILE_ID);
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
    reset();
    setSelectedCompanyForInsert('');
    setSelectedCompany('');
    setData(initialWorkplaceDetailData);
    setAddress();
    setAddressDetail();
    setIsAdding(true);
    fetchCompanyData();
    setOpenDate(new Date());
    setCloseDate('');
    setSelectedImage('');
  };

  const onSubmit = async data => {
    // console.log('이거왜', isAdding);
    // console.log('인서트입니다.');
    // console.log('당연히 안나오겠지만,', data.div_NM);
    // console.log('당연히 안나오겠지만,', data.div_CD);
    // console.log('Submitted Data: ', data);
    if (isAdding) {
      const Workpdata = {
        div_CD: data?.div_CD || '',
        co_CD: selectedCompanyForInsert,
        div_NM: data?.div_NM || '',
        div_ADDR: data ? data.div_ADDR || addressDetail : addressDetail,
        addr_CD: data ? data.addr_CD || address : address,
        addr_NUM: data?.addr_NUM || '',
        div_TEL: data?.div_TEL || '',
        reg_NB: data?.reg_NB || '',
        div_TO_CD: '',
        div_NMK: data?.div_NMK || '',
        business: data?.business || '',
        jongmok: data?.jongmok || '',
        mas_NM: data?.mas_NM || '',
        div_FAX: data?.div_FAX || '',
        cop_NB: data?.cop_NB || '',
        open_DT: parseDateToString(openDate) || '',
        close_DT: parseDateToString(closeDate) || '',
        pic_FILE_ID: selectedImage,
      };

      console.log(data);
      try {
        const response = await authAxiosInstance.post(
          '/system/user/WorkplaceManage/insert',
          Workpdata
        );

        console.log('Insert response:', response.data);

        Swal.fire({
          icon: 'success',
          title: '저장 완료',
          text: '사업장 정보가 성공적으로 저장되었습니다.',
          showConfirmButton: false,
          timer: 1000,
        });
        fetchWorkplaceData();
        FetchWorkplaceDetailInfo(Workpdata.div_CD, Workpdata.co_CD);
      } catch (error) {
        console.error('Error inserting workplace:', error);
        Swal.fire({
          icon: 'error',
          title: '저장 실패',
          text: '사업장 정보 저장에 실패했습니다. 다시 시도해주세요.',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } else if (!isAdding) {
      if (!onChangeForm) {
        Swal.fire({
          icon: 'error',
          title: '변경된 내용이 없습니다.',
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }

      // console.log('update 함수 실행!');
      try {
        // console.log(data);

        const mergedData = {
          ...changeFormData,
          co_CD: useCoCd,
          div_CD: selectedDivCd,
        };
        const response = await authAxiosInstance.put(
          '/system/user/WorkplaceManage/update',
          mergedData
        );
        // console.log('왜 모르지', mergedData);
        const updatedData = { ...data, ...changeFormData };
        setChangeFormData(updatedData);

        // console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: '업데이트 완료',
          text: '사업장 정보가 성공적으로 업데이트되었습니다.',
          showConfirmButton: false,
          timer: 1000,
        });
      } catch (error) {
        console.error('Error updating workplace:', error);
        Swal.fire({
          icon: 'error',
          title: '업데이트 실패',
          text: '사업장 정보 업데이트에 실패했습니다. 다시 시도해주세요.',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
    FetchWorkplaceDetailInfo(selectedDivCd, useCoCd);
    fetchWorkplaceData();
    setChangeFormData({});
    setIsAdding(false);
    setChangeForm(false);
  };

  const deleteDiv = async () => {
    if (data.div_YN === '0') {
      Swal.fire({
        icon: 'error',
        title: '잘못된 요청',
        text: '이미 삭제된 사업장입니다.',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    try {
      const { div_CD, co_CD } = data;
      const response = await authAxiosInstance.put(
        `system/user/WorkplaceManage/delete/${div_CD}/${co_CD}`,
        null
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '삭제완료',
          text: '사업장 정보가 삭제되었습니다.',
          showConfirmButton: false,
          timer: 1000,
        });
        FetchWorkplaceDetailInfo(data.div_CD, data.co_CD);
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

  const ModalOpenButton = () => {
    setChangeHistoryOpenPost(!changeHistoryOpenPost);
  };

  return (
    <div className="sb-nav-fixed">
      <Header />
      <MainSidebar />
      <Sidebar />
      <MainTitle mainTitle={'시스템 설정'} />
      <ContentWrapper>
        <Title titleName={'사업장관리'}>
          <button
            type="button"
            className="changeHistoryWhiteButton"
            onClick={() => ModalOpenButton()}
          >
            변경이력
          </button>
        </Title>
        <DetailContentWrapper>
          <WorkpSelectBoxWrapper>
            <CompSelectBox
              title={'회사'}
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
              className="FFcustomButton"
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
                onClickInsert={handleSubmit(onSubmit)}
                onClickUpdate={handleSubmit(onSubmit)}
                deleteDiv={deleteDiv}
              ></WorkpHeadTitle>
              <ScrollWrapper width={'100%'} deptH={-40}>
                <form
                  ref={formRef}
                  onChange={onChangeFunction}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <WorkPlaceInfoWrapper
                    data={data}
                    register={register}
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
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
                    errors={errors}
                    setError={setError}
                    coCd={selectedCompany}
                    clearErrors={clearErrors}
                  />
                </form>
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
      {changeHistoryOpenPost && (
        <ChangeHistoryModal
          CATEGORY={CATEGORY.current}
          changeHistoryOpenPost={changeHistoryOpenPost}
          setChangeHistoryOpenPost={setChangeHistoryOpenPost}
          layout={empAndWorkChangeHistoryLayout}
          columnLabels={workplaceLabels}
        />
      )}
    </div>
  );
};

export default WorkplacePage;
