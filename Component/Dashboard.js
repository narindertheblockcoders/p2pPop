import $ from "jquery";
import React from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useDisconnect, useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Genealogy from "../pages/genealogy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FirstBarDash from "./FirstBarDash";
import { Tooltip } from "@nextui-org/react";

const Web3 = require("web3");
const rpcURL = "https://polygon-rpc.com";
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

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [faStatus, setFaStatus] = useState();
  const [userData, setUserData] = useState();

  const [getAddress, setGetAddress] = useState();
  const [maticPrice, setmaticPrice] = useState();
  const [p2pPrice, setp2pPrice] = useState();

  const { disconnect } = useDisconnect();

  async function jQueryFunction() {
    $(document).on("click", "ul li", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  }

  async function getUserStatus() {
    setOpen(true);
    try {
      const token = localStorage.getItem("token");

      let res = await axios.post("/api/getUserStatus", {
        token: token,
      });
      const response = res.data;

      setUserData(response.data.data);
      localStorage.setItem("direct", response.data.data.directIncome);
      localStorage.setItem("level", response.data.data.levelIncome);
      localStorage.setItem("matching", response.data.data.matchingIncome);
      const address = response.data.data.userDetail[0]?.address;
      const prefix = address.substring(0, 4);

      const suffix = address.substring(address.length - 4);

      const maskedStr = `${prefix}${"*****"}${suffix}`;
      setGetAddress(maskedStr);

      localStorage.setItem("getAddress", maskedStr);

      setOpen(false);
    } catch (err) {
      setOpen(false);
    }
  }

  async function getFaStatus() {
    setOpen(true);
    try {
      const token = localStorage.getItem("token");

      let res = await axios.post("/api/getFaStatus", {
        token: token,
      });
      const response = res.data;

      setFaStatus(response.data.data.fa);
      setOpen(false);
    } catch (err) {
      setOpen(false);
    }
  }

  useEffect(() => {
    getUserStatus();
    getFaStatus();
  }, []);

  async function getLivePrice() {
    const quickSwapPairABI = "0x7Bbf85d26B305A030916be29Aa9d754eE0F8bF60";

    let tokenContract = new web3.eth.Contract(
      minABI,
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
    );

    const balance = await tokenContract.methods
      .balanceOf("0x104f9e229844C4B6DDc0456147D0F6Fdc9d65A8d")
      .call();

    // const price = token1Amount / token0Amount;

    const wmatic = balance * 1e18;

    let p2pContract = new web3.eth.Contract(
      minABI,
      "0x7Bbf85d26B305A030916be29Aa9d754eE0F8bF60"
    );

    const p2pBalance = await p2pContract.methods
      .balanceOf("0x104f9e229844C4B6DDc0456147D0F6Fdc9d65A8d")
      .call();

    // const price = token1Amount / token0Amount;

    const totalBalance = wmatic / 1e18 / (p2pBalance / 1e18);

    setmaticPrice(totalBalance / 1e18);

    let res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
    );
    const response = res.data["matic-network"].usd;

    setp2pPrice(Number(response) * Number(totalBalance / 1e18));
  }

  useEffect(() => {
    jQueryFunction();
    // getTrxToUSDT();
    // getP2pToUSDT();
    // getP2pToTRX();
    getLivePrice();
  }, []);

  const handleDisconnect = async () => {
    window.location.href = "/";
    window.localStorage.clear();
    disconnect();
  };

  return (
    <>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section class="dashboard">
        <div class="dashboard-left">
          <div class="dash-navhead">
            <a class="dashnav-a">
              {" "}
              <img src="/p2p.help_logo-01.svg" />
            </a>
          </div>
          <div class="dash-dasd">
            <div class="dash-navmid">
              <ul>
                <li className="nav-link active">
                  <a href="/dashboard">
                    {" "}
                    <svg
                      id="Dashboard"
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.992"
                      height="24"
                      viewBox="0 0 23.992 24"
                    >
                      <g
                        id="Group_17237"
                        data-name="Group 17237"
                        transform="translate(0 0)"
                      >
                        <path
                          id="Path_10905"
                          data-name="Path 10905"
                          d="M5.449,2.1q1.093,0,2.184.014A2.063,2.063,0,0,1,9.7,4.179c.02,1.4.022,2.869,0,4.356a2.047,2.047,0,0,1-2.087,2.073q-1.067.011-2.135.011-1.091,0-2.179-.011a2.063,2.063,0,0,1-2.1-2.113c0-.319,0-.638,0-.958h.023v-1.2c0-.264,0-.528-.011-.792A14.443,14.443,0,0,1,1.235,3.99a2.01,2.01,0,0,1,2.04-1.878Q4.362,2.1,5.449,2.1m0-1.2q-1.1,0-2.191.014A3.21,3.21,0,0,0,.039,3.888C-.03,4.7.027,5.52.027,6.337H.006c0,.722-.006,1.446,0,2.169a3.269,3.269,0,0,0,3.283,3.3q1.1.011,2.191.011,1.073,0,2.148-.011A3.256,3.256,0,0,0,10.9,8.551q.031-2.194,0-4.391A3.251,3.251,0,0,0,7.649.912Q6.549.9,5.449.9"
                          transform="translate(0.001 -0.898)"
                          fill="#ccd0db"
                        />
                        <path
                          id="Path_10906"
                          data-name="Path 10906"
                          d="M16.431,2.1q1.037,0,2.072.01A2.045,2.045,0,0,1,20.6,4.178c.022,1.392.023,2.817,0,4.355a2.047,2.047,0,0,1-2.084,2.076q-1.06.011-2.119.011-1.1,0-2.195-.011A2.063,2.063,0,0,1,12.1,8.5c0-.319,0-.638,0-.958h.023v-1.2c0-.263-.006-.527-.012-.791a14.755,14.755,0,0,1,.019-1.555A2.027,2.027,0,0,1,14.21,2.11Q15.32,2.1,16.431,2.1m0-1.2Q15.317.9,14.2.91a3.218,3.218,0,0,0-3.269,2.981c-.07.81-.012,1.632-.012,2.448H10.9c0,.724-.006,1.447,0,2.169a3.269,3.269,0,0,0,3.285,3.3q1.1.011,2.207.011,1.066,0,2.132-.011A3.256,3.256,0,0,0,21.8,8.549q.031-2.194,0-4.391A3.254,3.254,0,0,0,18.515.912Q17.473.9,16.431.9"
                          transform="translate(2.179 -0.897)"
                          fill="#ccd0db"
                        />
                        <path
                          id="Path_10907"
                          data-name="Path 10907"
                          d="M5.455,13q1.08,0,2.16.011a2.061,2.061,0,0,1,2.091,2.1c0,.32.006.642.006.962H9.686v1.188c0,.266.006.533.012.8a15.2,15.2,0,0,1-.019,1.578A2.005,2.005,0,0,1,7.636,21.5q-1.1.014-2.2.016-1.078,0-2.156-.016a2.069,2.069,0,0,1-2.07-2.089c-.013-1.426-.013-2.877,0-4.317A2.049,2.049,0,0,1,3.3,13.007Q4.378,13,5.455,13m0-1.2q-1.084,0-2.167.011A3.259,3.259,0,0,0,.01,15.085q-.02,2.169,0,4.339A3.258,3.258,0,0,0,3.263,22.7q1.085.014,2.173.016,1.109,0,2.216-.016a3.211,3.211,0,0,0,3.223-2.973c.067-.82.011-1.649.011-2.474h.023c0-.722.008-1.446,0-2.169a3.266,3.266,0,0,0-3.279-3.278Q6.542,11.8,5.455,11.8"
                          transform="translate(0 1.281)"
                          fill="#ccd0db"
                        />
                        <path
                          id="Path_10908"
                          data-name="Path 10908"
                          d="M16.37,13q1.066,0,2.13.01a2.065,2.065,0,0,1,2.1,2.108c0,.323,0,.644,0,.967h-.024V17.27c0,.263.006.526.011.79a15.172,15.172,0,0,1-.018,1.559A2.009,2.009,0,0,1,18.54,21.5q-1.111.018-2.221.018-1.078,0-2.156-.018A2.047,2.047,0,0,1,12.1,19.4q-.016-2.147,0-4.295a2.058,2.058,0,0,1,2.1-2.1Q15.289,13,16.37,13m0-1.2q-1.087,0-2.173.008A3.264,3.264,0,0,0,10.9,15.1q-.018,2.156,0,4.314A3.257,3.257,0,0,0,14.142,22.7q1.089.018,2.177.018,1.12,0,2.239-.018a3.209,3.209,0,0,0,3.212-2.983c.068-.811.012-1.632.012-2.448h.02c0-.722.008-1.446,0-2.169a3.268,3.268,0,0,0-3.291-3.293q-1.069-.011-2.139-.01"
                          transform="translate(2.179 1.281)"
                          fill="#ccd0db"
                        />
                      </g>
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li className="nav-link">
                  <a href="/mainGenealogy">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.903"
                      height="24"
                      viewBox="0 0 23.903 24"
                    >
                      <path
                        id="Path_10932"
                        data-name="Path 10932"
                        d="M35.243,1h-.008a5.161,5.161,0,0,0-5.08,4.362,4.965,4.965,0,0,0,.731,3.5,5.138,5.138,0,0,0,3.636,2.37l.1.017v9.247l-1.81-1.408.05-.091a5.138,5.138,0,0,0-8.381-5.882,5.117,5.117,0,0,0,.07,6.678,5,5,0,0,0,3.118,1.7,5.58,5.58,0,0,0,.783.057,5.129,5.129,0,0,0,3.556-1.462l.075-.069.56.434c.625.487,1.245.968,1.864,1.453a.348.348,0,0,1,.13.247c0,.4,0,.794,0,1.2v.476H33.06c-.276,0-.553,0-.829,0a.588.588,0,0,0-.258,1.13.778.778,0,0,1,.075.046h6.344a.125.125,0,0,1,.028-.019.6.6,0,0,0-.284-1.158H35.82V23.3c0-.362,0-.71.008-1.058a.546.546,0,0,1,.185-.379c.585-.465,1.177-.925,1.768-1.384l.358-.278c.039-.03.081-.057.121-.084l.131-.086.07.065a5.257,5.257,0,0,0,3.607,1.444,5.075,5.075,0,0,0,3.589-1.478A5.134,5.134,0,1,0,37.6,18.995l.05.091L35.828,20.5V11.243l.1-.016a5.112,5.112,0,0,0,3.4-2.006,5.02,5.02,0,0,0,.984-3.836A5.13,5.13,0,0,0,35.243,1m-.012,9.091a3.956,3.956,0,0,1,0-7.913h.007a3.963,3.963,0,0,1,3.944,3.975,3.961,3.961,0,0,1-3.956,3.938m6.815,10.275a3.956,3.956,0,0,1,.01-7.913h.011a3.963,3.963,0,0,1,3.939,3.978,3.962,3.962,0,0,1-3.958,3.935Zm-13.636,0a3.956,3.956,0,0,1,.008-7.913h.011a3.963,3.963,0,0,1,3.941,3.978,3.962,3.962,0,0,1-3.958,3.935Z"
                        transform="translate(-23.277 -1.001)"
                        fill="#ccd0db"
                      />
                    </svg>{" "}
                    Genealogy
                  </a>
                </li>
                <li className="nav-link">
                  <div
                    class="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header reward-header">
                        <button
                          class="accordion-button collapsed dash_drop"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24.001"
                            viewBox="0 0 24 24.001"
                          >
                            <g
                              id="Group_17236"
                              data-name="Group 17236"
                              transform="translate(-1254.228 2273.334)"
                            >
                              <path
                                id="Path_10918"
                                data-name="Path 10918"
                                d="M54.336,18.591c.105-.644.232-1.4.351-2.157.215-1.357.318-1-.6-1.951q-.668-.691-1.349-1.37a1.5,1.5,0,0,1,.924-2.613c.83-.112,1.659-.253,2.489-.369a.636.636,0,0,0,.529-.4c.389-.834.793-1.66,1.18-2.494a1.4,1.4,0,0,1,2.62,0c.383.826.786,1.643,1.169,2.469a.671.671,0,0,0,.569.425c.885.122,1.767.265,2.648.405a1.37,1.37,0,0,1,1.158.973,1.414,1.414,0,0,1-.334,1.5q-.945.989-1.92,1.949a.8.8,0,0,0-.243.78q.241,1.359.454,2.723a1.428,1.428,0,0,1-.594,1.474,1.359,1.359,0,0,1-1.554.036c-.772-.429-1.553-.844-2.323-1.277a.628.628,0,0,0-.683,0c-.794.446-1.591.887-2.4,1.312a1.426,1.426,0,0,1-2.089-1.424m.924.068c-.014.5.357.741.761.523.794-.427,1.588-.855,2.375-1.3a1.464,1.464,0,0,1,1.541,0c.763.427,1.535.841,2.3,1.264.2.11.393.2.605.047a.587.587,0,0,0,.217-.627c-.149-.9-.29-1.8-.451-2.7a1.611,1.611,0,0,1,.473-1.529c.63-.622,1.244-1.26,1.867-1.889a.6.6,0,0,0,.2-.656.561.561,0,0,0-.522-.365c-.847-.128-1.693-.268-2.543-.382a1.5,1.5,0,0,1-1.251-.906c-.389-.833-.79-1.661-1.181-2.494-.1-.219-.232-.4-.5-.39s-.372.182-.469.39c-.39.834-.791,1.661-1.18,2.5a1.493,1.493,0,0,1-1.224.9c-.858.119-1.714.254-2.57.383-.357.054-.566.228-.545.522a.87.87,0,0,0,.223.493c.622.656,1.26,1.3,1.9,1.936a1.545,1.545,0,0,1,.454,1.384c-.035.25-.083.5-.125.748-.121.729-.242,1.459-.354,2.146"
                                transform="translate(1207.058 -2275.178)"
                                fill="#ccd0db"
                              />
                              <path
                                id="Path_10919"
                                data-name="Path 10919"
                                d="M60.634,4.666a11.889,11.889,0,0,1,11.432,9.6,11.662,11.662,0,0,1-.965,7.654c-.211.437-.507.583-.842.423s-.393-.478-.183-.922a10.855,10.855,0,0,0-16-13.631c-.091.065-.178.135-.274.192a.568.568,0,0,1-.8-.139.537.537,0,0,1,.156-.79,20.01,20.01,0,0,1,1.937-1.181,11.869,11.869,0,0,1,5.54-1.2"
                                transform="translate(1205.902 -2278)"
                                fill="#ccd0db"
                              />
                              <path
                                id="Path_10920"
                                data-name="Path 10920"
                                d="M62.131,26.052A12.017,12.017,0,0,1,51.448,8.768c.132-.271.309-.473.638-.442a.575.575,0,0,1,.418.888,11.418,11.418,0,0,0-.943,2.81A10.836,10.836,0,0,0,59.61,24.576a10.674,10.674,0,0,0,8.914-1.692,1.526,1.526,0,0,1,.5-.247.486.486,0,0,1,.555.281.527.527,0,0,1-.06.624,1.377,1.377,0,0,1-.252.216,12.361,12.361,0,0,1-7.131,2.294"
                                transform="translate(1204 -2275.389)"
                                fill="#ccd0db"
                              />
                            </g>
                          </svg>{" "}
                          Rewards
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body reward-body">
                          <ul>
                            <li>
                              <Link href="/direct" class="reward-a">
                                Direct
                              </Link>
                            </li>
                            <li>
                              <Link href="/level" class="reward-a">
                                Level
                              </Link>
                            </li>
                            <li>
                              <Link href="/matching" class="reward-a">
                                Matching
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                {/* staking disable */}
                <li className="nav-link">
                  <div
                    class="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header reward-header">
                        <button
                          class="accordion-button collapsed dash_drop"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapsefour"
                          aria-expanded="false"
                          aria-controls="flush-collapsefour"
                          id="svg-color"
                        >
                          <svg
                            width="24"
                            height="24.001"
                            viewBox="0 0 101 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M93.328 70.6788C93.139 65.3018 91.463 58.8238 88.611 52.4388C85.759 46.0478 82.054 40.4738 78.178 36.7438C74.01 32.7318 70.023 31.2628 66.937 32.5928C66.912 32.6028 66.886 32.6068 66.861 32.6178L63.241 34.2348V25.7428C63.241 25.7308 63.243 25.7188 63.243 25.7068C63.243 18.9898 51.653 13.9248 36.283 13.9248C20.945 13.9248 9.373 18.9698 9.325 25.6658C9.325 25.6798 9.321 25.6928 9.321 25.7078V40.8878C9.321 40.9678 9.332 41.0458 9.345 41.1218C9.332 41.1988 9.321 41.2758 9.321 41.3558C9.321 41.4928 9.333 41.6268 9.343 41.7618C9.332 41.8338 9.321 41.9048 9.321 41.9798V57.1598C9.321 57.2408 9.332 57.3188 9.345 57.3958C9.332 57.4728 9.321 57.5508 9.321 57.6318C9.321 57.8028 9.334 57.9718 9.348 58.1398C9.331 58.2278 9.321 58.3188 9.321 58.4118V73.5918C9.321 73.6718 9.332 73.7498 9.345 73.8258C9.332 73.9028 9.321 73.9798 9.321 74.0598C9.321 80.7758 20.913 85.8398 36.285 85.8398C46.05 85.8398 54.949 83.6118 59.633 80.0898C63.825 85.5318 68.335 88.7398 72.112 88.7398C72.973 88.7398 73.798 88.5738 74.57 88.2288L88.805 81.8698C88.819 81.8638 88.834 81.8598 88.848 81.8538C91.943 80.4728 93.534 76.5038 93.328 70.6788ZM53.006 38.8068L52.574 38.9968C49.601 40.3258 48.099 43.9898 48.049 49.0088C44.459 49.7938 40.435 50.2268 36.286 50.2268C22.108 50.2268 12.228 45.5518 12.228 41.3548C12.228 41.2748 12.217 41.1968 12.204 41.1208C12.217 41.0438 12.228 40.9668 12.228 40.8868V31.1938C16.596 34.9968 25.508 37.4888 36.284 37.4888C47.057 37.4888 55.966 34.9988 60.336 31.1968V35.5328L53.006 38.8068ZM12.204 57.3958C12.217 57.3188 12.228 57.2408 12.228 57.1598V46.8418C16.598 50.6428 25.51 53.1338 36.286 53.1338C40.444 53.1338 44.515 52.7348 48.176 51.9768C48.511 55.6678 49.5 59.8868 51.147 64.3448C46.739 65.7718 41.752 66.5028 36.286 66.5028C22.108 66.5028 12.228 61.8278 12.228 57.6328C12.228 57.5508 12.217 57.4728 12.204 57.3958ZM36.284 16.8308C50.447 16.8308 60.319 21.4998 60.337 25.6958C60.337 25.6998 60.336 25.7028 60.336 25.7068V25.7338C60.294 29.9248 50.429 34.5828 36.284 34.5828C22.108 34.5828 12.23 29.9048 12.23 25.7068C12.23 21.5088 22.108 16.8308 36.284 16.8308ZM36.286 82.9348C22.108 82.9348 12.228 78.2578 12.228 74.0608C12.228 73.9808 12.217 73.9028 12.204 73.8268C12.217 73.7498 12.228 73.6728 12.228 73.5928V63.1178C16.598 66.9188 25.51 69.4088 36.286 69.4088C42.128 69.4088 47.474 68.6098 52.215 67.0508C52.406 67.5058 52.603 67.9628 52.808 68.4208C54.362 71.8988 56.109 75.0238 57.946 77.7368C53.85 80.8738 45.386 82.9348 36.286 82.9348ZM73.783 85.3938L73.372 85.5828C69.533 87.2868 61.242 80.1748 55.461 67.2348C49.686 54.2908 49.93 43.3618 53.754 41.6528L63.055 37.4998C62.529 39.2368 62.294 41.3498 62.381 43.7948C62.57 49.1708 64.246 55.6508 67.099 62.0418C69.951 68.4298 73.656 74.0008 77.532 77.7308C79.299 79.4298 81.029 80.6558 82.676 81.4238L73.783 85.3938ZM87.669 79.1978C87.667 79.1988 87.664 79.1988 87.662 79.1998L87.652 79.2038C85.738 80.0498 82.782 78.7508 79.547 75.6368C75.934 72.1598 72.455 66.9108 69.753 60.8568C67.049 54.7998 65.462 48.7048 65.285 43.6928C65.127 39.1948 66.135 36.1268 68.051 35.2728C68.438 35.1008 68.865 35.0158 69.329 35.0158C71.169 35.0158 73.575 36.3468 76.163 38.8368C79.776 42.3138 83.254 47.5648 85.957 53.6228C88.661 59.6748 90.247 65.7688 90.424 70.7808C90.583 75.2728 89.578 78.3398 87.669 79.1978Z"
                              fill="#C0C4CE"
                              stroke="#C0C4CE"
                              stroke-width="2.2"
                              id="id_101"
                            ></path>
                          </svg>{" "}
                          Stake
                        </button>
                      </h2>
                      <div
                        id="flush-collapsefour"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body reward-body">
                          <ul>
                            <li>
                              <Link href="/staking" class="stake-a">
                                Staking
                              </Link>
                            </li>
                            {/* <li>
                            <Link href="/stakingMatching" class="stake-a">
                              Staking Match
                            </Link>
                          </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                {/* <li className="nav-link">
                <div
                  class="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div class="accordion-item">
                    <h2 class="accordion-header stake-header">
                      <button
                        class="accordion-button collapsed stake-dropdown"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22.772"
                          height="25.148"
                          viewBox="0 0 22.772 25.148"
                        >
                          <g
                            id="Group_17235"
                            data-name="Group 17235"
                            transform="translate(-1275.37 2278.598)"
                          >
                            <path
                              id="Path_10922"
                              data-name="Path 10922"
                              d="M85.45,21.143c.133.826.263,1.635.4,2.473.488,0,.967.008,1.445-.008.064,0,.15-.1.182-.169.713-1.6,1.433-3.205,2.118-4.822a2.172,2.172,0,0,1,.9-1.062,6.342,6.342,0,0,0,1.735-1.382,4.873,4.873,0,0,0,.946-1.886,3.757,3.757,0,0,0,.067-.832c.008-.609,0-1.217,0-1.849-.157-.011-.3-.016-.446-.033a2.213,2.213,0,0,1-1.57-.937A3.6,3.6,0,0,0,89.41,9.222c-.342-.105-.428-.385-.252-.738.389-.779.785-1.556,1.177-2.334.047-.093.089-.188.173-.368-.334.033-.612.053-.889.087-.109.014-.214.069-.323.08a.418.418,0,0,1-.482-.34.415.415,0,0,1,.239-.527,3,3,0,0,1,2.3.016c.262.107.311.4.151.72Q90.912,7,90.312,8.177c-.05.1-.1.2-.156.328.107.061.2.118.3.172a4.436,4.436,0,0,1,1.414,1.329,1.52,1.52,0,0,0,1.6.627c.48-.074.665.093.666.61,0,.7-.032,1.4.007,2.091a5,5,0,0,1-1.046,3.2,5.956,5.956,0,0,1-1.972,1.709,1.8,1.8,0,0,0-.791.917c-.712,1.689-1.465,3.359-2.2,5.039a.532.532,0,0,1-.545.356c-.658-.009-1.314,0-1.972,0-.394,0-.528-.125-.593-.53-.137-.857-.276-1.714-.419-2.6a9.689,9.689,0,0,1-4.69,0c-.094.568-.187,1.128-.28,1.688-.053.324-.1.648-.16.971-.062.346-.2.471-.522.472-.695,0-1.388,0-2.083,0a.51.51,0,0,1-.481-.279,58.18,58.18,0,0,1-3.518-6.907,7.834,7.834,0,0,1-.091-5.716c.036-.1.072-.2.113-.312-.166-.107-.336-.2-.491-.32a2.259,2.259,0,0,1-.982-2.351A2.205,2.205,0,0,1,73.18,6.914a2.106,2.106,0,0,1,.526-.024.449.449,0,0,1,.422.479.46.46,0,0,1-.433.444,2.665,2.665,0,0,0-.493.053,1.281,1.281,0,0,0-.55,2.151,5.873,5.873,0,0,0,.638.5A9.043,9.043,0,0,1,76.284,7.77a.449.449,0,0,1,.678.12c.146.256.056.5-.25.69-.032.02-.067.035-.1.058-.577.449-1.184.863-1.723,1.359a5.631,5.631,0,0,0-1.7,3.91,7.3,7.3,0,0,0,.685,3.57c.918,2.053,1.973,4.027,3.082,5.97.041.072.128.159.2.161.49.014.979.008,1.488.008.108-.664.218-1.31.319-1.958.08-.516.076-.516-.37-.76a2.251,2.251,0,0,1-.242-.142.465.465,0,0,1-.144-.634.415.415,0,0,1,.581-.164,6.868,6.868,0,0,0,3.814.8,6.194,6.194,0,0,0,3.068-.781.426.426,0,0,1,.628.152.471.471,0,0,1-.205.66c-.2.12-.408.226-.638.353"
                              transform="translate(1204 -2278)"
                              fill="#fff"
                            />
                            <path
                              id="Path_10923"
                              data-name="Path 10923"
                              d="M78.288,10.318a5.5,5.5,0,1,1,6.947,0c.284.117.57.221.84.352a.451.451,0,0,1-.365.824,9.818,9.818,0,0,0-3.916-.655,11.6,11.6,0,0,0-3.142.348c-.283.077-.556.194-.833.3a.456.456,0,0,1-.608-.206.442.442,0,0,1,.234-.618c.272-.129.557-.23.843-.345M81.74,1.451c-.2.02-.4.036-.6.062a4.563,4.563,0,0,0-1.73,8.453.648.648,0,0,0,.373.082,18.1,18.1,0,0,1,3.88-.006.831.831,0,0,0,.476-.112,4.58,4.58,0,0,0-2.4-8.478"
                              transform="translate(1204.797 -2279.048)"
                              fill="#fff"
                              stroke="#1d2025"
                              stroke-width="0.2"
                            />
                            <path
                              id="Path_10924"
                              data-name="Path 10924"
                              d="M86.257,10.18a.369.369,0,1,1-.365.372.371.371,0,0,1,.365-.372"
                              transform="translate(1207.022 -2276)"
                              fill="#fff"
                            />
                            <path
                              id="Path_10925"
                              data-name="Path 10925"
                              d="M83.514,3.9a1.42,1.42,0,0,0-.74-.738,1.31,1.31,0,0,0-.54-.112H79.4V6.366h-.413v.609H79.4v.572h1.187V6.975h.453V6.366h-.453V4.178A.249.249,0,0,1,80.66,4a.227.227,0,0,1,.174-.073h1.111a.512.512,0,1,1,0,1.024h-.329a.371.371,0,0,0-.187.035.5.5,0,0,0-.13.159l-.357.7h1.294a1.31,1.31,0,0,0,.54-.112,1.407,1.407,0,0,0,.74-.743,1.351,1.351,0,0,0,.11-.546,1.315,1.315,0,0,0-.11-.541"
                              transform="translate(1205.448 -2278.302)"
                              fill="#fff"
                            />
                          </g>
                        </svg>{" "}
                        Stake
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body stake-body">
                        <ul>
                          <li>
                            <Link href="/staking" class="stake-a">
                              Staking
                            </Link>
                          </li>
                          <li>
                            <Link href="/stakingMatching" class="stake-a">
                              Staking Match
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li> */}
                {/* ewallet disable */}
                {/* <li className="nav-link">
                <a href="/ewallet">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="21.805"
                    viewBox="0 0 24 21.805"
                  >
                    <g
                      id="Group_17240"
                      data-name="Group 17240"
                      transform="translate(-131.5 -291.1)"
                    >
                      <path
                        id="Path_10935"
                        data-name="Path 10935"
                        d="M26,16.92a3,3,0,0,0-2.4-2.94V12.12a3,3,0,0,0-3-3h-.952L14.32,3.792a3,3,0,0,0-4.242,0L4.724,9.149A2.993,2.993,0,0,0,2,12.12v9.6a3,3,0,0,0,3,3H20.6a3,3,0,0,0,3-3V19.86A3,3,0,0,0,26,16.92ZM10.928,4.642a1.8,1.8,0,0,1,2.545,0L17.952,9.12H6.448ZM20.6,23.52H5a1.8,1.8,0,0,1-1.8-1.8v-9.6A1.8,1.8,0,0,1,5,10.32H20.6a1.8,1.8,0,0,1,1.8,1.8v1.8H20.6a3,3,0,1,0,0,6h1.8v1.8a1.8,1.8,0,0,1-1.8,1.8Zm2.4-4.8H20.6a1.8,1.8,0,0,1,0-3.6H23a1.8,1.8,0,0,1,0,3.6Z"
                        transform="translate(129.5 288.185)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10939"
                        data-name="Path 10939"
                        d="M132.238,12.161a2.221,2.221,0,0,0-1.151-1.151,2.069,2.069,0,0,0-.844-.174h-4.409v5.17h-.644v.95h.644v.89h1.85v-.89h.7v-.95h-.7V12.6a.394.394,0,0,1,.106-.278.354.354,0,0,1,.271-.113h1.73a.8.8,0,1,1,0,1.595h-.511a.59.59,0,0,0-.294.053.8.8,0,0,0-.2.248l-.557,1.084h2.016a2.05,2.05,0,0,0,.844-.174,2.2,2.2,0,0,0,1.151-1.158A2.119,2.119,0,0,0,132.41,13a2.063,2.063,0,0,0-.173-.842"
                        transform="translate(11.09 290.766)"
                        fill="#ccd0db"
                      />
                    </g>
                  </svg>
                  E - Wallet
                </a>
              </li> */}
              </ul>
            </div>
            <div class="dash-navmid2">
              <ul>
                <li className="nav-link">
                  <div
                    class="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header reward-header">
                        <Link href="/personalInfo">
                          <button
                            class="accordion-button collapsed dash_drop"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapsetwo"
                            aria-expanded="false"
                            aria-controls="flush-collapsetwo"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23.819"
                              height="25.2"
                              viewBox="0 0 23.819 25.2"
                            >
                              <path
                                id="Path_10931"
                                data-name="Path 10931"
                                d="M99.848,20.873a2.477,2.477,0,0,0-1.206.3,1.82,1.82,0,0,1-2.515-.552,11.906,11.906,0,0,1-1.553-2.692,1.817,1.817,0,0,1,.775-2.458,2.507,2.507,0,0,0,.392-3.986,3.28,3.28,0,0,0-.466-.343,1.816,1.816,0,0,1-.737-2.335,12.132,12.132,0,0,1,1.624-2.818,1.816,1.816,0,0,1,2.426-.536A2.5,2.5,0,0,0,101.67,5a2.455,2.455,0,0,0,.686-1.658A1.806,1.806,0,0,1,104,1.456a10.917,10.917,0,0,1,3.325,0,1.8,1.8,0,0,1,1.616,1.859,2.5,2.5,0,0,0,1.712,2.341,2.468,2.468,0,0,0,2.033-.191,1.828,1.828,0,0,1,2.389.444,11.9,11.9,0,0,1,1.7,2.94,1.807,1.807,0,0,1-.794,2.315,2.5,2.5,0,0,0-.66,3.749,3.027,3.027,0,0,0,.672.581,1.824,1.824,0,0,1,.752,2.389,12.081,12.081,0,0,1-1.558,2.718,1.822,1.822,0,0,1-2.53.572,2.5,2.5,0,0,0-3.582,1.421,2.694,2.694,0,0,0-.127.709,1.822,1.822,0,0,1-1.682,1.9,11,11,0,0,1-3.278,0,1.8,1.8,0,0,1-1.627-1.874A2.507,2.507,0,0,0,99.848,20.873Zm9.36-7.43a3.563,3.563,0,1,0-3.684,3.451A3.566,3.566,0,0,0,109.208,13.443Z"
                                transform="translate(-93.737 -0.729)"
                                fill="none"
                                stroke="#ccd0db"
                                stroke-width="1.2"
                              />
                            </svg>{" "}
                            Settings
                          </button>
                        </Link>
                      </h2>
                      <div
                        id="flush-collapsetwo"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body reward-body">
                          <ul>
                            <li>
                              <Link href="/personalInfo" class="reward-a">
                                Personal Information
                              </Link>
                            </li>
                            <li>
                              <Link href="/twoFactor " class="reward-a">
                                Account security
                              </Link>
                            </li>
                            {/* <li>
                            <Link href="/walletChange" class="reward-a">
                              Wallet Change
                            </Link>
                          </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <button
                    class="disconnect-btn"
                    style={{
                      border: "none",
                      color: "white",
                      backgroundColor: "transparent",
                    }}
                    onClick={handleDisconnect}
                  >
                    {" "}
                    <img
                      src="/unlink1.png"
                      alt=""
                      style={{ marginRight: "12px" }}
                    />{" "}
                    Disconnect
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="dash-navbottom">
            <a href="">
              {" "}
              <p>
                <img src="/dash-btn.png" atl="" />
              </p>{" "}
              <span>{getAddress}</span>
            </a>
          </div>
        </div>
        <div class="dashboard-right">
          <div class="p2p-helplogo">
            <p>
              <img src="/p2p.help_logo-01.svg" />
            </p>
            <span>
              <Link href="/mobileSettings">
                <img src="/settings.png" alt="" />
              </Link>
            </span>
          </div>
          <div class="container-fluid">
            <div class="dashboard-head">
              <h2>Dashboard</h2>
            </div>
            <div class="dashboard-row1">
              <div class="dashrow1-left">
                <img src="/Hi_colored.gif" alt="" />
              </div>
              <div class="dashrow1-right">
                <h4>My Information</h4>
                <div class="dash-ul1">
                  <ul>
                    <li>
                      <span>Name:</span>{" "}
                      <span>{userData?.userDetail[0]?.firstName}</span>
                    </li>
                    <li>
                      <span>Wallet Address:</span>{" "}
                      <span>
                        {getAddress}
                        <CopyToClipboard
                          text={userData?.userDetail[0]?.address}
                          // onCopy={() => toast.success("Copied Successfully")}
                        >
                          <Tooltip
                            content={"Copied"}
                            trigger="click"
                            color="primary"
                          >
                            <img
                              src="/copy.png"
                              style={{
                                marginLeft: "10px",
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </Tooltip>
                        </CopyToClipboard>
                      </span>
                    </li>
                    <li>
                      <span>Refrerral Link:</span>{" "}
                      <span>
                        {userData?.userDetail[0]?.referral}
                        <CopyToClipboard
                          text={userData?.userDetail[0]?.referral}
                          // onCopy={() => toast.success("Copied Successfully")}
                        >
                          <Tooltip
                            content={"Copied"}
                            trigger="click"
                            color="primary"
                          >
                            <img
                              src="/copy.png"
                              style={{
                                marginLeft: "10px",
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </Tooltip>
                        </CopyToClipboard>
                      </span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>Human Indentification:</span>{" "}
                      <span>Unrecognized</span>
                    </li>
                    <li>
                      <span>Two Factor Authentication:</span>{" "}
                      <span>
                        {" "}
                        <p>
                          {userData?.fa == 1 && "On"}
                          {userData?.fa == 0 && "Off"}
                        </p>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="dashboard-row2">
              <div class="dashrow2-left">
                <div class="dash-reward">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50.352"
                    height="50.871"
                    viewBox="0 0 50.352 52.871"
                  >
                    <g id="award-reward-svgrepo-com" transform="translate(0)">
                      <g
                        id="Group_2664"
                        data-name="Group 2664"
                        transform="translate(0 0)"
                      >
                        <g id="Group_2663" data-name="Group 2663">
                          <path
                            id="Path_10445"
                            data-name="Path 10445"
                            d="M77.88,57.451a.909.909,0,0,0-.118-.247,17.667,17.667,0,1,0-33.627.057.914.914,0,0,0-.084.19L38.091,77.092a2.148,2.148,0,0,0,3.319,2.327l5.7-3.971a1.789,1.789,0,0,1,2.662.737l2.387,5.843a2.356,2.356,0,0,0,4.415-.2l3.756-12.378c.2.007.4.011.608.011.221,0,.44-.006.659-.013l3.756,12.38a2.356,2.356,0,0,0,4.415.2l2.388-5.843a1.788,1.788,0,0,1,2.663-.737l5.7,3.971a2.148,2.148,0,0,0,3.319-2.327Zm-23,23.866a.591.591,0,0,1-1.089.043l-2.387-5.843A3.554,3.554,0,0,0,46.1,74l-5.7,3.971a.384.384,0,0,1-.619-.364L45.1,60.08a17.8,17.8,0,0,0,2.459,3.252A17.638,17.638,0,0,0,58.531,69.3Zm5.026-13.654a.89.89,0,0,0-.154-.026,15.833,15.833,0,0,1-10.612-5.2q-.13-.13-.256-.263a15.9,15.9,0,1,1,23.582.574l-.112.107A15.867,15.867,0,0,1,62.17,67.634a.889.889,0,0,0-.148.025c-.358.024-.719.037-1.082.037C60.593,67.7,60.251,67.685,59.911,67.663ZM81.529,77.969,75.828,74a3.554,3.554,0,0,0-5.307,1.519L68.133,81.36a.591.591,0,0,1-1.089-.043L63.4,69.293a17.624,17.624,0,0,0,10.349-5.325,17.607,17.607,0,0,0,3.087-3.884L82.148,77.6A.384.384,0,0,1,81.529,77.969Z"
                            transform="translate(-35.321 -30.596)"
                            fill="#f1b049"
                          />
                          <path
                            id="Path_10446"
                            data-name="Path 10446"
                            d="M15.7,7.95a.883.883,0,0,0,1.767,0,2.648,2.648,0,0,1,2.65-2.65.883.883,0,0,0,0-1.767,2.648,2.648,0,0,1-2.65-2.65.883.883,0,0,0-1.767,0,2.648,2.648,0,0,1-2.65,2.65.883.883,0,0,0,0,1.767A2.648,2.648,0,0,1,15.7,7.95Zm.883-4.415a4.44,4.44,0,0,0,.882.882,4.44,4.44,0,0,0-.882.882,4.44,4.44,0,0,0-.882-.882A4.44,4.44,0,0,0,16.585,3.535Z"
                            transform="translate(-12.168 0)"
                            fill="#f1b049"
                          />
                          <path
                            id="Path_10447"
                            data-name="Path 10447"
                            d="M451.788,121.234H450.9v-.883a.883.883,0,1,0-1.767,0v.883h-.883a.883.883,0,1,0,0,1.767h.883v.883a.883.883,0,1,0,1.767,0V123h.883a.883.883,0,0,0,0-1.767Z"
                            transform="translate(-402.319 -107.1)"
                            fill="#f1b049"
                          />
                          <path
                            id="Path_10448"
                            data-name="Path 10448"
                            d="M21.586,213.333a.883.883,0,1,0,.883.883A.883.883,0,0,0,21.586,213.333Z"
                            transform="translate(-19.82 -191.249)"
                            fill="#f1b049"
                          />
                          <path
                            id="Path_10449"
                            data-name="Path 10449"
                            d="M158.137,90.046a13.25,13.25,0,1,0-13.251,13.25A13.252,13.252,0,0,0,158.137,90.046Zm-24.734,0a11.484,11.484,0,1,1,11.484,11.484A11.485,11.485,0,0,1,133.4,90.046Z"
                            transform="translate(-119.269 -68.846)"
                            fill="#f1b049"
                          />
                          <path
                            id="Path_10450"
                            data-name="Path 10450"
                            d="M222.494,136.248l.005-.914a4.411,4.411,0,0,0,2.51-1.479,3.15,3.15,0,0,0-.521-4.5l-1.978-1.539L222.5,123a2.65,2.65,0,0,1,1.787,2.506.883.883,0,1,0,1.767,0,4.417,4.417,0,0,0-3.557-4.333l0-.835a.883.883,0,0,0-1.767,0l0,.842a4.41,4.41,0,0,0-2.466,1.471,3.149,3.149,0,0,0,.522,4.5l1.962,1.526.007,3.012-.01,1.806a2.651,2.651,0,0,1-1.756-2.5.883.883,0,1,0-1.767,0,4.418,4.418,0,0,0,3.513,4.324l-.005.911a.883.883,0,1,0,1.767.01Zm-2.625-10.487a1.384,1.384,0,0,1-.257-1.964,2.649,2.649,0,0,1,1.122-.781l.008,3.424Zm3.535,4.989a1.385,1.385,0,0,1,.257,1.965,2.65,2.65,0,0,1-1.151.792l.01-1.81,0-1.638Z"
                            transform="translate(-195.993 -107.092)"
                            fill="#f1b049"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span>{userData?.directIncome}</span>
                  <p>Direct Reward</p>
                </div>
                <div class="dash-reward">
                  <img src="/incentive@2x.png" alt="" />
                  <span>{Number(userData?.levelIncome).toFixed(2)}</span>
                  <p>Level Reward</p>
                </div>
                <div class="dash-reward">
                  <img src="/cash (1)@2x.png" alt="" />
                  <span>{userData?.matchingIncome || "0.00"}</span>
                  <p>Pair Match Reward</p>
                </div>
                <div class="dash-reward">
                  <img
                    src="/stake (1)@2x.png"
                    alt=""
                    style={{ heigth: "50px", width: "50px" }}
                  />
                  <span>{userData?.levelRewards || "0.00"}</span>
                  <p> Staking APR</p>
                </div>
                <div class="dash-reward" id="total-reward">
                  <img src="/Group 3410@2x.png" alt="" />
                  <span className="totalreward-span">
                    {Number(userData?.wallet).toFixed(2)}
                  </span>
                  <p>Total Reward</p>
                </div>
                <div class="dash-reward">
                  <img src="/financial-profit (1)@2x.png" alt="" />
                  <span>{userData?.stakingMatchReward || "0"}</span>
                  <p>Staking Match Reward</p>
                </div>
              </div>
              <div class="dashrow2-right">
                <ul>
                  <li class="row2-text">$ {Number(p2pPrice).toFixed(3)}</li>
                  <li>
                    <img
                      style={{ width: "15px", height: "30px" }}
                      src="/dollar3.png"
                      alt=""
                    />
                    /{" "}
                    <img
                      style={{ width: "25px", height: "28px" }}
                      src="/p2pnew.png"
                      alt=""
                    />{" "}
                  </li>
                </ul>
                <ul class="dddd-ul">
                  <li class="row2-text">{Number(maticPrice).toFixed(3)}</li>
                  <li>
                    <img
                      style={{ width: "33px", height: "28px" }}
                      src="/disconnect.png"
                      alt=""
                    />
                    /{" "}
                    <img
                      style={{ width: "25px", height: "28px" }}
                      src="/p2pnew.png"
                      alt=""
                    />{" "}
                  </li>
                </ul>
              </div>
            </div>
            {/* <div class="dashboard-row3"> */}
            {/* <div class="dashrow3-left">
                <img src="/big_human_recogonition.png" alt="" />
              </div> */}
            {/* <div class="dashrow3-right up">
                <div class="dashreact">
                  <div class="dashreact-left">
                    <h4>Direct Refrence Number</h4>
                  </div>
                  <div class="dashreact-right">
                    <ul>
                      <li>
                        <span></span> Left{" "}
                      </li>
                      <li class="d-right">
                        <span></span> Right{" "}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="dash-direct">
                  <table class="table table-dark table-striped">
                    <thead>
                      <tr>
                        <th scope="col" id="left-align">
                          Particular
                        </th>
                        <th scope="col">Left</th>
                        <th scope="col">Right</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td id="left-align">Total</td>
                        <td class="table-blue">{userData?.totalLeftCount}</td>
                        <td class="table-blue">{userData?.totalRightCount}</td>
                      </tr>
                      <tr>
                        <td id="left-align">Match</td>
                        <td class="table-blue">{userData?.totalLeftMatch}</td>
                        <td class="table-blue">{userData?.totalRightMatch}</td>
                      </tr>
                      <tr>
                        <td id="left-align">Other</td>
                        <td class="table-blue">{userData?.totalLeftOther}</td>
                        <td class="table-blue">{userData?.totalRightOther}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}

            <div class="dashboard-row4">
              <div class="dashreact">
                <h4>Direct Reference</h4>
              </div>
              <div class="dash-direct">
                <table class="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }} class="direct-heading">
                        Particular
                      </th>
                      <th scope="col">Left</th>
                      <th scope="col">Right</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left" }} id="left-align">
                        Total Team
                      </td>
                      <td class="table-blue">0</td>
                      <td class="table-blue">0</td>
                    </tr>
                    <tr class="ddd-ststs">
                      <td style={{ textAlign: "left" }} id="left-align">
                        Staking Amount
                      </td>
                      <td class="table-blue">
                        {userData?.totalLeftStaking || "0"}
                      </td>
                      <td class="table-blue">
                        {userData?.totalRighStaking || "0"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* </div> */}
            <div class="dashboard-row3">
              <div class="dashrow3-left">
                {/* <img src="img/big_human_recogonition.png" alt="" /> */}
                <div className="HeaderCircleSection">
                  <FirstBarDash
                    totalLeftCount={userData?.totalLeftCount}
                    totalRightCount={userData?.totalRightCount}
                    totalLeftStaking={userData?.totalLeftStaking || "0"}
                    totalRighStaking={userData?.totalRighStaking || "0"}
                  />
                </div>
              </div>
              <div class="dashrow3-right">
                <div class="dashreact">
                  <div class="dashreact-left">
                    <h4>Team Details</h4>
                  </div>
                  <div class="dashreact-right">
                    <ul>
                      <li>
                        <span></span> Total Team{" "}
                      </li>
                      <li class="d-right">
                        <span></span> Total Staking{" "}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="dash-direct">
                  <table class="table" id="long-table">
                    <tr>
                      <th rowspan="2" id="particular">
                        Particulars
                      </th>
                      <th colspan="2">Team Size</th>
                      <th colspan="2">Staking amount</th>
                    </tr>
                    <tr class="table-gray">
                      <th>Left</th>
                      <th>Right</th>
                      <th>Left</th>
                      <th>Right</th>
                    </tr>
                    <tr>
                      <td id="fontWeight">Total</td>
                      <td class="table-blue">{userData?.totalLeftCount}</td>
                      <td class="table-blue">{userData?.totalRightCount}</td>
                      <td class="table-blue">
                        {userData?.totalLeftStaking || "0"}
                      </td>
                      <td class="table-blue">
                        {userData?.totalRightStaking || "0"}
                      </td>
                    </tr>
                    <tr class="table-gray">
                      <th>Matched</th>
                      <td>{userData?.teamLeftMatched || "0"}</td>
                      <td>{userData?.teamRightMatched || "0"}</td>
                      <td>{userData?.stakingLeftMatched || "0"}</td>
                      <td>{userData?.stakingLeftMatched || "0"}</td>
                    </tr>
                    <tr>
                      <td id="fontWeight">Other</td>
                      <td class="table-blue">
                        {userData?.teamLeftOthers || "0"}
                      </td>
                      <td class="table-blue">
                        {userData?.teamRightOthers || "0"}
                      </td>
                      <td class="table-blue">
                        {userData?.stakingLeftOthers || "0"}
                      </td>
                      <td class="table-blue">
                        {userData?.stakingRightOthers || "0"}
                      </td>
                    </tr>

                    {/* </tbody> */}
                  </table>
                  <table class="table team-table">
                    <tbody>
                      <tr>
                        <th colspan="3">Team Size</th>
                      </tr>
                      <tr class="table-gray">
                        <th>Particular</th>
                        <th>Left</th>
                        <th>Right</th>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td class="table-blue">{userData?.totalLeftCount}</td>
                        <td class="table-blue">{userData?.totalRightCount}</td>
                      </tr>
                      <tr class="table-gray">
                        <th>Matched</th>
                        <td>
                          {userData?.totalLeftCount > userData?.totalRightCount
                            ? userData?.totalRightCount
                            : "0"}
                        </td>
                        <td>
                          {userData?.totalRightCount > userData?.totalLeftCount
                            ? userData?.totalLeftCount
                            : "0"}
                        </td>
                      </tr>
                      <tr>
                        <td class="table-blue">Others</td>
                        <td class="table-blue">0</td>
                        <td class="table-blue">0</td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="table team-table">
                    <tbody>
                      <tr>
                        <th colspan="3">Staking Amount</th>
                      </tr>
                      <tr class="table-gray">
                        <th>Particular</th>
                        <th>Left</th>
                        <th>Right</th>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td class="table-blue">0</td>
                        <td class="table-blue">0</td>
                      </tr>
                      <tr class="table-gray">
                        <th>Matched</th>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td class="table-blue">Others</td>
                        <td class="table-blue">0</td>
                        <td class="table-blue">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </section>
      <section class="bottom-nav">
        <div class="container">
          <div class="bottomnav-head">
            <ul>
              <li class="active">
                <Link href="/dashboard">
                  <svg
                    id="Dashboard"
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.992"
                    height="24"
                    viewBox="0 0 23.992 24"
                  >
                    <g
                      id="Group_17237"
                      data-name="Group 17237"
                      transform="translate(0 0)"
                    >
                      <path
                        id="Path_10905"
                        data-name="Path 10905"
                        d="M5.449,2.1q1.093,0,2.184.014A2.063,2.063,0,0,1,9.7,4.179c.02,1.4.022,2.869,0,4.356a2.047,2.047,0,0,1-2.087,2.073q-1.067.011-2.135.011-1.091,0-2.179-.011a2.063,2.063,0,0,1-2.1-2.113c0-.319,0-.638,0-.958h.023v-1.2c0-.264,0-.528-.011-.792A14.443,14.443,0,0,1,1.235,3.99a2.01,2.01,0,0,1,2.04-1.878Q4.362,2.1,5.449,2.1m0-1.2q-1.1,0-2.191.014A3.21,3.21,0,0,0,.039,3.888C-.03,4.7.027,5.52.027,6.337H.006c0,.722-.006,1.446,0,2.169a3.269,3.269,0,0,0,3.283,3.3q1.1.011,2.191.011,1.073,0,2.148-.011A3.256,3.256,0,0,0,10.9,8.551q.031-2.194,0-4.391A3.251,3.251,0,0,0,7.649.912Q6.549.9,5.449.9"
                        transform="translate(0.001 -0.898)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10906"
                        data-name="Path 10906"
                        d="M16.431,2.1q1.037,0,2.072.01A2.045,2.045,0,0,1,20.6,4.178c.022,1.392.023,2.817,0,4.355a2.047,2.047,0,0,1-2.084,2.076q-1.06.011-2.119.011-1.1,0-2.195-.011A2.063,2.063,0,0,1,12.1,8.5c0-.319,0-.638,0-.958h.023v-1.2c0-.263-.006-.527-.012-.791a14.755,14.755,0,0,1,.019-1.555A2.027,2.027,0,0,1,14.21,2.11Q15.32,2.1,16.431,2.1m0-1.2Q15.317.9,14.2.91a3.218,3.218,0,0,0-3.269,2.981c-.07.81-.012,1.632-.012,2.448H10.9c0,.724-.006,1.447,0,2.169a3.269,3.269,0,0,0,3.285,3.3q1.1.011,2.207.011,1.066,0,2.132-.011A3.256,3.256,0,0,0,21.8,8.549q.031-2.194,0-4.391A3.254,3.254,0,0,0,18.515.912Q17.473.9,16.431.9"
                        transform="translate(2.179 -0.897)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10907"
                        data-name="Path 10907"
                        d="M5.455,13q1.08,0,2.16.011a2.061,2.061,0,0,1,2.091,2.1c0,.32.006.642.006.962H9.686v1.188c0,.266.006.533.012.8a15.2,15.2,0,0,1-.019,1.578A2.005,2.005,0,0,1,7.636,21.5q-1.1.014-2.2.016-1.078,0-2.156-.016a2.069,2.069,0,0,1-2.07-2.089c-.013-1.426-.013-2.877,0-4.317A2.049,2.049,0,0,1,3.3,13.007Q4.378,13,5.455,13m0-1.2q-1.084,0-2.167.011A3.259,3.259,0,0,0,.01,15.085q-.02,2.169,0,4.339A3.258,3.258,0,0,0,3.263,22.7q1.085.014,2.173.016,1.109,0,2.216-.016a3.211,3.211,0,0,0,3.223-2.973c.067-.82.011-1.649.011-2.474h.023c0-.722.008-1.446,0-2.169a3.266,3.266,0,0,0-3.279-3.278Q6.542,11.8,5.455,11.8"
                        transform="translate(0 1.281)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10908"
                        data-name="Path 10908"
                        d="M16.37,13q1.066,0,2.13.01a2.065,2.065,0,0,1,2.1,2.108c0,.323,0,.644,0,.967h-.024V17.27c0,.263.006.526.011.79a15.172,15.172,0,0,1-.018,1.559A2.009,2.009,0,0,1,18.54,21.5q-1.111.018-2.221.018-1.078,0-2.156-.018A2.047,2.047,0,0,1,12.1,19.4q-.016-2.147,0-4.295a2.058,2.058,0,0,1,2.1-2.1Q15.289,13,16.37,13m0-1.2q-1.087,0-2.173.008A3.264,3.264,0,0,0,10.9,15.1q-.018,2.156,0,4.314A3.257,3.257,0,0,0,14.142,22.7q1.089.018,2.177.018,1.12,0,2.239-.018a3.209,3.209,0,0,0,3.212-2.983c.068-.811.012-1.632.012-2.448h.02c0-.722.008-1.446,0-2.169a3.268,3.268,0,0,0-3.291-3.293q-1.069-.011-2.139-.01"
                        transform="translate(2.179 1.281)"
                        fill="#ccd0db"
                      />
                    </g>
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/mainGenealogy">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.903"
                    height="24"
                    viewBox="0 0 23.903 24"
                  >
                    <path
                      id="Path_10932"
                      data-name="Path 10932"
                      d="M35.243,1h-.008a5.161,5.161,0,0,0-5.08,4.362,4.965,4.965,0,0,0,.731,3.5,5.138,5.138,0,0,0,3.636,2.37l.1.017v9.247l-1.81-1.408.05-.091a5.138,5.138,0,0,0-8.381-5.882,5.117,5.117,0,0,0,.07,6.678,5,5,0,0,0,3.118,1.7,5.58,5.58,0,0,0,.783.057,5.129,5.129,0,0,0,3.556-1.462l.075-.069.56.434c.625.487,1.245.968,1.864,1.453a.348.348,0,0,1,.13.247c0,.4,0,.794,0,1.2v.476H33.06c-.276,0-.553,0-.829,0a.588.588,0,0,0-.258,1.13.778.778,0,0,1,.075.046h6.344a.125.125,0,0,1,.028-.019.6.6,0,0,0-.284-1.158H35.82V23.3c0-.362,0-.71.008-1.058a.546.546,0,0,1,.185-.379c.585-.465,1.177-.925,1.768-1.384l.358-.278c.039-.03.081-.057.121-.084l.131-.086.07.065a5.257,5.257,0,0,0,3.607,1.444,5.075,5.075,0,0,0,3.589-1.478A5.134,5.134,0,1,0,37.6,18.995l.05.091L35.828,20.5V11.243l.1-.016a5.112,5.112,0,0,0,3.4-2.006,5.02,5.02,0,0,0,.984-3.836A5.13,5.13,0,0,0,35.243,1m-.012,9.091a3.956,3.956,0,0,1,0-7.913h.007a3.963,3.963,0,0,1,3.944,3.975,3.961,3.961,0,0,1-3.956,3.938m6.815,10.275a3.956,3.956,0,0,1,.01-7.913h.011a3.963,3.963,0,0,1,3.939,3.978,3.962,3.962,0,0,1-3.958,3.935Zm-13.636,0a3.956,3.956,0,0,1,.008-7.913h.011a3.963,3.963,0,0,1,3.941,3.978,3.962,3.962,0,0,1-3.958,3.935Z"
                      transform="translate(-23.277 -1.001)"
                      fill="#ccd0db"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/mobileReward">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24.001"
                    viewBox="0 0 24 24.001"
                  >
                    <g
                      id="Group_17236"
                      data-name="Group 17236"
                      transform="translate(-1254.228 2273.334)"
                    >
                      <path
                        id="Path_10918"
                        data-name="Path 10918"
                        d="M54.336,18.591c.105-.644.232-1.4.351-2.157.215-1.357.318-1-.6-1.951q-.668-.691-1.349-1.37a1.5,1.5,0,0,1,.924-2.613c.83-.112,1.659-.253,2.489-.369a.636.636,0,0,0,.529-.4c.389-.834.793-1.66,1.18-2.494a1.4,1.4,0,0,1,2.62,0c.383.826.786,1.643,1.169,2.469a.671.671,0,0,0,.569.425c.885.122,1.767.265,2.648.405a1.37,1.37,0,0,1,1.158.973,1.414,1.414,0,0,1-.334,1.5q-.945.989-1.92,1.949a.8.8,0,0,0-.243.78q.241,1.359.454,2.723a1.428,1.428,0,0,1-.594,1.474,1.359,1.359,0,0,1-1.554.036c-.772-.429-1.553-.844-2.323-1.277a.628.628,0,0,0-.683,0c-.794.446-1.591.887-2.4,1.312a1.426,1.426,0,0,1-2.089-1.424m.924.068c-.014.5.357.741.761.523.794-.427,1.588-.855,2.375-1.3a1.464,1.464,0,0,1,1.541,0c.763.427,1.535.841,2.3,1.264.2.11.393.2.605.047a.587.587,0,0,0,.217-.627c-.149-.9-.29-1.8-.451-2.7a1.611,1.611,0,0,1,.473-1.529c.63-.622,1.244-1.26,1.867-1.889a.6.6,0,0,0,.2-.656.561.561,0,0,0-.522-.365c-.847-.128-1.693-.268-2.543-.382a1.5,1.5,0,0,1-1.251-.906c-.389-.833-.79-1.661-1.181-2.494-.1-.219-.232-.4-.5-.39s-.372.182-.469.39c-.39.834-.791,1.661-1.18,2.5a1.493,1.493,0,0,1-1.224.9c-.858.119-1.714.254-2.57.383-.357.054-.566.228-.545.522a.87.87,0,0,0,.223.493c.622.656,1.26,1.3,1.9,1.936a1.545,1.545,0,0,1,.454,1.384c-.035.25-.083.5-.125.748-.121.729-.242,1.459-.354,2.146"
                        transform="translate(1207.058 -2275.178)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10919"
                        data-name="Path 10919"
                        d="M60.634,4.666a11.889,11.889,0,0,1,11.432,9.6,11.662,11.662,0,0,1-.965,7.654c-.211.437-.507.583-.842.423s-.393-.478-.183-.922a10.855,10.855,0,0,0-16-13.631c-.091.065-.178.135-.274.192a.568.568,0,0,1-.8-.139.537.537,0,0,1,.156-.79,20.01,20.01,0,0,1,1.937-1.181,11.869,11.869,0,0,1,5.54-1.2"
                        transform="translate(1205.902 -2278)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10920"
                        data-name="Path 10920"
                        d="M62.131,26.052A12.017,12.017,0,0,1,51.448,8.768c.132-.271.309-.473.638-.442a.575.575,0,0,1,.418.888,11.418,11.418,0,0,0-.943,2.81A10.836,10.836,0,0,0,59.61,24.576a10.674,10.674,0,0,0,8.914-1.692,1.526,1.526,0,0,1,.5-.247.486.486,0,0,1,.555.281.527.527,0,0,1-.06.624,1.377,1.377,0,0,1-.252.216,12.361,12.361,0,0,1-7.131,2.294"
                        transform="translate(1204 -2275.389)"
                        fill="#ccd0db"
                      />
                    </g>
                  </svg>
                </Link>
              </li>
                <Link href="/staking">
              <li>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 101 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M93.328 70.6788C93.139 65.3018 91.463 58.8238 88.611 52.4388C85.759 46.0478 82.054 40.4738 78.178 36.7438C74.01 32.7318 70.023 31.2628 66.937 32.5928C66.912 32.6028 66.886 32.6068 66.861 32.6178L63.241 34.2348V25.7428C63.241 25.7308 63.243 25.7188 63.243 25.7068C63.243 18.9898 51.653 13.9248 36.283 13.9248C20.945 13.9248 9.373 18.9698 9.325 25.6658C9.325 25.6798 9.321 25.6928 9.321 25.7078V40.8878C9.321 40.9678 9.332 41.0458 9.345 41.1218C9.332 41.1988 9.321 41.2758 9.321 41.3558C9.321 41.4928 9.333 41.6268 9.343 41.7618C9.332 41.8338 9.321 41.9048 9.321 41.9798V57.1598C9.321 57.2408 9.332 57.3188 9.345 57.3958C9.332 57.4728 9.321 57.5508 9.321 57.6318C9.321 57.8028 9.334 57.9718 9.348 58.1398C9.331 58.2278 9.321 58.3188 9.321 58.4118V73.5918C9.321 73.6718 9.332 73.7498 9.345 73.8258C9.332 73.9028 9.321 73.9798 9.321 74.0598C9.321 80.7758 20.913 85.8398 36.285 85.8398C46.05 85.8398 54.949 83.6118 59.633 80.0898C63.825 85.5318 68.335 88.7398 72.112 88.7398C72.973 88.7398 73.798 88.5738 74.57 88.2288L88.805 81.8698C88.819 81.8638 88.834 81.8598 88.848 81.8538C91.943 80.4728 93.534 76.5038 93.328 70.6788ZM53.006 38.8068L52.574 38.9968C49.601 40.3258 48.099 43.9898 48.049 49.0088C44.459 49.7938 40.435 50.2268 36.286 50.2268C22.108 50.2268 12.228 45.5518 12.228 41.3548C12.228 41.2748 12.217 41.1968 12.204 41.1208C12.217 41.0438 12.228 40.9668 12.228 40.8868V31.1938C16.596 34.9968 25.508 37.4888 36.284 37.4888C47.057 37.4888 55.966 34.9988 60.336 31.1968V35.5328L53.006 38.8068ZM12.204 57.3958C12.217 57.3188 12.228 57.2408 12.228 57.1598V46.8418C16.598 50.6428 25.51 53.1338 36.286 53.1338C40.444 53.1338 44.515 52.7348 48.176 51.9768C48.511 55.6678 49.5 59.8868 51.147 64.3448C46.739 65.7718 41.752 66.5028 36.286 66.5028C22.108 66.5028 12.228 61.8278 12.228 57.6328C12.228 57.5508 12.217 57.4728 12.204 57.3958ZM36.284 16.8308C50.447 16.8308 60.319 21.4998 60.337 25.6958C60.337 25.6998 60.336 25.7028 60.336 25.7068V25.7338C60.294 29.9248 50.429 34.5828 36.284 34.5828C22.108 34.5828 12.23 29.9048 12.23 25.7068C12.23 21.5088 22.108 16.8308 36.284 16.8308ZM36.286 82.9348C22.108 82.9348 12.228 78.2578 12.228 74.0608C12.228 73.9808 12.217 73.9028 12.204 73.8268C12.217 73.7498 12.228 73.6728 12.228 73.5928V63.1178C16.598 66.9188 25.51 69.4088 36.286 69.4088C42.128 69.4088 47.474 68.6098 52.215 67.0508C52.406 67.5058 52.603 67.9628 52.808 68.4208C54.362 71.8988 56.109 75.0238 57.946 77.7368C53.85 80.8738 45.386 82.9348 36.286 82.9348ZM73.783 85.3938L73.372 85.5828C69.533 87.2868 61.242 80.1748 55.461 67.2348C49.686 54.2908 49.93 43.3618 53.754 41.6528L63.055 37.4998C62.529 39.2368 62.294 41.3498 62.381 43.7948C62.57 49.1708 64.246 55.6508 67.099 62.0418C69.951 68.4298 73.656 74.0008 77.532 77.7308C79.299 79.4298 81.029 80.6558 82.676 81.4238L73.783 85.3938ZM87.669 79.1978C87.667 79.1988 87.664 79.1988 87.662 79.1998L87.652 79.2038C85.738 80.0498 82.782 78.7508 79.547 75.6368C75.934 72.1598 72.455 66.9108 69.753 60.8568C67.049 54.7998 65.462 48.7048 65.285 43.6928C65.127 39.1948 66.135 36.1268 68.051 35.2728C68.438 35.1008 68.865 35.0158 69.329 35.0158C71.169 35.0158 73.575 36.3468 76.163 38.8368C79.776 42.3138 83.254 47.5648 85.957 53.6228C88.661 59.6748 90.247 65.7688 90.424 70.7808C90.583 75.2728 89.578 78.3398 87.669 79.1978Z"
                      fill="#3D4055"
                      stroke="#3D4055"
                      stroke-width="2.2"
                      id="id_101"
                    ></path>
                  </svg>{" "}
              </li>
                </Link>
              {/* <li>
                <Link href="/ewallet">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="21.805"
                    viewBox="0 0 24 21.805"
                  >
                    <g
                      id="Group_17240"
                      data-name="Group 17240"
                      transform="translate(-131.5 -291.1)"
                    >
                      <path
                        id="Path_10935"
                        data-name="Path 10935"
                        d="M26,16.92a3,3,0,0,0-2.4-2.94V12.12a3,3,0,0,0-3-3h-.952L14.32,3.792a3,3,0,0,0-4.242,0L4.724,9.149A2.993,2.993,0,0,0,2,12.12v9.6a3,3,0,0,0,3,3H20.6a3,3,0,0,0,3-3V19.86A3,3,0,0,0,26,16.92ZM10.928,4.642a1.8,1.8,0,0,1,2.545,0L17.952,9.12H6.448ZM20.6,23.52H5a1.8,1.8,0,0,1-1.8-1.8v-9.6A1.8,1.8,0,0,1,5,10.32H20.6a1.8,1.8,0,0,1,1.8,1.8v1.8H20.6a3,3,0,1,0,0,6h1.8v1.8a1.8,1.8,0,0,1-1.8,1.8Zm2.4-4.8H20.6a1.8,1.8,0,0,1,0-3.6H23a1.8,1.8,0,0,1,0,3.6Z"
                        transform="translate(129.5 288.185)"
                        fill="#ccd0db"
                      />
                      <path
                        id="Path_10939"
                        data-name="Path 10939"
                        d="M132.238,12.161a2.221,2.221,0,0,0-1.151-1.151,2.069,2.069,0,0,0-.844-.174h-4.409v5.17h-.644v.95h.644v.89h1.85v-.89h.7v-.95h-.7V12.6a.394.394,0,0,1,.106-.278.354.354,0,0,1,.271-.113h1.73a.8.8,0,1,1,0,1.595h-.511a.59.59,0,0,0-.294.053.8.8,0,0,0-.2.248l-.557,1.084h2.016a2.05,2.05,0,0,0,.844-.174,2.2,2.2,0,0,0,1.151-1.158A2.119,2.119,0,0,0,132.41,13a2.063,2.063,0,0,0-.173-.842"
                        transform="translate(11.09 290.766)"
                        fill="#ccd0db"
                      />
                    </g>
                  </svg>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
