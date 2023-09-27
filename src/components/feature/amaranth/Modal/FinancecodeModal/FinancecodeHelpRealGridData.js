import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'finance_CD',
    dataType: ValueType.INT,
  },
  {
    fieldName: 'bank_NAME',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'finance_CD',
    fieldName: 'finance_CD',
    width: '300',
    header: {
      text: '은행코드',
    },
  },
  {
    name: 'bank_NAME',
    fieldName: 'bank_NAME',
    width: '300',
    header: {
      text: '은행명',
    },
  },
];

export const fundTypeLayout = ['finance_CD', 'bank_NAME'];
