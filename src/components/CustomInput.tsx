import React, { useState } from "react";
import styled from "styled-components";

interface CustomInputProps {
  label?: string;
  value: number | string;
  changeValue: (val: number | string) => void;
}

const Input = styled.input`
  height: 40px;
  border-radius: 6px;
  border-color: #8a8a8a;
  font-size: 16px;
  padding-left: 10px;
`;

const Label = styled.h5`
  font-size: 18px;
  font-weight: 600;
  padding: 0;
  margin: 0;
  padding-bottom: 10px;
`;

const CustomInput = ({
  value,
  changeValue,
  label,
}: CustomInputProps): JSX.Element => {
  return (
    <div style={{ display: "grid" }}>
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => changeValue(e.target.value)} />
    </div>
  );
};

export default CustomInput;
