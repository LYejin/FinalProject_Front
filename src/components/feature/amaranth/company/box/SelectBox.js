import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBox = ({ data, width, SearchDataSet }) => {
  const [age, setAge] = React.useState('');

  const handleChange = event => {
    setAge(event.target.value);
    console.log('셀렉트박스', event.target.value);
    if (event.target.value !== '') {
      SearchDataSet(prveSearchDate => ({
        ...prveSearchDate,
        [event.target.name]: event.target.value,
      }));
    } else {
      SearchDataSet(prveSearchDate => ({
        ...prveSearchDate,
        [event.target.name]: '',
      }));
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: width }} size="small">
      <Select
        id="demo-select-small"
        name="USE_YN"
        value={age}
        onChange={handleChange}
        displayEmpty
        sx={{
          height: '28px',
          fontSize: '0.8rem',
        }}
      >
        <MenuItem value={''}>
          <em>전체</em>
        </MenuItem>
        <MenuItem value={1}>사용</MenuItem>
        <MenuItem value={0}>미사용</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectBox;
