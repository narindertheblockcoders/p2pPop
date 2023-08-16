import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const WalletChange = () => {
  const [updateAddress, setUpdateAddress] = useState();
  const [getAddress, setGetAddress] = useState();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [same, setSame] = useState(false);
  const router = useRouter(); 

  async function getCurrentWallet() {
    setOpen(true);
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("api/getAddress", {
        token: token,
      });
      const response = res.data;
      
      setGetAddress(response.data.data);
      setOpen(false);
    } catch (err) {
      
      setOpen(false);
    }
  }

  useEffect(() => {
    getCurrentWallet();
  }, []);

  async function updateCurrentWallet(data) {
    setOpen(true);
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("api/updateAddress", { token: token, data });
      const response = res.data;
      
      toast.success("wallet Address updated successfully");
      setOpen(false);
      setTimeout(() => {
        router.push("/settings");
      }, 100);
    } catch (err) {
      
      setOpen(false);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    setError(true);
    setSame(true);

    if (getAddress == updateAddress) {
      setSame(true);
      setError(false);
      return;
    }

    if (updateAddress.trim().length > 42 || updateAddress.trim().length < 42) {
      setSame(false);
      setError(true);
      return;
    }
    const data = {
      address: updateAddress,
    };
    
    setSame(false);
    setError(false);
    updateCurrentWallet(data);
  }

  return (
    <div>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section class="e-wallet personal">
        <ToastContainer />
        <div class="container">
          <div class="personal-head mb-4">
            <div class="personalhead-left">
              <Link href="/dashboard">
                <img src="/personal-arrow.png" alt="" />
              </Link>
            </div>
            <div class="personalhead-mid">WALLET CHANGE</div>
            <div class="personalhead-right">
              {/* <img src="/personal-edit.png" alt="" /> */}
            </div>
          </div>

          <div className="walletChange-div">
            <div className="wallet-change">
              <input
                type="text"
                placeholder="Enter Address"
                className="walletInput"
                value={getAddress}
                disabled
              ></input>

              <input
                type="text"
                placeholder="Enter Address"
                className="walletInput"
                value={updateAddress}
                onChange={(e) => setUpdateAddress(e.target.value)}
              ></input>

              {error && (
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  "Invalid Wallet Address"
                </p>
              )}
              {same && (
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  "Current and New wallet Address should not be same"
                </p>
              )}

              <div className="walletBtn-div">
                <button
                  type="button"
                  className="wallet-submitBtn"
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WalletChange;
