import React from "react";
// import {getSession} from 'next-auth/react'
import Head from "next/head";
import Level from "../Component/Level";

const level = () => {
  return (
    <div>
      <Level />
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
