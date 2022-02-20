import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { Title } from "./styles";
import useSWR from "swr";
import { injected } from "./wallet/connectors";
import { useWeb3React } from "@web3-react/core";

interface WalletDetailsModalProps {
  show: boolean;
  onClose: () => void;
}

const CustomModal = styled(ReactModal)`
  position: absolute;
  background-color: #ffffff;
  width: 450px;
  left: calc((100vw - 510px) / 2);
  top: 200px;
  padding: 20px 30px;
`;

const Button = styled.button`
  width: 220px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Disconnect = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
`;

const fetcher =
  (library: any) =>
  (...args: any) => {
    const [method, ...params] = args;
    console.log(method, params);
    return library[method](...params);
  };

const WalletDetailsModal = (props: WalletDetailsModalProps): JSX.Element => {
  const { chainId, active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });

  const connect = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  console.log("here ===>", parseInt(balance));

  return (
    <>
      <CustomModal isOpen={props.show} onRequestClose={props.onClose}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title>Wallet details</Title>
          <Title style={{ cursor: "pointer" }} onClick={props.onClose}>
            X
          </Title>
        </div>
        {active ? (
          <div>
            {account}-{chainId}----- {"fucking"}
          </div>
        ) : (
          <>Disconnected</>
        )}
        {!active ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Button onClick={connect}>Connect</Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </div>
        ) : (
          <Disconnect onClick={disconnect}>Disconnect</Disconnect>
        )}
      </CustomModal>
    </>
  );
};

export default WalletDetailsModal;
