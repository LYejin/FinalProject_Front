import { ValueType } from 'realgrid';

export const changeHistoryfields = [
  {
    fieldName: 'ch_CD',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'emp_CD',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'co_CD',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'ch_DT',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'ch_DIVISION',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'chd_TARGET_CO_NM',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'chd_TARGET_NM',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'ch_IM',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'ch_NM',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'ch_IP',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
];

export const changeHistoryDetailfields = [
  {
    fieldName: 'chd_CD',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'chd_ITEM',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'chd_DT',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'chd_BT',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'chd_AT',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
];

export const changeHistoryColumns = [
  {
    name: 'cd_CD',
    fieldName: 'cd_CD',
    visible: false,
  },
  {
    name: 'emp_CD',
    fieldName: 'emp_CD',
    visible: false,
  },
  {
    name: 'co_CD',
    fieldName: 'co_CD',
    visible: false,
  },
  {
    name: 'ch_DT',
    fieldName: 'ch_DT',
    width: '100', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '변경일시', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'ch_DIVISION',
    fieldName: 'ch_DIVISION',
    width: '50', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '변경구분', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'chd_TARGET_CO_NM',
    fieldName: 'chd_TARGET_CO_NM',
    width: '100', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '회사', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'chd_TARGET_NM',
    fieldName: 'chd_TARGET_NM',
    width: '100', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '변경대상', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'ch_IM',
    fieldName: 'ch_IM',
    width: '100', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '변경내용', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'ch_NM',
    fieldName: 'ch_NM',
    width: '90', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '변경자(ID)', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'ch_IP',
    fieldName: 'ch_IP',
    width: '50', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '변경자(IP)', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
];

export const changeHistoryDetailColumns = [
  {
    name: 'ch_CD',
    fieldName: 'ch_CD',
    visible: false,
  },
  {
    name: 'chd_DT',
    fieldName: 'chd_DT',
    visible: false,
  },
  {
    name: 'chd_ITEM',
    fieldName: 'chd_ITEM',
    width: '70', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '항목명', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'chd_BT',
    fieldName: 'chd_BT',
    width: '100', // 너비 수정
    styleName: 'left-column ',
    renderer: {
      type: 'html',
      callback: function (grid, cell, w, h) {
        let data = grid.getValue(cell.index.itemIndex, 'chd_BT');
        let type = data?.substring(0, 11);
        let str = '';
        if (type?.includes('data:image/')) {
          str = `<img src=${data} alt="Company Logo" style="width: 87px; height: 90px;" />`;
        } else {
          str = data;
        }
        return str;
      },
    },
    header: {
      text: '변경 전', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'chd_AT',
    fieldName: 'chd_AT',
    width: '100', // 너비 수정
    styleName: 'left-column ',
    renderer: {
      type: 'html',
      callback: function (grid, cell, w, h) {
        let data = grid.getValue(cell.index.itemIndex, 'chd_AT');
        let type = data?.substring(0, 11);
        let str = '';
        if (type?.includes('data:image/')) {
          str = `<img src=${data} alt="Company Logo" style="width: 87px; height: 90px;" />`;
        } else {
          str = data;
        }
        return str;
      },
    },
    header: {
      text: '변경 후', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
];

export const comPanyChangeHistoryLayout = [
  'ch_DT',
  'ch_DIVISION',
  'chd_TARGET_NM',
  'ch_IM',
  'ch_NM',
  'ch_IP',
];
export const empAndWorkChangeHistoryLayout = [
  'ch_DT',
  'ch_DIVISION',
  'chd_TARGET_CO_NM',
  'chd_TARGET_NM',
  'ch_IM',
  'ch_NM',
  'ch_IP',
];

export const changeHistoryDetailCLayout = ['chd_ITEM', 'chd_BT', 'chd_AT'];

export const companyLabels = {
  PIC_FILE_ID: '회사로고',
  CO_CD: '회사코드',
  USE_YN: '사용여부',
  CO_NM: '회사명',
  CO_NMK: '약칭',
  BUSINESS: '업태',
  JONGMOK: '종목',
  REG_NB: '사업자번호',
  CEO_NM: '대표자명',
  HO_FAX: '대표자팩스',
  CEO_TEL: '대표자전화번호',
  PPL_NB: '대표자주민번호',
  HO_ZIP: '본점우편번호',
  HO_ADDR: '본점주소',
  HO_ADDR1: '본점번지',
  CO_FG: '회사구분',
  CO_NB: '법인등록번호',
  EST_DT: '설립일',
  OPEN_DT: '개업일',
  CLOSE_DT: '폐업일',
  ACCT_FG: '회사계정유형',
};
export const workplaceLabels = {
  DIV_YN: '사용여부',
  FILL_YN: '본점여부',
  DIV_NM: '사업장이름',
  DIV_ADDR: '사업장주소',
  DIV_TEL: '사업장 전화번호',
  REG_NB: '사업자번호',
  DIV_NMK: '사업장약칭',
  BUSINESS: '업태',
  JONGMOK: '종목',
  OPEN_DT: '개업일',
  CLOSE_DT: '폐업일',
  MAS_NM: '관리자명',
  DIV_FAX: 'FAX번호',
  COP_NB: '법인번호',
  ADDR_CD: '우편번호',
  ADDR_NUM: '상세주소',
  PIC_FILE_ID: '부서이미지',
};

export const employeeLabels = {
  EMP_CD: '사원번호',
  CO_CD: '회사코드',
  DIV_CD: '사업장코드',
  DEPT_CD: '부서코드',
  USER_YN: '사용여부',
  USE_FG: '조회권한',
  USERNAME: '로그인 아이디',
  PASSWORD: '로그인 비밀번호',
  KOR_NM: '이름',
  EMAIL_ADD: '메일ID',
  TEL: '전화번호',
  GENDER_FG: '성별',
  JOIN_DT: '입사일',
  RTR_DT: '퇴사일',
  RSRG_ADD: '주소지',
  PIC_FILE_ID: '사진파일명',
  ENRL_FG: '재직구분',
  PERSONAL_MAIL: '개인메일ID',
  PERSONAL_MAIL_CP: '개인메일회사',
  SALARY_MAIL: '급여메일ID',
  SALARY_MAIL_CP: '급여메일소속',
  HOME_TEL: '전화번호(집)',
  ZIPCODE: '우편번호',
  ADDR: '주소',
  ADDR_NUM: '번지',
};
