import React from "react";
import TabsLink from "../Component/TabsLink";
// import  {getSession} from 'next-auth/react'
import Head from "next/head";

const tabsLink = () => {
  return (
    <div>
      <TabsLink />
    </div>
  );
};
export default tabsLink;

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
