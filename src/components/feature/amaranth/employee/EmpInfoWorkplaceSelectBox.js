import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ErrorMessage } from '@hookform/error-message';

const EmpInfoWorkplaceSelectBox = ({
  data,
  width,
  workplaceSelect,
  setWorkplaceSelect,
  clickYN,
  register,
  errors,
  errorName,
}) => {
  const handleChange = event => {
    setWorkplaceSelect(event.target.value);
  };

  return (
    <div className="errorWrapper">
      <FormControl
        sx={{
          m: 1,
          width: width,
        }}
        size="small"
      >
        <Select
          {...register(
            'div_CD',
            !clickYN && { required: '사업장을 선택해주세요' }
          )}
          id="demo-select-small"
          value={workplaceSelect}
          onChange={handleChange}
          displayEmpty
          sx={{
            height: '28px',
            fontSize: '0.8rem',
            border: errors.div_CD && errorName === 'div_CD' && '1px solid red',
          }}
        >
          <MenuItem value="">
            <em>사업장을 선택해주세요</em>
          </MenuItem>
          {data.map(company => (
            <MenuItem value={company.div_CD}>
              {company.div_CD} {company.div_NM}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errorName === 'div_CD' && (
        <ErrorMessage
          errors={errors}
          name="div_CD"
          as="p"
          className="errorSelectBox"
        />
      )}
    </div>
  );
};

export default EmpInfoWorkplaceSelectBox;
