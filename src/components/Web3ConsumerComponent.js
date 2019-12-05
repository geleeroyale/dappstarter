import React from "react";
import { useWeb3Context } from "web3-react";
import { Card, Text } from "rimble-ui";

export default function Web3ConsumerComponent() {
  const context = useWeb3Context();
  const { connectorName, account, networkId } = context;
  return (
    <React.Fragment>
      <Card>
        <Text>Active Connector: {connectorName}</Text>
        <Text>Account: {account || "None"}</Text>
        <Text>Network ID: {networkId}</Text>
      </Card>
    </React.Fragment>
  );
}
