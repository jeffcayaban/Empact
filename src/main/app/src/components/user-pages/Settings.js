import React from 'react';

import { Alert, Button, Col, Grid, Panel, Row } from "react-bootstrap";
import { deleteUser } from "../../utils/AppUtils";
import { Redirect } from "react-router-dom";
import { generateErrorDialog, generateGeneralConfirmDialog, generateSuccessDialog, isUserLoggedIn } from "../../utils/Helpers";

/**
 * Is the user settings page. This will provide actions that can be applied to a user account.
 */

class Settings extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleConfirmDeleteDialog = this.handleConfirmDeleteDialog.bind(this);
    }

    // Sends the request to delete the user's account.
    handleConfirmDeleteDialog(result) {
        if (result.value) {
            // Assumes that the user has confirmed the action to delete the account.

            const { isAuthenticated, currentUser, onLogout } = this.props;

            if (isAuthenticated) {
                // Assumes that the user is authenticated.

                deleteUser({ username: currentUser.username })
                    .then(response => {
                        // Displays a successful confirmation dialog.

                        onLogout();
                        generateSuccessDialog('Your account has been deleted!', 'Okay').then(() => {
                            window.location = `/`
                        });
                    }).catch(error => {
                        // Displays an error message.
                        generateErrorDialog('There was a problem deleting your account');
                    })
            }
        }
    }

    // Displays a delete confirmation dialog for when the delete button is clicked on.
    onDeleteBtnClick(e) {
        e.preventDefault();
        generateGeneralConfirmDialog().then(this.handleConfirmDeleteDialog)
    }

    render() {
        if (isUserLoggedIn(this.props.isAuthenticated)) {
            // Assumes that the user is logged in.

            return (
                <div id={"secondaryPageContainerStyle"}>
                    <div className={"centerStyle"}>
                        <h2>Settings</h2>
                    </div>
                    <div id={"settingsContainer"}>
                        <Grid>
                            <Row>
                                <Col md={12} lg={12}>
                                    <Panel defaultExpanded={false}>
                                        <Panel.Heading>
                                            <Panel.Title toggle>
                                                Delete Account
                                            </Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Collapse>
                                            <Panel.Body>
                                                <Alert bsStyle="warning">
                                                    Deleting your account will additionally delete all of your created
                                                    petitions and arguments. This action is irreversible.
                                                </Alert>
                                                <div id={"deleteAccountBtnContainer"}>
                                                    <Button bsStyle="danger" onClick={this.onDeleteBtnClick.bind(this)} >
                                                        Delete Account
                                                    </Button>
                                                </div>
                                            </Panel.Body>
                                        </Panel.Collapse>
                                    </Panel>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            );
        } else {
            // Assumes that the user is not logged in, and is redirected to the login page.
            return <Redirect to={{ pathname: '/login' }} />
        }
    }
}

export default Settings;
