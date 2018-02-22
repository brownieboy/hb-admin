import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

const listSchedule = appearancesArray =>
  appearancesArray.map(appearanceMember => {
    const { dateTimeStart, bandId, name, stageName } = appearanceMember;

    return (
      <ListGroupItem key={`${bandId}${dateTimeStart}`}>
        {appearanceMember.name}
      </ListGroupItem>
    );
  });

const Schedule = ({ appearancesListByDateTime }) => (
  <div>
    <h1>Bands</h1>
    <ListGroup>{listSchedule(appearancesListByDateTime)}</ListGroup>
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
