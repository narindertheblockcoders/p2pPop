import React from "react";
// import {getSession} from 'next-auth/react'
import Head from "next/head";
import Direct from "../Component/Direct";

const direct = () => {
  return (
    <div>
      <Direct />
    </div>
  );
};
export default direct;

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (session) {
//     return {
//       redirect: {
//         destination: "/dashboard",
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
