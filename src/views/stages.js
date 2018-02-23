import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

const listStages = StagesArray =>
  StagesArray.map(stageMember => (
    <ListGroupItem key={stageMember.id}>{stageMember.name}</ListGroupItem>
  ));

const Stages = ({ stagesListProp }) => {
  return (
    <div>
      <h1>Stages</h1>
      <ListGroup>{listStages(stagesListProp)}</ListGroup>
    </div>
  );
};

Stages.propTypes = {
  stagesListProp: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired
};

export default Stages;

// <div>{JSON.stringify(StagesStateProp)}</div>
