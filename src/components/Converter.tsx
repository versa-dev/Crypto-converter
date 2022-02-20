import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { ModalContainer, Title } from "./styles";
import { EXCHANGE_RATE } from "../const";

export const Converter = (): JSX.Element => {
  const [nepVal, setNepVal] = useState<string | number>(0);
  const [busdVal, setBusdVal] = useState<string | number>(0);
  const [toggle, setToggle] = useState<boolean>(true);

  const changeNepVal = (val: string | number) => {
    setNepVal(val);
    if (!isNaN(Number(val))) {
      setBusdVal((Number(val) * 3).toFixed(2));
    }
  };
  const changeBusdVal = (val: string | number) => {
    setBusdVal(val);
    if (!isNaN(Number(val))) {
      setNepVal((Number(val) / 3).toFixed(2));
    }
  };

  return (
    <ModalContainer style={{ width: 400 }}>
      <Title>Crypto converter</Title>
      {toggle ? (
        <CustomInput label="NEP" value={nepVal} changeValue={changeNepVal} />
      ) : (
        <CustomInput label="BUSD" value={busdVal} changeValue={changeBusdVal} />
      )}
      <div style={{ display: "flex", height: 100 }}>
        <img
          src="/images/exchange.svg"
          alt="exchange"
          height={50}
          style={{ margin: "auto", cursor: "pointer" }}
          onClick={() => setToggle(!toggle)}
        />
      </div>
      {!toggle ? (
        <CustomInput label="NEP" value={nepVal} changeValue={changeNepVal} />
      ) : (
        <CustomInput label="BUSD" value={busdVal} changeValue={changeBusdVal} />
      )}
    </ModalContainer>
  );
};
