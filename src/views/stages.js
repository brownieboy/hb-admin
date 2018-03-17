import React from "react";
import PropTypes from "prop-types";
import { Input, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { LoadStatusIndicator } from "../components/loadsaveindicator.js";
import {
  itemTextSpan,
  listGroupItemContentWrapperStyles,
  listGroupItemStyles,
  listGroupStyles
} from "./viewstyles.js";

const listStages = StagesArray =>
  StagesArray.map(stageMember => (
    <ListGroupItem key={stageMember.id} style={listGroupItemStyles}>
      <div style={listGroupItemContentWrapperStyles}>
        <div>
          <span style={itemTextSpan}>{stageMember.name}</span>
        </div>
        <div>
          <Input type="checkbox" />
          <Link to={`/stageform/${stageMember.id}`}>
            <i className="icon-pencil" />
          </Link>
        </div>
      </div>
    </ListGroupItem>
  ));

const Stages = ({ stagesListProp, fetchError, fetchStatus }) => (
  <div>
    <h1>Stages</h1>
    <LoadStatusIndicator fetchStatus={fetchStatus} fetchError={fetchError} />

    <ListGroup style={listGroupStyles}>{listStages(stagesListProp)}</ListGroup>
    <Link to="/stageform">Add stage</Link>
  </div>
);

Stages.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired,
  stagesListProp: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Stages;
