import React from "react";
import { Alert } from "react-bootstrap";

/**
 * Is the alert for when a user is attempting to create an argument of their own petition.
 */

class NoCreatorArgumentAlert extends React.PureComponent {
    render() {
        return (
            <div className={"secondaryPageContainerStyle"}>
                <Alert bsStyle={"danger"}>
                    <h4>You're not allowed to create an argument on your own petition</h4>
                </Alert>
            </div>
        );
    }
}

export default NoCreatorArgumentAlert;