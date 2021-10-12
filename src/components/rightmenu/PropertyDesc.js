import React from "react";
import "../../css/rightmenu/PropertyDesc.css";
import ReactHtmlParser from "react-html-parser";

class PropertyDesc extends React.Component {
  render() {
    return (
      <div className="property-container">
        <div className="property-header">
          <h1 className="property-title">{this.props.descName}</h1>
        </div>
        <div className="property-text">{ReactHtmlParser(this.props.desc)}</div>
      </div>
    );
  }
}

export default PropertyDesc;
