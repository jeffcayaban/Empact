import React from 'react'
import { Alert } from "react-bootstrap";

/**
 * Is the alert for when an argument can not be created on a closed petition.
 */

class NoArgCreationOnClosedPetitionAlert extends React.PureComponent {
    render() {
        return (
            <div className={"secondaryPageContainerStyle"}>
                <Alert bsStyle={"danger"}>
                    <h4>You cannot create an argument on a closed petition.</h4>
                </Alert>
            </div>
        );
    }
}

export default NoArgCreationOnClosedPetitionAlert;