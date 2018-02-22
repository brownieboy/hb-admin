import React from "react";
import PropTypes from "prop-types";

const Bands = ({ loadBandsProp, bandsStateProp }) => {
  console.log("Bands component loaded...");
  loadBandsProp();
  return (
    <div>
      <h1>Bands</h1>
      <div>{JSON.stringify(bandsStateProp)}</div>
    </div>
  );
};

Bands.propTypes = {
  loadBandsProp: PropTypes.func.isRequired,
  bandsStateProp: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Bands;

// <div>{JSON.stringify(bandsStateProp)}</div>
