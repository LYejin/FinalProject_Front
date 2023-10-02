import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DeptSelectBox = ({ type, value, name, onChange, register }) => {
  let menuItems;
  if (type === 'use') {
    menuItems = [
      <MenuItem value={'1'} sx={{ height: '25px', fontSize: '13px' }} key="1">
        사용
      </MenuItem>,
      <MenuItem value={'0'} sx={{ height: '25px', fontSize: '13px' }} key="0">
        미사용
      </MenuItem>,
    ];
  } else if (type === 'dept') {
    menuItems = [
      <MenuItem value={0} sx={{ height: '25px', fontSize: '13px' }} key={0}>
        부서
      </MenuItem>,
      <MenuItem value={1} sx={{ height: '25px', fontSize: '13px' }} key={1}>
        팀
      </MenuItem>,
      <MenuItem value={2} sx={{ height: '25px', fontSize: '13px' }} key={2}>
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
          renderValue={selectedValue => selectedValue || '선택하세요'}
          onChange={e => {
            console.log('DeptSelectBox onChange Event', e); // 여기서 로그를 확인해보세요.
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
