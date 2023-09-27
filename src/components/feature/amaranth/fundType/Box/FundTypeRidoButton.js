import React from 'react';

const FundTypeRidoButton = ({
  options,
  selectedOption,
  onOptionChange,
  defultValue,
  register,
}) => {
  return (
    <div>
      {options.map((option, index) => (
        <label key={index} className="radio-label">
          <input
            type="radio"
            value={option === '' ? defultValue : option}
            onClick={() => {
              onOptionChange(option === '' ? '' : option);
            }}
            checked={option === selectedOption}
          />
          {option === '' ? defultValue : option}
        </label>
      ))}
    </div>
  );
};

export default FundTypeRidoButton;
