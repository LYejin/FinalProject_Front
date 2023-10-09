import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import Check from '@mui/icons-material/Check';

const FilterSelectBox = ({
  value,
  name,
  disabled,
  useSelect,
  showSelect,
  setUseSelect,
  setShowSelect,
}) => {
  //사용여부
  const handleUseSelectChange = val => {
    setUseSelect(val);
  };
  //조직도표시
  const handleShowSelectChange = val => {
    setShowSelect(val);
  };

  return (
    <FormControl sx={{ m: 1 }} size="small">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '-5px -3px',
        }}
      >
        <Select
          id="demo-select-small"
          displayEmpty
          value={
            useSelect === '0' ? 'all' : useSelect === '1' ? 'usable' : value
          }
          disabled={disabled}
          name={name}
          sx={{
            height: '18px',
            fontSize: '0.65rem',
            width: 'auto',
            border: 'none',
            outline: 'none',
            borderRadius: 0,
            '& .MuiSelect-icon': {
              color: 'black',
            },
            '& .MuiSelect-select:focus': {
              backgroundColor: 'transparent',
            },
            '&.Mui-focused': {
              border: 'none',
              outline: 'none',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            getContentAnchorEl: null,
            PaperProps: {
              style: {
                borderRadius: 0,
                marginTop: '10px',
                marginRight: '3px',
                width: '150px',
              },
            },
            sx: {
              '& .MuiMenu-paper': {
                paddingTop: 0, // Removes padding from top
                paddingBottom: 0, // Removes padding from bottom
                borderRadius: '0px', // Removes rounded corners
                border: '1px solid #ccc',
              },
              '& .MuiMenuItem-root': {
                '&:hover': {
                  backgroundColor: '#DCEEFB', // Light sky blue background color on hover
                },
              },
            },
          }}
          renderValue={() => '필터'}
        >
          <ListSubheader
            style={{
              height: '30px',
              lineHeight: '30px',
              background: 'white',
              fontSize: '0.75rem',
              color: 'black',
              fontWeight: '900',
              marginTop: -8,
              textAlign: 'left',
              paddingLeft: '10px',
              borderBottom: '1px solid #ccc',
            }}
          >
            사용여부
          </ListSubheader>
          <MenuItem
            value="all"
            selected={useSelect === '0'}
            style={{
              paddingLeft: '20px',
              fontSize: '0.70rem',
              color: useSelect === '0' ? '#1C90FB' : 'black',
            }}
            onClick={() => handleUseSelectChange('0')}
          >
            {useSelect === '0' && (
              <Check
                style={{
                  color: '#1C90FB',
                  fontSize: '1rem',
                  marginLeft: -15,
                }}
              />
            )}{' '}
            전체
          </MenuItem>
          <MenuItem
            value="usable"
            selected={useSelect === '1'}
            style={{
              paddingLeft: '20px',
              fontSize: '0.70rem',
              color: useSelect === '1' ? '#1C90FB' : 'black',
            }}
            onClick={() => handleUseSelectChange('1')}
          >
            {useSelect === '1' && (
              <Check
                style={{
                  color: '#1C90FB',
                  fontSize: '1rem',
                  marginLeft: -15,
                }}
              />
            )}{' '}
            사용가능
          </MenuItem>
          <ListSubheader
            style={{
              height: '30px',
              lineHeight: '30px',
              background: 'white',
              fontSize: '0.75rem',
              color: 'black',
              fontWeight: '900',
              textAlign: 'left',
              paddingLeft: '10px',
              borderTop: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
            }}
          >
            조직도표시
          </ListSubheader>
          <MenuItem
            value="allDisplay"
            selected={showSelect === '0'}
            style={{
              paddingLeft: '20px',
              fontSize: '0.70rem',
              color: showSelect === '0' ? '#1C90FB' : 'black',
            }}
            onClick={() => handleShowSelectChange('0')}
          >
            {showSelect === '0' && (
              <Check
                style={{
                  color: '#1C90FB',
                  fontSize: '1rem',
                  marginLeft: -15,
                }}
              />
            )}{' '}
            전체
          </MenuItem>
          <MenuItem
            value="orgDisplay"
            selected={showSelect === '1'}
            style={{
              paddingLeft: '20px',
              fontSize: '0.70rem',
              color: showSelect === '1' ? '#1C90FB' : 'black',
            }}
            onClick={() => handleShowSelectChange('1')}
          >
            {showSelect === '1' && (
              <Check
                style={{
                  color: '#1C90FB',
                  fontSize: '1rem',
                  marginLeft: -15,
                }}
              />
            )}{' '}
            조직도표시
          </MenuItem>
        </Select>
      </div>
    </FormControl>
  );
};

export default FilterSelectBox;
