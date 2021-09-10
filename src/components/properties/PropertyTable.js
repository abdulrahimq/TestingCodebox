/**
 * Displays properties in a table for selection
 */
import React from "react";
import "../../css/properties/PropertyTable.css";
import TableList from "./TableList";

import Button from "@material-ui/core/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleRight, faPlus);

class PropertyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      data: [],
      description: "",
      examples: "",
      //items: myConstant.DATA,
      //items: this.props.items,
      items: [],
      original: [],
      //original: this.props.original,
      arrowDown: true,
      certainty: "",
      value: "",
      selected: -1,
      //allValues: this.getAllValues(myConstant.DATA, "value"),
      allValues: this.getAllValues(this.props.items, "value"),
      disabled: false
    };
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.setValues = this.setValues.bind(this);
    this.changedItem = this.changedItem.bind(this);
    this.savedItem = this.savedItem.bind(this);
    this.enableSaveAll = this.enableSaveAll.bind(this);
  }

  savedItem(item) {
    //console.log("SAVED Click: ", item.id);
    let tempItems = this.state.items;
    for (let i in tempItems) {
      if (tempItems[i].id === item.id) {
        tempItems[i].saved = true;
      }
    }
    this.setState({ items: tempItems });
    this.enableSaveAll();
    //console.log("SAVED Click DONE: ", this.state.items);
  }

  changedItem(itemID, property, propertyValue) {
    //console.log("Changed Click: ", itemID, property, propertyValue);
    let tempItems = this.state.items;
    for (let i in tempItems) {
      if (tempItems[i].id === itemID) {
        tempItems[i].changed = true;
        tempItems[i][property] = propertyValue;
      }
    }
    this.setState({ items: tempItems });
    //console.log("Changed Click DONE: ", this.state.items);
  }

  addSavedChangedProperty() {
    let dataList = [];
    for (let idx in this.state.items) {
      let element = this.state.items[idx];
      element["saved"] = false;
      element["changed"] = false;
    }
    return dataList;
  }

  // TODO change getAllValues and removeItemOnce to util file
  getAllValues(arr, property) {
    let valuesList = [];
    for (let element in arr) {
      if (!valuesList.includes(arr[element][property])) {
        valuesList.push(arr[element][property]);
      }
    }
    return valuesList;
  }

  clickHighlight = (item) => {
    this.setState({
      selected: item.id,
      value: item.value,
      certainty: item.certainty
    });
    this.props.setStateA(item.property, item.examples, item.id);
  };

  compareProperties(prop1, prop2) {
    return prop1.id === prop2.id &&
        prop1.name === prop2.name &&
        prop1.completed === prop2.completed &&
        prop1.value === prop2.value &&
        prop1.certainty === prop2.certainty;

  }

  findChangedPropertiesIDs(a, b) {
    if (JSON.stringify(a) === JSON.stringify(b)) {
      //console.log("The given objects are Equal");
      return true;
    }
    let newSet = [];
    for (let elem1 of b) {
      let add = true;
      for (let elem2 of a) {
        if (this.compareProperties(elem1, elem2)) {
          add = false;
          break;
        }
      }
      if (add) {
        newSet.push(elem1.id);
      }
    }
    return newSet;
  }

  sortAlphabetically(prop) {
    const arr = this.state.items;
    if (this.state.arrowDown) {
      arr.sort((a, b) => {
        return a[prop] < b[prop];
      });
    } else {
      arr.sort((a, b) => {
        return a[prop] > b[prop];
      });
    }
    this.setState({ items: arr, arrowDown: !this.state.arrowDown });
  }

  setValues(e) {
    const tempAllValues = this.state.allValues;
    tempAllValues.push(
      e.currentTarget.previousElementSibling.previousElementSibling.value
    );
    this.setState({ allValues: tempAllValues });
  }

  enableSaveAll() {
    for (let idx in this.state.items) {
      let element = this.state.items[idx];
      if (element["changed"] && !element["saved"]) {
        this.setState({ disabled: true });
        return null;
      }
    }
    this.setState({ disabled: false });
  }

  saveAll() {
    let tempItems = this.state.items;
    for (let i in tempItems) {
      if (tempItems[i].changed && !tempItems[i].saved) {
        tempItems[i].saved = true;
      }
    }
    this.setState({ items: tempItems });
    this.enableSaveAll();
  }

  componentDidMount() {
    this.props.fetchData();
    console.log("componentDidMount", this.props);
    this.setState({ items: this.props.items, original: this.props.original });
    console.log("Component DID MOUNT", this.state.item);
    //this.setState({ items: this.props.items, original: this.props.original });
  }

  render() {
    console.log("Prop Table 31");
    return (
      <div>
        <div className="property-table">
          <div className="table-first-header">
            <h1
              onClick={() => {
                this.findChangedPropertiesIDs(
                  this.state.items,
                  this.state.original
                );
                this.props.setStateA();
              }}
            >
              Properties
            </h1>
            <Button
              className="save-all"
              variant="contained"
              disabled={!this.state.disabled}
              color="secondary"
              style={{ backgroundColor: "#5cb85c", borderColor: "#4cae4c" }}
              onClick={() => this.saveAll()}
            >
              Save All
            </Button>
          </div>
          <TableList
            items={this.state.items}
            setStateA={this.props.setStateA}
            arrowDown={this.props.arrowDown}
            clickHighlight={this.clickHighlight}
            selected={this.state.selected}
            sortAlphabetically={this.sortAlphabetically}
            allValues={this.state.allValues}
            allSurness={this.getAllValues(this.state.items, "certainty")}
            changedItem={this.changedItem}
            savedItem={this.savedItem}
            enableSaveAll={this.enableSaveAll}
          />
        </div>
        {/**
        <br></br>
        <div>
          <label htmlFor="fname">Add Value: </label>
          <input type="text" id="fname" name="fname"></input>
          <label> </label>
          <input
            type="submit"
            value="Submit"
            onClick={(e) => this.setValues(e)}
          ></input>
        </div>
         */}
      </div>
    );
  }
}

export default PropertyTable;
