import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

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
// };

// ListItem key={`${bandId}${dateTimeStart}`}

const getAppearancesListDayLevel = groupedDayData =>
  groupedDayData.map(dayMember => [
    <ListGroupItem key={dayMember.key}>
      <span style={{ fontWeight: "bold" }}>{dayMember.key.toUpperCase()}</span>
    </ListGroupItem>,
    <div key={`${dayMember.key}-stagewrapper`} style={{ marginBottom: 20 }}>
      Line values
    </div>
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
  console.log("In Schedule, appearancesGroupedByDayThenStage:");
  console.log(appearancesGroupedByDayThenStage);
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
