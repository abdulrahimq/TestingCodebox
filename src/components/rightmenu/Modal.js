import React, { Component } from "react";
import Modal from "react-modal";

class ExampleDialogue extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          //onRequestClose={this.closeModal}
        >
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
        </Modal>
        Ye
        <Modal
          isOpen={this.state.secondModalIsOpen}
          //onRequestClose={this.closeSecondModal}
        >
          <button onClick={this.closeSecondModal}>close</button>
          <div>second modal</div>
        </Modal>
      </div>
    );
  }
}

export default ExampleDialogue;
