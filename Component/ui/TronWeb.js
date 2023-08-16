import React, { useState, useEffect } from "react";
import TronWeb, { utils } from "tronweb";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Modal from "react-bootstrap/Modal";
import Web3 from "web3";
import finalMerkleList from "../../finalMerkleList.json";
import { polygon } from "@wagmi/chains";
import { useRouter } from "next/router";
import Link from "next/link";
import { Modal } from "@nextui-org/react";
import axios from "axios";

function TronWebFn() {
  const [tronAddress, setTronAddress] = useState();
  const [balance, setBalance] = useState();
  const [desiredAmount, setDesiredAmount] = useState();
  const [amountError, setAmountError] = useState(false);
  const [checkAddress, setCheckAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [proof, setProof] = useState();

  const router = useRouter();

  const contractAddress = "TJ9TxoG9xwtLfDgoRPQnt11EwSUGQvWeff";

  // async function read() {
  //   setOpen(true);
  //   if (
  //     typeof window !== "undefined" &&
  //     window.tronWeb &&
  //     window.tronWeb.ready
  //   ) {
  //     const tronWeb = window?.tronWeb;
  //     const address = tronWeb?.defaultAddress?.base58;
  //     const tronContract = await tronWeb?.contract()?.at(contractAddress);

  //     const tx = await tronContract?.requested(address).call();

  //     if (tx == true) {
  //     } else {
  //       // setOpen(false)
  //     }
  //   }
  // }
  // useEffect(() => {
  //   // rea/d();
  // }, []);

  // const handleTronLinkOpen = async () => {
  //   try{
  //     if (
  //       typeof window !== "undefined" &&
  //       window.tronWeb &&
  //       window.tronWeb.ready
  //     ) {
  //       const tronWeb = window.tronWeb;
  //       if (tronWeb.defaultAddress.base58) {
  //         const address = tronWeb?.defaultAddress?.base58;
  //         console.log(address,"address")
  //         setTronAddress(address);
  //       } 
  //     } 
  //   }catch(err){
      
  //   }
  // };

  const isValidAddress = (adr) => {
    try {
      const web3 = new Web3();
      return web3.utils.toChecksumAddress(checkAddress);
    } catch (err) {}
  };

  async function onMigrate() {
    if (
      typeof window !== "undefined" &&
      window.tronWeb &&
      window.tronWeb.ready
    ) {
      const tronWeb = window.tronWeb;
      let data = await finalMerkleList?.proof?.filter((index) => {
        return index?.address == tronWeb?.defaultAddress?.base58;
      });
    
      if (data.length == 0 || data.length == "null" || !data.length) {
        setShow2(true);
        return;
      }

      setProof(data[0]?.proof);
      await getProofHandler(data[0]?.proof);

      const address = checkAddress;

      const tronContract = await tronWeb?.contract()?.at(contractAddress);
      const tx = await tronContract
        ?.changeAddress(data[0]?.proof, address)
        ?.send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
      const trnx = await tronWeb.trx.getTransaction(tx);
      if (trnx.ret[0].contractRet == "SUCCESS") {
        setShow(true);
      }
      if (trnx.ret[0].contractRet == "REVERT") {
        setShow1(true);
      }
    }
  }

  async function okSubmitHandler() {
    window.localStorage.clear();
    window.location.href = "/";
    return;
  }

  async function getProof(data) {
    try {
      let res = await axios.post("/api/getProof", data);
      const response = res.data;
    } catch (err) {}
  }

  async function getProofHandler(proof) {
    const data = {
      address: tronWeb?.defaultAddress?.base58,
      proof: proof,
    };
    getProof(data);
  }

  return (
    <>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="contract-bodysection">
        {/* <div style={{ float: "right", padding: "30px" }}>
          {!tronWeb.defaultAddress.base58 ? (
            <button className="tronButton" onClick={handleTronLinkOpen}>
              Open TronLink
            </button>
          ) : (
            ""
          )}
        </div> */}
        <div className="container">
          <div className="section-divider">
            <div className="welcome-section">
              <div className="welcome-body ">
                <div className="zoo-section"></div>

                <div className="welcome-body" id="right-form-body">
                  <div className="zoo-section" id="zoo-section">
                    <h6 style={{ color: "white" }}>Tron Wallet Address</h6>
                    <div className="woo-paragraph" id="woo-paragraph">
                      <div className="space-bet-section" id="space-bet-section">
                        <div className="social-icons" id="input-max">
                          <input
                            type="text"
                            // placeholder="Enter Quantity"
                            className="address-input"
                            id="address-input"
                            defaultValue={tronWeb.defaultAddress.base58}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="welcome-body" id="right-form-body">
                  <div className="zoo-section" id="zoo-section">
                    <h6 style={{ color: "white" }}>E.V.M. Wallet Address</h6>
                    <div className="woo-paragraph" id="woo-paragraph">
                      <div className="space-bet-section" id="space-bet-section">
                        <div className="social-icons" id="input-max">
                          <input
                            type="text"
                            placeholder="Enter Your E.V.M. Wallet Address"
                            className="address-input"
                            id="address-input"
                            onChange={(e) => setCheckAddress(e.target.value)}
                            value={checkAddress}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isValidAddress(checkAddress) && (
                  <div
                    style={{
                      color: "white",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    Address is Valid
                  </div>
                )}

                {checkAddress
                  ? !isValidAddress(checkAddress) && (
                      <div
                        style={{
                          color: "white",
                          marginTop: "10px",
                          textAlign: "center",
                        }}
                      >
                        Address is not Valid
                      </div>
                    )
                  : null}

                <div className="zoo-section" id="zoo-section">
                  <button
                    className="btn addressBtn "
                    id="buy-btn"
                    type="button"
                    disabled={isValidAddress(checkAddress) ? false : true}
                    onClick={() => onMigrate()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tron-swap3">
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={show}
          className="tron-swap3"
          // onClose={closeHandler}
        >
          <Modal.Header>ThankYou for submitting Your Data</Modal.Header>
          <Modal.Body>(Please Click Connect Wallet to continue)</Modal.Body>
          <Modal.Footer>
            {/* <Link href="/swapping1"> */}
            <button
              className="connect-wallet"
              type="button"
              onClick={okSubmitHandler}
            >
              ok
            </button>
            {/* </Link> */}
          </Modal.Footer>
        </Modal>
      </div>

      <div className="tron-swap1">
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={show2}
          className="tron-swap1"
          // onClose={closeHandler}
        >
          <Modal.Header>No Tron Address Found</Modal.Header>
          <Modal.Body>(Please Try Again)</Modal.Body>
          <Modal.Footer>
            <button
              className="connect-wallet"
              type="button"
              onClick={() => okSubmitHandler()}
            >
              ok
            </button>
          </Modal.Footer>
        </Modal>
      </div>

    </>
  );
}

export default TronWebFn;
