import React from "react";
// import {getSession} from 'next-auth/react'
import Head from "next/head";
import Matching from "../Component/Matching";

const level = () => {
  return (
    <div>
      <Matching />
    </div>
  );
};
export default level;

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
