import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import About from "./About";
import Contact from "./Contact";

import NoiseMorph from "./THREE/NoiseMorph";

/*eslint-disable */

const Home = ({ location }) => {
  useEffect(() => {
    new NoiseMorph();
  }, []);

  let renderedPage;
  if (location.pathname === "/") renderedPage = <Header />;
  else if (location.pathname === "/about") renderedPage = <About />;
  else if (location.pathname === "/contact") renderedPage = <Contact />;
  else renderedPage = <Header />;
  return (
    <div>
      <Navbar />

      {renderedPage}
      <div id="noisemorphcontainer"></div>
    </div>
  );
};

export default Home;
