import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import {
  listGroupItemContentWrapperStyles,
  listGroupItemStyles,
  listGroupStyles,
  itemTextSpan
} from "./viewstyles.js";
import ConfirmModal from "../components/confirm-modal.js";
import AlertModal from "../components/alert-modal.js";
import { LoadStatusIndicator } from "../components/loadsaveindicator.js";
import ThumbNail from "../components/thumbnail.js";

class Bands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      showConfirmDeleteModal: false,
      showBandsWithAppearancesAlertModal: false,
      bandsWithAppearances: []
    };
  }

  componentDidMount() {
    const { loadBandsProp } = this.props;
    loadBandsProp();
  }

  handleCheck = (e, id) => {
    const { selectedItems } = this.state;
    let newItems;
    if (e.target.checked) {
      // newItems.push(id);
      newItems = [...selectedItems, id];
    } else {
      const index = selectedItems.indexOf(id);
      newItems = [
        ...selectedItems.slice(0, index),
        ...selectedItems.slice(index + 1)
      ];
    }
    this.setState({ selectedItems: newItems });
  };

  listBands = bandsArray =>
    bandsArray.map(bandMember => (
      <ListGroupItem key={bandMember.id} style={listGroupItemStyles}>
        <div style={listGroupItemContentWrapperStyles}>
          <div>
            <ThumbNail thumbFullUrl={bandMember.thumbFullUrl} />
            <span style={itemTextSpan}>{bandMember.name}</span>
          </div>
          <div>
            <Input
              type="checkbox"
              onChange={e => this.handleCheck(e, bandMember.id)}
            />{" "}
            <Link to={`/bandform/${bandMember.id}`} style={{ marginLeft: 10 }}>
              <i className="icon-pencil" />
            </Link>
          </div>
        </div>
      </ListGroupItem>
    ));

  render() {
    const { bandsAlphabeticalProp, fetchError, fetchStatus } = this.props;

    return (
      <div>
        <h1>Bands</h1>
        <LoadStatusIndicator
          fetchStatus={fetchStatus}
          fetchError={fetchError}
        />
        <ListGroup style={listGroupStyles}>
          {this.listBands(bandsAlphabeticalProp)}
        </ListGroup>
        <Link to="/bandform">Add band</Link>
      </div>
    );
  }
}

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
