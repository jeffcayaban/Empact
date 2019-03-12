import React from "react";
import {Col, Grid, Panel, Row} from "react-bootstrap";
import NavbarRegisterLink from '../../../other/images/nav-bar-registration.png';
import UsernameCheck from '../../../other/images/username-check.png';
import UsernameTakenDialog from '../../../other/images/username-taken-dialog.png';
import UsernameAvailableDialog from '../../../other/images/username-available-dialog.png';
import AccountRegisterForm from '../../../other/images/account-register-form.png';
import {Link} from "react-router-dom";

import SuccessfulAccountCreation from "../../../other/images/successful-account-register-dialog.png";
import UnsuccessfulAccountCreation from "../../../other/images/unsuccessful-account-register-dialog.png";
import BackButton from "../../common/BackButton";

/**
 * Displays help information for creating a new account.
 */

class CreateAccountHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Creating an Account</h2>
                    <p>Understand how to create a new user account.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to create a new user account</h4>
                                    <hr className={"helpHr"} />

                                    <p>
                                        1. Go to the account registration page by clicking on the "
                                        <Link to={"/register"}>Register</Link>" link on the
                                        top navigation bar.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '33%', minWidth: '350px', align: 'center' }}
                                             src={NavbarRegisterLink}
                                             alt="Register on the Navigation Bar"
                                        />
                                    </div>

                                    <p>
                                        2. Enter the username you would wish to use for your new account. The system will
                                        check whether your chosen username is currently taken.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '40%', minWidth: '350px', align: 'center' }}
                                             src={UsernameCheck}
                                             alt="Form for checking username"
                                        />
                                    </div>

                                    <p>
                                        If the username is not taken, the system will allow you to continue with
                                        creating your new account otherwise an error is shown.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <Grid className={"divNoPadding"}>
                                            <Row>
                                                <Col md={6} lg={6}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                If the username is available
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={UsernameAvailableDialog}
                                                                 alt="Available username screen"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                                <Col md={6} lg={6}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title>
                                                                If the username is taken
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body className={"centerStyle"}>
                                                            <img style={{ width: '320px', align: 'center' }}
                                                                 src={UsernameTakenDialog}
                                                                 alt="Taken username screen"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>

                                    <p>
                                        3. Enter the details that are required for your new account. Once completed,
                                        click on the "Submit" button to create the account. If you want to change the
                                        username for your account then click on the "Change username" button.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '35%', minWidth: '350px', align: 'center' }}
                                             src={AccountRegisterForm}
                                             alt="Account registration form"
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
                                                                 src={SuccessfulAccountCreation}
                                                                 alt="Successful Account Creation Screen"
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
                                                                 src={UnsuccessfulAccountCreation}
                                                                 alt="Unsuccessful Account Creation Screen"
                                                            />
                                                        </Panel.Body>
                                                    </Panel>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                </div>
                                <BackButton link={"/help/account"}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default CreateAccountHelp;