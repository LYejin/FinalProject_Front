import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const CompanyNameSelectCategory = ({
  width,
  register,
  state,
  setState,
  setChangeFormData,
  total,
}) => {
  const handleChange = e => {
    setState(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: width }} size="small">
      <Select
        {...register('gb')}
        id="demo-select-small"
        value={state}
        onChange={handleChange}
        displayEmpty
        sx={{
          height: '25px',
          fontSize: '0.8rem',
          borderRadius: '0',
          marginLeft: '-9px',
          borderRadius: 0,
        }}
        MenuProps={{
          PaperProps: {
            style: {
              width: width,
              maxHeight: 120, // 원하는 최대 높이 값으로 변경
            },
          },
        }}
      >
        <MenuItem
          value={'3'}
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
          }}
        >
          <em>회사명</em>
        </MenuItem>

        <MenuItem
          value={'2'}
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
          }}
        >
          법인번호
        </MenuItem>
        <MenuItem
          value={'1'}
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
          }}
        >
          사업자번호
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default CompanyNameSelectCategory;
