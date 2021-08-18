/**
 * Displays properties in a table for selection
 */
import React from "react";
import "../../css/properties/PropertyTable.css";
import TableList from "./TableList";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as myConstant from "./Constants.js";
library.add(faAngleRight, faPlus);

const groupId = 1;
const lingId = 1;
const url =
  "http://localhost:3000/groups/" + groupId + "/lings/" + lingId + ".json";
const url_1 = "https://terraling.com/groups/8/lings/1081.json";
const myRequest = new Request(url_1, {
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

class PropertyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      data: [],
      description: "",
      examples: "",
      todos: myConstant.DATA,
      original: myConstant.ORIGIN,
      arrowDown: true,
      surness: "",
      value: "",
      selected: -1,
      allValues: this.getAllValues(myConstant.DATA)
    };
    this.onHighlight = this.onHighlight.bind(this);
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.sortAlphabeticallyValue = this.sortAlphabeticallyValue.bind(this);
    this.sortAlphabeticallyCertainty = this.sortAlphabeticallyCertainty.bind(
      this
    );
    this.setValues = this.setValues.bind(this);
  }

  componentDidMount() {
    // GET request using fetch inside useEffect React hook
    // https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples
    fetch(myRequest)
      .then((response) => response.json())
      .then((data) => {
        var cer = ["Certain", "Unsure", "Need Help", "N/A"];
        var data_arr = [];
        for (var i in data["ling_properties"]) {
          var lp = {
            key: i,
            name: data["ling_properties"][i]["name"],
            examples: data["ling_properties"][i]["examples"],
            value: data["ling_properties"][i]["value"],
            certainty: cer[Math.floor(Math.random() * cer.length)],
            id: data["ling_properties"][i]["id"]
          };
          /*if (!valuesList.includes(lp["value"])) {
            var tempVal = valuesList;
            tempVal.push(lp["value"]);
            setValuesList(tempVal);
          }*/
          data_arr.push(lp);
        }
        this.setState({ data: data_arr });
        this.setState({ ready: true });
        //        console.log("DATA: ", data);
        //      console.log("READY: ", true);
      });
  }

  onHighlight(descriptionInput, examplesInput) {
    this.setState({
      description: descriptionInput,
      examples: examplesInput
    });
    //console.log("Description: ", this.state.description);
    //console.log("Examples: ", this.state.examples);
  }

  // TODO change getAllValues and removeItemOnce to util file
  getAllValues(arr) {
    var valuesList = [];
    for (let element in arr) {
      if (!valuesList.includes(arr[element].value)) {
        valuesList.push(arr[element].value);
      }
    }
    return valuesList;
  }

  getAllSurness(arr) {
    var valuesList = [];
    for (let element in arr) {
      if (!valuesList.includes(arr[element].surness)) {
        valuesList.push(arr[element].surness);
      }
    }
    return valuesList;
  }

  handlerSet(items, value) {
    items.sort((a, b) => (a.id > b.id ? 1 : -1));
    var p;
    for (p of items) {
      if (
        p.id > this.state.selected &&
        (p.surness === value || p.surness === "Certain")
      ) {
        this.clickHighlight(p.id, p.property, p.examples);
        break;
      }
    }
    // Try the setState
    //console.log(items, value);
  }

  clickHighlight = (id, desc, examples, value, surness) => {
    this.setState({ selected: id, value: value, surness: surness });
    // console.log("ID: ", id);
    // console.log("DESC: ", desc);
    // console.log("EXM: ", examples);
    // console.log("STATE: ", this.state);
    this.props.setStateA(desc, examples);
  };

  compareProperties(prop1, prop2) {
    if (
      prop1.id === prop2.id &&
      prop1.title === prop2.title &&
      prop1.completed === prop2.completed &&
      prop1.value === prop2.value &&
      prop1.surness === prop2.surness
    ) {
      return true;
    }
    return false;
  }

  findChangedPropertiesIDs(a, b) {
    //console.log("ALL Values: ", this.state.allValues);
    if (JSON.stringify(a) === JSON.stringify(b)) {
      console.log("The given objects are Equal");
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

  sortAlphabetically() {
    const arr = this.state.todos;
    if (this.state.arrowDown) {
      arr.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      });
    } else {
      arr.sort(function (b, a) {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    this.setState({ todos: arr, arrowDown: !this.state.arrowDown });
  }

  sortAlphabeticallyValue() {
    const t = this.state.todos;
    if (this.state.arrowDown) {
      t.sort(function (a, b) {
        if (a.value < b.value) {
          return -1;
        } else {
          return 1;
        }
      });
    } else {
      t.sort(function (b, a) {
        if (a.value < b.value) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    this.setState({ todos: t, arrowDown: !this.state.arrowDown });
  }

  sortAlphabeticallyCertainty() {
    const arr = this.state.todos;
    if (this.state.arrowDown) {
      arr.sort(function (a, b) {
        if (a.surness < b.surness) {
          return -1;
        } else {
          return 1;
        }
      });
    } else {
      arr.sort(function (b, a) {
        if (a.surness < b.surness) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    this.setState({ todos: arr, arrowDown: !this.state.arrowDown });
  }

  setValues() {
    const tempAllValues = this.state.allValues;
    tempAllValues.push("TEST");
    this.setState({ allValues: tempAllValues });
    console.log("DONE SEtting All Values: ", this.state.allValues);
  }

  render() {
    return (
      <div>
        <div className="property-table" value="test">
          <div className="table-first-header">
            <h1
              onClick={() => {
                this.findChangedPropertiesIDs(
                  this.state.todos,
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
              disabled
              color="secondary"
              style={{ backgroundColor: "#5cb85c", borderColor: "#4cae4c" }}
              onClick={() => this.handlerSet(this.state.todos, "None")}
            >
              Save All
            </Button>
          </div>
          <TableList
            items={this.state}
            onRowClick={this.onHighlight}
            setStateA={this.props.setStateA}
            arrowDown={this.props.arrowDown}
            clickHighlight={this.clickHighlight}
            selected={this.state.selected}
            sortAlphabetically={this.sortAlphabetically}
            sortAlphabeticallyValue={this.sortAlphabeticallyValue}
            sortAlphabeticallyCertainty={this.sortAlphabeticallyCertainty}
            allValues={this.state.allValues}
            allSurness={this.getAllSurness(this.state.todos)}
          />
        </div>
        <br></br>
        <div>
          <label for="fname">First name: </label>
          <input type="text" id="fname" name="fname"></input>
          <label> </label>
          <input
            type="submit"
            value="Submit"
            onClick={() => this.setValues()}
          ></input>
        </div>
        {/* 
        <div className="nav-buttons">
          <Button
            className="unset"
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "#C60404",
              width: "25%",
              display: "flex",
              justifyContent: "space-between"
            }}
            onClick={() => this.handlerSet(this.state.todos, "None")}
          >
            <FontAwesomeIcon icon={faAngleRight} />
            Next Unset
          </Button>
          <Button
            className="uncertain"
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "#F4A408",
              width: "30%",
              display: "flex",
              justifyContent: "space-between"
            }}
            onClick={() => this.handlerSet(this.state.todos, "Need Help")}
          >
            <FontAwesomeIcon icon={faAngleRight} />
            Next Uncertain
          </Button>
        </div>
        */}
      </div>
    );
  }
}

export default PropertyTable;
