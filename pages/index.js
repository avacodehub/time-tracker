import { Container } from "@chakra-ui/react";
import Head from "next/head";
import ProjectsList from "../components/ProjectsList";
import useStore from '../Store/Store'

const Home = () => {
  const projects = useStore(s => s.projects)

  

  return (
    <Container maxW="100%" centerContent>
      <Head>
        <title>Hello there</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <ProjectsList />


    </Container>
  );
}

export default Home