import React from "react";
import "../../css/properties/TableList.css";
import Arrow from "./Arrow";
import TableRow from "./TableRow";

class TableList extends React.Component {
  // TODO: Need to ask about the actual colors
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      certainty: this.props.certainty,
      showResults: true
    };
  }

  render() {
    const items = JSON.parse(JSON.stringify(this.props.items));
    const allValues = this.props.allValues;
    const allSurness = this.props.allSurness;
    const itemsList = items.map((item, index) => (
      <TableRow
        key={index}
        index={index}
        item={item}
        allValues={allValues}
        allSurness={allSurness}
        clickHighlight={this.props.clickHighlight}
        setStateA={this.props.setStateA}
        selected={this.props.selected}
        changedItem={this.props.changedItem}
        savedItem={this.props.savedItem}
        enableSaveAll={this.props.enableSaveAll}
      />
    ));
    console.log("itemsList: ", itemsList)
    return (
      <table className="table-container">
        <thead className="table-header">
          <tr>
            <th>
              <label>Property Name</label>
              <Arrow
                items={items}
                type="name"
                sortAlphabetically={this.props.sortAlphabetically}
              />
            </th>
            <th>
              Value
              <Arrow
                items={items}
                type="value"
                sortAlphabetically={this.props.sortAlphabetically}
              />
            </th>
            <th>
              Certainty
              <Arrow
                items={items}
                type="certainty"
                sortAlphabetically={this.props.sortAlphabetically}
              />
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody className="table-body">
          {itemsList}
        </tbody>
      </table>
    );
  }
}

export default TableList;
