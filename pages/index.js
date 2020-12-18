import { Container } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectsList from "../components/ProjectsList";
import useStore from "../Store/Store";

const Home = () => {
  const projects = useStore((s) => s.projects);

  return (
    <div className="container">
      <Head>
        <title>Hello there</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <ProjectsList />
      <Footer />
    </div>
  );
};

export default Home;
