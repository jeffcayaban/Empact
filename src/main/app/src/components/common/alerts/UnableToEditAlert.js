import React from "react";
import {Alert, Button} from "react-bootstrap";
import {Route} from "react-router-dom";

/**
 * Is an alert that informs the user that they are not allowed to edit the petition or argument.
 */

class UnableToEditAlert extends React.PureComponent {
    render() {
        const contentType = this.props.contentType;
        return (
            <div className={"alertContainer"}>
                <Alert bsStyle={"danger"}>
                    <h4>{`Unable to edit this ${contentType.toLowerCase()}.`}</h4>
                    <p>{`You do not have the permissions to edit this ${contentType.toLowerCase()}.`}</p>
                    <p className={"alertTextAndBtnPadding"}>
                        <Route render={({ history }) => (
                            <Button onClick={() => { history.push('/petitions') }}>
                                Explore
                            </Button>
                        )}/>
                    </p>
                </Alert>
            </div>
        );
    }
}

export default UnableToEditAlert;