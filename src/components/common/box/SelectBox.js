import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBox = ({
  data,
  width,
  state,
  setState,
  setChangeFormData,
  disable,
  name,
}) => {
  const handleChange = e => {
    setState(e.target.value);
    if (setChangeFormData) {
      // setChangeFormData 설정하면 사용됨
      setChangeFormData(changeFormData => ({
        ...changeFormData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <FormControl sx={{ width: width }} size="small" disabled={disable}>
      <Select
        id="demo-select-small"
        name={name && name}
        value={state}
        onChange={handleChange}
        displayEmpty
        sx={{
          height: '28px',
          fontSize: '0.8rem',
          borderRadius: '0',
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
        {data.map((value, index) => (
          <MenuItem
            value={index}
            key={index}
            style={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
              borderBottom: '1px solid #CCC',
            }}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
