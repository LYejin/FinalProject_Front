import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ErrorMessage } from '@hookform/error-message';

const EmpInfoEnrlSelectBox = ({
  data,
  width,
  infoBoxEnrlData,
  setInfoBoxEnrlData,
  clickYN,
  register,
  errors,
  errorName,
  setChangeFormData,
}) => {
  const handleChange = e => {
    setInfoBoxEnrlData(e.target.value);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      [e.target.name]: e.target.value,
    }));
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
            'enrl_FG',
            !clickYN && { required: '재직구분을 선택해주세요' }
          )}
          id="demo-select-small"
          name="enrl_FG"
          value={infoBoxEnrlData}
          onChange={handleChange}
          displayEmpty
          sx={{
            height: '28px',
            fontSize: '0.8rem',
            border:
              errors.enrl_FG && errorName === 'enrl_FG' && '1px solid red',
          }}
        >
          {!clickYN && (
            <MenuItem value="">
              <em>재직구분을 선택해주세요</em>
            </MenuItem>
          )}
          {data.map((enrl, index) => (
            <MenuItem value={index} key={index}>
              {enrl}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errorName === 'enrl_FG' && (
        <ErrorMessage
          errors={errors}
          name="enrl_FG"
          as="p"
          className="errorSelectBox"
        />
      )}
    </div>
  );
};

export default EmpInfoEnrlSelectBox;
