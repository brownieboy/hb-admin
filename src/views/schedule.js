import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { LoadStatusIndicator } from "../components/loadsaveindicator.js";
import ThumbNail from "../components/thumbnail.js";
import { listGroupItemSmallStyles } from "./viewstyles.js";

console.log("listGroupItemSmallStyles:");
console.log(listGroupItemSmallStyles);

const getAppearanceLines = lineData => {
  // const itemsLength = lineData.length;
  return lineData.map((lineMember, index) => {
    // const lineStyle = { height: 40 };
    // if (itemsLength === index + 1) {
    //   lineStyle.borderBottomWidth = 0;
    // }
    return (
      <ListGroupItem key={lineMember.bandId} style={listGroupItemSmallStyles}>
        <ThumbNail thumbFullUrl={lineMember.bandThumbFullUrl} size={30} />
        <span>
          <span style={{ fontSize: 12 }}>
            {`${format(lineMember.dateTimeStart, "HH:mm")}-${format(
              lineMember.dateTimeEnd,
              "HH:mm"
            )}: `}
          </span>
          <span>{lineMember.bandName}</span>
        </span>
        <Link to={`/scheduleform/${lineMember.id}`} style={{ marginLeft: 20 }}>
          <i className="icon-pencil" />
        </Link>
      </ListGroupItem>
    );
  });
};

const getAppearancesStageLevel = groupedStageData =>
  groupedStageData.map(stageMember => [
    <div key={stageMember.key} style={{ marginTop: 15 }}>
      <span style={{ fontSize: 14, fontStyle: "italic" }}>
        {stageMember.key.split("~")[1]}
      </span>
    </div>,
    <ListGroup key={`${stageMember.key}-lineswrapper`}>
      {getAppearanceLines(stageMember.values)}
    </ListGroup>
  ]);

const getAppearancesListDayLevel = groupedDayData =>
  groupedDayData.map(dayMember => [
    <div key={dayMember.key} style={{ marginBottom: -15 }}>
      <span style={{ fontWeight: "bold", fontSize: 18, color: "blue" }}>
        {dayMember.key.toUpperCase()}
      </span>
    </div>,
    <ListGroup
      key={`${dayMember.key}-stagewrapper`}
      style={{ marginBottom: 20 }}
    >
      {getAppearancesStageLevel(dayMember.values)}
    </ListGroup>
  ]);

const Schedule = ({
  appearancesGroupedByDayThenStage,
  fetchStatus,
  fetchError
}) => {
  //   console.log("In Schedule, appearancesListByDateTime:");
  // console.log(appearancesListByDateTime);
  // console.log("In Schedule, appearancesWithBandAndStageNames:");
  // console.log(appearancesWithBandAndStageNames);
  // console.log("In Schedule, appearancesGroupedByDayThenStage:");
  // console.log(appearancesGroupedByDayThenStage);
  return (
    <div>
      <h1>Schedule</h1>
      <LoadStatusIndicator fetchStatus={fetchStatus} fetchError={fetchError} />
      <ListGroup>
        {getAppearancesListDayLevel(appearancesGroupedByDayThenStage)}
      </ListGroup>
      <Link to="/scheduleform">Add appearance</Link>
    </div>
  );
};

Schedule.propTypes = {
  appearancesGroupedByDayThenStage: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired
};

export default Schedule;

