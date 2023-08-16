import Link from "next/link";
import React, { useEffect } from "react";

export default function Tabs() {
  return (
    <section class="started-tabs">
      <div class="container">
        <div class="tabs-main">
          <ul class="nav nav-pills" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active imp-btn"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                disabled
              >
                1
              </button>
            </li>
            <li class="nav-item" role="presentation" id="line-imp">
              <button
                class="nav-link imp-btn"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                disabled
              >
                2
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link imp-btn"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
                disabled
              >
                3
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabindex="0"
            >
              <div class="container" id="human-idiotbox">
                <div class="human-head">
                  <h2>
                    Human <span>Recognition</span>
                  </h2>
                  <p>
                    This is used to ensure the safety and security of your
                    account
                  </p>
                </div>
                <div class="human-box">
                  <div class="human-image">
                    <img src="/big_human_recogonition.png" alt="" />
                  </div>
                  <div class="human-text">
                    <h5>Please Follow there instructions :</h5>
                    <ul>
                      <li>
                        Make sure you are in well lit area and both eyes are
                        uncovered.
                      </li>
                      <li>
                        Hold your phone at eye level. Look straight into the
                        camera.
                      </li>
                      <li>
                        Gently move your head where the white lines indicate to
                        complete the human recognition.
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="human-button">
                  <Link href="tabsLink">
                    <button class="open-camera">
                      {/* <a href="tabs-link.html" class="camera-btn"> */}
                      Proceed
                      {/* </a> */}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
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
                  <form>
                    <div class="mb-3" id="refrence-input">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Enter wallet address / reference code"
                      />
                    </div>
                  </form>
                </div>
                <div class="refrence-button">
                  <button class="next">Validate</button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
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
                    <span>X.XXXX</span>
                    P2PBIT.
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
                  <button
                    type="button"
                    class="btn btn-primary make-proceed"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Proceed
                  </button>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
