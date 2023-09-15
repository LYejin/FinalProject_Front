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
    fieldName: 'note',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'insert_DT',
    dataType: 'datetime',
    datetimeFormat: 'yyyyMMdd',
  },
];

export const columns = [
  {
    name: 'emp_CD',
    fieldName: 'emp_CD',
    width: '300',
    button: 'action',
    buttonVisibility: 'always',
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
    name: 'note',
    fieldName: 'note',
    width: '300',
    header: {
      text: '비고',
    },
  },
  {
    name: 'insert_DT',
    fieldName: 'insert_DT',
    width: '300',
    header: {
      text: '등록일',
    },
    editor: {
      datetimeFormat: 'yyyy-MM-dd',
    },
    styles: {
      datetimeFormat: 'yyyy-MM-dd',
    },
  },
];

export const fundTypeLayout = ['emp_CD', 'kor_NM', 'note', 'insert_DT'];
