import React from "react";
import Link from "next/link";

export default function getStarted() {
  return (
    <section class="get-started">
      <div class="getstarted-arrow">
        <Link href="/">
          <img src="/arrow-left.png" alt="" style={{ cursor: "pointer" }} />
        </Link>
      </div>
      <div class="container">
        <div class="getstarted-text">
          <h2>
            Let's <span>Get Started</span>
          </h2>
          <p>There are 2 simple steps to complete the new account process</p>
        </div>
        <div class="getstarted-icons">
          {/* <div class="getstarted-row1">
            <div class="aaaaa">
              <img src="/human_recogonition.png" alt="" />
            </div>
            <span>Human Recognition</span>
          </div> */}
          <div class="getstarted-row1">
            <div class="aaaaa">
              <img src="/handshake.png" alt="" />
            </div>
            <span>Reference Detail</span>
          </div>
          <div class="getstarted-row1">
            <div class="aaaaa">
              <img src="/hand_carrying_p2p.png" alt="" />
            </div>
            <span>Make Transaction</span>
          </div>
        </div>
        <div class="getstarted-btn">
          <Link href="tabsLink">
            <button class="proceed">Proceed</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
