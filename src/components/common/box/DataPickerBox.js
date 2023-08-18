import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DataPickerBox = (joinTime) => {
  console.log(joinTime);
  const joinTimeData = joinTime;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "MobileDatePicker",
          "DesktopDatePicker",
          "StaticDatePicker",
        ]}
      >
        <DemoItem>
          <DatePicker value={joinTimeData} inputFormat={"yyyy-MM-dd"} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DataPickerBox;
