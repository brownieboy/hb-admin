import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const listStages = StagesArray =>
  StagesArray.map(stageMember => (
    <ListGroupItem key={stageMember.id}>{stageMember.name}</ListGroupItem>
  ));

const Stages = ({ stagesListProp }) => {
  return (
    <div>
      <h1>Stages</h1>
      <ListGroup>{listStages(stagesListProp)}</ListGroup>
      <Link to="/stageform">Add stage</Link>
    </div>
  );
};

Stages.propTypes = {
  stagesListProp: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Stages;

