import React from "react";
import {Col, Grid, Panel, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

import LoginPage from '../../../other/images/login-page.png';
import LoginLink from '../../../other/images/login-link.png';
import SuccessfulLoginDialog from "../../../other/images/successful-login.png";
import UnsuccessfulLoginDialog from "../../../other/images/unsuccessful-dialog.png";
import BackButton from "../../common/BackButton";

/**
 * Displays help information for logging into an account.
 */

class LoginHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Logging In</h2>
                    <p>Understand how to log in into you account.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to login</h4>
                                    <hr className={"helpHr"} />

                                    <p>
                                        1. Go to the <Link to={"/login"}>login page</Link>. This link is found on the top
                                        navigation bar.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '20%', minWidth: '200px', align: 'center' }}
                                             src={LoginLink}
                                             alt="Login Link"
                                        />
                                    </div>

                                    <p>
                                        2. On this page, enter the username and password of the account you want to
                                        login to. Then click on the "Login" button to login into the account.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '40%', minWidth: '350px', align: 'center' }}
                                             src={LoginPage}
                                             alt="Login Page"
                                        />
                                    </div>

                                    <p>
                                        3. If the login is successful then you will be shown a confirmation notification,
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
                                                            <img style={{ width: '300px', align: 'center' }}
                                                                 src={SuccessfulLoginDialog}
                                                                 alt="Login successful dialog"
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
                                                                 src={UnsuccessfulLoginDialog}
                                                                 alt="Login unsuccessful dialog"
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

export default LoginHelp;