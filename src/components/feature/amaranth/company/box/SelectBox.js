import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 1;

const SelectBox = ({ data, width, SearchDataSet, register }) => {
  const [age, setAge] = React.useState('');
  const MenuProps = {
    PaperProps: {
      style: {
        height: '28px',
        fontSize: '0.8rem',
        width: '100px',
        borderRadius: 0,
      },
    },
  };

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
          width: '200px',
          fontSize: '0.8rem',
          borderRadius: 0,
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
