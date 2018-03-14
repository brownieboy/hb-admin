import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { LoadStatusIndicator } from "../components/loadsaveindicator.js";

// import { getAppearanceKey } from "../helper-functions/computedkeys.js";

// const getAppearanceKey = (bandId, stageId, dateTimeStart) =>
//   `${bandId}~${stageId}~${dateTimeStart}`;

// const listSchedule = (
//   appearancesArray,
//   getBandInfoForId,
//   getStageInfoForId
// ) => {
//   let bandInfo, stageInfo;
//   // console.log("appearancesArray start = " + appearancesArray);
//   return appearancesArray.map(appearanceMember => {
//     const { bandId, stageId } = appearanceMember;
//     bandInfo = getBandInfoForId(bandId);
//     stageInfo = getStageInfoForId(stageId);
//     // console.log("bandInfo=" + JSON.stringify(bandInfo, null, 4));
//     // console.log("stageInfo=" + JSON.stringify(stageInfo, null, 4));
//     return (
//       <ListGroupItem key={appearanceMember.id}>
//         {`${bandInfo.name} (${stageInfo.name})`}
//         <Link to={`/scheduleform/${appearanceMember.id}`}>
//           <i className="icon-pencil" />
//         </Link>
//       </ListGroupItem>
//     );
//   });
// }

// ListItem key={`${bandId}${dateTimeStart}`}

const getAppearanceLines = lineData => {
  // const itemsLength = lineData.length;
  return lineData.map((lineMember, index) => {
    // const lineStyle = { height: 40 };
    // if (itemsLength === index + 1) {
    //   lineStyle.borderBottomWidth = 0;
    // }
    return (
      <ListGroupItem key={lineMember.bandId}>
        <span>
          <span>{`${lineMember.bandName}: ${format(
            lineMember.dateTimeStart,
            "HH:mm"
          )}-${format(lineMember.dateTimeEnd, "HH:mm")}`}</span>
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
  // appearancesListByDateTime,
  appearancesGroupedByDayThenStage,
  fetchStatus,
  fetchError
  // appearancesWithBandAndStageNames,
  // getBandInfoForId,
  // getStageInfoForId
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

/*
      <ListGroup>
        {listSchedule(
          appearancesListByDateTime,
          getBandInfoForId,
          getStageInfoForId
        )}
*/

Schedule.propTypes = {
  // appearancesListByDateTime: PropTypes.arrayOf(PropTypes.object.isRequired)
  //   .isRequired,
  // appearancesWithBandAndStageNames: PropTypes.arrayOf(
  //   PropTypes.object.isRequired
  // ).isRequired,
  appearancesGroupedByDayThenStage: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired
  // getBandInfoForId: PropTypes.func.isRequired,
  // getStageInfoForId: PropTypes.func.isRequired
};

export default Schedule;

/*

  getAppearancesListItems = appearancesList =>
    appearancesList.map(appearanceMember => {
      const { dateTimeStart, bandId, name, stageName } = appearanceMember;
      return (
        <ListItem key={`${bandId}${dateTimeStart}`}>
          <Body>
            <Text>{name}</Text>
            <Text numberOfLines={1} note>
              Appear: {`${dateTimeStart || "???"} - ${stageName}`}
            </Text>
          </Body>
        </ListItem>
      );
    });

 */
