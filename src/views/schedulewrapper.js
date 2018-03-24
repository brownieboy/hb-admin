import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import { handleCheck as handleCheckExt } from "../components/lifecycleextras.js";
import ScheduleByDayStage from "./schedule-bydaystage.js";
import ScheduleByDay from "./schedule-byday.js";
import ConfirmModal from "../components/confirm-modal.js";
import { buttonsBottomWrapperStyles } from "./viewstyles.js";

class ScheduleWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      showConfirmDeleteModal: false,
      activeTab: "byDay"
    };
    this.handleCheck = handleCheckExt.bind(this);
  }

  handleDeleteItems = () => {
    this.setState({ showConfirmDeleteModal: true });
  };

  componentDidMount() {
    console.log("scheduleWrapper..componentDidMount()");
    const scheduleViewActiveTab = localStorage.getItem("scheduleViewActiveTab");
    if (scheduleViewActiveTab !== "") {
      this.setState({ activeTab: scheduleViewActiveTab });
    }
  }

  componentWillUnmount() {
    console.log("scheduleWrapper..componentWillUnmount()");
    localStorage.setItem("scheduleViewActiveTab", this.state.activeTab);
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const { deleteAppearances } = this.props;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "byDay"
              })}
              onClick={() => {
                this.toggleTab("byDay");
              }}
            >
              Day
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "byDayStage"
              })}
              onClick={() => {
                this.toggleTab("byDayStage");
              }}
            >
              Day & Stage
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="byDayStage">
            <ScheduleByDayStage
              {...this.props}
              handleCheck={this.handleCheck}
            />
          </TabPane>
        </TabContent>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="byDay">
            <ScheduleByDay {...this.props} handleCheck={this.handleCheck} />
          </TabPane>
        </TabContent>

        <div style={buttonsBottomWrapperStyles}>
          <Link to="/scheduleform">Add appearance</Link>
          <Button
            color="danger"
            disabled={this.state.selectedItems.length === 0}
            style={{ marginLeft: 10 }}
            onClick={this.handleDeleteItems}
          >
            Delete selected
          </Button>
          <ConfirmModal
            displayModal={this.state.showConfirmDeleteModal}
            modalTitle="Delete Appearances?"
            modalBody="Are you sure that you want to delete the selected appearances?"
            handleOk={() => {
              deleteAppearances(this.state.selectedItems);
              this.setState({ showConfirmDeleteModal: false });
            }}
            handleCancel={() =>
              this.setState({ showConfirmDeleteModal: false })
            }
          />
        </div>
      </div>
    );
  }
}

ScheduleWrapper.propTypes = {
  deleteAppearances: PropTypes.func.isRequired
};

export default ScheduleWrapper;
