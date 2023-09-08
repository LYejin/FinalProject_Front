import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CompSelectBox = ({ title, data, height, width, onSelectChange }) => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = event => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelectChange(value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: width }} size="small">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>{title}</span>
        <Select
          id="demo-select-small"
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          sx={{
            height: height,
            fontSize: '0.8rem',
            width: width,
            backgroundColor: 'white',
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 250, // 원하는 최대 높이 값으로 변경
                width: width,
              },
            },
          }}
        >
          <MenuItem
            value=""
            style={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
              borderBottom: '1px solid #CCC',
            }}
          >
            <em>전체</em>
          </MenuItem>
          {data.map(company => (
            <MenuItem
              key={company.value}
              value={company.value}
              style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                borderBottom: '1px solid #CCC',
              }}
            >
              {company.value} | {company.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </FormControl>
  );
};

export default CompSelectBox;
