import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'emp_CD',
    dataType: ValueType.INT,
  },
  {
    fieldName: 'kor_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dept_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'div_NM',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'emp_CD',
    fieldName: 'emp_CD',
    width: '300',
    header: {
      text: '사원코드',
    },
  },
  {
    name: 'kor_NM',
    fieldName: 'kor_NM',
    width: '300',
    header: {
      text: '사원명',
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
  {
    name: 'div_NM',
    fieldName: 'div_NM',
    width: '300',
    header: {
      text: '사업장명',
    },
  },
];

export const fundTypeLayout = ['emp_CD', 'kor_NM', 'dept_NM', 'div_NM'];
