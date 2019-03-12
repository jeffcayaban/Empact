import React from 'react';
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

/**
 * Is the alert for when there are no petitions and invites the user to explore other areas of the system.
 */

class NoPetitionsAndExploreAlert extends React.PureComponent {
    render() {
        const baseMessage = "There are no petitions here!";

        if (this.props.showFollowUp) {
            // Displays a message to invite the user to create a petition.

            return (
                <Alert bsStyle="warning">
                    { baseMessage } Click <Link to={'/petition/create'}>here</Link> to create your petition!
                </Alert>
            );
        } else {
            return (
                <Alert bsStyle="warning">
                    { baseMessage }
                </Alert>
            );
        }
    }
}

export default NoPetitionsAndExploreAlert;