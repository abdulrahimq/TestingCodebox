import React, { Component } from "react";

import "../../css/rightmenu/Examples.css";
import alignWords from "@digitallinguistics/word-aligner";

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toShowLines: null
    };
  }

  componentDidMount() {
    let lines = [];
    lines.push(this.props.value.word);
    lines.push(this.props.value.gloss);
    lines.push(this.props.value.translation);
    this.setState({ toShowLines: lines });
  }

  render() {
    return (
      <div
        id={"example-" + this.props.i}
        key={"example-" + this.props.i}
        style={{
          backgroundColor:
            this.props.selected === this.props.i
              ? "rgb(196, 196, 196, .2)"
              : "white",
          padding: "5px",
          marginBottom: "5px"
        }}
        onClick={() => {
          this.props.clickHighlightExample(this.props);
        }}
      >
        <p className="example-header-item">{this.props.value.name}</p>
        <p className="example-word">
          Property Word:{"  "}
          {this.props.value.word}
        </p>
        <p className="example-gloss">
          Property Gloss: {this.props.value.gloss}
        </p>
        <p className="translation">
          Property Translation: {this.props.value.translation}
        </p>
        <p>Property Comment: {this.props.value.comment}</p>
        <p>Property Creator: {this.props.value.creator}</p>
        <br />
      </div>
    );
  }
}

export default Example;
