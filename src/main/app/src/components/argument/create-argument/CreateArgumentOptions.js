import React from 'react'
import { DropdownButton, MenuItem } from "react-bootstrap";
import { ARGUMENTATION_SCHEMES } from "../../../constants";

const defaultOptionSelectTitle = 'Choose your method';

/**
 * Provides the different argumentation schemes that the user can select from.
 */

class CreateArgumentOptions extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { selectedOption: '' }
    }

    // Updates the current state with the selected argumentation scheme.
    handleOptionSelect(key) {
        const newSelectedOption = ARGUMENTATION_SCHEMES[key];
        if (this.state.selectedOption !== newSelectedOption) {
            this.props.handleSelect(key);
            this.setState({ selectedOption: newSelectedOption });
        }
    }

    render() {
        const selectedOption = this.state.selectedOption;

        return (
            <div className={"centerStyle"}>
                <p align="center">How would you like to base your argument off?</p>
                <DropdownButton
                    id={"create-argument-options"}
                    title={!selectedOption ? defaultOptionSelectTitle : selectedOption}
                    onSelect={this.handleOptionSelect.bind(this)}
                >
                    { ARGUMENTATION_SCHEMES.map((scheme, index) =>
                        <MenuItem key={index} eventKey={index}>{scheme}</MenuItem>) }
                </DropdownButton>
            </div>
        );
    }
}

export default CreateArgumentOptions;