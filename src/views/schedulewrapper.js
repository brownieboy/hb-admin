import React, { Component } from "react";

import ScheduleConn from "./schedule-conn.js";

class ScheduleWrapper extends Component {
  render() {
    return (
      <div>
        <h1>ScheduleWrapper</h1>
        <ScheduleConn />
      </div>
    );
  }
}

export default ScheduleWrapper;
