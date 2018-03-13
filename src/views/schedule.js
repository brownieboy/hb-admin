import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

import { LoadStatusIndicator } from "../components/loadsaveindicator.js";

// import { getAppearanceKey } from "../helper-functions/computedkeys.js";

// const getAppearanceKey = (bandId, stageId, dateTimeStart) =>
//   `${bandId}~${stageId}~${dateTimeStart}`;

const listSchedule = (
  appearancesArray,
  getBandInfoForId,
  getStageInfoForId
) => {
  let bandInfo, stageInfo;
  console.log("appearancesArray start = " + appearancesArray);
  return appearancesArray.map(appearanceMember => {
    const { bandId, stageId } = appearanceMember;
    bandInfo = getBandInfoForId(bandId);
    stageInfo = getStageInfoForId(stageId);
    // console.log("bandInfo=" + JSON.stringify(bandInfo, null, 4));
    // console.log("stageInfo=" + JSON.stringify(stageInfo, null, 4));
    return (
      <ListGroupItem key={appearanceMember.id}>
        {`${bandInfo.name} (${stageInfo.name})`}
        <Link to={`/scheduleform/${appearanceMember.id}`}>
          <i className="icon-pencil" />
        </Link>
      </ListGroupItem>
    );
  });
};

// ListItem key={`${bandId}${dateTimeStart}`}

const Schedule = ({
  appearancesListByDateTime,
  fetchStatus,
  fetchError,
  appearancesWithBandsNames,
  getBandInfoForId,
  getStageInfoForId
}) => {
  console.log("In Schedule, appearancesWithBandsNames:");
  console.log(appearancesWithBandsNames);
  appearancesWithBandsNames();
  return (
    <div>
      <h1>Schedule</h1>
      <LoadStatusIndicator fetchStatus={fetchStatus} fetchError={fetchError} />
      <ListGroup>
        {listSchedule(
          appearancesListByDateTime,
          getBandInfoForId,
          getStageInfoForId
        )}
      </ListGroup>
      <Link to="/scheduleform">Add appearance</Link>
    </div>
  );
};

Schedule.propTypes = {
  appearancesListByDateTime: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired,
  getBandInfoForId: PropTypes.func.isRequired,
  getStageInfoForId: PropTypes.func.isRequired
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
