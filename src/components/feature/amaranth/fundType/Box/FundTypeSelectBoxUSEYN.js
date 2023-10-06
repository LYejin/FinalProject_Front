import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FundTypeSelectBoxUSEYN = ({
  width,
  register,
  state,
  setState,
  setChangeFormData,
  total,
}) => {
  const handleChange = e => {
    console.log('사용', e.target.value, e.target.name);
    setState(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: width }} size="small">
      <Select
        {...register('USE_YN')}
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
        {total && (
          <MenuItem
            value={'여'}
            style={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
            }}
          >
            <em> Y. 사용</em>
          </MenuItem>
        )}
        <MenuItem
          value={'부'}
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
          }}
        >
          N. 미사용
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default FundTypeSelectBoxUSEYN;
