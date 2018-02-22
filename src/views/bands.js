import React from "react";
import PropTypes from "prop-types";

const Bands = ({ loadBandsProp, bandsAlphabeticalProp }) => {
  console.log("Bands component loaded...");
  loadBandsProp();
  return (
    <div>
      <h1>Bands</h1>
      <div>{JSON.stringify(bandsAlphabeticalProp, null, 2)}</div>
    </div>
  );
};

Bands.propTypes = {
  loadBandsProp: PropTypes.func.isRequired,
  bandsAlphabeticalProp: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Bands;

// <div>{JSON.stringify(bandsStateProp)}</div>
