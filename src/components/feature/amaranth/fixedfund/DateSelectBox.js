import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DateSelectBox = ({ type, value, onChange }) => {
  let menuItems;
  let renderValueFunction;

  // 기본값 설정
  if (type === 'year' && !value) {
    value = '2023';
  } else if (type === 'month' && !value) {
    value = '3';
  }

  if (type === 'year') {
    const currentYear = new Date().getFullYear();
    menuItems = Array.from({ length: currentYear - 1998 }, (v, i) => {
      const year = currentYear - i;
      return (
        <MenuItem value={year.toString()} key={year}>
          {year}년
        </MenuItem>
      );
    });

    renderValueFunction = value => value + '년';
  } else if (type === 'month') {
    menuItems = Array.from({ length: 12 }, (v, i) => (
      <MenuItem value={(i + 1).toString()} key={i + 1}>
        {i + 1}월
      </MenuItem>
    ));

    renderValueFunction = value => value + '월';
  }

  return (
    <FormControl sx={{ m: 1 }} size="small">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: -5 - 3,
        }}
      >
        <Select
          id="date-select-small"
          displayEmpty
          value={value}
          renderValue={renderValueFunction}
          onChange={onChange}
          sx={{
            height: '28px',
            fontSize: '0.8rem',
            width: '150px',
            borderRadius: 0,
          }}
        >
          {menuItems}
        </Select>
      </div>
    </FormControl>
  );
};

export default DateSelectBox;
