import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

export default function ChooseCarousle() {
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
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className="swiper-circle-section">
            <div className="leftImg-carousleSec-head">
              <div className="leftImg-carousleSec">
                <img src="disable-img.svg" />
              </div>
            </div>

            <div className="centerImg-carousleSec-head">
              <div className="centerImg-carousleSec">
                <img src="3.svg" />
              </div>
            </div>

            <div className="rightImg-carousleSec-head">
              <div className="rightImg-carousleSec">
                <img src="disable-img.svg" />
              </div>
            </div>
          </div>
          <div class="Idea">
            <h6>THE IDEA</h6>
            <p>
              P2P.help is a leading-edge helping system. Being the only one of
              its kind, the prominent feature of this system is the user
              initially becomes a Giver and on the subsequent step the same user
              will be transformed into the Receiver.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-circle-section">
            <div className="leftImg-carousleSec-head">
              <div className="leftImg-carousleSec">
                <img src="disable-img.svg" />
              </div>
            </div>

            <div className="centerImg-carousleSec-head">
              <div className="centerImg-carousleSec">
                <img src="3.svg" />
              </div>
            </div>

            <div className="rightImg-carousleSec-head">
              <div className="rightImg-carousleSec">
                <img src="disable-img.svg" />
              </div>
            </div>
          </div>
          <div class="Idea">
            <h6>OPEN PLATFORM</h6>
            <p>
              Through this platform, users around the globe can come together to
              make and receive help by creating their own network. This is the
              platform where all the kind hearts can get together and benefit
              from each other
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-circle-section">
            <div className="leftImg-carousleSec-head">
              <div className="leftImg-carousleSec">
                <img src="disable-img.svg" />
              </div>
            </div>

            <div className="centerImg-carousleSec-head">
              <div className="centerImg-carousleSec">
                <img src="3.svg" />
              </div>
            </div>

            <div className="rightImg-carousleSec-head">
              <div className="rightImg-carousleSec">
                <img src="disable-img.svg" />
              </div>
            </div>
          </div>
          <div class="Idea">
            <h6>SMART DASHBOARD</h6>
            <p>
              User can access their information from the dashboard which makes
              the information easier to understand and grasp. It provides
              at-a-glance visibility of all the relevant information.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-circle-section">
            <div className="leftImg-carousleSec-head">
              <div className="leftImg-carousleSec">
                <img src="disable-img.svg" />
              </div>
            </div>

            <div className="centerImg-carousleSec-head">
              <div className="centerImg-carousleSec">
                <img src="3.svg" />
              </div>
            </div>

            <div className="rightImg-carousleSec-head">
              <div className="rightImg-carousleSec">
                <img src="disable-img.svg" />
              </div>
            </div>
          </div>
          <div class="Idea">
            <h6>EASY TRANSACTIONS</h6>
            <p>
              We accept donations in multiple currencies from anywhere in the
              world hence making the whole experience hassle free.
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
