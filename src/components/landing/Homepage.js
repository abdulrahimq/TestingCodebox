/**
 * Taken from terraling-ui
 * */

import React from "react";
import PropertyTable from "../properties/PropertyTable";
import Examples from "../rightmenu/Examples";
import "../../css/landing/Homepage.css";
import PropertyDesc from "../rightmenu/PropertyDesc";

{/*
  TODO: the following url_1 and url_prop needs to be changed to dynamic input
*/}
const url_1 = "https://terraling.com/groups/8/lings/1081.json";
const url_prop = "https://terraling.com/groups/" + 8 + "/properties/";
const myRequest = new Request(url_1, {
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

{/*
  TODO: Remove one of the following items, original, or data as they are redundant.
*/}
class Homepage extends React.Component {
  /**
   * This main container
   * It has:
   * PropertyTable which is the left-side of the page
   * Examples and PropertyDesc which are the right-side of the page
   */
  constructor(props) {
    super(props);
    this.setStateA = this.setStateA.bind(this);
    this.addNewExample = this.addNewExample.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      desc: "No property has been selected yet",
      examples: ["No property has been selected for editing examples yet."],
      id: -1,
      exampleID: 0,
      items: [],
      original: [],
      data: [],
      descName: "Property Name",
      langName: ""
    };
  }

  fetchData() {
    console.log("FETCH DATA");
    fetch(myRequest)
      .then((response) => response.json())
      .then((data) => {
        let cer = ["Certain", "Unsure", "Need Help", "N/A"];
        let data_arr = [];
        for (let i in data["ling_properties"]) {
          let lp = {
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
          original: data_arr,
          langName: data['ling_name']
        });
      });
  }

  componentDidMount() {
    // GET request using fetch inside useEffect React hook
    // https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples
    this.fetchData();
  }


  addNewExample(newExample, newExampleTitle) {
    //console.log("newExampleTitle", newExampleTitle);
    newExample["name"] = newExampleTitle;
    //console.log("ADD NEW EXAMPLE START: ", newExample);
    const tempExamples = this.state.examples;
    tempExamples.push(newExample);
    this.setState({ examples: tempExamples });
    //console.log("ADD NEW EXAMPLE DONE: ", newExample);
  }

  setStateA(descNew, examplesNew, examplesID, descNameNew) {
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
          desc: description,
          descName: descNameNew
        });
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
              langName={this.state.langName}
            />
            <div className="properties-card-right">
              <div className="properties-card-top">
                <PropertyDesc desc={this.state.desc} descName={this.state.descName}/>
              </div>
              {
                <div className="properties-card-bottom">
                  <Examples
                    examples={this.state.examples}
                    propertyID={this.state.id}
                    exampleID={this.state.exampleID}
                    example={this.state.examples[this.state.exampleID]}
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
