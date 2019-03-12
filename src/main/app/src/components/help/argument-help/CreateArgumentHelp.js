import React from "react";
import {Alert, Col, Grid, Panel, Row} from "react-bootstrap";
import CreateArgOnPetitionDialog from '../../../other/images/create-arg-dialog-petition.png';
import CreateArgOnArgumentDialog from '../../../other/images/create-arg-dialog-argument.png';
import CreateArgOwnerDialog from '../../../other/images/create-arg-dialog-owner.png';
import CriticalQuestionExample from '../../../other/images/cq-example.png';
import ConfirmCreation from '../../../other/images/create-arg-confirm.png';
import SuccessfulArgCreation from '../../../other/images/successful-arg-creation.png';
import UnsuccessfulArgCreation from '../../../other/images/unsuccessful-arg-creation.png';
import BackButton from "../../common/BackButton";

/**
 * Displays help information for creating a new argument.
 */


class CreateArgumentHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Creating an Argument</h2>
                    <p>Understand how to create an argument.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to create an argument</h4>
                                    <hr className={"helpHr"} />

                                    <Alert bsStyle="info">
                                        You will need to be logged in into a user account and to either be on an
                                        existing petition page or an existing argument page in order to create an
                                        argument.
                                    </Alert>

                                    <p>
                                        1. Locate the dialog that invites you to create an argument on the petition or
                                        argument that you wish to create an argument for and answer its question by
                                        clicking on one of the two buttons. The dialog that you are looking for
                                        should appear as follows:
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <Grid className={"divNoPadding"}>
                                            <Row>
                                                <Col md={4} lg={4}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                On a petition
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={CreateArgOnPetitionDialog}
                                                                 alt="Create Argument Dialog on Petition"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                                <Col md={4} lg={4}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                On an argument
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={CreateArgOnArgumentDialog}
                                                                 alt="Create Argument Dialog on Argument"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                                <Col md={4} lg={4}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                If you are the argument or petition creator on the
                                                                respective page.
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={CreateArgOwnerDialog}
                                                                 alt="Create Argument Dialog as Creator"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>

                                    <p>
                                        2. Clicking on any of the buttons will redirect you to a page of questions.
                                        By answering a question, you will then be invited to create an argument based on a
                                        specific template. After selecting a template, you can enter the details of your
                                        viewpoint where optionally, you can provide up to two sources to further
                                        support your argument. You can also select to create your argument
                                        anonymously. An example of what you may see is shown below:
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '45%', minWidth: '350px', align: 'center' }}
                                             src={CriticalQuestionExample}
                                             alt="Example of a Critical Question"
                                        />
                                    </div>

                                    <p>
                                        3. Clicking on the submit button will display a dialog to confirm whether the
                                        details of the argument accurately reflect your viewpoint. Clicking on "Yes"
                                        will create the argument with the details that you have provided. Below shows
                                        an image of the expected confirmation dialog.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={ConfirmCreation}
                                             alt="Example of a Critical Question"
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
                                                                 src={SuccessfulArgCreation}
                                                                 alt="Successful Argument Creation Screen"
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
                                                                 src={UnsuccessfulArgCreation}
                                                                 alt="Unsuccessful Argument Creation Screen"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                </div>
                                <BackButton link={"/help/argument"}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default CreateArgumentHelp;