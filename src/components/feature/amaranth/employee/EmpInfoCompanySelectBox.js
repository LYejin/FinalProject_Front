import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { authAxiosInstance } from '../../../../axios/axiosInstance';

const EmpInfoCompanySelectBox = ({
  data,
  width,
  setCompany,
  company,
  setWorkplace,
}) => {
  const handleChange = event => {
    console.log('hiiii');
    setCompany(event.target.value);
    const response = authAxiosInstance(
      `system/user/WorkplaceManage/getList?CO_CD=11`
    );
    console.log(response.data);
  };

  console.log(data);
  // console.log(data[0].co_NM);

  return (
    <FormControl sx={{ m: 1, minWidth: width }} size="small">
      <Select
        id="demo-select-small"
        value={company}
        onChange={handleChange}
        displayEmpty
        sx={{
          height: '28px',
          fontSize: '0.8rem',
        }}
      >
        {data.map(company => (
          <MenuItem value={company.co_CD} key={company.co_CD}>
            {company.co_CD}. {company.co_NM}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EmpInfoCompanySelectBox;
