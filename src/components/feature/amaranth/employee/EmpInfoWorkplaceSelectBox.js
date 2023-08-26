import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EmpInfoWorkplaceSelectBox = ({ data, width }) => {
  const [age, setAge] = React.useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: width }} size="small">
      <Select
        id="demo-select-small"
        value={age}
        onChange={handleChange}
        displayEmpty
        sx={{
          height: '28px',
          fontSize: '0.8rem',
        }}
      >
        <MenuItem value="">
          <em>전체</em>
        </MenuItem>
        {data.map(company => (
          <MenuItem value={company.co_CD}>
            {company.co_CD} {company.co_NM}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EmpInfoWorkplaceSelectBox;
