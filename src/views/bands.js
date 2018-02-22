import React from "react";
import PropTypes from "prop-types";

const Bands = ({ loadBandsProp }) => {
  console.log("Bands component loaded...");
  loadBandsProp();
  return <div>Bands</div>;
};

Bands.propTypes = {
  loadBandsProp: PropTypes.func.isRequired
};

export default Bands;
