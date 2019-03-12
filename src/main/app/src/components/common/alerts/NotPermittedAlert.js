import React from "react";
import {Alert, Button} from "react-bootstrap";
import {Route} from "react-router-dom";

/**
 * Is an alert for informing the user that they are not permitted to view a specific page.
 */

class NotPermittedAlert extends React.PureComponent {
    render() {
        return (
            <div className={"alertContainer"}>
                <Alert bsStyle={"danger"}>
                    <h4>You are not permitted to view this page.</h4>
                    <p>Click on the button below to explore the petitions on the website!</p>
                    <div style={{ marginTop: '15px' }}>
                        <Route render={({ history }) => (
                            <Button onClick={() => { history.push('/petitions') }}>
                                Explore
                            </Button>
                        )}/>
                    </div>
                </Alert>
            </div>
        );
    }
}

export default NotPermittedAlert;