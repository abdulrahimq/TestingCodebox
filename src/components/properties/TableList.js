import React from "react";
import "../../css/properties/TableList.css";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DoneIcon from "@material-ui/icons/Done";
import Dropdown from "./Dropdown";
import Button from "@material-ui/core/Button";

class TableList extends React.Component {
  // TODO: Need to ask about the actual colors
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      surness: this.props.surness,
      arrowDownDir: true,
      showResults: true,
      changedList: [],
      savedList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClickSaving = this.onClickSaving.bind(this);
  }

  rowStyle = (row) => {
    if (row.surness === "None") return { color: "#d9534f" };
    else if (row.surness === "Certain") return { color: "#161C2B" };
    else if (row.surness === "Need Help") return { color: "#f0ad4e" };
    else return { color: "#5cb85c" };
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  removeItemOnce(arr, value) {
    let copyArr = [...arr];
    let index = copyArr.indexOf(value);
    if (index > -1) {
      copyArr.splice(index, 1);
    }
    return copyArr;
  }

  onChangeClick(index) {
    if (!this.state.changedList.includes(this.index)) {
      const tempPosList = this.state.changedList;
      tempPosList.push(index);
      this.setState({ changedList: tempPosList });
    }
  }

  onClickSaving(index) {
    //console.log("TEST 1:", this.state.savedList, index);
    const tempPosSavedList = this.state.savedList;
    tempPosSavedList.push(index);
    //console.log("TEST 2:", tempPosSavedList, index);
    this.setState({ savedList: tempPosSavedList });
  }

  renderContent(index) {
    //console.log("RenderContent: ", index);
    if (this.state.savedList.includes(index)) {
      return <DoneIcon />;
    }
    return <i></i>;
  }

  render() {
    const items = this.props.items.todos;
    const allValues = this.props.allValues;
    console.log("ALL VALUES", allValues);
    const allSurness = this.props.allSurness;
    const itemsList = items.map((item, index) => (
      <tr
        key={index}
        style={{
          backgroundColor:
            this.props.selected === item.id ? "rgb(196, 196, 196, .2)" : ""
        }}
        onClick={() =>
          this.props.clickHighlight(
            item.id,
            item.property,
            item.examples,
            item.value,
            item.surness
          )
        }
        onChange={() => this.onChangeClick(index)}
      >
        {/* TODO: Need to change the item.title */}

        <td style={this.rowStyle(item)}>{item.title}</td>
        {/*
        <td>
          <Dropdown value={this.state.value} />{" "}
        </td> 
        */}
        <td>
          <select
            value={this.state.value}
            onChange={() => this.handleChange}
            style={{ backgroundColor: "#F3E63F" }}
            className="dropdown-menu"
          >
            <option value="value_0" key="value_0">
              {item.value}
            </option>
            {/* TODO: Change the counter from id to 1,2,3 ... */}
            {this.removeItemOnce(allValues, item.value).map(function (x) {
              const id = item.id;
              return (
                <option value={"value_" + { id }} key={"value_" + { id }}>
                  {x}
                </option>
              );
            })}
          </select>
        </td>
        <td>
          <select
            value={this.state.surness}
            onChange={() => this.handleChange}
            style={{ backgroundColor: "#F3E63F" }}
            className="dropdown-menu"
          >
            <option value="sure_0" key="sure_0">
              {item.surness}
            </option>
            {/* TODO: Change the counter from id to 1,2,3 ... */}
            {this.removeItemOnce(allSurness, item.surness).map(function (x) {
              const id = item.id;
              return (
                <option value={"surness_" + { id }} key={"surness_" + { id }}>
                  {x}
                </option>
              );
            })}
          </select>
        </td>
        <td>
          <div className="green">
            {!this.state.changedList.includes(index) ? (
              //this.renderContent(index)
              this.renderContent(index)
            ) : (
              <i>
                <Button
                  className="save-all"
                  variant="contained"
                  color="secondary"
                  style={{
                    backgroundColor: "#5cb85c",
                    borderColor: "#4cae4c"
                  }}
                  onClick={() => this.onClickSaving(index)}
                >
                  Save
                </Button>
              </i>
            )}
          </div>
        </td>
      </tr>
    ));

    return (
      <table className="table-container">
        <thead className="table-header">
          <tr>
            <th>
              <label style={{ paddingRight: "10px" }}>Property Name</label>
              <button
                className="properties-sort-arrow"
                style={{
                  padding: "0"
                }}
                onClick={() => {
                  this.props.sortAlphabetically();
                  this.setState({ arrowDownDir: !this.state.arrowDownDir });
                }}
              >
                {this.state.arrowDownDir ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </button>
            </th>
            <th>
              Value
              <button
                className="properties-sort-arrow"
                style={{
                  padding: "0"
                }}
                onClick={() => {
                  this.props.sortAlphabeticallyValue();
                  this.setState({ arrowDownDir: !this.state.arrowDownDir });
                }}
              >
                {this.state.arrowDownDir ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </button>
            </th>
            <th>
              Certainty
              <button
                className="properties-sort-arrow"
                style={{
                  padding: "0"
                }}
                onClick={() => {
                  this.props.sortAlphabeticallyCertainty();
                  this.setState({ arrowDownDir: !this.state.arrowDownDir });
                }}
              >
                {this.state.arrowDownDir ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-body">{itemsList}</tbody>
      </table>
    );
  }
}

export default TableList;
