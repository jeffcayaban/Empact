import React from 'react'
import {editPetition, getPetition} from "../../utils/AppUtils";
import PetitionForm from "../form/PetitionForm";
import {Redirect} from "react-router-dom";
import {
    comparePetitionData,
    generateErrorDialog,
    generateGeneralConfirmDialog,
    generateSuccessDialog,
    isUserLoggedIn
} from "../../utils/Helpers";
import UnableToEditAlert from "../argument/EditArgument";
import {PETITION} from "../../constants";
import Loader from "../Loader";
import {Col, Grid, Row} from "react-bootstrap";

/**
 * Is the page for editing an existing petition. It provides the user with a form for entering the new details for the
 * petition.
 */

class EditPetition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            petition: {},
            isLoading: true
        };

        this.onUpdate = this.onUpdate.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    // Fetches a petition from the server given an ID.
    loadFromServer(petitionId) {
        getPetition(petitionId)
            .then(response => this.setState({ petition: response, isLoading: false }))
            .catch(error => this.setState({ isLoading: false }));
    }

    // Cancels the modification of the petition and redirects the user back to the petition's page.
    onCancel() {
        this.props.history.push(`/petition/${this.state.petition.id}`);
    }

    // Updates the petition with any new data.
    onUpdate(petitionData) {
        const editPetitionRequest = petitionData;
        const petition = this.state.petition;
        petitionData.petitionId = petition.id;

        const existNoChanges = comparePetitionData(petition, editPetitionRequest);

        if (!existNoChanges) {
            // Assumes that there has been new changes to be applied.

            generateGeneralConfirmDialog("Do you wish to update your petition with these details?")
                .then(result => {
                    if (result.value) {
                        // Assumes that the user has confirmed the action to edit the petition.
                        editPetition(editPetitionRequest)
                            .then(response => {
                                generateSuccessDialog('Your petition has been updated!', 'Your Petition')
                                    .then(() => {window.location = `/petition/${petition.id}`})
                            }).catch(error => generateErrorDialog('Your petition couldn\'t be updated.'))
                    }
                });
        } else {
            // Assumes that there has been no new changes to be applied.
            generateErrorDialog("There are no new changes to be applied.")
        }
    }

    componentWillMount() {
        const petitionId = this.props.match.params.id;
        this.loadFromServer(petitionId);
    }

    render() {
        if (isUserLoggedIn(this.props.isAuthenticated)) {
            // Assumes the user is logged in.

            if (!this.state.isLoading) {
                // Assumes that data fetching has completed.

                if (this.state.petition.createdBy.username === this.props.currentUser.username) {
                    // Assumes the user is the petition creator.

                    const { onUpdate, onCancel } = this;
                    const petition = Object.assign({}, this.state.petition);

                    return (
                        <div className={'secondaryPageContainerStyle'}>
                            <div className={"centerStyle"}>
                                <h2 align="center">Edit Petition</h2>
                            </div>
                            <div className={"titleContentPadding"}>
                                <Grid className={"divNoPadding"}>
                                    <Row>
                                        <Col md={12} lg={12}>
                                            <PetitionForm petition={petition} onSubmit={onUpdate} onCancel={onCancel} />
                                        </Col>
                                    </Row>
                                </Grid>
                            </div>
                        </div>
                    );
                } else {
                    // Assumes the user is not the petition creator and an alert is displayed.
                    return <UnableToEditAlert contentType={PETITION} />;
                }
            } else {
                // Assumes that data is being fetched,
                return <Loader isLoading={this.state.isLoading} />;
            }
        } else {
            // Assumes the user is not logged in and redirects the user to the login page.
            return <Redirect to={{ pathname: '/login' }} />
        }
    }
}

export default EditPetition;