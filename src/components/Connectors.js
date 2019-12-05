import { Connectors } from "web3-react";

const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });

const Infura = new NetworkOnlyConnector({
  providerURL: "https://mainnet.infura.io/v3/786b24cf18a84440801941dc2cc7dad3"
});

const EthereumConnectors = { MetaMask, Infura };

export default {
  InjectedConnector,
  NetworkOnlyConnector,
  MetaMask,
  Infura,
  EthereumConnectors
};
