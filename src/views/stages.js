import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { LoadStatusIndicator } from "../components/loadsaveindicator.js";
import {
  buttonsBottomWrapperStyles,
  itemTextSpan,
  listGroupItemContentWrapperStyles,
  listGroupItemStyles,
  listGroupStyles
} from "./viewstyles.js";
import ConfirmModal from "../components/confirm-modal.js";
import AlertModal from "../components/alert-modal.js";
import { handleCheck as handleCheckExt } from "../components/lifecycleextras.js";
import NotLoggedInWarning from "../components/not-logged-in-warning.js";

class Stages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      showConfirmDeleteModal: false,
      showStagesWithAppearancesAlertModal: false,
      stagesWithAppearances: []
    };
    this.handleCheck = handleCheckExt.bind(this);
  }

  handleDeleteItems = () => {
    const { getAppearancesForStageId, getStageInfoForId } = this.props;
    // Don't forget the .slice() below, otherwise we modify the state directly!
    const selectedItemsCopy = this.state.selectedItems.slice();
    const stagesWithAppearances = selectedItemsCopy.filter(
      selectedItem => getAppearancesForStageId(selectedItem).length > 0
    );

    // console.log("stagesWithAppearances:");
    // console.log(stagesWithAppearances);

    if (stagesWithAppearances.length === 0) {
      this.setState({ showConfirmDeleteModal: true });
    } else {
      const stagesWithAppearancesNames = stagesWithAppearances
        .map(stageId => getStageInfoForId(stageId).name)
        .sort();
      console.log("stagesWithAppearancesNames:");
      console.log(stagesWithAppearancesNames);

      this.setState({
        showStagesWithAppearancesAlertModal: true,
        stagesWithAppearances: stagesWithAppearancesNames
      });
    }
  };

  listStages = StagesArray =>
    StagesArray.map(stageMember => (
      <ListGroupItem key={stageMember.id} style={listGroupItemStyles}>
        <div style={listGroupItemContentWrapperStyles}>
          <div>
            <span style={itemTextSpan}>{stageMember.name}</span>
            <span> ({stageMember.sortOrder})</span>
          </div>
          <div>
            <Input
              type="checkbox"
              onChange={e => this.handleCheck(e, stageMember.id)}
            />
            <Link to={`/stageform/${stageMember.id}`}>
              <i className="icon-pencil" />
            </Link>
          </div>
        </div>
      </ListGroupItem>
    ));

  render() {
    const {
      deleteStages,
      stagesListProp,
      fetchError,
      fetchStatus,
      isLoggedIn
    } = this.props;
    return (
      <div>
        {!isLoggedIn && <NotLoggedInWarning />}
        <h1>Stages</h1>
        <LoadStatusIndicator
          fetchStatus={fetchStatus}
          fetchError={fetchError}
        />

        <ListGroup style={listGroupStyles}>
          {this.listStages(stagesListProp)}
        </ListGroup>
        <div style={buttonsBottomWrapperStyles}>
          <Link to="/stageform">Add stage</Link>
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
            modalTitle="Delete Stages?"
            modalBody="Are you sure that you want to delete the selected stages?"
            handleOk={() => {
              deleteStages(this.state.selectedItems);
              this.setState({ showConfirmDeleteModal: false });
            }}
            handleCancel={() =>
              this.setState({ showConfirmDeleteModal: false })
            }
          />
          <AlertModal
            displayModal={this.state.showStagesWithAppearancesAlertModal}
            modalTitle="Stages with appearances"
            modalBody={[
              <div key="1">The following stages have appearances on them:</div>,
              <div key="2" style={{ margin: 15 }}>
                {this.state.stagesWithAppearances.join(", ")}
              </div>,
              <div key="3">
                You must delete those appearances from the Schedule view before
                you can delete these stages.
              </div>
            ]}
            handleClose={() =>
              this.setState({ showStagesWithAppearancesAlertModal: false })
            }
          />
        </div>
      </div>
    );
  }
}

Stages.propTypes = {
  deleteStages: PropTypes.func.isRequired,
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired,
  getStageInfoForId: PropTypes.func.isRequired,
  getAppearancesForStageId: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  stagesListProp: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Stages;
