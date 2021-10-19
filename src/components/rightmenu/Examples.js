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
        "Property Word: \nProperty Gloss: \nProperty Translation: '' \nProperty Comment: \nProperty Creator: ",
      headerValue: "",
      editValue: "",
      editHeaderValue: "",
      example:{ name:"",description:"",word:"",gloss:"",translation:"",comment:"",creator:""}
    };

    this.createElements = this.createElements.bind(this);
    this.clickHighlightExample = this.clickHighlightExample.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.valueSet = this.valueSet.bind(this);
  }

  clickHighlightExample = (item) => {
    this.setState({ selected: item.i });
  };

  setExampleValue = (newExample) => {
    console.log("setExampleValue valueName value", newExample)
    this.setState({ example: newExample })
    console.log("setExampleValue ex updated", this.state.example)
  }

  componentDidMount() {
    this.setState({
      editValue:
        "Property Word: \nProperty Gloss: \nProperty Translation: '' \nProperty Comment: \nProperty Creator: ",
      editHeaderValue: this.props.examples[this.state.selected].name
    });
  }

  createElements(props) {
    let elements = [];
    for (let i = 0; i < props.length; i++) {
      let lines = [];
      lines.push(props[i].word);
      lines.push(props[i].gloss);
      lines.push(props[i].translation);
      //const aligned = alignWords(lines);
      //console.log("LINES: ", lines);
      elements.push(
        <Example
          value={props[i]}
          key={i}
          i={i}
          clickHighlightExample={this.clickHighlightExample}
          selected={this.state.selected}
        />
      );
    }
    return elements;
  }


  /*
name: "Example_99",
Property Description: hello
Property Word: Jan en Marie hebben elkaar ontmoet
Property Gloss: John and Marie have each.other mett
Property Translation: John and Marie met
Property Comment: 'The reciprocal "elkaar" is obligatory. '
Property Creator: Hilda Koopman
 */

  createExample(event) {
    console.log("CREATE:", event.currentTarget)
    this.setState({ value: event.currentTarget.value });
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

  valueSet(e, modalType) {

    const element = e.currentTarget.parentNode.previousSibling
    console.log("CREATE EXAMPLE:", element)
    console.log("CREATE EXAMPLE!!: ", this.state.example)
    
    if (modalType == "create") {
      this.props.addNewExample(
          this.state.example,
          "TEMP"
      );      
    } else {
      this.props.editNewExample(
        this.state.example,
        "EDITED",
        this.state.selected,
      )
    }
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
            valueSet={(e) => this.valueSet(e, "edit")}
            example={this.props.examples[this.state.selected]}
            setExampleValue={(newExample)=>this.setExampleValue(newExample)}
          />
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
            valueSet={(e) => this.valueSet(e, "create")}
            example={this.state.example}
            setExampleValue={(newExample)=>this.setExampleValue(newExample)}
          />
        </div>

        <div className="examples-text" onChange={this.changeEditValue}>
          {this.createElements(this.props.examples)}
        </div>
      </div>
    );
  }
}

export default Examples;
