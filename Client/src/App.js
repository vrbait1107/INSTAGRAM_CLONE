import React from "react";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./App.scss";
import NavBar from "./components/NavBar";
import CreatePost from "./components/CreatePost";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/Profile" component={Profile} />
        <Route path="/CreatePost" component={CreatePost} />
        <Profile />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
