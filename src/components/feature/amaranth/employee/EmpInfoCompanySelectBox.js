import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import { ErrorMessage } from '@hookform/error-message';

const EmpInfoCompanySelectBox = ({
  data,
  width,
  company,
  setCompany,
  setWorkplaceList,
  clickYN,
  register,
  errors,
  errorName,
  setWorkplaceSelect,
  setError,
  getValues,
  clearErrors,
}) => {
  const handleChange = e => {
    setCompany(e.target.value);
    authAxiosInstance(
      `system/user/groupManage/employee/getWorkplace?CO_CD=${e.target.value}`
    ).then(response => {
      setWorkplaceList(response.data);
      setWorkplaceSelect(
        response.data[0]?.div_CD ? response.data[0]?.div_CD : 0
      );
    });
    let params = {};
    const { emp_CD } = getValues();
    console.log('eeeeeeeeeeeeeeeeeeee', emp_CD);
    params.CO_CD = e.target.value;
    params.EMP_CD = emp_CD;
    authAxiosInstance(`system/user/groupManage/employee/getEmpCDInWorkplace`, {
      params,
    }).then(response => {
      console.log(response.data);
      response.data
        ? setError('emp_CD', { message: '사번이 중복되었습니다.' })
        : clearErrors();
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
            borderRadius: '0',
            border: errors.co_CD && errorName === 'co_CD' && '1px solid red',
            backgroundColor: clickYN && '#f2f2f2',
          }}
          MenuProps={{
            PaperProps: {
              style: {
                width: '230px',
                maxHeight: 250, // 원하는 최대 높이 값으로 변경
              },
            },
          }}
        >
          {data.map(company => (
            <MenuItem
              value={company.co_CD}
              key={company.co_CD}
              style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                borderBottom: '1px solid #CCC',
              }}
            >
              {company.co_CD}. {company.co_NM}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
