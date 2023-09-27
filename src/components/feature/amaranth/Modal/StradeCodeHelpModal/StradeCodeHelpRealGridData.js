import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'tr_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tr_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'reg_NB',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ba_NB_TR',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ceo_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tr_FG',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'tr_CD',
    fieldName: 'tr_CD',
    width: '300',
    header: {
      text: '거래처코드',
    },
  },
  {
    name: 'tr_NM',
    fieldName: 'tr_NM',
    width: '300',
    header: {
      text: '거래처명',
    },
  },
  {
    name: 'reg_NB',
    fieldName: 'reg_NB',
    width: '300',
    header: {
      text: '사업자번호',
    },
  },
  {
    name: 'ba_NB_TR',
    fieldName: 'ba_NB_TR',
    width: '300',
    header: {
      text: '계좌번호',
    },
  },
  {
    name: 'ceo_NM',
    fieldName: 'ceo_NM',
    width: '300',
    header: {
      text: '대표자',
    },
  },
  {
    name: 'tr_FG',
    fieldName: 'tr_FG',
    width: '300',
    header: {
      text: '구분',
    },
  },
];

export const fundTypeLayout = [
  'tr_CD',
  'tr_NM',
  'reg_NB',
  'ba_NB_TR',
  'ceo_NM',
  'tr_FG',
];
