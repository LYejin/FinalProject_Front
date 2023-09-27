import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'liq_CD',
    dataType: ValueType.INT,
  },
  {
    fieldName: 'wholesale',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'retail',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'liq_CD',
    fieldName: 'liq_CD',
    width: '300',
    header: {
      text: '주류코드',
    },
  },
  {
    name: 'wholesale',
    fieldName: 'wholesale',
    width: '300',
    header: {
      text: '소매',
    },
  },
  {
    name: 'retail',
    fieldName: 'retail',
    width: '300',
    header: {
      text: '도매',
    },
  },
];

export const fundTypeLayout = ['liq_CD', 'wholesale', 'retail'];
