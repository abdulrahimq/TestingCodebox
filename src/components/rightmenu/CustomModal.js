import React, { Component } from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  componentDidMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
      >
        <div className="example-header">
          <h1>{this.props.header}</h1>
          <button className="example-cancel" onClick={this.props.closeModal}>
            X
          </button>
        </div>
        <div className="example-body">
          <form>
            <input
              type="text"
              id="example-text"
              name="fname"
              placeholder="Enter A Title"
              value={this.props.headerValue}
              onChange={this.props.createHeader}
            ></input>
            <textarea
              value={this.props.value}
              onChange={this.props.createExample}
              id="example-textarea"
            ></textarea>
            <div className="example-buttons">
              <Button
                id="create-button"
                className="examples-header-button-right"
                variant="contained"
                color="secondary"
                style={{ backgroundColor: "#F3E63F" }}
                onClick={(e) => {
                  this.props.closeModal();
                  this.props.valueSet(e);
                }}
              >
                <label className="create-button">{this.props.buttonText}</label>
              </Button>
              <Button
                id="create-button"
                className="examples-header-button-right"
                variant="contained"
                color="secondary"
                style={{
                  backgroundColor: "#FF6584"
                }}
                onClick={this.props.closeModal}
              >
                <label className="create-button">Go Back</label>
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default CustomModal;
