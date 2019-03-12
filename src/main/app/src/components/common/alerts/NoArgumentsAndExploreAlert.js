import React from 'react';
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

/**
 * Is the alert for when there are no arguments and invites the user to explore other petitions.
 */

class NoArgumentsAndExploreAlert extends React.PureComponent {
    render() {
        return (
            <Alert bsStyle="warning">
                There are no arguments here! Click <Link to={'/petitions'}>here</Link> to explore some petitions!
            </Alert>
        );
    }
}

export default NoArgumentsAndExploreAlert;