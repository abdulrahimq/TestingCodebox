import React from "react";
import "../../css/properties/CustomSelect.css";

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, item) {
    this.props.changedItem(item.id, this.props.type, event.currentTarget.value);
    this.setState({ value: event.target.value });
  }

  render() {
    const item = this.props.item;
    const allValues = this.props.allValues;
    let id = -1;
    return (
      <select
        style={{ backgroundColor: "#F3E63F" }}
        className="dropdown-menu"
        onFocus={() => {
          this.props.clickHighlight(item);
        }}
        onChange={(event) => {
          this.handleChange(event, item);
          this.props.enableSaveAll();
        }}
        value={this.props.value}
      >
        {allValues.map(function (x) {
          id += 1;
          return (
            <option value={x} key={"value_" + id}>
              {x}
            </option>
          );
        })}
      </select>
    );
  }
}

export default CustomSelect;
