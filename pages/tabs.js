import React from "react";
import Tabs from "../Component/Tabs";
// import {getSession} from 'next-auth/react'
import Head from "next/head";

const tabs = () => {
  return (
    <div>
   

      <Tabs />
    </div>
  );
};
export default tabs;

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
