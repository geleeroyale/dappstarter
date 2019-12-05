import React, { useEffect } from "react";
import { useWeb3Context } from "web3-react";
import { Typography } from "@material-ui/core";
import { Box, Blockie, EthAddress } from "rimble-ui";
import NetworkIndicator from "@rimble/network-indicator";

// This component must be a child of <App> to have access to the appropriate context
export default function ConnectorsManager() {
  const context = useWeb3Context();

  useEffect(() => {
    context.setFirstValidConnector(["Metamask", "Infura"]);
  });

  if (!context.active && !context.error) {
    // loading
    return <p>Loading</p>;
  } else if (context.error) {
    //error
    return <p>{context.error}</p>;
  } else {
    // success
    console.log(context);

    return (
      <Box>
        <NetworkIndicator currentNetwork={context.networkId} />
        Connected to{" "}
        <span style={{ color: "green" }}> {context.connectorName} </span> with
        account: <Blockie opts={{ seed: context.account }} />
        <EthAddress address={context.account} />
        <Typography>Balance: </Typography>
      </Box>
    );
  }
}
