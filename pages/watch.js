import Header from "../components/Header";
import WatchList from "../components/WatchList";
import Head from "next/head";

const Watch = () => {

  return (
    <div className="container">
      <Head>
        <title>Time Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <WatchList />
    </div>
  );
};

export default Watch;
