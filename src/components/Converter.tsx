import { useState } from "react";
import CustomInput from "./CustomInput";
import { ModalContainer, Title } from "./styles";
import { EXCHANGE_RATE } from "../const";
import styled from "styled-components";
import WalletDetailsModal from "./WalletDetailsModal";

const AnchorText = styled.h4`
  color: #160c85;
  cursor: pointer;
  border-bottom: 2px solid #160c85;
`;

export const Converter = (): JSX.Element => {
  const [nepVal, setNepVal] = useState<string | number>(0);
  const [busdVal, setBusdVal] = useState<string | number>(0);
  const [toggle, setToggle] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const changeNepVal = (val: string | number) => {
    setNepVal(val);
    if (!isNaN(Number(val))) {
      setBusdVal((Number(val) * EXCHANGE_RATE).toFixed(2));
    }
  };
  const changeBusdVal = (val: string | number) => {
    setBusdVal(val);
    if (!isNaN(Number(val))) {
      setNepVal((Number(val) / EXCHANGE_RATE).toFixed(2));
    }
  };

  return (
    <ModalContainer style={{ width: 400, marginTop: 40 }}>
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
        }}
      >
        <AnchorText onClick={() => setModalOpen(true)}>
          Check Wallet Details
        </AnchorText>
      </div>
      <WalletDetailsModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </ModalContainer>
  );
};
