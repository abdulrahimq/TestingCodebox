import React from "react";
import "../../css/properties/Arrow.css";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

class Arrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowDownDir: true
    };
  }

  render() {
    return (
      <button
        className="properties-sort-arrow"
        onClick={() => {
          this.props.sortAlphabetically(this.props.type);
          this.setState({ arrowDownDir: !this.state.arrowDownDir });
        }}
      >
        {this.state.arrowDownDir ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </button>
    );
  }
}

export default Arrow;
