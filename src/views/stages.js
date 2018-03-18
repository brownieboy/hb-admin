import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { LoadStatusIndicator } from "../components/loadsaveindicator.js";
import {
  itemTextSpan,
  listGroupItemContentWrapperStyles,
  listGroupItemStyles,
  listGroupStyles
} from "./viewstyles.js";

class Stages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }

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
    const { stagesListProp, fetchError, fetchStatus } = this.props;
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
        <Link to="/stageform">Add stage</Link>
        <Button style={{ marginLeft: 10 }}>Delete selected</Button>
      </div>
    );
  }
}

Stages.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired,
  stagesListProp: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Stages;
