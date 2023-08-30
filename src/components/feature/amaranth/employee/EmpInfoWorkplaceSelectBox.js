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
  setChangeFormData,
}) => {
  const handleChange = e => {
    setWorkplaceSelect(e.target.value);
    setChangeFormData(changeFormData => ({
      ...changeFormData,
      [e.target.name]: e.target.value,
    }));
  };

  console.log('셀렉트박스 데이터::::', workplaceSelect);
  console.log('데이터!!!!', data);

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
          name="div_CD"
          value={workplaceSelect}
          onChange={handleChange}
          placeholder="사업장을 선택해주세요"
          displayEmpty
          sx={{
            height: '28px',
            fontSize: '0.8rem',
            borderRadius: '0',
            border: errors.div_CD && errorName === 'div_CD' && '1px solid red',
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 250, // 원하는 최대 높이 값으로 변경
              },
            },
          }}
        >
          {workplaceSelect ? (
            data.map(company => (
              <MenuItem
                value={company.div_CD}
                key={company.div_CD}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #CCC',
                }}
              >
                {company.div_CD} {company.div_NM}
              </MenuItem>
            ))
          ) : data ? (
            data.map(company => (
              <MenuItem
                value={company.div_CD}
                key={company.div_CD}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #CCC',
                }}
              >
                {company.div_CD} {company.div_NM}
              </MenuItem>
            ))
          ) : (
            <MenuItem
              value=""
              style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                borderBottom: '1px solid #CCC',
              }}
            >
              <em>사업장이 없습니다</em>
            </MenuItem>
          )}
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
