import "./App.css";
import Home from "./components/";
import CssBaseline from "@material-ui/core/CssBaseline";
import Portfolio from "./components/Portfolio";
import { Route, Switch } from "react-router-dom";
import React from "react";

function App() {
  return (
    <>
      <CssBaseline />

      <Switch>
        <Route path="/about" exact component={Home} />
        <Route path="/portfolio" exact component={Portfolio} />
        <Route path="/contact" exact component={Home} />
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  );
}

export default App;
