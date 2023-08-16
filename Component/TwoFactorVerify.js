import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import Link from "next/link";
import { ToastHeader } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function TwoFactor() {
  const [qrImage, setQrImage] = useState();
  const [status, setStatus] = useState(false);
  const [faStatus, setFaStatus] = useState();
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
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();

  async function jQueryFunction() {
    $(document).on("click", "ul li", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  }

  async function getQrCode() {
    setOpen(true);
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/getQrCode", { token: token });
      const response = res.data;
      
      setQrImage(response.data.data);
      
      setOpen(false);
    } catch (err) {
      
      setOpen(false);
    }
  }

  async function verifyQrCode(data) {
    setOpen(false);
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/verifyQrCode", { token: token, data });
      const response = res.data;
      
      // toast.success("Two Factor Enabled Successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
      setIsLoading(false);
      setOpen(false);
    } catch (err) {
      
      setOpen(false);
      setIsLoading(false);
      setTimeout(() => {
        // toast.error("Invalid Credentials");
        setIsLoading(false);
      }, 1500);
    }
  }

  async function getFaStatus() {
    try {
      const token = localStorage.getItem("token");
      
      let res = await axios.post("/api/getFaStatus", {
        token: token,
      });
      const response = res.data;
      
      setFaStatus(response.data.data.fa);
    } catch (err) {
      
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    // if (code1 && code2 && code3 && code4 && code4 && code5 && code6 != NaN) {
    //   toast.error("otp should be of numeric only");
    //   return;
    // }
    const data = {
      otp: `${code1}${code2}${code3}${code4}${code5}${code6}`,
    };
    verifyQrCode(data);
  }

  useEffect(() => {
    getFaStatus();
    getQrCode();
    jQueryFunction();
  }, []);
  

  function handleChangeFn1(e) {
    setCode1(e.target.value);
    num2.current.focus();
  }

  function handleChangeFn2(e) {
    setCode2(e.target.value);
    num3.current.focus();
  }

  function handleChangeFn3(e) {
    setCode3(e.target.value);
    num4.current.focus();
  }

  function handleChangeFn4(e) {
    setCode4(e.target.value);
    num5.current.focus();
  }

  function handleChangeFn5(e) {
    setCode5(e.target.value);
    num6.current.focus();
  }

  function handleChangeFn6(e) {
    setCode6(e.target.value);
    return;
    //  num2.current.focus();
  }

  return (
    <>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <ToastContainer />
      {faStatus == 1 ? (
        <section class="two-factors1">
          <div class="container">
            <div class="twofactor1-head">
              <div class="twohead1-left">
                <Link href="/dashboard">
                  <img src="/personal-arrow.png" alt="" />
                </Link>
              </div>
              <div class="twohead1-right">two factors authentication</div>
              <label class="switch"></label>
              <input
                className="toggleCheck-box"
                type="checkbox"
                checked={faStatus == 1}
              />
              <span class="slider round" />
            </div>
          </div>
        </section>
      ) : (
        <section class="two-factors1">
          <div class="container">
            <div class="twofactor1-head">
              <div class="twohead1-left">
                <Link href="/dashboard">
                  <img src="/personal-arrow.png" alt="" />
                </Link>
              </div>
              <div class="twohead1-right">two factors authentication</div>
              <label class="switch"></label>
              <input
                className="toggleCheck-box"
                type="checkbox"
                checked={faStatus == 1}
              />
              <span class="slider round" />
            </div>

            <div className="scanner-div">
              <img className="scanner-img" src={qrImage?.qrData} />
            </div>
            <div style={{ color: "white" }}>
              <p
                className="iptpara-text"
                style={{
                  fontSize: "14px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  color: "white",
                  wordBreak: "break-all",
                }}
              >
                {qrImage?.base}

                <CopyToClipboard
                  text={qrImage?.base}
                  onCopy={() => toast.success("Copied Successfully")}
                >
                  <img
                    src="/table-copy.png"
                    style={{
                      marginLeft: "10px",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                </CopyToClipboard>
              </p>
            </div>

            <div class="twofactor-content">
              <p>
                We have sent a code to your phone number. Please enter the code
                you received here.
              </p>
              <div class="twofactor-code">
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    // placeholder="1"
                    onChange={(e) => handleChangeFn1(e)}
                    ref={num1}
                    maxLength="1"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    // placeholder="1"
                    onChange={(e) => handleChangeFn2(e)}
                    ref={num2}
                    maxLength="1"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    // placeholder="1"
                    onChange={(e) => handleChangeFn3(e)}
                    ref={num3}
                    maxLength="1"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    // placeholder="1"
                    onChange={(e) => handleChangeFn4(e)}
                    ref={num4}
                    maxLength="1"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    // placeholder="1"
                    onChange={(e) => handleChangeFn5(e)}
                    ref={num5}
                    maxLength="1"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    // placeholder="1"
                    onChange={(e) => handleChangeFn6(e)}
                    ref={num6}
                    maxLength="1"
                  />
                </div>
              </div>
            </div>

            <div className="resend-div">
              <div className="resend-din-sec">
                <button
                  type="button"
                  className="submitBtn"
                  disabled={isLoading}
                  onClick={submitHandler}
                >
                  {isLoading ? "Loading…" : "  Submit"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
