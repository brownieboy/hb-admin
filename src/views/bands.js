import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

import { LoadStatusIndicator } from "../components/loadsaveindicator.js";

const listBands = bandsArray =>
  bandsArray.map(bandMember => (
    <ListGroupItem key={bandMember.id}>
      {bandMember.name}{" "}
      <Link to={`/bandform/${bandMember.id}`}>
        <i className="icon-pencil" />
      </Link>
    </ListGroupItem>
  ));

const Bands = ({
  loadBandsProp,
  bandsAlphabeticalProp,
  fetchError,
  fetchStatus
}) => {
  loadBandsProp();
  return (
    <div>
      <h1>Bands</h1>
      <LoadStatusIndicator fetchStatus={fetchStatus} fetchError={fetchError} />
      <ListGroup>{listBands(bandsAlphabeticalProp)}</ListGroup>
      <Link to="/bandform">Add band</Link>
    </div>
  );
};

Bands.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired,
  loadBandsProp: PropTypes.func.isRequired,
  bandsAlphabeticalProp: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired
};

export default Bands;

// <div>{JSON.stringify(bandsStateProp)}</div>
//
/*
      <ListGroupItem key={appearanceMember.id}>
        {`${bandInfo.name} (${stageInfo.name})`}
        <Link to={`/scheduleform/${appearanceMember.id}`}>
          <i className="icon-pencil" />
        </Link>
      </ListGroupItem>
 */
