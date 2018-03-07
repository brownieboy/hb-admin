import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { getAppearanceKey } from "../helper-functions/computedkeys.js";

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
    const { dateTimeStart, bandId, stageId } = appearanceMember;
    bandInfo = getBandInfoForId(bandId);
    stageInfo = getStageInfoForId(stageId);
    // console.log("bandInfo=" + JSON.stringify(bandInfo, null, 4));
    // console.log("stageInfo=" + JSON.stringify(stageInfo, null, 4));
    const key = getAppearanceKey(bandId, stageId, dateTimeStart);
    return (
      <ListGroupItem key={key}>
        {`${bandInfo.name} (${stageInfo.name})`}
        <Link to={`/scheduleform/${key}`}>
          <i className="icon-pencil" />
        </Link>
      </ListGroupItem>
    );
  });
};

// ListItem key={`${bandId}${dateTimeStart}`}

const Schedule = ({
  appearancesListByDateTime,
  getBandInfoForId,
  getStageInfoForId
}) => (
  <div>
    <h1>Schedule</h1>
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

Schedule.propTypes = {
  appearancesListByDateTime: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
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
