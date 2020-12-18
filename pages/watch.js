import { Container } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WatchList from "../components/WatchList";

const Watch = () => {
  // const projects = useStore(s => s.projects)

  return (
    <div className="container">
      {/* <Head>
        <title>Hello there</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
       */}
      <Header />
      <WatchList />
      <Footer />
    </div>
  );
};

export default Watch;
