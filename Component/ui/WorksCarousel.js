import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import $ from "jquery";
import "swiper/css";
import "swiper/css/pagination";

export default function WorksCarousel() {
  const [sliedes, setSlides] = useState(false);
  const [sliedesPreview, setSlidesPreview] = useState(4);

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

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setSlides(true);
      setSlidesPreview(2);
    }
    if (window.innerWidth > 1000) {
      setSlides(false);
      setSlidesPreview(4);
    }
  }, []);

  

  return (
    <section className="swiper works-boxes-div">
      <div className="swiper">
        <Swiper
          slidesPerView={sliedesPreview}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          effect={"coverflow"}
          centeredSlides={sliedes}
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide>
            <div className="work-box-section">
              <div className="works-circle-div">
                <h4>1</h4>
              </div>
              <hr></hr>
              <div className="work-box-account">
                <img src="/create account.svg"></img>
                <h3 className="work-card-heading">Create Account</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="work-box-section">
              <div className="work-box-second">
                <img src="/Make Donation.svg"></img>

                <h3 className="work-card-heading">Make Donation</h3>
              </div>
              <hr></hr>

              <div className="works-circle-div">
                <h4>2</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="work-box-section">
              <div className="works-circle-div">
                <h4>3</h4>
              </div>
              <hr></hr>

              <div className="work-box-account">
                <img src="/Invite Donors.svg"></img>
                <h3 className="work-card-heading">Invite Donors</h3>

              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="work-box-section">
              <div className="work-box-second">
                <img src="/Union 26.svg"></img>
                <h3 className="work-card-heading">Receive Fund</h3>

              </div>
              <hr></hr>

              <div className="works-circle-div">
                <h4>4</h4>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
