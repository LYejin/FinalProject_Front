import React, { useState, forwardRef } from 'react';
import '../../../css/CustomInput.css';

const InfoInput = forwardRef(({ valid, maxLength, type, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    if (valid === 'number') {
      const value = e.target.value;
      if (!value) setError('값을 입력하세요.');
      else if (!/^[0-9]{4}$/.test(value))
        setError('4자리의 숫자만 입력하세요.');
      else setError('');
    } else if (valid === 'text') {
      const value = e.target.value;
      if (!value) setError('값을 입력하세요.');
      else setError('');
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
        {...props}
        type={type}
        ref={ref}
        maxLength={maxLength}
        className={`custom-input ${isFocused ? 'focused' : ''} ${
          error ? 'error' : ''
        } ${valid ? 'valid-input' : ''}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange} // onBlur를 onChange로 바꿨습니다.
      />
      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
});

export default InfoInput;
