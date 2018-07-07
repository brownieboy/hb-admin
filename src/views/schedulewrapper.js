import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import { handleCheck as handleCheckExt } from "../components/lifecycleextras.js";
import ScheduleByDayStage from "./schedule-bydaystage.js";
import ScheduleByDay from "./schedule-byday.js";
import ConfirmModal from "../components/confirm-modal.js";
import NotLoggedInWarning from "../components/not-logged-in-warning.js";
import { buttonsBottomWrapperStyles } from "./viewstyles.js";

class ScheduleWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      showAdjustTimesModal: false,
      showConfirmDeleteModal: false,
      activeTab: "byDay"
    };
    this.handleCheck = handleCheckExt.bind(this);
  }

  handleDeleteItems = () => {
    this.setState({ showConfirmDeleteModal: true });
  };

  handleAdjustItemsTimes = () => {
    this.setState({ showAdjustTimesModal: true });
  };

  componentDidMount() {
    const scheduleViewActiveTab = localStorage.getItem("scheduleViewActiveTab");
    if (scheduleViewActiveTab !== "") {
      this.setState({ activeTab: scheduleViewActiveTab });
    }
  }

  componentWillUnmount() {
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
    const { adjustAppearances, deleteAppearances, isLoggedIn } = this.props;
    return (
      <div>
        {!isLoggedIn && <NotLoggedInWarning />}
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
              by Day
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
              by Day then Stage
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
            disabled={this.state.selectedItems.length === 0}
            style={{ marginLeft: 10 }}
            onClick={this.handleAdjustItemsTimes}
          >
            Adjust selected times
          </Button>
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
          <ConfirmModal
            displayModal={this.state.showAdjustTimesModal}
            modalTitle="Adjust Appearance Times"
            modalBody="Enter the number of minutes you want to adjust start and end times by.  A negative number will move the times forward."
            handleOk={() => {
              adjustAppearances(this.state.selectedItems);
              this.setState({ showAdjustTimesModal: false });
            }}
            handleCancel={() =>
              this.setState({ showAdjustTimesModal: false })
            }
          />
        </div>
      </div>
    );
  }
}

ScheduleWrapper.propTypes = {
  adjustAppearances: PropTypes.func.isRequired,
  deleteAppearances: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default ScheduleWrapper;
