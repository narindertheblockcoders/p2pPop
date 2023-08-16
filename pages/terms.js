import React from "react";
// import {getSession} from 'next-auth/react'
import Terms  from "../Component/ui/Terms"

const openCamera = () => {
  return (
    <div>
      <Terms />
    </div>
  );
};
export default openCamera;

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
