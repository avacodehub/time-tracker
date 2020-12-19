import Head from "next/head";
import Header from "../components/Header";
import ProjectsList from "../components/ProjectsList";

const Home = () => {

  return (
    <div className="container">
      <Head>
        <title>Time Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <ProjectsList />
    </div>
  );
};

export default Home;
