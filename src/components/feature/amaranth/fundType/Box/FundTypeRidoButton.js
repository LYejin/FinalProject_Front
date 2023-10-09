import React from 'react';

const FundTypeRidoButton = ({
  options,
  selectedOption,
  onOptionChange,
  defultValue,
  register,
}) => {
  React.useEffect(() => {
    //onOptionChange(defultValue);
    console.log('서치(라디오)', options, defultValue);
  });
  return (
    <div>
      {options.map((option, index) => (
        <label key={index} className="radio-label">
          <input
            type="radio"
            value={option === '' ? defultValue : option}
            className="radio-input"
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
