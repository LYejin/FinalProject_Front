import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 1;

const FundTypeCheckSelectBox = ({
  width,
  enrlList,
  handleCheckSelectChange,
}) => {
  const FT_YES_YN = ['Y.사용', 'N.미사용'];
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: width,
        fontSize: '0.8rem',
        maxHeight: 250,
      },
    },
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: width }} size="small">
        <Select
          id="demo-multiple-checkbox"
          multiple
          value={enrlList}
          onChange={handleCheckSelectChange}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{
            height: '28px',
            fontSize: '0.8rem',
            margin: 0,
          }}
        >
          {FT_YES_YN.map(name => (
            <MenuItem
              key={name}
              value={name}
              sx={{
                height: '28px',
                fontSize: '0.5rem',
              }}
            >
              <Checkbox checked={enrlList.indexOf(name) > -1} />
              <ListItemText
                primary={name}
                sx={{
                  fontSize: '0.5rem',
                  fontWeight: 'bold',
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FundTypeCheckSelectBox;
