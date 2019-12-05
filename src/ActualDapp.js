import * as React from "react";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import Web3Provider, { useWeb3Context } from "web3-react";
import { ethers } from "ethers";

import connectors from "./components/Walletconnectors";

import Web3ConsumerComponent from "./components/Web3ConsumerComponent";
import ConnectorsManager from "./components/ConnectorsManager";

import { Container } from "@material-ui/core";
import { Button, Box, Card, Heading } from "rimble-ui";

function ActualDapp() {
  return (
    <React.Fragment>
      <Web3Provider connectors={connectors} libraryName="ethers.js">
        <Box className="App">
          <MyComponent />
        </Box>
      </Web3Provider>
    </React.Fragment>
  );
}

function MyComponent() {
  const context = useWeb3Context();

  console.log(context);

  if (context.error) {
    console.error("Error!");
  }

  if (context.active && context.connectorName === "WalletConnect") {
    if (!context.account) {
      WalletConnectQRCodeModal.open(
        context.connector.walletConnector.uri,
        () => {}
      );
    } else {
      try {
        WalletConnectQRCodeModal.close();
      } catch {}
    }
  }

  const [transactionHash, setTransactionHash] = React.useState(undefined);

  function sendTransaction() {
    const signer = context.library.getSigner();

    signer
      .sendTransaction({
        to: ethers.constants.AddressZero,
        value: ethers.utils.bigNumberify("0")
      })
      .then(({ hash }) => {
        setTransactionHash(hash);
      });
  }

  return (
    <React.Fragment>
      <Container>
        <Box>
          <Heading>Donation Leaderboard</Heading>
          <ConnectorsManager />
          <Web3ConsumerComponent />
        </Box>
        {context.error && (
          <div>An error occurred, check the console for details.</div>
        )}
        <Box>
          {Object.keys(connectors).map(connectorName => (
            <Button
              key={connectorName}
              disabled={context.connectorName === connectorName}
              onClick={() => context.setConnector(connectorName)}
            >
              Activate {connectorName}
            </Button>
          ))}
        </Box>
        <Card>
          {(context.active || (context.error && context.connectorName)) && (
            <Button onClick={() => context.unsetConnector()}>
              {context.active ? "Deactivate Connector" : "Reset"}
            </Button>
          )}

          {context.active && context.account && !transactionHash && (
            <Button onClick={sendTransaction}>Send Dummy Transaction</Button>
          )}

          {transactionHash && <div>{transactionHash}</div>}
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default ActualDapp;
