import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SemiCircleProgress from "react-progressbar-semicircle";

const FirstBar = (props) => {
  const [rightTeam, setRightTeam] = useState();
  const [leftTeam, setLeftTeam] = useState();
  

  useEffect(() => {
    teamCountFn();
  }, [props]);
  function teamCountFn() {
    if (props?.totalLeftCount > props?.totalRightCount) {
      setLeftTeam(100);
      let total = (props?.totalRightCount / props?.totalLeftCount) * 100;
      setRightTeam(total);
      return;
    }

    if (props?.totalRightCount > props?.totalLeftCount) {
      setRightTeam(100);
      let total = (props?.totalLeftCount / props?.totalRightCount) * 100;
      setLeftTeam(total);
      return;
    }

    if (props?.totalRightCount == props?.totalLeftCount) {
      if (props?.totalRightCount == 0 && props?.totalLeftCount == 0) {
        setLeftTeam(0);
        setRightTeam(0);
        return;
      }
      setRightTeam(100);
      setLeftTeam(100);
      return;
    }
  }
  return (
    <>
      <div class="progress-container">
        <SemiCircleProgress
          percentage={rightTeam}
          //  showPercentValue
          diameter={200}
          stroke={"#285BA1"}
          strokeWidth={12}
          background={"#141619"}
          className="double-border"
        ></SemiCircleProgress>
        <div className="circleText">{props?.text?.name?.slice(0, 7)}</div>
        <div className="circleText" id="arrow-circleText">
          {/* <i class="bi bi-chevron-up"></i> */}
        </div>

        <SemiCircleProgress
          percentage={leftTeam}
          //  showPercentValue
          diameter={200}
          stroke={"#285BA1"}
          background={"#141619"}
          bopxShadow={"inset 0px 0px 20px #000000"}
          strokeWidth={12}

          // text={"Rishi"}
        />
      </div>

      <div class="progress-container" id="second-progreesss">
        <SemiCircleProgress
          percentage={0}
          //  showPercentValue
          diameter={150}
          stroke={"#F3B755"}
          strokeWidth={12}
          background={"#141619"}
        />
        <SemiCircleProgress
          percentage={0}
          //  showPercentValue
          diameter={150}
          stroke={"#F3B755"}
          background={"#141619"}
          strokeWidth={12}
        />
      </div>
    </>
  );
};

export default FirstBar;
