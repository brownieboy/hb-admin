import React from "react";
import PropTypes from "prop-types";
import { Input, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { listGroupItemContentWrapperStyles, listGroupItemStyles, listGroupStyles } from "./viewstyles.js";

import { LoadStatusIndicator } from "../components/loadsaveindicator.js";
import ThumbNail from "../components/thumbnail.js";

console.log("listGroupItemStyles:");
console.log(listGroupItemStyles);

const listBands = bandsArray =>
  bandsArray.map(bandMember => (
    <ListGroupItem key={bandMember.id} style={listGroupItemStyles}>
      <div style={listGroupItemContentWrapperStyles}>
        <div>
          <ThumbNail thumbFullUrl={bandMember.thumbFullUrl} />
          {bandMember.name}
        </div>
        <div>
          <Input type="checkbox" />
          <Link to={`/bandform/${bandMember.id}`} style={{ marginLeft: 10 }}>
            <i className="icon-pencil" />
          </Link>
        </div>
      </div>
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
      <ListGroup style={listGroupStyles}>
        {listBands(bandsAlphabeticalProp)}
      </ListGroup>
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
