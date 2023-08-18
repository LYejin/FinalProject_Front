import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 1;

const names = ["재직", "휴직", "퇴직"];

const CheckSelectBox = ({ width, data }) => {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: width,
        fontSize: "0.8rem",
      },
    },
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: width }} size="small">
        <Select
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          sx={{
            height: "28px",
            fontSize: "0.8rem",
            margin: 0,
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              sx={{
                height: "28px",
                fontSize: "0.8rem",
              }}
            >
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CheckSelectBox;
