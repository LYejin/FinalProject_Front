import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const UseSelectBox = ({ title, onChange,defaultUse }) => {
  const handleChange = event => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <FormControl sx={{ m: 1 }} size="small">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>{title}</span>
        <Select
          id="demo-select-small"
          onChange={handleChange}
          value={defaultUse}
          displayEmpty
          sx={{
            height: '28px',
            fontSize: '0.8rem',
            width: '100px',
          }}
        >
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>
          <MenuItem value={'1'}>사용</MenuItem>
          <MenuItem value={'0'}>미사용</MenuItem>
        </Select>
      </div>
    </FormControl>
  );
};

export default UseSelectBox;
