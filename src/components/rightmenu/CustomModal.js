import React, { Component } from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import "../../css/rightmenu/Examples.css";
import CustomInput from "./CustomInput";


class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: "", 
      testValue: "TEST", 
      exampleNewValue: 
        { 
          name:"",
          description:"",
          word:"",
          gloss:"",
          translation:"",
          comment:"",
          creator:""
        }
      };
  }

  setExampleSpecificValue(valueName, value){
    let ex = this.state.exampleNewValue 
    ex[valueName] = value
    this.setState({exampleNewValue: ex})
  }

  componentDidMount() {
    Modal.setAppElement("body");
  }


  render() {
    console.log("CustomModal Example: ", this.state.exampleNewValue)
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
            >
            </input>
        <div className="example-container">
            <label>Property Word</label>
            <CustomInput
                type="text"
                id="word"
                name="example-word"
                placeholder=""
                default={this.props.example.word}
                setExampleSpecificValue={(valueName, value)=>this.setExampleSpecificValue(valueName, value)}
            />
            <label>Property Gloss</label>
            <CustomInput
                type="text"
                id="gloss"
                name="example-gloss"
                placeholder=""
                default={this.props.example.gloss}
                setExampleSpecificValue={(valueName, value)=>this.setExampleSpecificValue(valueName, value)}
            />
            <label>Property Translation</label>
            <CustomInput
                type="text"
                id="translation"
                name="example-translation"
                placeholder=""
                default={this.props.example.translation}
                setExampleSpecificValue={(valueName, value)=>this.setExampleSpecificValue(valueName, value)}
            />
            <label>Property Comment</label>
            <CustomInput
                type="text"
                id="comment"
                name="example-comment"
                placeholder=""
                default={this.props.example.comment}
                setExampleSpecificValue={(valueName, value)=>this.setExampleSpecificValue(valueName, value)}
            />

            <label>Property Creator</label>
            <CustomInput
                type="text"
                id="creator"
                name="example-creator"
                placeholder=""
                default={this.props.example.creator}
                setExampleSpecificValue={(valueName, value)=>this.setExampleSpecificValue(valueName, value)}
            />
          </div>
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
                  this.props.setExampleValue(this.state.exampleNewValue)
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
