import React from "react";
// import {getSession} from 'next-auth/react'
import Privacy  from "../Component/ui/privacy"

const openCamera = () => {
  return (
    <div>
      <Privacy />
    </div>
  );
};
export default openCamera;

// export async function getServerSideProps(context) {
//   conTabsession = await getSession(context)
//   if (session) {
//     return {
//       redirect: {3000
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
