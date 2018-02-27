import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";


const listBands = bandsArray =>
  bandsArray.map(bandMember => (
    <ListGroupItem key={bandMember.bandId}>{bandMember.name}</ListGroupItem>
  ));

const Bands = ({ loadBandsProp, bandsAlphabeticalProp }) => {
  loadBandsProp();
  return (
    <div>
      <h1>Bands</h1>
      <ListGroup>{listBands(bandsAlphabeticalProp)}</ListGroup>
      <Link to="/bandform">Add band</Link>
    </div>
  );
};

Bands.propTypes = {
  loadBandsProp: PropTypes.func.isRequired,
  bandsAlphabeticalProp: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired
};

export default Bands;

// <div>{JSON.stringify(bandsStateProp)}</div>
