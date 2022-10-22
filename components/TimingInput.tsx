import { TextInput, TextInputProps } from "@mantine/core";
import React from "react";

export const TimingInput = ({ ...props }: TextInputProps) => {
  return (
    <TextInput
      label="temps"
      description="Exemple du format attendu: 01.59.99"
      variant="filled"
      pattern="\d*"
      {...props}
    />
  );
};
