import React from "react";
import {Alert, Col, Grid, Panel, Row} from "react-bootstrap";

import ClosePetitionLink from '../../../other/images/close-petition-link.png';
import ClosePetitionConfirm from '../../../other/images/are-you-sure.png';
import UnsuccessfulDialog from '../../../other/images/unsuccessful-dialog.png';
import SuccessfulPetitionClosure from '../../../other/images/successful-petition-closure.png';
import PetitionReportLink from '../../../other/images/petition-report-link.png';
import PetitionReport from '../../../other/images/petition-report.png';
import BackButton from "../../common/BackButton";

/**
 * Displays help information for closing a petition.
 */

class ClosePetitionHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Closing a Petition</h2>
                    <p>Understand how to close a petition.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to close a petition</h4>
                                    <hr className={"helpHr"} />

                                    <Alert bsStyle="info">
                                        You will need to be logged in into a user account and to have an existing open
                                        petition.
                                    </Alert>

                                    <p>
                                        1. Click on the "Close" button that is found on the page of your petition.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                                        <img style={{  maxWidth: '45%', minWidth: '350px', align: 'center' }}
                                             src={ClosePetitionLink}
                                             alt="Close Button on the Petition Page" />
                                    </div>

                                    <p>
                                        2. A dialog will be displayed to confirm whether you want to close the petition
                                        where clicking on "Yes" will close the petition. Below shows
                                        an image of the expected confirmation dialog.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={ClosePetitionConfirm}
                                             alt="Example of a close petition confirmation dialog"
                                        />
                                    </div>

                                    <p>
                                        3. If the petition is successfully closed, you will be shown a confirmation
                                        screen, otherwise an error screen will be displayed.
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
                                                                 src={SuccessfulPetitionClosure}
                                                                 alt="Successful petition closure"
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
                                                                 alt="Unsuccessful petition closure"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>

                                    <p>
                                        4. After closing your petition, you will be able to view a report of your
                                        petition. Click on the "View Report button on your petition to view this
                                        report.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '25px', paddingBottom: '25px' }}>
                                        <img style={{  maxWidth: '35%', minWidth: '350px', align: 'center' }}
                                             src={PetitionReportLink}
                                             alt="Petition Report Link" />
                                    </div>

                                    <p>
                                        This report will highlight what areas of your petitions are supported
                                        or opposed.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '25px', paddingBottom: '25px' }}>
                                        <img style={{  maxWidth: '40%', minWidth: '350px', align: 'center' }}
                                             src={PetitionReport}
                                             alt="Petition Report" />
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

export default ClosePetitionHelp;