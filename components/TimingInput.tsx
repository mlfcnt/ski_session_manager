import { TimeInput, TimeInputProps } from "@mantine/dates";
import React from "react";

export const TimingInput = ({ ...props }: TimeInputProps) => {
  return (
    <TimeInput
      defaultValue={null}
      label="Pick time"
      withSeconds
      variant="filled"
      clearable
      hoursLabel="min"
      minutesLabel="sec"
      secondsLabel="hundredth"
      {...props}
    />
  );
};
