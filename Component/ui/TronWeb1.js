import React, { useState, useEffect } from "react";
import TronWeb, { utils } from "tronweb";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Modal from "react-bootstrap/Modal";
import Web3 from "web3";
import finalMerkleList from "../../finalMerkleList.json";
import { polygon } from "@wagmi/chains";
import { useContractWrite } from "wagmi";
import ContractInterface from "../../polygonabi.json";
import { addYears } from "date-fns";
import axios from "axios";
import { CustomizeConnectButton } from "./ConnectButton";
import { useAccount } from "wagmi";
import { Modal } from "@nextui-org/react";

function TronWebFn1() {
  const [checkAddress, setCheckAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [key, setKey] = useState();
  const [proof, setProof] = useState();

  const { address } = useAccount();

  localStorage.setItem("address", address);

  // async function getIdKey(data) {
  //   try {
  //     let res = await axios.post("/api/getId&Key", data);
  //     const response = res.data;
  //   } catch (err) {}
  // }

  // async function formsbumitHandler(event) {
  //   const data = {
  //     address: tronWeb?.defaultAddress?.base58,
  //   };

  //   getIdKey(data);
  // }

  useEffect(() => {
    formSubmitHandler1();
  }, []);

  async function walletCheck(data) {
    try {
      let res = await axios.post("/api/login/walletCheck", data);
      const response = res.data;
      setId(response?.data?.data?.id);
      setKey(response?.data?.data?.key);
      setProof(response?.data?.data?.proof);
    } catch (err) {
    }
  }
  async function formSubmitHandler1() {
    if (!address) {
      return;
    }
    const data = {
      address: address,
    };
    walletCheck(data);
  }

  async function proofFn() {

    write({
      recklesslySetUnpreparedArgs: [proof, address, id, key],
    });
  }

  const { write } = useContractWrite({
    address: "0x33E11EEaAaf2aB16AFAE8FefB402d6C0Ff9c6806",
    abi: ContractInterface,
    functionName: "changeAddress",
    overrides: {
      gasLimit: "800000",
    },

    onError(error) {
      setOpen(false);
      setShow1(true);
    },
    async onSuccess(data) {
      setOpen(true);

      let tx = await data.wait();

      if (tx.status == "1") {
        setOpen(false);
        successHandler();
        setShow(true);
        // window.location.href="/"
      }
    },
  });

  const isValidAddress = (adr) => {
    try {
      const web3 = new Web3();
      return web3.utils.toChecksumAddress(address);
    } catch (err) {}
  };

  async function okSubmitHandler() {
    window.localStorage.clear();
    window.location.href = "/";
    return;
  }

  async function success(data) {
    try {
      let res = await axios.post("/api/updateWatcher", data);
      const response = res.data;
    } catch (err) {}
  }

  async function successHandler() {
    const data = {
      address: address,
    };

    success(data);
  }

  return (
    <>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ float: "right", marginTop: "10px" }}>
        <CustomizeConnectButton />
      </div>
      <div className="contract-bodysection">
        <div className="container">
          <div className="section-divider">
            <div className="welcome-section">
              <div className="welcome-body ">
                <div className="zoo-section"></div>

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
                            value={address}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isValidAddress(address) && (
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

                {address
                  ? !isValidAddress(address) && (
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
                    // disabled={isValidAddress(checkAddress) ? false : true}
                    onClick={() => proofFn()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     

      <div class="tron-swap">
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={show}
          class="tron-swap"
          // onClose={closeHandler}
        >
          <Modal.Header>Confirmed</Modal.Header>
          <Modal.Body>(Please Login To Continue)</Modal.Body>
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

export default TronWebFn1;
