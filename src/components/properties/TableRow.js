import React from "react";
import "../../css/properties/TableRow.css";
import Button from "@material-ui/core/Button";
import CustomSelect from "./CustomSelect";
import DoneIcon from "@material-ui/icons/Done";

class TableRow extends React.Component {
  rowStyle = (row) => {
    if (row.certainty === "None") return { color: "#d9534f" };
    else if (row.certainty === "Certain") return { color: "#161C2B" };
    else if (row.certainty === "Need Help") return { color: "#f0ad4e" };
    else return { color: "#5cb85c" };
  };

  renderContent(item) {
    if (item.saved) {
      return (
        <div>
          <DoneIcon />
          Saved
        </div>
      );
    }
    return <i style={{ display: "block", width: "100px" }}> </i>;
  }

  render() {
    const index = this.props.index;
    const item = this.props.item;
    return (
      <tr
        key={index}
        style={{
          backgroundColor:
            this.props.selected === item.id ? "rgb(196, 196, 196, .2)" : ""
        }}
        onClick={() => this.props.clickHighlight(item)}
      >
        <td className="row-name" style={this.rowStyle(item)}>
          {item.name}
        </td>
        <td>
          <CustomSelect
            allValues={this.props.allValues}
            item={item}
            clickHighlight={this.props.clickHighlight}
            value={item.value}
            changedItem={this.props.changedItem}
            type={"value"}
            enableSaveAll={this.props.enableSaveAll}
          />
        </td>
        <td>
          <CustomSelect
            allValues={this.props.allSurness}
            item={item}
            clickHighlight={this.props.clickHighlight}
            value={item.surness}
            changedItem={this.props.changedItem}
            type={"certainty"}
            enableSaveAll={this.props.enableSaveAll}
          />
        </td>
        <td>
          <div className="green">
            {!item.changed || item.saved ? (
              this.renderContent(item)
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
                  onClick={() => this.props.savedItem(item)}
                >
                  Save
                </Button>
              </i>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default TableRow;
