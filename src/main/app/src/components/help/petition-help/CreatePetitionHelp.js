import React from "react";
import {Alert, Col, Grid, Panel, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

import CreatePetitionLink from "../../../other/images/create-petition-link.png";
import CreatePetitionForm from "../../../other/images/create-petition-form.png";
import CreatePetitionConfirm from "../../../other/images/create-petition-confirm.png";

import SuccessfulPetitionCreation from "../../../other/images/successful-create-petition.png";
import UnsuccessfulPetitionCreation from "../../../other/images/unsuccessful-create-petition.png";
import BackButton from "../../common/BackButton";

/**
 * Displays help information for creating a new petition.
 */

class CreatePetitionHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Creating a Petition</h2>
                    <p>Understand how to create a petition.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to create a petition</h4>
                                    <hr className={"helpHr"} />

                                    <Alert bsStyle="info">
                                        You will need to be logged in into a user account in order to create a petition.
                                    </Alert>

                                    <p>
                                        1. Go to the create petition page by clicking on the "
                                        <Link to={"/petition/create"}>Create</Link>" link on the
                                        top navigation bar.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={CreatePetitionLink}
                                             alt="Create Petition Link"
                                        />
                                    </div>

                                    <p>
                                        2. Enter the details for your new petition by typing them into their respective
                                        fields. You must also choose a closing date for your petition. Optionally, you
                                        can also select to create your petition anonymously.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '30px' }}>
                                        <img style={{ maxWidth: '80%', minWidth: '350px', align: 'center' }}
                                             src={CreatePetitionForm}
                                             alt="Create Petition Form"
                                        />
                                    </div>

                                    <p>
                                        3. When you are ready to create your petition, click on the "Submit" button (this
                                        is located towards the bottom of the page). This will display a confirmation dialog
                                        to confirm whether the details accurately reflect your views. Click "Yes" to
                                        proceed with creating your petition, otherwise click "Cancel".
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={CreatePetitionConfirm}
                                             alt="Create Petition Confirmation"
                                        />
                                    </div>

                                    <p>
                                        4. If the creation is successful then you will be shown a confirmation screen,
                                        otherwise an error screen will be displayed.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <Grid className={"divNoPadding"}>
                                            <Row>
                                                <Col md={6} lg={6}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                If successful
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={SuccessfulPetitionCreation}
                                                                 alt="Successful Petition Creation Screen"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                                <Col md={6} lg={6}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                If unsuccessful
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={UnsuccessfulPetitionCreation}
                                                                 alt="Unsuccessful Petition Creation Screen"
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

export default CreatePetitionHelp;