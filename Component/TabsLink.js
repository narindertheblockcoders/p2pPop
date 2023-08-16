import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import contractInterface from "../contract-abi.json";
import { useAccount, useContractWrite } from "wagmi";
import Approve from "../Component/Approve";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import { parseEther } from "viem";
import Web3 from "web3";
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

export default function TabsLink() {
  const [amount, setAmount] = useState();
  const [getAddress, setGetAddress] = useState();
  const [tab1, setTab1] = useState(false);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const [dataa, setDataa] = useState();
  const [referral, setReferral] = useState();
  const [getReferral, setGetReferral] = useState();
  const [addReferral, setAddReferral] = useState();
  const [dataToSC, setDataToSC] = useState();
  const [binaryData, setBinaryData] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [referralCodeError, setReferralCodeError] = useState();
  const [sendPrice, setSendPrice] = useState();
  const [p2pCalculatedPrice, setP2pCalculatedPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [disdata, setDisData] = useState();
  const [a, setA] = useState("");

  const { address } = useAccount();

  async function writeFunction() {
    if (
      !localStorage.getItem("address") ||
      localStorage.getItem(
        "address" == null || localStorage.getItem("address" == " ")
      )
    ) {
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      toast.error(
        "No Address Found! Re-directed to login page to continue again"
      );
      return;
    }
    if (localStorage.getItem("address")) {
      write?.();
    }
  }

  async function getLivePrice() {
    const quickSwapPairABI = "0x7Bbf85d26B305A030916be29Aa9d754eE0F8bF60";

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

    setSendPrice((Number(response) * Number(totalBalance / 1e18))?.toFixed(6));

    const a = 70 / (response * (totalBalance / 1e18));
    setA(a);

    setP2pCalculatedPrice(parseEther(`${a}`));
    console.log(a, "parse");
  }

  useEffect(() => {
    getLivePrice();
  }, []);

  const { write } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: "0xC9Aa9C4541A735AE5FA7527d33d998104cF41d05",
    abi: contractInterface,
    functionName: "register",
    chainId: 137,
    overrides: {
      gasLimit: 800000,
    },
    args: [p2pCalculatedPrice, dataToSC, levelData, binaryData],
    onError(error) {},
    async onSuccess(data) {
      let tx = await data.wait();

      var hash = tx.transactionHash;
      if (tx.status == 1) {
        let res = await axios.post("/api/register", {
          address: getAddress,
          referral: addReferral || referral,
          hash: hash,
          price: sendPrice,
        });
        const response = res.data;

        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("code", response.data.data.code);
        window.location.href = "/awesome";
      }
      if (tx.status == 0) {
        window.location.href = "/tabsLink";
        setTab1(false);
        setTab2(false);
        setTab3(true);
      }
    },
  });

  async function fn1() {
    const signer = new ethers.providers.JsonRpcProvider(
      "https://polygon-rpc.com/",
      137
    );
    const contract = new ethers.Contract(
      // "0x45d12b59b965880c9F8A38eFdBA3075631e70Caf",
      "0x7Bbf85d26B305A030916be29Aa9d754eE0F8bF60",
      [
        {
          constant: true,
          inputs: [
            { name: "_owner", type: "address" },
            { name: "_spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ name: "remaining", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ],
      signer
    );

    const tx = await contract.allowance(
      address,
      "0xC9Aa9C4541A735AE5FA7527d33d998104cF41d05"
    );

    setAmount(Number(tx));
  }

  useEffect(() => {
    fn1();
  }, []);

  useEffect(() => {
    localStorage.getItem("address");
    setGetAddress(localStorage.getItem("address"));
    setGetReferral(localStorage.getItem("addReferral"));
    setReferral(localStorage.getItem("referral"));
    const shiftTabs = localStorage.getItem("step");
    const tabs = localStorage.getItem("tabs");
    const lowBalance = localStorage.getItem("lowBalance");

    if (!tabs) {
      setTab1(false);
      setTab2(true);
      setTab3(false);
    }

    if (shiftTabs == 2) {
      setTab1(false);
      setTab2(true);
      setTab3(false);
    }

    if (shiftTabs == 3) {
      setTab1(false);
      setTab2(false);
      setTab3(true);
      getDistributionData();
      return;
    }

    if (lowBalance == 0) {
      setTab1(false);
      setTab2(false);
      setTab3(true);
      return;
    }
  }, []);

  function nextFn1() {
    setTab1(false);
    setTab2(true);
    setTab3(false);
  }

  function nextFn2(e) {
    e.preventDefault();

    localStorage.setItem("addedReferral", addReferral);
    checkReferralCodeSumbitHandler();
  }

  async function getDistributionData() {
    setOpen(true);
    try {
      let res = await axios.post("/api/getDistributionData", {
        referral: addReferral || localStorage.getItem("referral"),
      });
      const response = res.data;
      setDataToSC(response.data.data.directId);
      setLevelData(response.data.data.levelIncomeId);
      setOpen(false);
      if (response.data.data.binaryIncomeId.length === 0) {
        setBinaryData([1]);
      } else {
        setBinaryData(response.data.data.binaryIncomeId);
      }
    } catch (err) {
      setDisData(true);
      setOpen(false);
    }
  }

  async function checkReferralCode(data) {
    try {
      let res = await axios.post("/api/checkReferralCode", data);
      const response = res.data;

      setTab1(false);
      setTab2(false);
      setTab3(true);
      getDistributionData();
      setReferralCodeError(false);
      addOnBoardingSumbitHandler();
    } catch (err) {
      setReferralCodeError(true);
    }
  }

  async function checkReferralCodeSumbitHandler() {
    if (!addReferral) {
      toast.error("Please Provide the Referral Code to Continue");
      return;
    }

    const data = {
      referral: addReferral,
    };

    checkReferralCode(data);
  }

  async function addOnBoarding(data) {
    try {
      let res = await axios.post("/api/addOnBoarding", data);
      const response = res.data;
      console.log(response.data, "addOnBoarding");

      formSubmitHandler();
    } catch (err) {}
  }

  async function addOnBoardingSumbitHandler() {
    const data = {
      address: getAddress,
      referral: addReferral,
    };

    addOnBoarding(data);
  }

  return (
    <section class="linkstarted-tabs">
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
      <div class="container">
        <div class="tabs-main">
          <ul class="nav nav-pills" id="pills-tab" role="tablist">
            {/* <li class="nav-item" role="presentation">
              <button
                class={tab1 ? "nav-link active imp-btn" : "nav-link imp-btn"}
                id="pills-home-tab"
                // data-bs-toggle="pill"
                // data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                {tab1 == false ? <i class="bi bi-check2"></i> : 1}
              </button>
            </li> */}
            <li class="nav-item" role="presentation">
              <button
                class={tab2 ? "nav-link active imp-btn" : "nav-link imp-btn"}
                id="pills-profile-tab"
                // data-bs-toggle="pill"
                // data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                {tab1 == false && tab2 == false ? (
                  <i class="bi bi-check2"></i>
                ) : (
                  1
                )}
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class={tab3 ? "nav-link active imp-btn" : "nav-link imp-btn"}
                id="pills-contact-tab"
                // data-bs-toggle="pill"
                // data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                2
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class={tab1 ? "tab-pane fade show active" : "tab-pane fade"}
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabindex="0"
            >
              <div class="Recognized-box">
                <div class="Recognized-head">
                  <h2>
                    Recognized <span> Successfully !</span>
                  </h2>
                  <p>The wallet is now linked to the following person.</p>
                </div>
                {/* <div id="face-identify">
                  <img src={getImage} alt="" />
                  <p>{getAddress}</p>
                </div> */}
                <div className="face-table-head">
                  <p style={{ textAlign: "center" }}> YOUR OTHER ACCOUNTS </p>
                  <div id="face-table">
                    <table
                      class="table table-dark table-striped"
                      id="facemain-table"
                      section
                    >
                      <thead>
                        <tr>
                          <th class="face-head">Wallet Addresses</th>
                          <th class="face-head">Reference wallet</th>
                          <th class="face-head">Activated On</th>
                        </tr>
                      </thead>
                      {dataa?.map((item, id) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{item?.address}</td>
                              <td>{item?.referral}</td>
                              <td>
                                {new Date(item?.createdAt)
                                  .toLocaleString()
                                  .slice(0, -3)}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  </div>
                </div>
                <div class="human-button">
                  <button onClick={nextFn1} class="open-camera">
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div
              class={tab2 ? "tab-pane fade show active" : "tab-pane fade"}
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabindex="0"
            >
              <div class="refrence-box">
                <div class="refrence-head">
                  <h2>
                    Reference <span>Details</span>
                  </h2>
                  <p>
                    Here, you need to provide the details of the person who
                    invited you to this community.
                  </p>
                </div>
                <div class="refrence-image">
                  <img src="/handshake_big.png" alt="" />
                </div>
                <div class="refrence-text">
                  <div class="mb-3" id="refrence-input">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter wallet address / reference code"
                      onChange={(e) => setAddReferral(e.target.value)}
                    />
                  </div>
                </div>
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {referralCodeError && "Invalid Referral Code"}
                </p>
                {/* <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {voilationError &&
                    "Policy Voilation has been detected (Terms of Use p.5.2). You Cannot Join with this referrence because you .already have other accounts and you can join only under them"}
                </p> */}

                <div class="refrence-button">
                  <button
                    type="button"
                    onClick={nextFn2}
                    class="next"
                    style={{ cursor: "pointer" }}
                  >
                    Validate
                  </button>
                </div>
              </div>
            </div>
            <div
              class={tab3 ? "tab-pane fade show  active" : "tab-pane fade"}
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
              tabindex="0"
            >
              <div class="make-box">
                <div class="make-head">
                  <h2>
                    Make <span>Transaction</span>
                  </h2>
                  <p>
                    To join this community you need to make a transaction of{" "}
                    <span>{parseFloat(a).toFixed(5)}</span> P2PBIT.
                  </p>
                </div>
                <div class="make-image">
                  <img src="/hand_carryimg_p2p_big.png" alt="" />
                </div>
                <div class="make-text">
                  <p>
                    Let it be a cause of happiness and see how it becomes
                    beneficial for you.
                  </p>
                </div>
                <div class="make-button">
                  {amount ? (
                    <button
                      type="button"
                      class="btn btn-primary make-proceed"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      // onClick={write}
                      onClick={() => writeFunction()}
                    >
                      Proceed
                    </button>
                  ) : (
                    <Approve setAmount={setAmount} props={p2pCalculatedPrice} />
                  )}
                  <div
                    class="modal fade tabs-modals"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog transaction-dialog"
                      id="connect-dialog"
                    >
                      <div
                        class="modal-content spinner-content"
                        id="connect-content"
                      >
                        <div class="modal-body " id="connect-body">
                          <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          <h5>Transaction processing...</h5>
                          <p>
                            This may take some time. Please don't refresh, close
                            or change the screen. And don't press the back
                            button.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {disdata ? (
                  <p
                    style={{
                      color: "white",
                      marginTop: "10px",
                      alignItems: "center",
                    }}
                  >
                    Something went wrong
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
