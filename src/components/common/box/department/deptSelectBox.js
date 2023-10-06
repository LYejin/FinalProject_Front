import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DeptSelectBox = ({ type, value, name, onChange, disabled, register }) => {
  let menuItems;
  let renderValueFunction; // renderValue 함수를 담기 위한 변수 선언

  if (type === 'use') {
    menuItems = [
      <MenuItem value={'1'} sx={{ height: '25px', fontSize: '13px' }} key="1">
        사용
      </MenuItem>,
      <MenuItem value={'0'} sx={{ height: '25px', fontSize: '13px' }} key="0">
        미사용
      </MenuItem>,
    ];
    // renderValue 함수 설정. 값에 따른 레이블을 반환.
    renderValueFunction = value =>
      value === '1' ? '사용' : value === '0' ? '미사용' : '선택하세요';
  } else if (type === 'dept') {
    menuItems = [
      <MenuItem value={'0'} sx={{ height: '25px', fontSize: '13px' }} key="0">
        부서
      </MenuItem>,
      <MenuItem value={'1'} sx={{ height: '25px', fontSize: '13px' }} key="1">
        팀
      </MenuItem>,
      <MenuItem value={'2'} sx={{ height: '25px', fontSize: '13px' }} key="2">
        임시
      </MenuItem>,
    ];
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
          {...register}
          id="demo-select-small"
          displayEmpty
          value={value}
          renderValue={renderValueFunction}
          disabled={disabled}
          onChange={e => {
            console.log('DeptSelectBox onChange Event', e);
            onChange(e);
          }}
          name={name}
          sx={{
            height: '28px',
            fontSize: '0.8rem',
            width: '150px',
          }}
        >
          {menuItems}
        </Select>
      </div>
    </FormControl>
  );
};

export default DeptSelectBox;
