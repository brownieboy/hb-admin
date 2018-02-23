import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";


const listSchedule = (appearancesArray, getBandInfoForId) => {
  let bandInfo;
  console.log("appearancesArray start");
  return appearancesArray.map(appearanceMember => {
    const { dateTimeStart, bandId, name, stageName } = appearanceMember;
    bandInfo = getBandInfoForId(bandId);
    console.log("bandInfo=" + bandInfo);
    return (
      <ListGroupItem key={`${bandId}${dateTimeStart}`}>
        {appearanceMember.name}
      </ListGroupItem>
    );
  });
};

const Schedule = ({ appearancesListByDateTime, getBandInfoForId }) => (
  <div>
    <h1>Schedule</h1>
    <ListGroup>{listSchedule(appearancesListByDateTime, getBandInfoForId)}</ListGroup>
  </div>
);

Schedule.propTypes = {
  appearancesListByDateTime: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired
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
