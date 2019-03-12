import React from 'react';
import { Alert, Button } from "react-bootstrap";
import { Route } from "react-router-dom";

/**
 *  Is the alert for when an argument or petition has failed to be fetched.
 */

class ContentRetrievalAlert extends React.PureComponent {
    render() {
        const contentType = this.props.contentType.toLowerCase();
        return (
            <Alert bsStyle={"danger"}>
                <h4>Sorry, an occur has occurred.</h4>
                <p>
                    There was a problem retrieving the {contentType}.
                    Click on the button below to explore the other petitions.
                </p>
                <div style={{ marginTop: '15px' }}>
                    <Route render={({ history }) => (
                        <Button onClick={() => { history.push('/petitions') }}>
                            Explore
                        </Button>
                    )}/>
                </div>
            </Alert>
        );
    }
}


export default ContentRetrievalAlert;

