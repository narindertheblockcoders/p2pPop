import React from "react";
import GetStarted from "../Component/GetStarted";
// import {getSession} from 'next-auth/react'
import Head from "next/head";

const getStarted = () => {
  return (
    <div>
      <Head>
        <title>Get Started</title>
      </Head>

      <GetStarted />
    </div>
  );
};
export default getStarted;

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
