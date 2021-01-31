import Home from "./component/home/Home";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import HomeNavBar from "./component/home/navbar-home/HomeNavBar";
import Login from "./component/home/login/Login";
import SignUp from "./component/home/login/SignUp";
import AppNavBar from "./component/app/navbar-app/AppNavBar";
import AppHome from "./component/app/AppHome";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <HomeNavBar />
          <Home />
        </Route>
        <Route path="/login">
          <HomeNavBar />
          <Login />
        </Route>
        <Route path="/signup">
          <HomeNavBar />
          <SignUp />
        </Route>
        <Route path="/app">
          <AppNavBar />
          <AppHome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
