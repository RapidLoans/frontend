"use client";

import React, { useEffect } from "react";
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';

const ConnectWallet: React.FC = () => {
  // const {wallet, connected} = useWallet()
  // useEffect(()=>{
  //   if (connected)
  //     console.log("wallet connected", wallet?.adapter.signTransaction({}))
  // },[connected])
  return (<WalletActionButton className="rounded-3xl"/>)
};

export default ConnectWallet;
