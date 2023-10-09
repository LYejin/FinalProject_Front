import { ValueType } from 'realgrid';

export const companyNamefields = [
  {
    fieldName: 'company',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'bno',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'cno',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
];

export const companyNamecolumns = [
  {
    name: 'company',
    fieldName: 'company',
    width: '100', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '회사명', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'bno',
    fieldName: 'bno',
    width: '60', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '사업자번호', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'cno',
    fieldName: 'cno',
    width: '60', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '법인번호', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
];

export const companyNameLayout = ['company', 'bno', 'cno'];
