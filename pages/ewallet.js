import React from "react";
import Ewallet from "../Component/Ewallet";
// import {getSession} from 'next-auth/react'
import Head from "next/head";

const ewallet = () => {
  return (
    <div>
      <Head>
        <title>Get Started</title>
      </Head>

      <Ewallet />
    </div>
  );
};
export default ewallet;

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
