const WorkpTextFieldBox = ({
  width,
  title,
  onInputChange,
  value,
  setValue,
}) => {
  // Use value and setValue from props instead of local state
  // const [inputValue, setInputValue] = useState('');

  const TextFieldBoxWrapper = {
    height: '28px',
    width: '210px',
    fontSize: '0.73rem',
    border: '1px solid #ccc',
    paddingLeft: '10px',
  };

  const handleInputChange = event => {
    setValue(event.target.value); // Use setValue from props
    if (onInputChange) {
      onInputChange(event.target.value);
    }
  };

  return (
    <div style={{ alignItems: 'center', width: width }}>
      <span style={{ marginRight: '8px' }}>{title}</span>
      <input
        style={TextFieldBoxWrapper}
        value={value} // Use value from props
        onChange={handleInputChange}
        placeholder="사업장코드/사업장명을 입력하세요."
      />
    </div>
  );
};

export default WorkpTextFieldBox;
