import React from "react";
import "../../css/rightmenu/Examples.css";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./CustomModal";
import Example from "./Example";
import alignWords from "@digitallinguistics/word-aligner";

library.add(faPlus, faPen);

class Examples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEditIsOpen: false,
      modalCreateIsOpen: false,
      selected: 0,
      value:
        "Property Description: \nProperty Word: \nProperty Gloss: \nProperty Translation: '' \nProperty Comment: \nProperty Creator: ",
      headerValue: "",
      editValue: "",
      editHeaderValue: ""
    };
    this.createElements = this.createElements.bind(this);
    this.clickHighlightExample = this.clickHighlightExample.bind(this);
    this.changeEditValue = this.changeEditValue.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.valueSet = this.valueSet.bind(this);
  }

  clickHighlightExample = (item) => {
    this.setState({ selected: item.i });
  };

  componentDidMount() {
    this.setState({
      editValue:
        "Property Description: \nProperty Word: \nProperty Gloss: \nProperty Translation: '' \nProperty Comment: \nProperty Creator: ",
      editHeaderValue: this.props.examples[this.state.selected].name
    });
  }

  changeEditValue() {
    const idx = this.state.selected;
    const textObject = this.props.examples[idx];
    const newEditValue =
      "Property Description: " +
      textObject.description +
      "\nProperty Word: " +
      textObject.word +
      "\nProperty Gloss: " +
      textObject.gloss +
      "\nProperty Translation: ''" +
      textObject.translation +
      "\nProperty Comment: " +
      textObject.comment +
      "\nProperty Creator: " +
      textObject.creator;
    this.setState({
      editValue: newEditValue,
      editHeaderValue: this.props.examples[this.state.selected].name
    });
  }

  createElements(props) {
    var elements = [];
    for (let i = 0; i < props.length; i++) {
      let lines = [];
      lines.push(props[i].word);
      lines.push(props[i].gloss);
      lines.push(props[i].translation);
      //lines = alignWords(lines);
      //console.log("LINES: ", lines);
      elements.push(
        <Example
          value={props[i]}
          i={i}
          clickHighlightExample={this.clickHighlightExample}
          selected={this.state.selected}
          changeEditValue={this.changeEditValue}
        />
      );
    }
    return elements;
  }

  _convertValue(text) {
    const validDesc = new RegExp("(?<=Property Description:)(.*?)(?=\\n)");
    const validWord = new RegExp("(?<=Property Word:)(.*?)(?=\\n)");
    const validGloss = new RegExp("(?<=Property Gloss:)(.*?)(?=\\n)");
    const validTranslation = new RegExp(
      "(?<=Property Translation:)(.*?)(?=\\n)"
    );
    const validComment = new RegExp("(?<=Property Comment:)(.*?)(?=\\n)");
    const validCreator = new RegExp("(?<=Property Creator:)(.*)");
    return {
      description: validDesc.exec(text)[0],
      word: validWord.exec(text)[0],
      gloss: validGloss.exec(text)[0],
      translation: validTranslation.exec(text)[0],
      comment: validComment.exec(text)[0],
      creator: validCreator.exec(text)[0],
      name: ""
    };
  }

  createExample(event) {
    this.setState({ value: event.target.value });
  }

  createHeader(event) {
    this.setState({ headerValue: event.target.value });
  }

  openCreateModal() {
    this.setState({ modalCreateIsOpen: true });
  }

  closeCreateModal() {
    this.setState({ modalCreateIsOpen: false });
  }

  openEditModal() {
    this.setState({ modalEditIsOpen: true });
  }

  closeEditModal() {
    this.setState({ modalEditIsOpen: false });
  }

  valueSet(e) {
    let value = this._convertValue(
      e.currentTarget.parentNode.previousSibling.value
    );

    value["name"] =
      e.currentTarget.parentNode.previousSibling.previousSibling.value;

    this.props.addNewExample(
      this._convertValue(e.currentTarget.parentNode.previousSibling.value),
      e.currentTarget.parentNode.previousSibling.previousSibling.value
    );
  }

  render() {
    let disableEditButton = true;
    if (this.props.examples.length > 0) {
      disableEditButton = false;
    }

    return (
      <div className="examples-container">
        <div className="examples-header">
          <h1 className="examples-header-title">Examples</h1>

          <Button
            className="examples-header-button-left"
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "#FF6584",
              marginLeft: "15px",
              marginTop: "10px"
            }}
            disabled={disableEditButton}
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
            style={{
              backgroundColor: "#FF6584",
              marginLeft: "15px",
              marginTop: "10px"
            }}
            onClick={() => this.openCreateModal()}
          >
            <FontAwesomeIcon icon={faPlus} />
            <label className="create-button">Create</label>
          </Button>

          <CustomModal
            modalIsOpen={this.state.modalEditIsOpen}
            onRequestClose={() => this.closeEditModal()}
            closeModal={this.closeEditModal}
            header="Edit or Change the Example"
            buttonText="Edit Example"
            createExample={(e) => this.createExample(e)}
            value={this.state.editValue}
            createHeader={(e) => this.createHeader(e)}
            headerValue={this.state.editHeaderValue}
            newExample={() => this.props.addNewExample()}
          ></CustomModal>

          <CustomModal
            modalIsOpen={this.state.modalCreateIsOpen}
            onRequestClose={() => this.closeCreateModal()}
            closeModal={this.closeCreateModal}
            header="Create a New Example"
            buttonText="Create Example"
            createExample={(e) => this.createExample(e)}
            value={this.state.value}
            createHeader={(e) => this.createHeader(e)}
            headerValue={this.state.headerValue}
            newExample={() => this.props.addNewExample()}
            valueSet={(e) => this.valueSet(e)}
          ></CustomModal>
        </div>
        <div className="examples-text" onChange={this.changeEditValue}>
          {this.createElements(this.props.examples)}
        </div>
      </div>
    );
  }
}

export default Examples;
