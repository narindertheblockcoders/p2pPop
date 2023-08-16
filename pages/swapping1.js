import React from "react";
// import {getSession} from 'next-auth/react'
import Swapping1 from "../Component/Swapping1";

const openCamera = () => {
  return (
    <div>
      <Swapping1 />
    </div>
  );
};
export default openCamera;

// export async function getServerSideProps(context) {
//   conTabsession = await getSession(context)
//   if (session) {
//     return {
//       redirect: {
//         destiTabson: "/dashboard",
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props:{
//       session
//     }
//   }
// }
