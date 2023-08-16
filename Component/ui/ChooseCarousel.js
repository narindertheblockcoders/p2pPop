import React, { useEffect } from "react";
import Swiper from "swiper";
import 'swiper/swiper-bundle.css';


export default function ChooseCarousel() {

  // useEffect(() => {
  //   const swiper = new Swiper(".swiper", {
  //     effect: "coverflow",
  //     grabCursor: true,
  //     // centeredSlides: true,
  //     coverflowEffect: {
  //       rotate: 0,
  //       stretch: 0,
  //       depth: 100,
  //       modifier: 3,
  //       slideShadows: true,
  //     },
  //     // loop: true,
  //     pagination: {
  //       el: ".swiper-pagination",
  //       clickable: true,
  //     },
  //     breakpoints: {
  //       640: {
  //         slidesPerView: 2,
  //       },
  //       768: {
  //         slidesPerView: 1,
  //       },
  //       1024: {
  //         slidesPerView: 2,
  //       },
  //       1560: {
  //         slidesPerView: 2,
  //       },
  //     },
  //   });

  //   return () => {
  //     swiper?.destroy();
  //   };
  // }, []);




  return (
    <div>
      <main id="swiper-main">
        <div class="swiper  swiper-coverflow swiper-3d swiper-initialized swiper-horizontal swiper-pointer-events swiper-watch-progress">
          <div class="swiper-wrapper" >
            <div className="swiper-slide" id="swiper-slide">
              <div className="card" id="carousel-card">
                <div className="card-img-div">
                  <img src="/carousel-1.png" />
                </div>
                <div className="card-body">
                  <h3 style={{ color: "white" }}>Card </h3>
                  <hr />
                  <p>
                    This web application is designed thoughtfully. Its intuitive
                    and easy to understand. It’s very handy for its users as it
                    provides menu-driven programs and command-driven system.
                  </p>
                </div>
              </div>
            </div>
            <div className="swiper-slide" id="swiper-slide">
              <div className="card" id="carousel-card">
                <div className="card-img-div">
                  <img src="/carousel-2.png" />
                </div>
                <div className="card-body">
                  <h3 style={{ color: "white" }}>Card 1</h3>
                  <hr />
                  <p>
                    This web application is designed thoughtfully. Its intuitive
                    and easy to understand. It’s very handy for its users as it
                    provides menu-driven programs and command-driven system.
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="swiper-slide" id="swiper-slide">
              <div className="card" id="carousel-card">
                <div className="card-img-div">
                  <img src="/carousel-3.png" />
                </div>
                <div className="card-body">
                  <h3 style={{ color: "white" }}>Card 2</h3>
                  <hr />
                  <p>
                    This web application is designed thoughtfully. Its intuitive
                    and easy to understand. It’s very handy for its users as it
                    provides menu-driven programs and command-driven system.
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="swiper-slide" id="swiper-slide">
              <div className="card" id="carousel-card">
              <div className="card-img-div">
                <img src="/carousel-4.png" />
                </div>
                <div className="card-body">
                  <h3 style={{ color: "white" }}>Card 3</h3>
                  <hr />
                  <p>
                    This web application is designed thoughtfully. Its intuitive
                    and easy to understand. It’s very handy for its users as it
                    provides menu-driven programs and command-driven system.
                  </p>
                </div>
              </div>
            </div>
        
            <div className="swiper-slide" id="swiper-slide">
              <div className="card" id="carousel-card">
              <div className="card-img-div">
                <img src="/carousel-4.png" />
                </div>
                <div className="card-body">
                  <h3 style={{ color: "white" }}>Card 3</h3>
                  <hr />
                  <p>
                    This web application is designed thoughtfully. Its intuitive
                    and easy to understand. It’s very handy for its users as it
                    provides menu-driven programs and command-driven system.
                  </p>
                </div>
              </div>
            </div>
        
            <div className="swiper-slide" id="swiper-slide">
              <div className="card" id="carousel-card">
              <div className="card-img-div">
                <img src="/carousel-4.png" />
                </div>
                <div className="card-body">
                  <h3 style={{ color: "white" }}>Card 3</h3>
                  <hr />
                  <p>
                    This web application is designed thoughtfully. Its intuitive
                    and easy to understand. It’s very handy for its users as it
                    provides menu-driven programs and command-driven system.
                  </p>
                </div>
              </div>
            </div>

            <div className="swiper-slide" id="swiper-slide">
              <div className="card" id="carousel-card">
              <div className="card-img-div">
                <img src="/carousel-4.png" />
                </div>
                <div className="card-body">
                  <h3 style={{ color: "white" }}>Card 3</h3>
                  <hr />
                  <p>
                    This web application is designed thoughtfully. Its intuitive
                    and easy to understand. It’s very handy for its users as it
                    provides menu-driven programs and command-driven system.
                  </p>
                </div>
              </div>
            </div>


          </div>
          <div class="swiper-pagination">
            {/* I'm here for center */}
            </div>
        </div>

      </main>
    </div>
  );
}
