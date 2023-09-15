import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DeptSelectBox = ({ type, defaultValue, register }) => {
  let menuItems;
  if (type === 'use') {
    menuItems = (
      <>
        <MenuItem value={1} sx={{ height: '25px', fontSize: '13px' }}>
          사용
        </MenuItem>
        <MenuItem value={0} sx={{ height: '25px', fontSize: '13px' }}>
          미사용
        </MenuItem>
      </>
    );
  } else if (type === 'dept') {
    menuItems = (
      <>
        <MenuItem value={0} sx={{ height: '25px', fontSize: '13px' }}>
          부서
        </MenuItem>
        <MenuItem value={1} sx={{ height: '25px', fontSize: '13px' }}>
          팀
        </MenuItem>
        <MenuItem value={2} sx={{ height: '25px', fontSize: '13px' }}>
          임시
        </MenuItem>
      </>
    );
  }

  return (
    <FormControl sx={{ m: 1 }} size="small">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          id="demo-select-small"
          displayEmpty
          defaultValue={defaultValue}
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
