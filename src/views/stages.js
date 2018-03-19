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

class Stages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      showConfirmDeleteModal: false
    };
  }

  handleDeleteItems = e => {
    const { getAppearancesForStageId } = this.props;
    const { selectedItems } = this.state;
    // let appearancesForStage = 0;
    const stagesWithAppearances = selectedItems.filter(
      selectedItem => getAppearancesForStageId(selectedItem).length > 0
    );
    console.log("stagesWithAppearances:");
    console.log(stagesWithAppearances);
    if(stagesWIthAppearances.length > 0) {
      alert("The following stages have appearances: " + JSON.stringify(stagesWithAppearances));
    }

    // deleteStages(this.state.selectedItems);
    // this.setState({ showConfirmDeleteModal: false });
  };

  handleCheck = (e, id) => {
    const { selectedItems } = this.state;
    const newItems = [...selectedItems];
    if (e.target.checked) {
      newItems.push(id);
    } else {
      const index = selectedItems.indexOf(id);
      newItems.splice(index);
    }
    this.setState({ selectedItems: newItems });
  };

  listStages = StagesArray =>
    StagesArray.map(stageMember => (
      <ListGroupItem key={stageMember.id} style={listGroupItemStyles}>
        <div style={listGroupItemContentWrapperStyles}>
          <div>
            <span style={itemTextSpan}>{stageMember.name}</span>
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
      fetchStatus
    } = this.props;
    return (
      <div>
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
              // deleteStages(this.state.selectedItems);
              // this.setState({ showConfirmDeleteModal: false });
            }}
            handleCancel={() =>
              this.setState({ showConfirmDeleteModal: false })
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
  getAppearancesForStageId: PropTypes.func.isRequired,
  stagesListProp: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Stages;
