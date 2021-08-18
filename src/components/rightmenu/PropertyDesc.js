import React from "react";
import "../../css/rightmenu/PropertyDesc.css";

class PropertyDesc extends React.Component {
  render() {
    return (
      <div className="property-container">
        <div className="property-header">
          <h1 className="property-title">Property Name</h1>
        </div>
        <textarea
          disabled
          className="property-text"
          value={this.props.desc}
        ></textarea>
      </div>
    );
  }
}

export default PropertyDesc;
