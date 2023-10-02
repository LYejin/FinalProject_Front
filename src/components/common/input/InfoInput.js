import React, { useState, forwardRef } from 'react';
import { authAxiosInstance } from '../../../axios/axiosInstance';
import '../../../css/CustomInput.css';

const InfoInput = forwardRef(
  (
    {
      valid,
      maxLength,
      CoCd,
      type,
      name,
      errors,
      setError,
      clearErrors,
      register,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = async e => {
      if (register && typeof register.onChange === 'function') {
        register.onChange(e);
      }
      const value = e.target.value;

      if (type === 'number') {
        if (e.target.value.length > maxLength) {
          e.target.value = e.target.value.slice(0, maxLength);
        }
      }

      if (valid === 'number') {
        if (valid === 'number' && /^[0-9]{4}$/.test(value)) {
          try {
            const response = await authAxiosInstance.get(
              'system/user/departments/deptCheck',
              {
                params: { coCd: CoCd, deptCd: value },
              }
            );
            if (response.data) {
              // 중복이면 에러를 설정합니다.
              setError(name, {
                type: 'manual',
                message: '중복된 번호입니다.',
              });
            } else {
              // 중복이 아니면 에러를 클리어합니다.
              clearErrors(name);
            }
          } catch (error) {
            console.error('Error during duplicate check', error);
            // 요청 중 오류가 발생하면 에러를 설정합니다.
            setError(name, {
              type: 'manual',
              message: '중복 확인 중 오류 발생',
            });
          }
        }
      }
    };

    if (type === 1) {
      type = 'number';
    } else {
      type = 'text';
    }

    return (
      <div className="inputWrapper">
        <input
          ref={ref}
          {...props}
          type={type}
          maxLength={maxLength}
          className={`custom-input ${isFocused ? 'focused' : ''} ${
            errors && errors[name] ? 'error' : ''
          } ${valid ? 'valid-input' : ''}`}
          {...register}
          onChange={e => {
            if (type === 'number' && e.target.value.length > 4) {
              e.target.value = e.target.value.slice(0, 4);
            }
            handleChange(e); // 이미 존재하는 handleChange 호출
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {errors && errors[name] && (
          <div className="errorMessage">{errors[name].message}</div>
        )}
      </div>
    );
  }
);

export default InfoInput;
