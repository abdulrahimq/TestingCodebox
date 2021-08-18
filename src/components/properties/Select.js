import React, { Component } from "react";

class Select extends Component {
  render() {
    return (
      <div>
        <select
          value={this.state.surness}
          onChange={this.handleChange}
          style={{ backgroundColor: "#F3E63F" }}
          className="dropdown-menu"
        >
          <option value="sure_0" key="sure_0">
            {/*props.item.surness*/}
          </option>

          {/*this.removeItemOnce(props.allSurness, props.item.surness).map(
            function (x, i) {
              return (
                <option value={"surness_" + { i }} key={"surness_" + { x }}>
                  {x}
                </option>
              );
            }
          )*/}
        </select>
      </div>
    );
  }
}

export default Select;
