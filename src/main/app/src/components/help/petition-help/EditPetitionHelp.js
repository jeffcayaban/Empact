import React from "react";
import {Alert, Col, Grid, Panel, Row} from "react-bootstrap";

import EditPetitionLink from '../../../other/images/edit-petition-link.png';
import EditPetitionForm from '../../../other/images/edit-petition-form.png';
import SubmitPetitionBtn from '../../../other/images/edit-petition-submit.png';
import EditPetitionConfirm from '../../../other/images/edit-petition-confirm.png';
import UnsuccessfulPetitionModification from '../../../other/images/unsuccessful-edit-petition.png';
import SuccessfulPetitionModification from '../../../other/images/successful-edit-petition.png';

import NoNewDetailsScreen from "../../../other/images/unsuccessful-edit-arg-2.png";
import BackButton from "../../common/BackButton";

/**
 * Displays help information for editing a petition.
 */

class EditPetitionHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Editing a Petition</h2>
                    <p>Understand how to edit a petition.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to edit a petition</h4>
                                    <hr className={"helpHr"} />

                                    <Alert bsStyle="info">
                                        You will need to be logged in into a user account and to have an existing open
                                        petition.
                                    </Alert>

                                    <p>
                                        1. Click on the "Edit" button that is found on the page of your petition.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                                        <img style={{  maxWidth: '45%', minWidth: '350px', align: 'center' }}
                                             src={EditPetitionLink}
                                             alt="Edit Petition Link"
                                        />
                                    </div>

                                    <p>
                                        2. Update your petition by modifying the information on the form.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingBottom: '40px' }}>
                                        <img style={{  maxWidth: '45%', minWidth: '350px', align: 'center' }}
                                             src={EditPetitionForm}
                                             alt="Edit Petition Form" />
                                    </div>

                                    <p>
                                        3. Once completed, click on the "Submit" button that is located towards the
                                        bottom of the page.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingBottom: '15px' }}>
                                        <img style={{  maxWidth: '15%', minWidth: '350px', align: 'center' }}
                                             src={SubmitPetitionBtn}
                                             alt="Submit Petition Button" />
                                    </div>

                                    <p>
                                        4. Clicking on the submit button will display a dialog to confirm whether the
                                        details of the petition accurately reflect your viewpoint. Clicking on "Yes"
                                        will update the petition with the details that you have provided. Below shows
                                        an image of the expected confirmation dialog.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={EditPetitionConfirm}
                                             alt="Confirmation Dialog"
                                        />
                                    </div>

                                    <p>
                                        5. If the modification is successful then you will be shown a confirmation screen,
                                        otherwise an error screen will be displayed.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <Grid className={"divNoPadding"}>
                                            <Row>
                                                <Col md={4} lg={4}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                If successful
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={SuccessfulPetitionModification}
                                                                 alt="Successful Petition Modification Screen"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                                <Col md={4} lg={4}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                If unsuccessful
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={UnsuccessfulPetitionModification}
                                                                 alt="Unsuccessful Petition Modification Screen"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                                <Col md={4} lg={4}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                If unsuccessful (due to no new details)
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={NoNewDetailsScreen}
                                                                 alt="No new detail screen"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                </div>
                                <BackButton link={"/help/petition"}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default EditPetitionHelp;