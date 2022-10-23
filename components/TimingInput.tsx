import React from "react";
import ReactCodeInput from "@acusti/react-code-input";

export const TimingInput = ({ ...props }: any) => {
  return (
    <>
      <ReactCodeInput type="number" fields={6} {...props} inputMode="numeric" />
      {props.error && (
        <>
          <span style={{ color: "red" }}>{props.error}</span>
          <span style={{ marginBottom: "20px" }}>
            Exemple format attendu: 01:59:59
          </span>
        </>
      )}
    </>
  );
};
