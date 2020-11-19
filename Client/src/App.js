import React, { createContext, useReducer, useEffect, useContext } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import "./App.scss";
import NavBar from "./components/NavBar";
import CreatePost from "./components/CreatePost";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { reducer, intialState } from "./reducer/reducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/");
    } else {
      history.push("/Login");
    }
  }, []);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Login" component={Login} />
      <Route path="/Register" component={Register} />
      <Route path="/CreatePost" component={CreatePost} />
      <Route path="/Profile/:username" component={UserProfile} />
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, intialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
