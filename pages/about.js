import React from "react";
import Head from "next/head";

import Header from "../components/Header";

export default function About() {
  return (
    <div className="container">
      <Head>
        <title>Time Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <p>TODO</p>
    </div>
  );
}
