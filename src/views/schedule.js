import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

const listSchedule = (
  appearancesArray,
  getBandInfoForId,
  getStageInfoForId
) => {
  let bandInfo, stageInfo;
  console.log("appearancesArray start");
  return appearancesArray.map(appearanceMember => {
    const { dateTimeStart, bandId, stageId } = appearanceMember;
    bandInfo = getBandInfoForId(bandId);
    stageInfo = getStageInfoForId(stageId);
    // console.log("bandInfo=" + JSON.stringify(bandInfo, null, 4));
    // console.log("stageInfo=" + JSON.stringify(stageInfo, null, 4));

    return (
      <ListGroupItem key={`${bandId}${dateTimeStart}`}>
        {`${bandInfo.name} (${stageInfo.name})`}
      </ListGroupItem>
    );
  });
};

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
