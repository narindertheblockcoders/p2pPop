import React from "react";
import Dashboard from "../Component/Dashboard";
// import {getSession} from 'next-auth/react'
import Head from "next/head";

const dashboard = () => {
  return (
    <div>
      <Head>
        <title>Get Started</title>
      </Head>

      <Dashboard />
    </div>
  );
};
export default dashboard;

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
