import React from "react";
import { Checkbox } from "react-bootstrap";

/**
 * Displays a checkbox for filtering arguments whose petition is closed.
 */

class ClosedCheckbox extends React.PureComponent {
    render() {
        return <Checkbox onChange={this.props.onChange}>Closed</Checkbox>;
    }
}

export default ClosedCheckbox;