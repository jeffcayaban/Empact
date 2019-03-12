import React from "react";
import { Alert } from "react-bootstrap";

/**
 * Is the alert for when the user attempts to disagree their own argument.
 */

class NoCreatorDisagreeAlert extends React.PureComponent {
    render() {
        return (
            <div className={"secondaryPageContainerStyle"}>
                <Alert bsStyle={"danger"}>
                    <h4>You're not allowed to create a disagreeing argument towards your own argument.</h4>
                </Alert>
            </div>
        );
    }
}

export default NoCreatorDisagreeAlert;