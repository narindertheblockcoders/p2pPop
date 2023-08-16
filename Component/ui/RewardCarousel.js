import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

export default function RewardCarousle() {
  useEffect(() => {
    let swiper = null;
    try {
      swiper = new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        // centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        },
        // loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1560: {
            slidesPerView: 4,
          },
        },
      });
    } catch (error) {
    }

    return () => {
      if (swiper) {
        try {
          swiper.destroy();
        } catch (error) {
        }
      }
    };
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className="swiper-circle-section">
            <div className="leftImg-carousleSec-head">
              <div className="leftImg-carousleSec">
                <img src="Smart Binary.png" />
              </div>
            </div>

            <div className="centerImg-carousleSec-head">
              <div className="centerImg-carousleSec">
                <img className="reward-circle-img" src="Direct Reward.png" />
              </div>
            </div>

            <div className="rightImg-carousleSec-head">
              <div className="rightImg-carousleSec">
                <img src="Easy Level.png" />
              </div>
            </div>
          </div>
          <div class="Idea">
            <h6>Direct Reward</h6>
            <p>
              About 17% of the tokens you donate are rewarded to the person who
              introduced you to the system.In the same way, you will also be
              rewarded with P2PBIT tokens through your referrals.There is no
              limit , it just depends on how many people you invite. The more
              people you invite, the more you get.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-circle-section">
            <div className="leftImg-carousleSec-head">
              <div className="leftImg-carousleSec">
                <img src="Direct Reward.png" />
              </div>
            </div>

            <div className="centerImg-carousleSec-head">
              <div className="centerImg-carousleSec">
                <img className="reward-circle-img" src="Easy Level.png" />
              </div>
            </div>

            <div className="rightImg-carousleSec-head">
              <div className="rightImg-carousleSec">
                <img src="Smart Binary.png" />
              </div>
            </div>
          </div>
          <div class="Idea">
            <h6>Level Reward</h6>
            <p>
              The network rewards you with $2 for everyone who joins, regardless
              of whether they were invited by you or not. However, it must be
              within 14 levels of you.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-circle-section">
            <div className="leftImg-carousleSec-head">
              <div className="leftImg-carousleSec">
                <img src="Easy Level.png" />
              </div>
            </div>

            <div className="centerImg-carousleSec-head">
              <div className="centerImg-carousleSec">
                <img className="reward-circle-img" src="Smart Binary.png" />
              </div>
            </div>

            <div className="rightImg-carousleSec-head">
              <div className="rightImg-carousleSec">
                <img src="Direct Reward.png" />
              </div>
            </div>
          </div>
          <div class="Idea">
            <h6>Matching reward</h6>
            <p>
              A third type of reward is matching reward , which you earn when a
              1:1 pair is formed below you. If the number of people you referred
              on your left is equal to the number of people on your right. you
              are entitled to earn this reward.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* 
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <div className="swiper-button-next slider-arrow">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>
        <div className="swiper-pagination"></div>
      </div> */}
    </>
  );
}
