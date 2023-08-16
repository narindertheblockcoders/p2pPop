// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import $ from "jquery";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useAccount, useDisconnect } from "wagmi";
// import Web3 from "web3";
// if (typeof window !== "undefined") {
//   const web3 = new Web3(window.ethereum);
// }

// export default function Settings() {
//   /*This state is used for set the fa status of the user */
//   const [faStatus, setFaStatus] = useState();

//   /*useDisconnect is used to cdisonnect the wallet used in the handle disconnect function  */
//   // const { disconnect } = useDisconnect();

//   // async function jQueryFunction() {
//   //   $(document).on("click", "ul li", function () {
//   //     $(this).addClass("active").siblings().removeClass("active");
//   //   });
//   // }

//   /*This funciton is used to check the two factor authentication of the user
//   whether 2fa is enabled or not  shows the current status of 2fa of user */
//   // async function getFaStatus() {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     
//   //     let res = await axios.post("/api/getFaStatus", {
//   //       token: token,
//   //     });
//   //     const response = res.data;
//   //     
//   //     setFaStatus(response.data.data.fa);
//   //   } catch (err) {
//   //     
//   //   }
//   // }

//   // useEffect(() => {
//   //   jQueryFunction();
//   //   getFaStatus();
//   // }, []);

//   /*This function is used for logout used on the logout button at this page to
//   disconnect the wallet and  move the index page  while clearing localStorage */
//   // const handleDisconnect = async () => {
//   //   window.location.href = "/";
//   //   window.localStorage.clear();
//   //   disconnect();
//   // };

//   return (
//     <>
//       <section class="dashboard">
//         <div class="dashboard-left">
//           <div class="dash-navhead">
//             <a class="dashnav-a" href="index.html">
//               {" "}
//               <img src="/logo192-removebg-preview.png" alt="" />
//               P2P.Help
//             </a>
//           </div>
//           <div class="dash-navmid">
//             <ul>
//               <li>
//                 <a href="">
//                   {" "}
//                   <img src="/user.png" alt="" />
//                   Dashboard
//                 </a>
//               </li>
//               <li>
//                 <a href="">
//                   {" "}
//                   <img src="/wallet.png" alt="" /> Genealogy
//                 </a>
//               </li>
//               <li class="nav-item dropdown">
//                 <a
//                   class="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <img src="/user.png" alt="" />
//                   Rewards
//                 </a>
//                 <ul class="dropdown-menu">
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <hr class="dropdown-divider" />
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li class="nav-item dropdown">
//                 <a
//                   class="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <img src="/user.png" alt="" /> Stake
//                 </a>
//                 <ul class="dropdown-menu">
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <hr class="dropdown-divider" />
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <a href="">
//                   <img src="/wallet.png" alt="" />E - Wallet
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div class="dash-navmid2">
//             <ul>
//               <li class="nav-item dropdown">
//                 <a
//                   class="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <img src="/user.png" alt="" />
//                   Settings
//                 </a>
//                 <ul class="dropdown-menu">
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <hr class="dropdown-divider" />
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <a href="">
//                   {" "}
//                   <img src="/wallet.png" alt="" />
//                   Logout
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div class="dash-navbottom">
//             <a href="">
//               {" "}
//               <img src="/dash-btn.png" alt="" /> <span>abcd******jhkl</span>
//             </a>
//           </div>
//         </div>
//         <div class="dashboard-right">
//           <div class="container-fluid">
//             <div class="dashboard-head">
//               <h2>Two factor Authentication</h2>
//             </div>
//             <div class="two-factors">
//               <div class="factorlower-left">Turn on 2FA</div>
//               <div class="factorlower-right">
//                 <label class="switch">
//                   <input type="checkbox" />
//                   <span class="slider round"></span>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
