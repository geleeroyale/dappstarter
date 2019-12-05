import React, { useState } from "react";
import { useWeb3Context } from "web3-react";
import { ethers } from "ethers";

export default function SendTX() {
  const context = useWeb3Context();
  const [transactionHash, setTransactionHash] = useState();

  const signer = context.library.getSigner();

  signer
    .sendTransaction({
      to: ethers.constants.AddressZero,
      value: ethers.utils.bigNumberify("0")
    })
    .then(({ hash }) => {
      setTransactionHash(hash);
    });
  return (
    <React.Fragment>
      <button onClick={signer.sendTransaction}>Send Dummy Transaction</button>
      <p>{transactionHash}</p>
    </React.Fragment>
  );
}
