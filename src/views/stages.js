import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { LoadStatusIndicator } from "../components/loadsaveindicator.js";
import { listGroupItemSmallStyles, listGroupStyles } from "./viewstyles.js";

const listStages = StagesArray =>
  StagesArray.map(stageMember => (
    <ListGroupItem key={stageMember.id}>
      {stageMember.name}
      {"  "}
      <Link to={`/stageform/${stageMember.id}`}>
        <i className="icon-pencil" />
      </Link>
    </ListGroupItem>
  ));

const Stages = ({ stagesListProp, fetchError, fetchStatus }) => {
  return (
    <div>
      <h1>Stages</h1>
      <LoadStatusIndicator fetchStatus={fetchStatus} fetchError={fetchError} />

      <ListGroup>{listStages(stagesListProp)}</ListGroup>
      <Link to="/stageform">Add stage</Link>
    </div>
  );
};

Stages.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired,
  stagesListProp: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Stages;
