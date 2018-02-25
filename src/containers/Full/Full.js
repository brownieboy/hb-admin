import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";
import Breadcrumb from "../../components/Breadcrumb/";
import Aside from "../../components/Aside/";
import Footer from "../../components/Footer/";

import Dashboard from "../../views/Dashboard/";
import Bands from "../../views/bands-conn.js";
import Schedule from "../../views/schedule-conn.js";
import HomePage from "../../views/homepage.js";
import Stages from "../../views/stages-conn.js";

import StageForm from "../../containers/stage-form-conn.js";

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route
                  path="/dashboard"
                  name="Dashboard"
                  component={Dashboard}
                />
                <Route path="/homepage" name="HomePage" component={HomePage} />
                <Route path="/bands" name="Bands" component={Bands} />
                <Route path="/schedule" name="Schedule" component={Schedule} />
                <Route path="/stages" name="Stages" component={Stages} />
                <Route
                  path="/stageform"
                  name="StageForm"
                  component={StageForm}
                />

                <Redirect from="/" to="/homepage" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
