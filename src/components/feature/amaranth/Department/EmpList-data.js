import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'dept_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dept_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'kor_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'enrl_FG',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'dept_CD',
    fieldName: 'dept_CD',
    width: '150',
    editable: false,
    header: {
      text: '부서코드',
    },
  },
  {
    name: 'dept_NM',
    fieldName: 'dept_NM',
    width: '150',
    editable: false,
    header: {
      text: '부서이름',
    },
  },
  {
    name: 'kor_NM',
    fieldName: 'kor_NM',
    width: '150',
    editable: false,
    header: {
      text: '사원명',
    },
  },
  {
    name: 'enrl_FG',
    fieldName: 'enrl_FG',
    width: '150',
    editable: false,
    header: {
      text: '재직구분',
    },
  },
];

export const rows = [
  {
    DIV_CD: '코드샘플',
    DIV_NM: '이름 샘픔',
  },
];
