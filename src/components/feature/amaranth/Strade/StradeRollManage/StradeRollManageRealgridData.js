import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'roll_FG',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dept_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'dept_NM',
    dataType: ValueType.TEXT,
  },
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
    name: 'roll_FG',
    fieldName: 'roll_FG',
    width: '200',
    editButtonVisibility: 'visible', // 드롭다운 버튼 표시 여부
    values: ['부서', '사용자'],
    labels: ['1.부서', '2.사용자'],
    editor: {
      type: 'dropdown',
      dropDownCount: 2, //항목 수
      domainOnly: true, //목록에 있는 값들만 선택
      partialMatch: true, //라벨 데이터와 연관된 글자 입력시 해당 라벨로 포커스 이동
    },
    header: {
      text: '권한구분',
    },
    // styleCallback: (grid, dataCell) => {
    //   console.log(
    //     '------------------------------------------------------',
    //     '행상태',
    //     dataCell.item.rowState,
    //     '셀 상태',
    //     dataCell.item.itemState,
    //     '값 상태',
    //     dataCell.value,
    //     dataCell.index.itemIndex
    //   );
    //   const ret = {};
    //   if (
    //     (dataCell.value === '' || dataCell.value === undefined) &&
    //     dataCell.item.rowState === 'none'
    //   ) {
    //     ret.editable = true;
    //   } else {
    //     ret.editable = false;
    //   }
    //   return ret;
    // },
  },
  {
    name: 'dept_CD',
    fieldName: 'dept_CD',
    width: '200',
    button: 'action',
    buttonVisibility: 'hidden',
    header: {
      text: '부서코드',
    },
    // styleCallback: (grid, dataCell) => {
    //   console.log(
    //     '------------------------------------------------------',
    //     '행상태',
    //     dataCell.item.rowState,
    //     '셀 상태',
    //     dataCell.item.itemState,
    //     '값 상태',
    //     dataCell.value,
    //     dataCell.index.itemIndex
    //   );
    //   const ret = {};
    //   if (dataCell.item.rowState === 'updated') {
    //     grid.setColumnProperty('dept_CD', 'button', 'none');
    //   } else {
    //     grid.setColumnProperty('dept_CD', 'button', 'action');
    //   }
    //   return ret;
    // },
  },
  {
    name: 'dept_NM',
    fieldName: 'dept_NM',
    width: '200',
    header: {
      text: '부서명',
    },
  },
  {
    name: 'emp_CD',
    fieldName: 'emp_CD',
    width: '200',
    button: 'action',
    buttonVisibility: 'hidden',
    header: {
      text: '사원코드',
    },
    // styleCallback: (grid, dataCell) => {
    //   console.log(
    //     '------------------------------------------------------',
    //     '행상태',
    //     dataCell.item.rowState,
    //     '셀 상태',
    //     dataCell.item.itemState,
    //     '값 상태',
    //     dataCell.value,
    //     dataCell.index.itemIndex
    //   );
    //   const ret = {};
    //   if (dataCell.item.rowState === 'updated') {
    //     grid.setColumnProperty('emp_CD', 'button', 'none');
    //   } else {
    //     grid.setColumnProperty('emp_CD', 'button', 'action');
    //   }
    //   return ret;
    // },
  },
  {
    name: 'kor_NM',
    fieldName: 'kor_NM',
    width: '200',
    header: {
      text: '사원명',
    },
  },
  {
    name: 'note',
    fieldName: 'note',
    width: '200',
    header: {
      text: '비고',
    },
  },
  {
    name: 'insert_DT',
    fieldName: 'insert_DT',
    width: '200',
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

export const fundTypeLayout = [
  'roll_FG',
  'dept_CD',
  'dept_NM',
  'emp_CD',
  'kor_NM',
  'note',
  'insert_DT',
];
