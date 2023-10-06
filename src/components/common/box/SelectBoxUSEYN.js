import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBoxUSEYN = ({
  width,
  register,
  state,
  setState,
  setChangeFormData,
  total,
}) => {
  const handleChange = e => {
    setState(e.target.value);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <FormControl sx={{ m: 1, width: width }} size="small">
      <Select
        {...register('use_YN')}
        id="demo-select-small"
        value={state}
        onChange={handleChange}
        displayEmpty
        sx={{
          height: '28px',
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
        {total && (
          <MenuItem
            value={''}
            style={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
              borderBottom: '1px solid #CCC',
            }}
          >
            <em>전체</em>
          </MenuItem>
        )}
        <MenuItem
          value={0}
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            borderBottom: '1px solid #CCC',
          }}
        >
          0. 미사용
        </MenuItem>
        <MenuItem
          value={1}
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            borderBottom: '1px solid #CCC',
          }}
        >
          1. 사용
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectBoxUSEYN;
