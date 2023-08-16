import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

function FeaturesCarousle() {
  return (
    <>
      <section id="carousel1">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          <div className="main Div">
            <div className="container">
              <SwiperSlide>
                <div className="firstDiv">
                  <div className="firstImage">
                    <img src="carousel-1.png" className="image1" alt="image1" />
                  </div>
                  <h2>Clean And Modern Design</h2>
                  <hr />
                  <div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="secondDiv">
                  <div className="firstImage">
                    <img src="carousel-2.png" className="image2" alt="image1" />
                  </div>
                  <h2>Easy Fund Raising</h2>
                  <hr />
                  <div>
                    <p>
                    After onboarding, user can raise funds immediately by inviting more donors. It encourages everyone to build a network of people who like to help.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="thirdDiv">
                  <div className="firstImage">
                    <img src="carousel-3.png" className="image3" alt="image1" />
                  </div>
                  <h2>Decentralized Process</h2>
                  <hr />
                  <div>
                    <p>
                    Help goes directly into the account of the user and there is no other interference. All P2PBit transactions between donors and receiver are completed using blockchain technolog
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="fourthDiv">
                  <div className="firstImage">
                    <img src="carousel-4.png" className="image4" alt="image1" />
                  </div>
                  <h2>Creating Network</h2>
                  <hr />
                  <div>
                    <p>
                    It’s an open platform for like-minded people . To make your network wider, you can invite people from anywhere, to raise as much funds as you need.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </div>
        </Swiper>
      </section>
    </>
  );
}

export default FeaturesCarousle;
