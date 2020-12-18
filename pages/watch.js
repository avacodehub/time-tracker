import { Container } from "@chakra-ui/react";
import Header from "../components/Header";
import WatchList from "../components/WatchList";

const Watch = () => {
  // const projects = useStore(s => s.projects)

  return (
    <Container maxW="100%">
      {/* <Head>
        <title>Hello there</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
       */}
      <Header />
      <h2>Watch</h2>
      <WatchList />
    </Container>
  );
};

export default Watch;
