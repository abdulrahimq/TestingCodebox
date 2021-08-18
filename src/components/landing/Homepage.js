/**
 * Taken from terraling-ui
 * */

import React from "react";
import PropertyTable from "../properties/PropertyTable";
import Examples from "../rightmenu/Examples";
import Dropdown from "../properties/Dropdown";
import "../../css/landing/Homepage.css";
import PropertyDesc from "../rightmenu/PropertyDesc";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.setStateA = this.setStateA.bind(this);
    this.state = {
      desc: "No property has been selected yet",
      examples: ["No property has been selected for editing exampels yet."]
    };
  }

  setStateA(descNew, examplesNew) {
    this.setState({ desc: descNew, examples: examplesNew });
  }

  render() {
    return (
      <div>
        <Dropdown />
        <main className="properties">
          <div className="properties-card">
            <PropertyTable setStateA={this.setStateA} />
            <div className="properties-card-right">
              <div className="properties-card-top">
                <PropertyDesc desc={this.state.desc} />
              </div>
              <div className="properties-card-bottom">
                <Examples examples={this.state.examples} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Homepage;
