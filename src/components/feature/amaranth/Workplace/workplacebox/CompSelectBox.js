import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CompSelectBox = ({
  title,
  data,
  height,
  width,
  onSelectChange,
  selectMenu,
  state,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(
    data.length > 0 ? data[0].value : ''
  );

  useEffect(() => {
    if (data.length > 0) {
      setSelectedValue(data[0].value);
      onSelectChange(data[0].value); // 초기에 첫번째 항목에 대한 onSelectChange 호출
    }
    if (data.length > 0 && state === 1) {
      setSelectedValue('');
      onSelectChange('');
    }
  }, [data]);

  const handleChange = event => {
    const value = event.target.value;
    setSelectedValue(value);
    const selectedLabel = data.find(item => item.value === value)?.label;
    onSelectChange(value, selectedLabel);
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
            borderRadius: 0,
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 250,
                width: width,
              },
            },
          }}
        >
          1``{' '}
          {selectMenu != null && selectMenu !== '' && (
            <MenuItem
              value=""
              style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                borderBottom: '1px solid #CCC',
              }}
            >
              <em>{selectMenu}</em>
            </MenuItem>
          )}
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
