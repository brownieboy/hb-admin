import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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

import {
  BandFormNewConn,
  BandFormEditConn
} from "../../containers/band-form-conn.js";
import {
  StageFormNewConn,
  StageFormEditConn
} from "../../containers/stage-form-conn.js";
import {
  ScheduleFormNewConn,
  ScheduleFormEditConn
} from "../../containers/schedule-form-conn.js";

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
                <Route
                  path="/bandform/:id"
                  exact
                  name="BandFormEdit"
                  component={BandFormEditConn}
                />
                <Route
                  path="/bandform"
                  name="BandFormNew"
                  component={BandFormNewConn}
                />
                <Route path="/schedule" name="Schedule" component={Schedule} />
                <Route
                  path="/scheduleform/:id"
                  exact
                  name="ScheduleFormEdit"
                  component={ScheduleFormEditConn}
                />
                <Route
                  path="/scheduleform"
                  name="ScheduleFormNew"
                  component={ScheduleFormNewConn}
                />
                <Route path="/stages" name="Stages" component={Stages} />
                <Route
                  path="/stageform/:id"
                  exact
                  name="StageFormEdit"
                  component={StageFormEditConn}
                />
                <Route
                  path="/stageform"
                  name="StageFormNew"
                  component={StageFormNewConn}
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

// <Route path='/route/:id' exact component={MyComponent} />
