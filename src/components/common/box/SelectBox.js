import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectBox = ({ data, width }) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: width }} size="small">
      <Select
        id="demo-select-small"
        value={age}
        onChange={handleChange}
        displayEmpty
        sx={{
          height: "28px",
          fontSize: "0.8rem",
        }}
      >
        <MenuItem value="">
          <em>전체</em>
        </MenuItem>
        <MenuItem value={10}>더존비즈온</MenuItem>
        <MenuItem value={20}>더존비즈온2</MenuItem>
        <MenuItem value={30}>더존비즈온3</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectBox;
