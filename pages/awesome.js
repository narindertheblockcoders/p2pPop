import React from "react";
import Awesome from "../Component/Awesome";
// import {getSession} from 'next-auth/react'
import Head from "next/head";

const awesome = () => {
  return (
    <div>
      <Head>
        <title>Get Started</title>
      </Head>

      <Awesome />
    </div>
  );
};
export default awesome;

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
