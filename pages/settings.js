import React from "react";
import Settings from "../Component/Settings";
// import {getSession} from 'next-auth/react'
import Head from "next/head";

const settings = () => {
  return (
    <div>
      <Head>
        <title>Get Started</title>
      </Head>

      <Settings />
    </div>
  );
};
export default settings;

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
