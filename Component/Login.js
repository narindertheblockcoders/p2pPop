import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { CustomizeConnectButton } from "../Component/ui/ConnectButton";
import { useAccount, useNetwork, useSwitchNetwork, useDisconnect } from "wagmi";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import dynamic from "next/dynamic";
import Carousel from "../Component/ui/Carousel";
import WorksCarousel from "./ui/WorksCarousel";
import ChooseCarousle from "./ui/ChooseCarousle";
import RewardCarousle from "./ui/RewardCarousel";
import { ToastContainer } from "react-bootstrap";
import { Modal as Modal2 } from "@nextui-org/react";
import { ethers } from "ethers";

let signer; // Declare signer variable

function Login() {
  console.log("double")
  // const dataFetchedRef = useRef(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show01, setShow01] = useState(false);
  const [show04, setShow04] = useState(false);
  const [message, setMessage] = useState();
  const [p2ptotrx, setP2pToTrx] = useState();
  const [p2ptoUsdt, setP2ptoUsdt] = useState();
  const [step, setStep] = useState();
  const [referral, setReferral] = useState();
  const [key, setKey] = useState();
  const [open, setOpen] = useState(false);
  const [tx, setTx] = useState(false);

  const [code1, setCode1] = useState();
  const [code2, setCode2] = useState();
  const [code3, setCode3] = useState();
  const [code4, setCode4] = useState();
  const [code5, setCode5] = useState();
  const [code6, setCode6] = useState();
  const num1 = useRef();
  const num2 = useRef();
  const num3 = useRef();
  const num4 = useRef();
  const num5 = useRef();
  const num6 = useRef();
  const num7 = useRef();
  const [codeError, setCodeError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [faStatus, setFaStatus] = useState();
  const [show02, setShow02] = useState(false);

  const { disconnect } = useDisconnect({
    onSuccess(data) {},
  });

  const { address } = useAccount();

  const { chain } = useNetwork();

  const router = useRouter();

  const signMessage = async (message) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner(); // Assign value to the signer variable
    } else {
      console.error("Ethereum provider not found");
    }
    const hash = ethers.utils.hashMessage(ethers.utils.toUtf8Bytes(message));
    const signature = await signer.signMessage(hash); // Use the signer variable to sign the message
    console.log(signature, "signature");
    if(signature){
      formSubmitHandler()
    }else{
      setShow04(true);
    }
    
  };

  const handleSignMessage = async () => {
    try {
      const message = "Hello, World!";
      await signMessage(message); // Call the signMessage function
      await formSubmitHandler();
      return;
    } catch (error) {
      console.error("Error signing message:", error);
      setShow04(true);
    }
  };

  const contractAddress = "TJ9TxoG9xwtLfDgoRPQnt11EwSUGQvWeff";

  async function verifyQrCode(data) {
    setOpen(true);
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/loginVerifyFa", data);
      const response = res.data;
      router.push("/dashboard");
    } catch (err) {
      setCodeError(true);
      setOpen(false);
    }
  }

  async function verifySubmitHandler(fullCode) {
    setOpen(true);
    console.log(address, "to send to api");
    console.log(fullCode,"fullCode")
    const data = {
      otp: fullCode,
      address: address,
    };
    console.log(data, "to send to api ");
    verifyQrCode(data);
  }

  function handleChangeFn1(e) {
    setCode1(e.target.value);
    num2.current.focus();
    const fullCode = `${e.target.value}${code2}${code3}${code4}${code5}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn2(e) {
    setCode2(e.target.value);
    num3.current.focus();
    const fullCode = `${code1}${e.target.value}${code3}${code4}${code5}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn3(e) {
    setCode3(e.target.value);
    num4.current.focus();
    const fullCode = `${code1}${code2}${e.target.value}${code4}${code5}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn4(e) {
    setCode4(e.target.value);
    num5.current.focus();
    const fullCode = `${code1}${code2}${code3}${e.target.value}${code5}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn5(e) {
    setCode5(e.target.value);
    num6.current.focus();
    
    const fullCode = `${code1}${code2}${code3}${code4}${e.target.value}${code6}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }

  function handleChangeFn6(e) {
    setCode6(e.target.value);
    num6.current.blur()
    const fullCode = `${code1}${code2}${code3}${code4}${code5}${e.target.value}`;
    if (e.target.value != NaN) {
      setCodeError(false);
    }
    if (fullCode.length === 6) {
      setLengthError(false);
      verifySubmitHandler(fullCode);
    } else {
      setLengthError(true);
    }
  }



  async function read() {
    if (
      typeof window !== "undefined" &&
      window.tronWeb &&
      window.tronWeb.ready
    ) {
      const tronWeb = window?.tronWeb;
      if (tronWeb.defaultAddress && tronWeb.defaultAddress.base58) {
        const address = tronWeb?.defaultAddress?.base58;
        console.log(address, "address");
        const tronContract = await tronWeb?.contract()?.at(contractAddress);
        const tx = await tronContract?.requested(address).call();
        if (tx == true) {
          setTx(true);
        } else {
          setTx(false);
        }
      }
    }
  }

  useEffect(() => {
    read();
  }, []);

  useEffect(() => {

    setTimeout(() => {
      try {
        if (address) {
          localStorage.setItem("address", address);
          handleSignMessage();
          return;
        }
       
      } catch (err) {}
      
    }, 100);
  }, [address, faStatus]);

  async function createAccount() {
    if (chain?.id == 137) {
      50 % router.push("/getStarted");
    } else {
      await switchNetwork?.(137);
    }
  }

  async function walletCheck(data) {
    setOpen(true);
    try {
      let res = await axios.post("/api/login/walletCheck", data);
      const response = res.data;
      console.log(
        response.data.data.fa,
        "to get response from api to get fa status"
      );
      setFaStatus(response.data.data.fa);
      onBoardingSumbitHandler();
      localStorage.setItem("step", response.data.data.action);
      localStorage.setItem("key", response.data.data.key);
      localStorage.setItem("referral", response.data.data.referral);
      setStep(response.data.data.action);

      const tokenData = response.data.data.token;
      localStorage.setItem("token", tokenData);

      const message = response.data.message;
      setMessage(response.data.message);

      if (response.data.data.id && response.data.data.key && response.data.data.proof ) {
        setOpen(true);
        router.push("/swapping1");
        return;
      }

      if (message == "1") {
        setShow3(false);
        setShow2(false);
        setShow(true);
        setShow4(false);
        setShow02(false);
      }
      if (message == "2") {
        setShow2(false);
        setShow(false);
        setShow3(true);
        setShow4(false);
        setShow02(false);
      }
      if (message == "3" && faStatus == 0) {
        setShow(false);
        setShow2(true);
        setShow3(false);
        setShow4(false);
        setShow02(false);
      }
      if (message == "3" && faStatus == 1) {
        setShow(false);
        setShow2(false);
        setShow3(false);
        setShow4(false);
        setShow02(true);
      }

      if (message == "4") {
        setShow3(false);
        setShow2(false);
        setShow(false);
        setShow4(true);
        setShow02(false);
      }
      setOpen(false);
    } catch (err) {
      setOpen(false);
    }
  }
  async function formSubmitHandler() {
    if (!address) {
      return;
    }
    const data = {
      address: address,
    };

    walletCheck(data);
  }

  async function onBoarding(data) {
    try {
      let res = await axios.post("/api/addOnBoarding", data);
      const response = res.data;
      console.log(response.data,"addOnBoarding")
    } catch (err) {}
  }

  async function onBoardingSumbitHandler() {
    const data = {
      address: localStorage.getItem("address"),
    };

    onBoarding(data);
  }

  async function backFn() {
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    window.location.href = "/";
    window.localStorage.clear();
    disconnect();
  }

  async function stepFn(event) {
    event.preventDefault();

    if (step == 1) {
      router.push("/tabs");
    }
    if (step == 2) {
      router.push("/tabsLink");
    }
    if (step == 3) {
      router.push("/tabsLink");
    }
  }

  async function modalClose(e) {
    e.preventDefault();
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    disconnect();
  }

  // async function getFaceStatus(data) {
  //   try {
  //     let res = await axios.post("/api/getFaceStatus", data);
  //     const response = res.data;

  //     if (response.data.data.status == "true") {
  //       router.push("/OpenCameraForUpdate");
  //     } else {
  //       router.push("/dashboard");
  //     }
  //   } catch (err) {}
  // }

  // async function getFaceStatusHandler() {
  //   const data = {
  //     address: address,
  //   };
  //   getFaceStatus(data);
  // }

  async function gotoMigratePage() {
    setOpen(true);
    console.log("first");
    if (
      typeof window !== "undefined" &&
      window.tronWeb &&
      window.tronWeb.ready
    ) {
      const tronWeb = window?.tronWeb;
      const address = tronWeb?.defaultAddress?.base58;
      router.push("/swapping");
    } else {
      setShow01(true);
      setOpen(false);
      return;
    }
  }

  async function okSubmitHandler() {
    setShow01(false);
  }

  console.log(faStatus, message, "fa&message");

  async function closeHandler() {
    setOpen(true);
    window.localStorage.clear();
    window.location.reload(false);
    setShow02(false);
    return;
  }

  return (
    <div>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="abcsdsd">
        <ToastContainer />
        <section class="p2p-hero">
          <div class="container">
            <div class="p2p-herobox">
              <nav class="navbar navbar-dark fixed-top" id="p2p-nav">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#">
                    {" "}
                    <img src="/p2p.help_logo-01.svg" alt="" />
                  </a>
                </div>
              </nav>

              <div class="p2p-home">
                <div class="denet">
                  <h2>Welcome to DeNet</h2>
                  <p>A NEW AGE OF NETWORK MARKETING</p>
                  <CustomizeConnectButton />
                  {!tx ? (
                    <button
                      className="connect-wallet"
                      onClick={() => gotoMigratePage()}
                    >
                      Migrate Data
                    </button>
                  ) : null}

                  {/* create Account Modal */}
                  <Modal
                    show={show}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <div className="modal-content" id="connect-content">
                      <div className="modal-body" id="connect-body">
                        <div className="connect-icon">
                          <img src="/tronNew.png" alt="" />
                        </div>
                        <p className="p2p-email" style={{ color: "white" }}>
                          {address}
                        </p>
                        <h6 style={{ textAlign: "center" }}>Hi There !</h6>
                        <div className="create-some">
                          <p className="some-text">
                            This wallet is not linked with any account if you
                            wish please create a new one
                          </p>
                        </div>
                      </div>
                      <div className="modal-footer" id="connect-footer">
                        {/* <a href="/getStarted"> */}
                        <button
                          type="button"
                          className="connect-wallet"
                          onClick={createAccount}
                        >
                          Create Account
                        </button>
                        {/* </a> */}
                      </div>
                    </div>
                  </Modal>

                  {/* Go to Dashboard */}
                  <Modal
                    show={show2}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <div className="modal-content" id="connect-content">
                      <div className="close-div">
                        <img
                          onClick={(e) => modalClose(e)}
                          className="modal-close"
                          src="/close.png"
                          alt=""
                        />
                      </div>
                      <div className="modal-body" id="connect-body">
                        <div className="connect-icon">
                          <img src="/tronNew.png" alt="" />
                        </div>
                        <p className="p2p-email" style={{ color: "white" }}>
                          {address}
                        </p>
                        <h6 style={{ textAlign: "center" }}>Hi There !</h6>
                        <div className="create-some">
                          <p className="some-text">
                            This wallet is linked with an account.
                            <br />
                            Click below to access the account.
                          </p>
                        </div>
                      </div>
                      <div className="modal-footer" id="connect-footer">
                        <Link href="/dashboard">
                        <button
                          type="button"
                          // onClick={() => getFaceStatusHandler()}
                          className="connect-wallet"
                        >
                          Go to Dashboard
                        </button>
                        </Link>
                      </div>
                    </div>
                  </Modal>

                  {/* cannot be accessed */}
                  <Modal
                    show={show3}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <div className="modal-content" id="connect-content">
                      <div className="close-div">
                        <img
                          onClick={(e) => modalClose(e)}
                          className="modal-close"
                          src="/close.png"
                          alt=""
                        />
                      </div>
                      <div className="modal-body" id="connect-body">
                        <div className="connect-icon">
                          <img src="/tronNew.png" alt="" />
                        </div>
                        <p className="p2p-email" style={{ color: "white" }}>
                          {address}
                        </p>
                        <h6 style={{ textAlign: "center" }}>Hi There !</h6>
                        <div className="create-some">
                          <p className="some-text">
                            This wallet cannot be accessed because
                            <br />
                            it was previously linked an account <br />
                            Please use another account
                          </p>
                        </div>
                      </div>
                      <div className="modal-footer" id="connect-footer">
                        {/* <Link href="/dashboard"> */}
                        <button
                          type="button"
                          // onClick={backFn}
                          className="connect-wallet"
                          onClick={backFn}
                        >
                          Back
                        </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </Modal>

                  {/* Resume Whre u left */}
                  <Modal
                    show={show4}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="create-modal"
                  >
                    <div className="modal-content" id="connect-content">
                      <div className="close-div">
                        <img
                          onClick={(e) => modalClose(e)}
                          className="modal-close"
                          src="/close.png"
                          alt=""
                        />
                      </div>
                      <div className="modal-body" id="connect-body">
                        <div className="connect-icon">
                          <img src="/tronNew.png" alt="" />
                        </div>
                        <p className="p2p-email" style={{ color: "white" }}>
                          {address}
                        </p>
                        <h6 style={{ textAlign: "center" }}>Hi There !</h6>
                        <div className="create-some">
                          <p className="some-text" id="some-text">
                            This wallet already exist but couldnot complete the
                            process before you can resume where you left .
                          </p>
                        </div>
                      </div>
                      <div className="modal-footer" id="connect-footer">
                        {/* <Link href="/tabs> */}
                        <button
                          type="button"
                          onClick={stepFn}
                          className="connect-wallet"
                        >
                          Resume
                        </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </Modal>

                  {/* Footer */}
                  <div class="p2p-mouse">
                    <a class="mouse-scroll" href="#">
                      <span class="mouse">
                        <span class="mouse-movement"></span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="p2p-denet">
          <div class="container-fluid">
            <div class="p2pdenet-head">
              <h2>
                What is <span>DeNet</span>
              </h2>
            </div>
            <div class="p2pdenet-text">
              <div class="p2pdenet-left">
                <img src="/What Is DeNet (1).png" alt="" />
              </div>
              <div class="p2pdenet-right">
                <h2>
                  What is <span>DeNet</span>
                </h2>
                <p>
                  Denet or decentralized network is a system where distribution
                  of functions, control and information is not held by a single
                  entity rather it is distributed amongst all the network or
                  structure. Decentralized exchange allows peer to peer
                  transactions directly from your digital wallet without the
                  need to go through an intermediary.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="pattern"></section>

        <section class="p2p-help">
          <div class="container-fluid">
            <div class="p2phelp-head">
              <h2>
                About <span>P2p Help</span>
              </h2>
            </div>
            <div class="p2phelp-text">
              <div class="p2phelp-left">
                <img src="/About P2P Help.png" alt="" />
              </div>
              <div class="p2phelp-right">
                <h2>
                  About <span>P2p Help</span>
                </h2>
                <p>
                  Through P2PHelp, people can meet financial goals by giving and
                  receiving support from their own community no matter where
                  they live in the world.{" "}
                </p>
                <p>
                  What’s better is, when you help someone you also benefit
                  yourself. With this community, you not only get an opportunity
                  to help others, but you also entitle yourself to receive help.
                  Over the ultra-modern platform, this community helps the
                  general masses to improve their lives
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="pattern"></section>

        <section class="choose-us">
          <div class="container">
            <div class="choose-head">
              <h2>
                Why <span>Choose Us</span>
              </h2>
            </div>
            <div class="choose-box">
              <ChooseCarousle />
            </div>
          </div>
        </section>

        <section class="features">
          <div class="container-fluid">
            <div class="feature-head">
              <h2>
                The <span>Features</span>
              </h2>
            </div>
            <p class="feature-text">
              P2P.help is the world's leading decentralized blockchain protocol
            </p>
            <Carousel />
          </div>
        </section>

        <section class="mission">
          <div class="container-fluid">
            <div class="mission-head">
              <h2>
                We are on <span>A Mission</span>
              </h2>
              <p>Ensuring better tomorrow</p>
            </div>
            <div class="mission-main">
              <div class="missionmain-left">
                <img src="/We Are On A Mission.png" alt="" />
              </div>
              <div class="missionmain-right">
                <h2>
                  We Are On <span>A Mission</span>
                </h2>
                <p class="ensuring">Ensuring better tomorrow</p>
                <p>
                  P2PHelp is a community driven project which runs on DAO model
                  where like minded people around the globe can get together and
                  raise funds. It is fully transparent and runs on blockchain
                  technology. It's a community with no centralized leadership
                  and is fully owned by its members.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="donating">
          <div class="container">
            <h2>
              Join <span>Our Community</span>
            </h2>
            <p>
              Let it be a cause of happiness and see how it becomes beneficial
              for you.
            </p>
            <div class="donating-btn">
              <button class="Get-it">Get In</button>
            </div>
          </div>
        </section>

        <section class="work">
          <div class="container-fluid">
            <div class="work-head">
              <h2>
                How it <span>Works</span>
              </h2>
              <p>Be a part of this community by following four simple steps</p>

              <WorksCarousel />
            </div>
          </div>
        </section>

        <section class="pattern "></section>
        <section class="community " id="commuinity-minuse-top">
          <div class="container">
            <div class="community-head">
              <h2>
                Community <span>Reward</span>
              </h2>
              <p>
                There are three types of funding rounds, in which you give and
                receive help namely direct, level and matching.
              </p>
            </div>
            <div class="community-box" id="reward">
              <RewardCarousle />
            </div>
          </div>
        </section>

        <section class="pattern-left"></section>
        <section class="contract">
          <div class="container">
            <div class="contract-head">
              <h2>
                What is <span>P2PBIT</span>
              </h2>
              <p>Currency for our digital future</p>
            </div>
            <div class="contract-main">
              <img src="/What is P2PBIT@2x.png" alt="" />
            </div>
            <div class="contract-button">
              <button class="contract-btn">
                Explore More
                <img src="/right-arrows.png" alt="" />
              </button>
            </div>
          </div>
        </section>

        <section class="frequently">
          <div class="container">
            <div class="frequently-head">
              <h2>
                Frequently <span>Asked Questions</span>
              </h2>
            </div>
            <div class="frequently-box">
              <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                  <h3 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      What is P2p Help
                    </button>
                  </h3>
                  <div
                    id="panelsStayOpen-collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div class="accordion-body">
                      P2PHelp is a platform where people can meet their
                      financial goals by helping each other without the
                      boundaries of nations, it’s all about bringing the right
                      people together to give and receive help from their P2P
                      circle. Here, the fundraisers can invite as many people
                      for help and feel a liberal atmosphere to accomplish one’s
                      needs. P2P Help tries to bring kind hearts together and
                      help the ones who are in dire need.{" "}
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h3 class="accordion-header" id="panelsStayOpen-headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      How To Join?
                    </button>
                  </h3>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingTwo"
                  >
                    <div class="accordion-body">
                      You can join by simply donating $70 worth of P2PBIT Token
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h3 class="accordion-header" id="panelsStayOpen-headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      How To Donate P2P BIT Token?
                    </button>
                  </h3>
                  <div
                    id="panelsStayOpen-collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingThree"
                  >
                    <div class="accordion-body">
                      You have registered an account with us using your Polygon
                      wallet. First, you must connect your wallet second you
                      have to recognize your facial expression, third you have
                      to enter your referral address. Without a referral link or
                      referral address, you cannot join.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h3 class="accordion-header" id="panelsStayOpen-headingfour">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapsefour"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapsefour"
                    >
                      Where Can I Buy P2P BIT Token
                    </button>
                  </h3>
                  <div
                    id="panelsStayOpen-collapsefour"
                    class="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingfour"
                  >
                    <div class="accordion-body" id="asked-questionLink">
                      You need any of Polygon’s wallet or extension with $70 +
                      (Blockchain fee) worth MATIC COIN. Click on{" "}
                      <Link target="_blank" href="https://quickswap.exchange">
                        https://quickswap.exchange
                      </Link>{" "}
                      and on the SWAP section you can convert your MATIC into
                      P2PBIT Token immediately.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="p2p-footer">
          <div class="container">
            <div class="p2pfoot-box">
              <a class="foot-a">
                {" "}
                <img src="/p2p.help_logo-01.svg" alt="" />
              </a>
              <div className="footer-elements">
                <p>
                  Copyright © P2P Help 2019 <span>All rights reserved.</span>
                </p>
                <div className="foot-link">
                  <a class="foot-link1" href="/terms">
                    Terms of Use{" "}
                  </a>{" "}
                  |{" "}
                  <a href="/privacy" class="foot-link1">
                    Privacy Policy
                  </a>{" "}
                  |
                  <a class="foot-link1" href="/cookies">
                    {" "}
                    Use of Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* Required Tron Modal */}
      <div className="tron-swap01">
        <Modal2
          closeButton
          blur
          aria-labelledby="modal-title"
          open={show01}
          className="tron-swap01"
        >
          <Modal2.Body>Use TronLink Wallet to Migrate Data</Modal2.Body>
          <Modal2.Footer>
            <button
              className="connect-wallet"
              type="button"
              onClick={() => okSubmitHandler()}
            >
              ok
            </button>
          </Modal2.Footer>
        </Modal2>
      </div>

      {/* Verification code Popup */}
      <div class="tron-swap">
        <Modal2
          closeButton={false}
          blur
          aria-labelledby="modal-title"
          open={show02}
          class="tron-swap"
        >
          <section class="two-factors1">
            <div class="container">
              <div class="twofactor-content">
                <h4>Verify</h4>
                <h6>Enter the 6-digit code that you see in the app</h6>
                <p style={{ color: "#1F74F2" }}>Enter Code</p>
                <div class="twofactor-code">
                  <div class="mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => handleChangeFn1(e)}
                      ref={num1}
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => handleChangeFn2(e)}
                      ref={num2}
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => handleChangeFn3(e)}
                      ref={num3}
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="exampleFormControlInput1"
                      
                      onChange={(e) => handleChangeFn4(e)}
                      ref={num4}
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => handleChangeFn5(e)}
                      ref={num5}
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => handleChangeFn6(e)}
                      ref={num6}
                      maxLength="1"
                    />
                  </div>
                </div>

                {codeError ? (
                  <p
                    style={{
                      color: "white",
                      marginTop: "10px",
                      alignItems: "center",
                    }}
                  >
                    Invalid Code
                  </p>
                ) : (
                  ""
                )}

                {lengthError ? (
                  <p
                    style={{
                      color: "white",
                      marginTop: "10px",
                      alignItems: "center",
                    }}
                  >
                    Code Should be of 6 digit
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Modal.Footer>
              <button
                id="closeHandler"
                type="submit"
                className="connect-wallet"
                onClick={() => closeHandler()}
              >
                Close
              </button>
            </Modal.Footer>
          </section>
        </Modal2>
      </div>
      {/* authorization watcher modal */}
      <div className="tron-swap01">
        <Modal2
          closeButton={false}
          blur
          aria-labelledby="modal-title"
          open={show04}
          className="tron-swap01"
        >
          <Modal2.Body>
            You are not authorized to Sign in with<strong style={{textTransform:"uppercase"}}> watch only mode</strong>
          </Modal2.Body>
          <Modal2.Footer>
            <button
              className="connect-wallet"
              type="submit"
              onClick={() => closeHandler()}
            >
              OK
            </button>
          </Modal2.Footer>
        </Modal2>
      </div>
    </div>
  );
}
export default dynamic(() => Promise.resolve(Login), { ssr: false });

