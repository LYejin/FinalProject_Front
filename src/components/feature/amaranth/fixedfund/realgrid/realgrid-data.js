import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'div_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'div_NM',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'div_CD',
    fieldName: 'div_CD',
    width: '228',
    editable: false,
    header: {
      text: '사업장명',
    },
  },
  {
    name: 'div_NM',
    fieldName: 'div_NM',
    width: '230',
    editable: false,
    header: {
      text: '사업장코드',
    },
  },
];

export const rows = [
  {
    DIV_CD: '코드샘플',
    DIV_NM: '이름 샘픔',
  },
];
