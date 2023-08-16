import React from "react";
// import {getSession} from 'next-auth/react'
import Cookies from "../Component/ui/Cookies";

const openCamera = () => {
  return (
    <div>
      <Cookies />
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
