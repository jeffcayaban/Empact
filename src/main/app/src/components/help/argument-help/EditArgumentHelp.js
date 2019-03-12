import React from "react";
import {Alert, Col, Grid, Panel, Row} from "react-bootstrap";
import EditArgumentAboveTheFold from '../../../other/images/edit-arg-atf.png';
import EditArgumentForm from '../../../other/images/edit-arg-form.png';
import ConfirmCreation from "../../../other/images/create-arg-confirm.png";
import SuccessfulArgModification from "../../../other/images/successful-edit-arg.png";
import UnsuccessfulArgModification from "../../../other/images/unsuccessful-edit-arg.png";
import NoNewDetailsScreen from "../../../other/images/unsuccessful-edit-arg-2.png";
import BackButton from "../../common/BackButton";

/**
 * Displays help information for editing an argument.
 */

class EditArgumentHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Editing an Argument</h2>
                    <p>Understand how to edit an argument.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to edit an argument</h4>
                                    <hr className={"helpHr"} />

                                    <Alert bsStyle="info">
                                        You will need to be logged in into a user account and to have an existing open
                                        argument.
                                    </Alert>

                                    <p>
                                        1. Click on the "Edit" button that is found on the page of your argument.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <img style={{  maxWidth: '35%', minWidth: '350px', align: 'center' }} src={EditArgumentAboveTheFold}
                                             alt="Argument Page" />
                                    </div>

                                    <p>
                                        2. Update your argument by modifying the information on the form. Once completed,
                                        click on the "Submit" button that is located towards the bottom of the page.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <img style={{  maxWidth: '35%', minWidth: '350px', align: 'center' }} src={EditArgumentForm}
                                             alt="Argument Page" />
                                    </div>

                                    <p>
                                        3. Clicking on the submit button will display a dialog to confirm whether the
                                        details of the argument accurately reflect your viewpoint. Clicking on "Yes"
                                        will update the argument with the details that you have provided. Below shows
                                        an image of the expected confirmation dialog.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={ConfirmCreation}
                                             alt="Confirmation Dialog"
                                        />
                                    </div>

                                    <p>
                                        4. If the modification is successful then you will be shown a confirmation screen,
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
                                                                 src={SuccessfulArgModification}
                                                                 alt="Successful Argument Modification Screen"
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
                                                                 src={UnsuccessfulArgModification}
                                                                 alt="Unsuccessful Argument Modification Screen"
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
                                <BackButton link={"/help/argument"}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default EditArgumentHelp;