import React from 'react';
import { Alert } from "react-bootstrap";
import { PETITION } from "../../../constants";

/**
 * Is the alert for when a user is attempting to create an argument of their own petition.
 */

class NoContentAlert extends React.PureComponent {

    render() {
        const displayedContentType = this.props.contentType === PETITION ? "petitions" : "arguments";

        return (
            <div style={{ margin: '15px' }}>
                <Alert bsStyle="warning">{`There are no ${displayedContentType} here!`}</Alert>
            </div>
        );
    }
}

export default NoContentAlert;