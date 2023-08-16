import React from "react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CloudWatchLogs } from "aws-sdk";

export default function getStarted() {
  const [referralCode, setReferralCode] = useState();
  const [getAddedReferralCode, setGetAddedReferralCoe] = useState();

  useEffect(() => {
    setReferralCode(localStorage.getItem("code"));
    const referralCode1 = localStorage.getItem("addedReferral");
    
    // formSubmitHandler();
    // getDistributionData(referralCode1);
  }, []);

  async function getDistributionData(referralCode1) {
    try {
      let res = await axios.post("/api/getDistributionData", {
        referral: referralCode1,
      });
      first;
      const response = res.data;
      
    } catch (err) {
      
    }
  }

  // async function formSubmitHandler() {
  //   const data = {
  //     referral: getAddedReferralCode,
  //   };
  //   
  //   getDistributionData(data);
  // }

  

  return (
    <section class="awesome">
      <div class="container">
        <div class="awesome-box">
          <div class="awesome-head">
            <img src="/succesfull_payment.gif" alt="" />
            <h2>
              You are <span>Awesome !</span>
            </h2>
            <p>
              With your help, you've just supported others to fulfilling their
              dreams.
            </p>
            <Link href="/dashboard">
              <button class="go">Go to Dashboard</button>
            </Link>
          </div>
          <div class="awesome-content">
            <h2>Refer to Earn</h2>
            <p>
              Now, you can invite others by sharing your Reference Code or
              Reference Link.
            </p>
            <label for="" class="awesome-label">
              Reference Code
            </label>
            <div class="awesome-row">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  // placeholder="123456"
                  value={referralCode}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span class="input-group-text" id="basic-addon2">
                  <img src="/copy.png" alt="" />
                </span>
              </div>
              <div class="share">
                <img src="/share.png" alt="" />
              </div>
            </div>
            <label for="" class="awesome-label">
              Reference Link
            </label>
            <div class="awesome-row">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="p2p.help/...."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span class="input-group-text" id="basic-addon2">
                  <img src="/copy.png" alt="" />
                </span>
              </div>
              <div class="share">
                <img src="/share.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
