import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'sq_NB',
    dataType: ValueType.INT,
  },
  {
    fieldName: 'cash_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cash_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tr_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'tr_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'rmk_DC',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'cash_AM',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'ftr_CD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ftr_NM',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'ba_NB_TR',
    dataType: ValueType.TEXT,
  },

  {
    fieldName: 'bank_NAME',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'fr_DT',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'to_DT',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'deal_PD',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'deal_DD',
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: 'sq_NB',
    fieldName: 'sq_NB',
    width: '50',
    editable: false,
    visible: false,
    header: {
      text: '번호',
    },
  },
  {
    name: 'cash_CD',
    fieldName: 'cash_CD',
    width: '60',
    editor: {
      type: 'text',
      maxLength: 4,
      positiveOnly: true,
    },
    header: {
      text: '코드',
      styles: {
        background: '#CCC',
        font: 'bold',
      },
    },
    footer: {
      text: '합계',
      styleName: 'align-center',
    },
    button: 'action',
    buttonVisibility: 'default',
    enterKey: true,
  },
  {
    name: 'CASH_NM',
    fieldName: 'CASH_NM',
    width: '150',
    editable: false,
    header: {
      text: '자금과목',
    },
    styleName: 'align-left',
  },
  {
    name: 'TR_CD',
    fieldName: 'TR_CD',
    width: '80',
    header: {
      text: '코드',
    },
    button: 'action',
    buttonVisibility: 'default',
    enterKey: true,
  },
  {
    name: 'TR_NM',
    fieldName: 'TR_NM',
    width: '150',
    editable: false,
    header: {
      text: '거래처',
    },
  },
  {
    name: 'RMK_DC',
    fieldName: 'RMK_DC',
    width: '160',
    header: {
      text: '적요',
    },
    styleName: 'align-left',
  },
  {
    name: 'CASH_AM',
    fieldName: 'CASH_AM',
    width: '110',
    textAlignment: 'far',
    header: {
      text: '금액',
    },
    styleName: 'align-right',
    footer: {
      numberFormat: '#,##0',
      valueCallback: function (grid, column) {
        var sum = 0;
        var prod = grid.getDataSource();
        var cnt = prod.getRowCount();

        for (var i = 0; i < cnt; i++) {
          var value = prod.getValue(i, 'CASH_AM');
          if (value !== null && !isNaN(value)) {
            sum += value;
            console.log(sum);
          }
        }
        return sum;
      },
    },
    editor: {
      type: 'number',
      textAlignment: 'right',
      editFormat: '#,##0',
    },
    numberFormat: '#,##0',
  },

  {
    name: 'FTR_CD',
    fieldName: 'FTR_CD',
    width: '80',
    header: {
      text: '코드',
    },
    button: 'action',
    buttonVisibility: 'default',
    enterKey: true,
  },
  {
    name: 'FTR_NM',
    fieldName: 'FTR_NM',
    width: '200',
    editable: false,
    styleName: 'align-left',
    header: {
      text: '금융거래처',
    },
  },
  {
    name: 'BA_NB_TR',
    fieldName: 'BA_NB_TR',
    width: '130',
    editable: false,
    header: {
      text: '계좌번호',
    },
  },
  {
    name: 'bank_NAME',
    fieldName: 'bank_NAME',
    width: '80',
    editable: false,
    header: {
      text: '금융기관',
    },
    styleName: 'align-left',
  },
  {
    name: 'FR_DT',
    fieldName: 'FR_DT',
    width: '120',
    header: {
      text: '시작일',
    },
    styles: {
      textAlignment: 'center',
      datePicker: {
        yearNavigation: true,
        completeAction: 'commit', // 날짜 선택 후 바로 commit 할지 여부
        locale: 'ko-KR', // 로캘 설정
        format: 'yyyy-MM-dd', // 날짜 표시 형식
      },
    },
    editor: {
      type: 'date', // 열 편집기 유형을 'date'로 설정
      datetimeFormat: 'yyyy-MM-dd', // 편집기의 날짜 표시 형식
    },
  },
  {
    name: 'TO_DT',
    fieldName: 'TO_DT',
    width: '120',
    header: {
      text: '종료일',
    },
    styles: {
      textAlignment: 'center',
      datePicker: {
        yearNavigation: true, // 연도 이동 버튼 표시 여부
        completeAction: 'commit', // 날짜 선택 후 바로 commit 할지 여부
        locale: 'ko-KR', // 로캘 설정
        format: 'yyyy-MM-dd', // 날짜 표시 형식
      },
    },
    editor: {
      type: 'date', // 열 편집기 유형을 'date'로 설정
      datetimeFormat: 'yyyy-MM-dd', // 편집기의 날짜 표시 형식
    },
  },
  {
    name: 'DEAL_PD',
    fieldName: 'DEAL_PD',
    width: '80',
    editButtonVisibility: 'visible',
    values: [
      '1개월',
      '2개월',
      '3개월',
      '4개월',
      '5개월',
      '6개월',
      '7개월',
      '8개월',
      '9개월',
      '10개월',
      '11개월',
      '12개월',
    ],
    labels: [
      '1.1개월',
      '2.2개월',
      '3.3개월',
      '4.4개월',
      '5.5개월',
      '6.6개월',
      '7.7개월',
      '8.8개월',
      '9.9개월',
      '10.10개월',
      '11.11개월',
      '12.12개월',
    ],
    editor: {
      type: 'dropdown',
      dropDownCount: 12,
      domainOnly: true,
      partialMatch: true,
    },
    header: {
      text: '지급주기',
    },
  },
  {
    name: 'DEAL_DD',
    fieldName: 'DEAL_DD',
    width: '80',
    values: [
      '1일',
      '2일',
      '3일',
      '4일',
      '5일',
      '6일',
      '7일',
      '8일',
      '9일',
      '10일',
      '11일',
      '12일',
      '13일',
      '14일',
      '15일',
      '16일',
      '17일',
      '18일',
      '19일',
      '20일',
      '21일',
      '22일',
      '23일',
      '24일',
      '25일',
      '26일',
      '27일',
      '28일',
      '29일',
      '30일',
      '31일',
    ],
    labels: [
      '1.1일',
      '2.2일',
      '3.3일',
      '4.4일',
      '5.5일',
      '6.6일',
      '7.7일',
      '8.8일',
      '9.9일',
      '10.10일',
      '11.11일',
      '12.12일',
      '13.13일',
      '14.14일',
      '15.15일',
      '16.16일',
      '17.17일',
      '18.18일',
      '19.19일',
      '20.20일',
      '21.21일',
      '22.22일',
      '23.23일',
      '24.24일',
      '25.25일',
      '26.26일',
      '27.27일',
      '28.28일',
      '29.29일',
      '30.30일',
      '31.31일',
    ],
    editor: {
      type: 'dropdown',
      dropDownCount: 31,
      domainOnly: true,
      partialMatch: true,
    },
    header: {
      text: '지급일',
    },
  },
];

export const rows = [
  {
    DIV_CD: '코드샘플',
    DIV_NM: '이름 샘픔',
  },
];
