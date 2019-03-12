import React from "react";
import {Col, Grid, Row} from "react-bootstrap";
import LogoutLink from '../../../other/images/logout-link.png';

import SuccessfulLogoutDialog from "../../../other/images/successful-logout.png";
import BackButton from "../../common/BackButton";

/**
 * Displays help information for logging out of an account.
 */

class LogoutHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Logging Out</h2>
                    <p>Understand how to log out of your account.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to logout</h4>
                                    <hr className={"helpHr"} />

                                    <p>
                                        1. Click on the logout link that is located on the top navigation bar. Clicking
                                        on this link will proceed to logging out of your account.
                                    </p>

                                    <div className={"centerStyle"}>
                                        <img style={{ maxWidth: '35%', minWidth: '350px', align: 'center' }}
                                             src={LogoutLink}
                                             alt="Logout Link"
                                        />
                                    </div>

                                    <p>
                                        2. If the logout is successful then you will be shown a confirmation notification.
                                    </p>

                                    <div className={"centerStyle"}>
                                        <img style={{ maxWidth: '25%', minWidth: '350px', align: 'center' }}
                                             src={SuccessfulLogoutDialog}
                                             alt="Logout Link"
                                        />
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

export default LogoutHelp;