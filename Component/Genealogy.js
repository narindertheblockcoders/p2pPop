import React, { useEffect, useState } from "react";
import axios from "axios";
import FirstBar from "./FirstBar";
import SecondBars from "./SecondBars";

let id;
const Node = ({ node, onClick, totalLeftCount, totalRightCount, name, userDetail,setUserDetail, setUsers,   absolute,
  setPropsAbsolute, }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(node);
  const [childId, setChildId] = useState();

  
  

  async function getChildren() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/children", {
        token: token,
        userId: node.id,
      });
      const response = res.data;
      setChildId(response.data.data.children[0]?.id);
      if (
        response.data.data.children[0]?.id == "0" &&
        response.data.data.children[1]?.id == "0"
      ) {
        return;
      }
      setView(response.data.data);
      setPropsAbsolute(true);
      absolute(true);
    } catch (err) {
      
    }
  }


  const handleClick = () => {
    // setClicking(true);
    getChildren();
    setIsOpen(!isOpen);
    onClick(" ");
    onClick(view);
  };



  return (
    <div className="topHead">
      <div className="HeaderCircleSection">
        <div className="tree-section-divider">
          <div style={{ cursor: "pointer" }} onClick={handleClick}>
            {id == view?.id && node?.id ? (
              <FirstBar
                text={{ node, totalLeftCount, totalRightCount, name }}
              />
            ) : (
              <SecondBars
                text={{ node, totalLeftCount, totalRightCount, name }}
              />
            )}
          </div>
          {isOpen && view?.children && view?.children?.length > 0 && (
            <>
              <div
                className="two-trees"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  color: "black",
                  // float:"left",
                  // width:"100%"
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div className="line-section">
                  <div className="left-line"></div>
                  <div className="right-line"></div>
                </div>
                <div className="node-div">
                  {view?.children?.map((childNode) => (
                    <Node key={childNode} node={childNode} onClick={onClick} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Tree = ({ data, onClick, totalLeftCount, totalRightCount, name, setUserDetail ,userDetail, setUsers,   absolute,
  setPropsAbsolute,}) => {

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {data.map((node) => (
        <Node
          key={node.id}
          node={node}
          onClick={onClick}
          totalLeftCount={totalLeftCount}
          totalRightCount={totalRightCount}
          name={name}
          absolute={absolute}
          setPropsAbsolute={setPropsAbsolute}
        />
      ))}
    </div>
  );
};

const App = (props) => {
  const [treeData, setTreeData] = useState([]);
  const [userDetail, setUserDetail] = useState();
  const [absolute, setAbsolute] = useState(false);

  
  
  const getTreeStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      let res = await axios.post("/api/tree", { token: token });
      const response = res.data;
      
      setTreeData(response?.data?.data);
    } catch (err) {
      
    }
  };

  useEffect(() => {
    getTreeStatus();
    
  }, [props?.props?.porps?.added]);

  const handleNodeClick = (node) => {
    
    
    id = `${node?.id}`;
    props?.props?.props.setChildName(node?.name);
    props?.props?.props.setChildWallet(node?.address);

    getUserStatus();
  };

  async function getUserStatus() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/getUserStatus", { token: token });
      const response = res.data;
      setUserDetail(response.data.data);
    } catch (err) {
      
    }
  }

  useEffect(() => {
    getUserStatus();
  }, []);

  return (
    <div>
      <Tree
        data={props.props.props.treeData || treeData}
        onClick={handleNodeClick}
        totalLeftCount={userDetail?.totalLeftCount}
        totalRightCount={userDetail?.totalRightCount}
        name={userDetail?.userDetail[0]?.firstName}
        absolute={setAbsolute}
        setPropsAbsolute={props.props.props?.setPropsAbsolute}
      />
    </div>
  );
};

export default App;
