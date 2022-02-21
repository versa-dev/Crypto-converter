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
  background-color: #f3f3f3;
  width: 450px;
  left: calc((100vw - 510px) / 2);
  top: 200px;
  padding: 20px 30px;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 220px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
`;

const Disconnect = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  margin-top: 40px;
  border-radius: 8px;
  color: white;
  font-size: 15px;
  font-weight: 700;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailText = styled.p`
  font-size: 14px;
  font-weight: 600;
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
          <div style={{ display: "grid" }}>
            <DetailRow>
              <p>KEY</p>
              <p>VALUE</p>
            </DetailRow>
            <DetailRow>
              <DetailText>Account</DetailText>
              <DetailText>
                {account?.substring(0, 4)}...
                {account?.substring(account.length - 4, account.length)}
              </DetailText>
            </DetailRow>
            <DetailRow>
              <DetailText>Chain ID</DetailText>
              <DetailText>{chainId}</DetailText>
            </DetailRow>
            <DetailRow>
              <DetailText>Balance</DetailText>
              <DetailText>{parseFloat(balance) / Math.pow(10, 18)}</DetailText>
            </DetailRow>
          </div>
        ) : (
          <h4 style={{ color: "red" }}>
            Wallet not connected. Please click the "Connect" button below.
          </h4>
        )}
        {!active ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 50,
            }}
          >
            <Button
              style={{ background: "#0948db", color: "white" }}
              onClick={connect}
            >
              Connect
            </Button>
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
