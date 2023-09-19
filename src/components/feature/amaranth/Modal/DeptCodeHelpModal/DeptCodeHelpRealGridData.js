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
];

export const columns = [
  {
    name: 'dept_CD',
    fieldName: 'dept_CD',
    width: '300',
    header: {
      text: '부서코드',
    },
  },
  {
    name: 'dept_NM',
    fieldName: 'dept_NM',
    width: '300',
    header: {
      text: '부서명',
    },
  },
];

export const fundTypeLayout = ['dept_CD', 'dept_NM'];
