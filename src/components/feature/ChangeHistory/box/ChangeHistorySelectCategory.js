import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ChangeHistorySelectCategory = ({
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
        {...register('CH_DIVISION')}
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
            value={''}
            style={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
            }}
          >
            <em>전체</em>
          </MenuItem>
        )}
        <MenuItem
          value={'추가'}
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
          }}
        >
          추가
        </MenuItem>
        <MenuItem
          value={'수정'}
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
          }}
        >
          수정
        </MenuItem>
        <MenuItem
          value={'삭제'}
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
          }}
        >
          삭제
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default ChangeHistorySelectCategory;
