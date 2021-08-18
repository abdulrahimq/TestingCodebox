/**
 * Taken from terraling-ui
 * */

import React from "react";
import "../../css/properties/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Input = (props) => {
  return (
    <a id={"value_" + props.index} onClick={props.clickValue}>
      {props.text}
    </a>
  );
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      newOption: "",
      value: this.props.value,
      count: 3,
      inputs: []
    };
    this.showMenu = this.showMenu.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
  }

  showMenu = () => {
    this.setState({ open: !this.state.open });
  };

  _handleKeyUp = (e) => {
    if (e.key === "Enter") {
      this.setState({
        count: this.state.count + 1,
        inputs: [
          ...this.state.inputs,
          <Input
            text={e.target.value}
            index={this.state.count}
            clickValue={this.handleValueClick}
          />
        ]
      });
    }
  };

  handleClick = (e) => {
    this.setState({
      newOption: e.target.value,
      count: this.state.count + 1,
      inputs: [
        ...this.state.inputs,
        <Input
          text={e.target.value}
          index={this.state.count}
          clickValue={() => this.handleValueClick}
        />
      ]
    });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.setState({ newOption: e.target.value });
  };

  handleValueClick = (e) => {
    console.log("Show Menu E: ", e.currentTarget.innerText);
    console.log("Show Menu E: ", e.parentNode);
    console.log("Show Menu E: ", e);
    this.setState({ value: e.currentTarget.value });
  };

  render() {
    return (
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={(e) => {
            this.showMenu();
          }}
        >
          {" "}
          Dropdown
          <FontAwesomeIcon icon={faAngleDown} className="angle-down" />
        </button>
        <div
          id="myDropdown"
          className={
            this.state.open ? "dropdown-content show" : "dropdown-content"
          }
        >
          <a
            href="#value_0"
            onClick={(e) => {
              this.handleValueClick(e);
              this.showMenu();
            }}
            value={this.state.value}
          >
            About
          </a>
          <a href="#value_1">Base</a>
          <a href="#value_2">Blog</a>
          {this.state.inputs}
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Add new ..."
              id="myInput"
              onKeyUp={this._handleKeyUp}
              onChange={this.handleChange}
              name="newOption"
            ></input>
            <button
              value={this.state.newOption}
              onClick={this.handleClick}
              name="newOption"
              id="plus-button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
