import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import {
  buttonsBottomWrapperStyles,
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

  handleDeleteItems = () => {
    const { getAppearancesForBandId, getBandInfoForId } = this.props;
    // Don't forget the .slice() below, otherwise we modify the state directly!
    const selectedItemsCopy = this.state.selectedItems.slice();
    const bandsWithAppearances = selectedItemsCopy.filter(
      selectedItem => getAppearancesForBandId(selectedItem).length > 0
    );
    // console.log("bandsWithAppearances:");
    // console.log(bandsWithAppearances);

    if (bandsWithAppearances.length === 0) {
      this.setState({ showConfirmDeleteModal: true });
    } else {
      const bandsWithAppearancesNames = bandsWithAppearances
        .map(bandId => getBandInfoForId(bandId))
        .sort();

      // console.log("bandsWithAppearancesNames:");
      // console.log(bandsWithAppearancesNames);
      this.setState({
        showBandsWithAppearancesAlertModal: true,
        bandsWithAppearances: bandsWithAppearancesNames
      });
    }
  };

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
        <div style={buttonsBottomWrapperStyles}>
          <Link to="/bandform">Add band</Link>
          <Button
            color="danger"
            disabled={this.state.selectedItems.length === 0}
            style={{ marginLeft: 10 }}
            onClick={this.handleDeleteItems}
          >
            Delete selected
          </Button>
          <ConfirmModal
            displayModal={this.state.showConfirmDeleteModal}
            modalTitle="Delete Bands?"
            modalBody="Are you sure that you want to delete the selected bands?"
            handleOk={() => {
              deleteBands(this.state.selectedItems);
              this.setState({ showConfirmDeleteModal: false });
            }}
            handleCancel={() =>
              this.setState({ showConfirmDeleteModal: false })
            }
          />
          <AlertModal
            displayModal={this.state.showBandsWithAppearancesAlertModal}
            modalTitle="Bands with appearances"
            modalBody={[
              <div key="1">The following bands are making appearances:</div>,
              <div key="2" style={{ margin: 15 }}>
                {this.state.bandsWithAppearances.join(", ")}
              </div>,
              <div key="3">
                You must delete each of the bands&apos; appearances from the
                Schedule view before you can delete these bands.
              </div>
            ]}
            handleClose={() =>
              this.setState({ showBandsWithAppearancesAlertModal: false })
            }
          />
        </div>
      </div>
    );
  }
}

Bands.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired,
  getAppearancesForBandId: PropTypes.func.isRequired,
  getBandInfoForId: PropTypes.func.isRequired,
  loadBandsProp: PropTypes.func.isRequired,
  bandsAlphabeticalProp: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired
};

export default Bands;

// <div>{JSON.stringify(bandsStateProp)}</div>
//
/*
      <ListGroupItem key={appearanceMember.id}>
        {`${bandInfo.name} (${bandInfo.name})`}
        <Link to={`/scheduleform/${appearanceMember.id}`}>
          <i className="icon-pencil" />
        </Link>
      </ListGroupItem>
 */
