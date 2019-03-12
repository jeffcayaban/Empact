import React from 'react'

import PetitionForm from "../form/PetitionForm";
import { Redirect } from "react-router-dom";
import {createPetition} from "../../utils/AppUtils";
import {Col, Grid, Row} from "react-bootstrap";
import {
    generateErrorDialog,
    generateGeneralConfirmDialog,
    generateSuccessDialog,
    isUserLoggedIn
} from "../../utils/Helpers";

/**
 * Is the page for creating a new petition. It provides the user with a form for entering the new details for the new
 * petition.
 */

class CreatePetition extends React.PureComponent {

    // Displays the result of the petition creation.
    onCreate(result, petitionData) {
        if (result.value) {
            // Assumes that the user has confirmed the action to create the petition.
            createPetition(petitionData)
                .then(response => {
                    generateSuccessDialog('Your petition has been created!', 'Your Petition').then(() => {
                        window.location = `/petition/${response.petitionId}`
                    })
                }).catch(error => generateErrorDialog('Your petition couldn\'t be created.'));
        }
    }

    // Confirms the action to create the new petition.
    handleOnCreateRequest(petitionData) {
        generateGeneralConfirmDialog("Do you wish to create your petition with these details?")
            .then(result => this.onCreate(result, petitionData));
    }

    // Cancels the creation of the new petition and redirects the user to the home page.
    onCancel() {
        this.props.history.push('/');
    }

    render() {
        if (isUserLoggedIn(this.props.isAuthenticated)) {
            // Assumes the user is logged in.

            return (
                <div className={'secondaryPageContainerStyle'}>
                    <div className={"centerStyle"}>
                        <h2 align="center">Create</h2>
                        <p align="center">Lets create your petition!</p>
                    </div>
                    <div className={"titleContentPadding"}>
                        <Grid className={"divNoPadding"}>
                            <Row>
                                <Col md={12} lg={12}>
                                    <PetitionForm
                                        onSubmit={this.handleOnCreateRequest.bind(this)}
                                        nCancel={this.onCancel.bind(this)}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            );
        } else {
            // Assumes the user is not logged in and will redirect the user to the login page.
            return <Redirect to={{ pathname: '/login' }} />
        }
    }
}

export default CreatePetition;