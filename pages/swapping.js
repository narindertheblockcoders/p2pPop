import React from "react";
// import {getSession} from 'next-auth/react'
import Swapping from "../Component/Swapping";

const openCamera = () => {
  return (
    <div>
      <Swapping />
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
