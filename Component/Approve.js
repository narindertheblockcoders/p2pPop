import React, { useEffect } from "react";
import contractInterface from "../token-abi.json";
import { useContractWrite } from "wagmi";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { parseEther } from "viem";
// import Web3 from "web3";

const Web3 = require("web3");
const rpcURL = "https://polygon.llamarpc.com";
const web3 = new Web3(rpcURL);

let minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

export default function Approve(setAmount, props) {
  console.log(props,"props")
  const [open, setOpen] = useState(false);
  const [show10, setShow10] = useState(false);
  const [loading, setLoading] = useState(false);
  const [p2pPrice, setp2pPrice] = useState();
  const router = useRouter();

  async function getLivePrice() {

    let tokenContract = new web3.eth.Contract(
      minABI,
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
    );

    const balance = await tokenContract.methods
      .balanceOf("0x104f9e229844C4B6DDc0456147D0F6Fdc9d65A8d")
      .call();


    const wmatic = balance * 1e18;

    let p2pContract = new web3.eth.Contract(
      minABI,
      "0x7Bbf85d26B305A030916be29Aa9d754eE0F8bF60"
    );

    const p2pBalance = await p2pContract.methods
      .balanceOf("0x104f9e229844C4B6DDc0456147D0F6Fdc9d65A8d")
      .call();

    
    const totalBalance = wmatic / 1e18 / (p2pBalance / 1e18);

    
    let res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
    );
    const response = res.data["matic-network"].usd;   

    setp2pPrice(
      parseFloat(
        parseFloat(response) * parseFloat(totalBalance / 1e18)
      ).toFixed(4)
    );
  }

  useEffect(() => {
    getLivePrice();
  }, [p2pPrice]);

  var p2pPriceConverted = 70 / parseFloat(p2pPrice);
  

  const { address } = useAccount();
  

  async function getBalance() {
    setOpen(true);
    const web3 = new Web3("https://polygon-rpc.com/");
    const contract = await new web3.eth.Contract(
      contractInterface,
      "0x7Bbf85d26B305A030916be29Aa9d754eE0F8bF60"
    );
    var balances = await contract.methods.balanceOf(address).call();
    setOpen(false);
    
    if (balances > 0) {
      return balances / 1e18;
    }
    return balances;
  }

  const { write } = useContractWrite({
    address: "0x7Bbf85d26B305A030916be29Aa9d754eE0F8bF60",
    abi: contractInterface,
    functionName: "approve",
    overrides: {
      gasLimit: "800000",
    },
    args: [
      "0xC9Aa9C4541A735AE5FA7527d33d998104cF41d05",
      "10000000000000000000",
    ],
    onError(error) {
      
      setLoading(false);
    },
    async onSuccess(data) {
      setOpen(true);
      
      let tx = await data.wait();
      
      if (tx.status == "1") {
        setAmount?.setAmount(p2pPriceConverted*1e18);
      }
      setLoading(true);
      setOpen(false);
    },
  });


  async function falseBalance() {
    var checkTokenBalance = await getBalance();
    if (checkTokenBalance >= 1) {
      setShow10(false);
      write();
      return;
    } else {
      setShow10(true);

      return;
    }
  }

  async function BackFn() {
    setShow10(false);
    return;
  }

  

  return (
    <>
      <section class="camera">
        <Backdrop
          sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="captureDiv">
          <button
            className="btn connect-wallet"
            onClick={() => falseBalance()}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Approve Trasaction"}
            {/* Approve Transaction   */}
          </button>
        </div>
      </section>
      <Modal
        show={show10}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="otpModal"
        blur
      >
        <section class="two-factors1">
          <div class="container">
            <div class="twofactor-content">
              <h3>InSufficient Balance</h3>
              {/* <Link href="/dashboard"> */}
              <div class="success-done">
                <button class="connect-wallet" onClick={BackFn}>
                  Back
                </button>
              </div>
              {/* </Link> */}
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
}
