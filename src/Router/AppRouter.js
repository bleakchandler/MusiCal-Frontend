import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home.js";
import RedirectPage from "../components/RedirectPage.js";
import Dashboard from "../components/Dashboard.js";
import NotFoundPage from "../components/NotFoundPage.js";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/redirect" component={RedirectPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
