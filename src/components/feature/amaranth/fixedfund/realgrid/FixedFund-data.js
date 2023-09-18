import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'cash_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cash_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tr_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tr_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'rmk_DC',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cash_AM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ftr_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ftr_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ba_NB_TR',
    dataType: ValueType.TEXT,
  },

  {
    fieldName: 'bank_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'fr_DT',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'to_DT',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'deal_PD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'deal_DD',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'cash_CD',
    fieldName: 'cash_CD',
    width: '60',
    header: {
      text: '코드',
    },
  },
  {
    name: 'CASH_NM',
    fieldName: 'CASH_NM',
    width: '150',
    header: {
      text: '자금과목',
    },
  },
  {
    name: 'TR_CD',
    fieldName: 'TR_CD',
    width: '80',
    header: {
      text: '코드',
    },
  },
  {
    name: 'TR_NM',
    fieldName: 'TR_NM',
    width: '150',
    header: {
      text: '거래처',
    },
  },
  {
    name: 'RMK_DC',
    fieldName: 'RMK_DC',
    width: '160',
    header: {
      text: '적요',
    },
  },
  {
    name: 'CASH_AM',
    fieldName: 'CASH_AM',
    width: '110',
    header: {
      text: '금액',
    },
  },
  {
    name: 'FTR_CD',
    fieldName: 'FTR_CD',
    width: '80',
    header: {
      text: '코드',
    },
  },
  {
    name: 'FTR_NM',
    fieldName: 'FTR_NM',
    width: '200',
    header: {
      text: '금융거래처',
    },
  },
  {
    name: 'BA_NB_TR',
    fieldName: 'BA_NB_TR',
    width: '130',
    header: {
      text: '계좌번호',
    },
  },
  {
    name: 'bank_CD',
    fieldName: 'bank_CD',
    width: '80',
    header: {
      text: '금융기관',
    },
  },
  {
    name: 'FR_DT',
    fieldName: 'FR_DT',
    width: '120',
    header: {
      text: '시작일',
    },
  },
  {
    name: 'TO_DT',
    fieldName: 'TO_DT',
    width: '120',
    header: {
      text: '종료일',
    },
  },
  {
    name: 'DEAL_PD',
    fieldName: 'DEAL_PD',
    width: '80',
    header: {
      text: '지급주기',
    },
  },
  {
    name: 'DEAL_DD',
    fieldName: 'DEAL_DD',
    width: '80',
    header: {
      text: '지급일',
    },
  },
];

export const rows = [
  {
    DIV_CD: '코드샘플',
    DIV_NM: '이름 샘픔',
  },
];
