import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SemiCircleProgress from "react-progressbar-semicircle";

const FirstBar = (props) => {
  const [rightTeam, setRightTeam] = useState();
  const [leftTeam, setLeftTeam] = useState();
  const [name, setName] = useState(props?.text?.node?.name)
  const[wallet, setWallet] = useState(props?.text?.node?.address)
  
  
  const gradient = "linear-gradient(to right, #ff0000, #00ff00)";
  const boxShadow = "inset 0px 0px 20px #000000";
  const border = "0.5px solid #777d85";

  useEffect(() => {
    teamCountFn();
  }, [props]);
  // const rightCount = props?.text?.totalRightCount * 100;
  function teamCountFn() {
    if (props.text.totalLeftCount > props?.text?.totalRightCount) {
      setLeftTeam(100);
      let total =
        (props.text.totalRightCount / props.text?.totalLeftCount) * 100;
      setRightTeam(total);
      return;
    }

    if (props.text.totalRightCount > props?.text?.totalLeftCount) {
      setRightTeam(100);
      let total =
        (props.text.totalLeftCount / props.text?.totalRightCount) * 100;
      setLeftTeam(total);
      return;
    }

    if (props.text.totalRightCount == props?.text?.totalLeftCount) {
      if (props.text.totalRightCount == 0 && props?.text?.totalLeftCount == 0) {
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
          diameter={97}
          strokeWidth={7}
          background={"#141619"}
          stroke={"#285BA1"}
          className="double-border"
        ></SemiCircleProgress>
        <div className="circleText">
          {/* {props?.text?.node?.name || props?.text?.node?.address?.length > 4 ? props?.text?.node?.address?.slice(38) :
            props?.text?.node?.address?.slice(0,7)} */}
            {name ? name.slice(0,7) : wallet?.length > 4 ? wallet?.slice(38) : wallet}
        </div>
        <div className="circleText" id="arrow-circleText">
          <i class="bi bi-chevron-up"></i>
        </div>

        <SemiCircleProgress
          percentage={leftTeam}
          diameter={97}
          background={"#141619"}
          stroke={"#285BA1"}
          border={border}
          boxShadow={boxShadow}
          strokeWidth={7}
          style={{ webkitTextStrokeColor: "red" }}
        />
      </div>

      <div class="progress-container" id="second-progreess">
        <SemiCircleProgress
          percentage={props?.text?.totalRightStaking}
          diameter={72}
          stroke={"#F3B755"}
          strokeWidth={7}
          background={"#141619"}
        />
        <SemiCircleProgress
          percentage={props?.text?.totalLeftStaking}
          diameter={72}
          stroke={"#F3B755"}
          background={"#141619"}
          strokeWidth={7}
        />
      </div>
    </>
  );
};

export default FirstBar;
