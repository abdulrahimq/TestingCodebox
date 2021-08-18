import React from "react";
import "../../css/rightmenu/Examples.css";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

library.add(faPlus, faPen);

class Examples extends React.Component {
  constructor(props) {
    super(props);
    this.createElements = this.createElements.bind(this);
  }
  state = {
    editModalIsOpen: false,
    createModalIsOpen: false
  };

  createElements(props) {
    var elements = [];
    for (let i = 0; i < props.length; i++) {
      elements.push(
        <li>
          {props[i].name}, {props[i].description},{props[i].word},{" "}
          {props[i].gloss}, {props[i].translation}, {props[i].comment},{" "}
          {props[i].creator}
        </li>
      );
    }
    return elements;
  }

  openEditModal = () => {
    this.setState({ editModalIsOpen: true });
    console.log("Edit Open");
  };

  closeEditModal = () => {
    this.setState({ editModalIsOpen: false });
    console.log("Edit Close");
  };

  openCreateModal = () => {
    this.setState({ createModalIsOpen: true });
    console.log("Creaate Open");
  };

  closeCreateModal = () => {
    this.setState({ createModalIsOpen: false });
    console.log("Creaate Close");
  };

  getExamples() {
    let valuesList = [];
    const examples = this.props.examples;
    for (let example in examples) {
      if (!valuesList.includes(examples[example].surness)) {
        valuesList.push(examples[example].surness);
      }
    }
    return valuesList;
  }

  render() {
    return (
      <div className="examples-container">
        <div className="examples-header">
          <h1 className="examples-header-title">Examples</h1>

          <Button
            className="examples-header-button-left"
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "#ff6584" }}
            onClick={() => this.openEditModal()}
          >
            <FontAwesomeIcon icon={faPen} />
            <label className="edit-button">Edit</label>
          </Button>

          <Button
            id="create-button"
            className="examples-header-button-right"
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "#FF6584" }}
            onClick={() => this.openCreateModal()}
          >
            <FontAwesomeIcon icon={faPlus} />
            <label className="create-button">Create</label>
          </Button>

          <Modal
            isOpen={this.state.editModalIsOpen}
            onRequestClose={() => this.closeEditModal()}
          >
            <div className="example-header">
              <h1>Edit or Change Example</h1>
              <button className="example-cancel" onClick={this.closeEditModal}>
                X
              </button>
            </div>
            <div className="example-body">
              <form>
                <input type="text" id="example-text" name="fname"></input>
                <textarea id="example-textarea"> Test</textarea>
                <div className="example-buttons">
                  <Button
                    id="create-button"
                    className="examples-header-button-right"
                    variant="contained"
                    color="secondary"
                    style={{ backgroundColor: "#F3E63F" }}
                    onClick={() => this.openEditModal()}
                  >
                    <label className="create-button">Confirm Edits</label>
                  </Button>
                  <Button
                    id="create-button"
                    className="examples-header-button-right"
                    variant="contained"
                    color="secondary"
                    style={{
                      backgroundColor: "#FF6584"
                    }}
                    onClick={() => this.closeEditModal()}
                  >
                    <label className="create-button">Go Back</label>
                  </Button>
                </div>
              </form>
            </div>
          </Modal>

          <Modal
            isOpen={this.state.createModalIsOpen}
            onRequestClose={() => this.closeCreateModal()}
          >
            <div className="example-header">
              <h1>Create a New Example</h1>
              <button
                className="example-cancel"
                onClick={this.closeCreateModal}
              >
                X
              </button>
            </div>
            <div className="example-body">
              <form>
                <input type="text" id="example-text" name="fname"></input>
                <textarea id="example-textarea"> Test</textarea>
                <div className="example-buttons">
                  <Button
                    id="create-button"
                    className="examples-header-button-right"
                    variant="contained"
                    color="secondary"
                    style={{ backgroundColor: "#F3E63F" }}
                    onClick={() => this.openCreateModal()}
                  >
                    <label className="create-button">Create Example</label>
                  </Button>
                  <Button
                    id="create-button"
                    className="examples-header-button-right"
                    variant="contained"
                    color="secondary"
                    style={{
                      backgroundColor: "#FF6584"
                    }}
                    onClick={() => this.closeCreateModal()}
                  >
                    <label className="create-button">Go Back</label>
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        {/* 
        <textarea
          className="examples-text"
          value={this.listItems}
          onClick={this.onClick(this.props.examples)}
        ></textarea>
        */}
        <div className="examples-text">
          {this.createElements(this.props.examples)}
        </div>
      </div>
    );
  }
}

export default Examples;
