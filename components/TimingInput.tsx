import { NumberInputProps, TextInput, TextInputProps } from "@mantine/core";
import React from "react";
import ReactCodeInput from "react-code-input";

export const TimingInput = ({ ...props }: any) => {
  return (
    // <TextInput
    //   label="temps"
    //   description="Exemple du format attendu: 01.59.99"
    //   variant="filled"
    //   {...props}
    // />
    <ReactCodeInput type="number" fields={6} {...props} />
  );
};
