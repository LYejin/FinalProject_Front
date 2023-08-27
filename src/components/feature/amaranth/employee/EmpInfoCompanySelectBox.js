import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import { ErrorMessage } from '@hookform/error-message';

const EmpInfoCompanySelectBox = ({
  data,
  width,
  setCompany,
  company,
  setWorkplaceList,
  clickYN,
  register,
  errors,
  errorName,
}) => {
  const handleChange = event => {
    setCompany(event.target.value);
    authAxiosInstance(
      `system/user/groupManage/employee/getWorkplace?CO_CD=${event.target.value}`
    ).then(response => {
      setWorkplaceList(response.data);
    });
  };

  return (
    <div className="errorWrapper">
      <FormControl
        sx={{
          m: 1,
          width: width,
          backgroundColor: clickYN ? '#f2f2f2' : 'white',
        }}
        size="small"
        disabled={clickYN}
      >
        <Select
          {...register(
            'co_CD',
            !clickYN && { required: '회사를 선택해주세요' }
          )}
          id="demo-select-small"
          value={company}
          onChange={handleChange}
          displayEmpty
          sx={{
            height: '28px',
            fontSize: '0.8rem',
            border: errors.co_CD && errorName === 'co_CD' && '1px solid red',
            backgroundColor: clickYN && '#f2f2f2',
          }}
        >
          <MenuItem value="">
            <em>회사를 선택해주세요</em>
          </MenuItem>
          {data.map(company => (
            <MenuItem value={company.co_CD} key={company.co_CD}>
              {company.co_CD}. {company.co_NM}
            </MenuItem>
          ))}
        </Select>
      </FormControl>{' '}
      {errorName === 'co_CD' && (
        <ErrorMessage
          errors={errors}
          name="co_CD"
          as="p"
          className="errorSelectBox"
        />
      )}
    </div>
  );
};

export default EmpInfoCompanySelectBox;
