import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

export default function Carousel() {


  const [sliedes, setSlides] = useState(false)
  const [sliedesPreview, setSlidesPreview] = useState(3)

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

  useEffect(()=>{
    if (window.innerWidth < 1000) {
      setSlides(true);
      setSlidesPreview(1);
    }
    if (window.innerWidth > 1000) {
      setSlides(false);
      setSlidesPreview(3);
    }
  },[])
  return (
    <section id="carousel1">
      <Swiper
        slidesPerView={sliedesPreview}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        // centeredSlides={true}

        className="mySwiper"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[Pagination, Navigation]} >

        <div className="main Div">
          <div className="container">
            <SwiperSlide>
              <div id="swiper-slide">
                <div className="card" id="carousel-card">
                  <div className="card-img-div">
                    <img src="/carousel-1.png" />
                  </div>
                  <div className="card-body">
                    <h3 style={{ color: "white" }}>Clean And Modern Design </h3>
                    <hr />
                    <p>
                      This web application is designed thoughtfully. Its
                      intuitive and easy to understand. It’s very handy for its
                      users as it provides menu-driven programs and
                      command-driven system.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div id="swiper-slide">
                <div className="card" id="carousel-card">
                  <div className="card-img-div">
                    <img src="/carousel-2.png" />
                  </div>
                  <div className="card-body">
                    <h3 style={{ color: "white" }}>Easy Fund Raising </h3>
                    <hr />
                    <p>
                      After onboarding, user can raise funds immediately by
                      inviting more donors. It encourages everyone to build a
                      network of people who like to help.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div id="swiper-slide">
                <div className="card" id="carousel-card">
                  <div className="card-img-div">
                    <img src="/carousel-3.png" />
                  </div>
                  <div className="card-body">
                    <h3 style={{ color: "white" }}>Decentralized Process </h3>
                    <hr />
                    <p>
                      Help goes directly into the account of the user and there
                      is no other interference. All P2PBit transactions between
                      donors and receiver are completed using blockchain
                      technolog
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div id="swiper-slide">
                <div className="card" id="carousel-card">
                  <div className="card-img-div">
                    <img src="/carousel-4.png" />
                  </div>
                  <div className="card-body">
                    <h3 style={{ color: "white" }}>Creating Network </h3>
                    <hr />
                    <p>
                      It’s an open platform for like-minded people . To make
                      your network wider, you can invite people from anywhere,
                      to raise as much funds as you need.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
        </div>
      </Swiper>
    </section>
  );
}
