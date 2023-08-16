import React from "react";
import Approve from "../Component/Approve";
// import {getSession} from 'next-auth/react'
import Head from "next/head";

const approve = () => {
  return (
    <div>
      <Head>
        <title>Get Started</title>
      </Head>

      <Approve />
    </div>
  );
};
export default approve;
