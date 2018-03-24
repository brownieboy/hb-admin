import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { LoadStatusIndicator } from "../components/loadsaveindicator.js";
import ThumbNail from "../components/thumbnail.js";

import {
  listGroupItemContentWrapperStyles,
  listGroupItemSmallStyles,
  listGroupStyles
} from "./viewstyles.js";

class ScheduleByDay extends Component {
  getAppearanceLines = lineData => {
    // const itemsLength = lineData.length;
    return lineData.map((lineMember, index) => {
      // const lineStyle = { height: 40 };
      // if (itemsLength === index + 1) {
      //   lineStyle.borderBottomWidth = 0;
      // }
      return (
        <ListGroupItem key={lineMember.id} style={listGroupItemSmallStyles}>
          <div style={listGroupItemContentWrapperStyles}>
            <div>
              <ThumbNail thumbFullUrl={lineMember.bandThumbFullUrl} size={30} />
              <span>
                <span style={{ fontSize: 12 }}>
                  {`${format(lineMember.dateTimeStart, "HH:mm")}-${format(
                    lineMember.dateTimeEnd,
                    "HH:mm"
                  )}: `}
                </span>
                <span style={{fontWeight: "bold"}}>{lineMember.bandName}</span>
                <span style={{ fontSize: 12 }}> ({lineMember.stageName})</span>
              </span>
            </div>
            <div>
              <Input
                type="checkbox"
                className="form-check-input"
                onChange={e => this.props.handleCheck(e, lineMember.id)}
              />

              <Link
                to={`/scheduleform/${lineMember.id}`}
                style={{ marginLeft: 20 }}
              >
                <i className="icon-pencil" />
              </Link>
            </div>
          </div>
        </ListGroupItem>
      );
    });
  };

  getAppearancesListDayLevel = groupedDayData =>
    groupedDayData.map(dayMember => [
      <div key={dayMember.key}>
        <span style={{ fontWeight: "bold", fontSize: 18, color: "blue" }}>
          {dayMember.key.toUpperCase()}
        </span>
      </div>,
      <ListGroup
        key={`${dayMember.key}-stagewrapper`}
        style={{ marginBottom: 20 }}
      >
        {this.getAppearanceLines(dayMember.values)}
      </ListGroup>
    ]);

  handleDeleteItems = () => {
    this.setState({ showConfirmDeleteModal: true });
  };

  render() {
    const { appearancesGroupedByDay, fetchStatus, fetchError } = this.props;

    // console.log("ScheduleByDay render, appearancesGroupedByDay:");
    // console.log(appearancesGroupedByDay);

    return (
      <div>
        <LoadStatusIndicator
          fetchStatus={fetchStatus}
          fetchError={fetchError}
        />
        <ListGroup style={listGroupStyles}>
          {this.getAppearancesListDayLevel(appearancesGroupedByDay)}
        </ListGroup>
      </div>
    );
  }
}

ScheduleByDay.propTypes = {
  appearancesGroupedByDay: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired
};

export default ScheduleByDay;
