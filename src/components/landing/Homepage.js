/**
 * Taken from terraling-ui
 * */

import React from "react";
import PropertyTable from "../properties/PropertyTable";
import Examples from "../rightmenu/Examples";
import "../../css/landing/Homepage.css";
import PropertyDesc from "../rightmenu/PropertyDesc";
//import * as myConstant from "../properties/Constants.js";

//const groupId = 1;
//const lingId = 1;
//const url =
//"http://localhost:3000/groups/" + groupId + "/lings/" + lingId + ".json";
const url_1 = "https://terraling.com/groups/8/lings/1081.json";
const myRequest = new Request(url_1, {
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

const url_prop = "https://terraling.com/groups/" + 8 + "/properties/";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.setStateA = this.setStateA.bind(this);
    this.addNewExample = this.addNewExample.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      desc: "No property has been selected yet",
      examples: ["No property has been selected for editing exampels yet."],
      id: -1,
      exampleID: 0,
      //items: myConstant.DATA,
      //original: myConstant.ORIGIN,
      items: [],
      original: [],
      data: []
    };
  }

  fetchData() {
    console.log("FETCH DATA");
    fetch(myRequest)
      .then((response) => response.json())
      .then((data) => {
        var cer = ["Certain", "Unsure", "Need Help", "N/A"];
        var data_arr = [];
        for (var i in data["ling_properties"]) {
          var lp = {
            key: i,
            name: data["ling_properties"][i]["name"],
            examples: data["ling_properties"][i]["examples"],
            value: data["ling_properties"][i]["value"],
            certainty: cer[Math.floor(Math.random() * cer.length)],
            id: data["ling_properties"][i]["id"]
          };
          /*if (!valuesList.includes(lp["value"])) {
          var tempVal = valuesList;
          tempVal.push(lp["value"]);
          setValuesList(tempVal);
        }*/
          data_arr.push(lp);
        }
        this.setState({
          data: data_arr,
          ready: true,
          items: data_arr,
          original: data_arr
        });

        console.log("READY: ", data);
      });
  }

  componentDidMount() {
    // GET request using fetch inside useEffect React hook
    // https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples
    //console.log("HOMEPAGE MOUNT");
    //this.fetchData();
  }

  addNewExample(newExample, newExampleTitle) {
    console.log("newExampleTitle", newExampleTitle);
    newExample["name"] = newExampleTitle;
    console.log("ADD NEW EXAMPLE START: ", newExample);
    const tempExamples = this.state.examples;
    tempExamples.push(newExample);
    this.setState({ examples: tempExamples });
    console.log("ADD NEW EXAMPLE DONE: ", newExample);
  }

  setStateA(descNew, examplesNew, examplesID) {
    this.setState({ desc: descNew, examples: examplesNew });
    const myRequest = new Request(url_prop + examplesID, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
    fetch(myRequest)
      .then((response) => response.json())
      .then((data) => {
        const description = data["property_description"];
        this.setState({
          desc: description
        });
        //console.log("SETSTATE A: ", data);
      });
  }

  render() {
    return (
      <div>
        <main className="properties">
          <div className="properties-card">
            <PropertyTable
              setStateA={this.setStateA}
              items={this.state.items}
              original={this.state.original}
              fetchData={this.fetchData}
            />
            <div className="properties-card-right">
              <div className="properties-card-top">
                <PropertyDesc desc={this.state.desc} />
              </div>
              {
                <div className="properties-card-bottom">
                  <Examples
                    examples={this.state.examples}
                    propertyID={this.state.id}
                    exampleID={this.state.exampleID}
                    addNewExample={(e, e1) => this.addNewExample(e, e1)}
                  />
                </div>
              }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Homepage;
