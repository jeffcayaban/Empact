import React from "react";
import {Alert, Col, Grid, Panel, Row} from "react-bootstrap";

import DeletePetitionLink from '../../../other/images/delete-petition-link.png';

import DeletePetitionConfirm from '../../../other/images/are-you-sure.png';
import UnsuccessfulDialog from '../../../other/images/unsuccessful-dialog.png';
import SuccessfulDeleteDialog from '../../../other/images/successful-delete-petition.png';
import BackButton from "../../common/BackButton";

/**
 * Displays help information for deleting a petition.
 */

class DeletePetitionHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Deleting a Petition</h2>
                    <p>Understand how to delete a petition.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to delete a petition</h4>
                                    <hr className={"helpHr"} />

                                    <Alert bsStyle="info">
                                        You will need to be logged in into a user account and to have an existing open
                                        petition.
                                    </Alert>

                                    <p>
                                        1. Click on the "Delete" button that is found on the page of your petition.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                                        <img style={{  maxWidth: '45%', minWidth: '350px', align: 'center' }}
                                             src={DeletePetitionLink}
                                             alt="Delete Button on the Petition Page" />
                                    </div>

                                    <p>
                                        2. A dialog will be displayed to confirm whether you want to delete the petition
                                        where clicking on "Yes" will delete the petition. Below shows
                                        an image of the expected confirmation dialog.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={DeletePetitionConfirm}
                                             alt="Example of a delete confirmation dialog"
                                        />
                                    </div>

                                    <p>
                                        3. If the deletion is successful then you will be shown a confirmation screen,
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
                                                                 src={SuccessfulDeleteDialog}
                                                                 alt="Successful argument deletion"
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
                                                                 src={UnsuccessfulDialog}
                                                                 alt="Unsuccessful argument deletion"
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

export default DeletePetitionHelp;