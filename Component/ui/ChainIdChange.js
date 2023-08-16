import React, { useEffect } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import(useAccount);

function ChainIdChange() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  useEffect(() => {
    
    if (!switchNetwork) return;
    if (chain?.id != 137) {
      toast.error("Please select the valid Chain to contine");
      switchNetwork?.(137);
      return;
    }
  }, [chain, address]);
  return <div></div>;
}

export default ChainIdChange;
