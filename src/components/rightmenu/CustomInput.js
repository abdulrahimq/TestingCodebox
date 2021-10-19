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
                    id={this.props.id}
                    name={this.props.name}
                    placeholder=""
                    value={this.state.name}
                    onChange={(e) => {
                        this.changeText(e.currentTarget.value);
                        this.props.setExampleSpecificValue(this.props.id, this.state.name)
                    }}
                />
            </>
        );
    }
}

export default CustomInput;
