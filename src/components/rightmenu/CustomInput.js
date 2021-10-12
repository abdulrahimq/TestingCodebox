import React, { Component } from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import "../../css/rightmenu/Examples.css";

class CustomInput extends Component {
    constructor(props) {
        super(props);
        this.state = { name: this.props.default };
    }

    changeText(value){
        this.setState({ name: value });
    }

    render() {
        return (
            <>
                <textarea
                    type="text"
                    id="example-gloss"
                    name="example-gloss"
                    placeholder=""
                    value={this.state.name}
                    onChange={e => this.changeText(e.currentTarget.value)}
                />
            </>
        );
    }
}

export default CustomInput;
