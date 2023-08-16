import React from "react";
import Genealogy from "../Component/Genealogy";

const genealogy = (props) => {
  
  return (
    <div className="headDiv treeColorDiv">
      <div className={props?.props?.propsAbsolute == true ?"headjn-treeColor-divunset":"headjn-treeColor-div"}>
        <Genealogy
          props={props}

          // nameWallet={props?.nameWallet}
          // setNameWallet={props?.setNameWallet}
        />
      </div>
    </div>
  );
};

export default genealogy;
