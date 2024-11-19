import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Lessons from "./components/Lessons";
import Profile from "./components/Profile";
import Tutorials from "./components/Tutorials";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/start-learning" component={Lessons} />
            <Route path="/tutorials" component={Tutorials} />
            <Route path="/about-us" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/my-profile" component={Profile} />
            <Route path="*" component={() => <div>404 Not Found</div>} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
