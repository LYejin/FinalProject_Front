import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'CASH_FG',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'LEVEL_CD',
    dataType: ValueType.INT,
  },
  {
    fieldName: 'CASH_CD',
    dataType: ValueType.INT,
  },
  {
    fieldName: 'CASH_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'TYPE_NM',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'SUM_CD',
    dataType: ValueType.INT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'SUM_NM',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'LOW_YN',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'USE_YN',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'DISP_SQ',
    dataType: ValueType.NUMBER, // 데이터 유형에 따라 수정
  },
];

export const columns = [
  {
    name: 'CASH_FG',
    fieldName: 'CASH_FG',
    width: '130',
    styleName: 'left-column',
    editButtonVisibility: 'visible', // 드롭다운 버튼 표시 여부
    values: ['수입', '지출', '대체'],
    labels: ['1.수입', '2.지출', '3.대체'],
    editor: {
      type: 'dropdown',
      dropDownCount: 3, //항목 수
      domainOnly: true, //목록에 있는 값들만 선택
      partialMatch: true, //라벨 데이터와 연관된 글자 입력시 해당 라벨로 포커스 이동
    },
    header: {
      text: '수지구분',
      styleName: 'left-column ',
    },
    styleCallback: (grid, dataCell) => {
      const ret = {};
      if (
        (dataCell.value === '' || dataCell.value === undefined) &&
        dataCell.item.rowState === 'none'
      ) {
        ret.editable = true;
      } else {
        ret.editable = false;
      }
      return ret;
    },
  },
  {
    name: 'LEVEL_CD',
    fieldName: 'LEVEL_CD',
    width: '130',
    styleName: 'left-column ',
    editor: {
      type: 'number',
      maxLength: 1, //최대 입력 수
      positiveOnly: true, //양수만 입력
      inputCharacters: '1-4',
    },
    header: {
      text: 'LEVEL',
      styleName: 'left-column ',
    },
  },
  {
    name: 'CASH_CD',
    fieldName: 'CASH_CD',
    width: '80',
    styleName: 'left-column ',
    editor: {
      type: 'number',
      maxLength: 4,
      positiveOnly: true,
      inputCharacters: '0-9',
    },
    header: {
      text: '자금코드',
      styleName: 'left-column ',
    },
  },
  {
    name: 'CASH_NM',
    fieldName: 'CASH_NM',
    width: '134',
    styleName: 'left-column',
    header: {
      text: '과목명',
    },
  },
  {
    name: 'TYPE_NM',
    fieldName: 'TYPE_NM',
    width: '200', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '용도', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'SUM_CD',
    fieldName: 'SUM_CD',
    width: '80', // 너비 수정
    styleName: 'left-column ',
    editor: {
      type: 'number',
      maxLength: 4, //최대 입력 수
      positiveOnly: true, //양수만 입력
      inputCharacters: '0-9',
    },
    header: {
      text: '상위과목코드', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
    button: 'action',
    buttonVisibility: 'visible',
    enterKey: true,
  },
  {
    name: 'SUM_NM',
    fieldName: 'SUM_NM',
    width: '134', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '상위과목명', // 열 헤더 텍스트 수정
      styleName: 'left-column rg-header ',
    },
  },
  {
    name: 'LOW_YN',
    fieldName: 'LOW_YN',
    width: '140', // 너비 수정
    styleName: 'left-column ',
    editButtonVisibility: 'visible', // 드롭다운 버튼 표시 여부
    values: ['여', '부'],
    labels: ['1.여', '2.부'],
    editor: {
      type: 'dropdown',
      dropDownCount: 2, //항목 수
      domainOnly: true, //목록에 있는 값들만 선택
      partialMatch: true, //라벨 데이터와 연관된 글자 입력시 해당 라벨로 포커스 이동
    },
    header: {
      text: '최하위여부', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
  {
    name: 'USE_YN',
    fieldName: 'USE_YN',
    width: '140', // 너비 수정
    styleName: 'left-column ',
    editButtonVisibility: 'visible', // 드롭다운 버튼 표시 여부
    values: ['여', '부'],
    labels: ['1.여', '2.부'],
    editor: {
      type: 'dropdown',
      dropDownCount: 2, //항목 수
      domainOnly: true, //목록에 있는 값들만 선택
      partialMatch: true, //라벨 데이터와 연관된 글자 입력시 해당 라벨로 포커스 이동
    },
    header: {
      text: '사용여부', // 열 헤더 텍스트 수정
      styleName: 'left-column  ',
    },
  },
  {
    name: 'DISP_SQ',
    fieldName: 'DISP_SQ',
    width: '140', // 너비 수정
    styleName: 'left-column ',
    zeroText: '',
    editor: {
      type: 'number',
      editFormat: '#,##0',
      maxLength: 5,
      positiveOnly: true,
      includedFormat: true,
      maxLengthExceptComma: true,
    },
    numberFormat: '#,##0',
    header: {
      text: '정렬구분', // 열 헤더 텍스트 수정
      styleName: 'left-column ',
    },
  },
];

export const fundTypeLayout = [
  'CASH_FG',
  'LEVEL_CD',
  {
    name: 'cashGroup', // 그룹의 이름
    direction: 'horizontal',
    hideChildHeaders: true, // 자식 헤더 숨김 여부
    items: [
      'CASH_CD', // 그룹에 속하는 열 1
      'CASH_NM', // 그룹에 속하는 열 2
    ],
    header: {
      text: '자금과목', // 그룹 헤더 텍스트
      styleName: 'left-column rg-header',
    },
  },
  'TYPE_NM',
  {
    name: 'sumGroup', // 그룹의 이름
    direction: 'horizontal',
    hideChildHeaders: true, // 자식 헤더 숨김 여부
    items: [
      'SUM_CD', // 그룹에 속하는 열 1
      'SUM_NM', // 그룹에 속하는 열 2
    ],
    header: {
      text: '상위자금과목', // 그룹 헤더 텍스트
      styleName: 'left-column rg-header',
    },
  },
  'LOW_YN',
  'DISP_SQ',
  'USE_YN',
];

export const fundTypeSearchLayout = [
  'CASH_FG',
  'LEVEL_CD',
  'CASH_CD',
  'CASH_NM',
  'TYPE_NM',
  'SUM_NM',
];

export const WidthFields = [
  {
    fieldName: 'CASH_FG',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'CASH_CD_L1',
    dataType: ValueType.INT,
  },
  {
    fieldName: 'CASH_NM_L1',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'CASH_CD_L2',
    dataType: ValueType.INT,
  },
  {
    fieldName: 'CASH_NM_L2',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'CASH_CD_L3',
    dataType: ValueType.INT,
  },
  {
    fieldName: 'CASH_NM_L3',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'LOW_YN',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'USE_YN',
    dataType: ValueType.TEXT, // 데이터 유형에 따라 수정
  },
  {
    fieldName: 'DISP_SQ',
    dataType: ValueType.NUMBER, // 데이터 유형에 따라 수정
  },
];
export const WidthColumns = [
  {
    name: 'CASH_FG',
    fieldName: 'CASH_FG',
    width: '80',
    styleName: 'left-column',
    header: {
      text: '수지구분',
      styleName: 'left-column',
    },
  },
  {
    name: 'CASH_CD_L1',
    fieldName: 'CASH_CD_L1',
    width: '80',
    styleName: 'left-column',
    editor: {
      type: 'number',
      maxLength: 4,
      positiveOnly: true,
      inputCharacters: '0-9',
    },
    header: {
      text: '자금코드(레벨1)',
      styleName: 'left-column',
    },
  },
  {
    name: 'CASH_NM_L1',
    fieldName: 'CASH_NM_L1',
    width: '80',
    styleName: 'left-column',
    header: {
      text: '과목명(레벨1)',
      styleName: 'left-column',
    },
  },
  {
    name: 'CASH_CD_L2',
    fieldName: 'CASH_CD_L2',
    width: '80',
    styleName: 'left-column',
    editor: {
      type: 'number',
      maxLength: 4,
      positiveOnly: true,
      inputCharacters: '0-9',
    },
    header: {
      text: '자금코드(레벨2)',
      styleName: 'left-column',
    },
  },
  {
    name: 'CASH_NM_L2',
    fieldName: 'CASH_NM_L2',
    width: '80',
    styleName: 'left-column',
    header: {
      text: '과목명(레벨2)',
      styleName: 'left-column',
    },
  },
  {
    name: 'CASH_CD_L3',
    fieldName: 'CASH_CD_L3',
    width: '80',
    styleName: 'left-column',
    editor: {
      type: 'number',
      maxLength: 4,
      positiveOnly: true,
      inputCharacters: '0-9',
    },
    header: {
      text: '자금코드(레벨3)',
      styleName: 'left-column',
    },
  },
  {
    name: 'CASH_NM_L3',
    fieldName: 'CASH_NM_L3',
    width: '80',
    styleName: 'left-column',
    header: {
      text: '과목명(레벨3)',
      styleName: 'left-column',
    },
  },
  {
    name: 'LOW_YN',
    fieldName: 'LOW_YN',
    width: '100', // 너비 수정
    styleName: 'left-column ',
    header: {
      text: '최하위여부', // 열 헤더 텍스트 수정
      styleName: 'left-column',
    },
  },
  {
    name: 'USE_YN',
    fieldName: 'USE_YN',
    width: '100', // 너비 수정
    styleName: 'left-column',
    header: {
      text: '사용여부', // 열 헤더 텍스트 수정
      styleName: 'left-column',
    },
  },
  {
    name: 'DISP_SQ',
    fieldName: 'DISP_SQ',
    width: '100', // 너비 수정
    styleName: 'left-column',
    editor: {
      type: 'number',
      editFormat: '#,##0',
      maxLength: 5,
      positiveOnly: true,
      includedFormat: true,
      maxLengthExceptComma: true,
    },
    numberFormat: '#,##0',
    header: {
      text: '정렬구분', // 열 헤더 텍스트 수정
      styleName: 'left-column',
    },
  },
];

export const fundTypeWidthViewLayout = [
  'CASH_FG',
  'CASH_CD_L1',
  'CASH_NM_L1',
  'CASH_CD_L2',
  'CASH_NM_L2',
  'CASH_CD_L3',
  'CASH_NM_L3',
  'LOW_YN',
  'DISP_SQ',
  'USE_YN',
];

export const option = {
  rowState: true,
};
