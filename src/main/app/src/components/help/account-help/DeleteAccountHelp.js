import React from "react";
import {Col, Grid, Panel, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

import SettingsLink from "../../../other/images/settings-link.png";
import DeleteAccountScreen from "../../../other/images/delete-account-screen.png";
import DeleteConfirm from "../../../other/images/are-you-sure.png";
import SuccessfulAccountDeletion from "../../../other/images/successful-account-deletion.png";
import UnsuccessfulAccountDeletion from "../../../other/images/unsuccessful-account-deletion.png";
import BackButton from "../../common/BackButton";

/**
 * Displays help information for deleting an account.
 */

class DeleteAccountHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Deleting your Account</h2>
                    <p>Understand how to create delete your account.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to delete your account</h4>
                                    <hr className={"helpHr"} />

                                    <p>
                                        1. Go to the <Link to={"/settings"}>settings page</Link>. The link is found on
                                        the top navigation bar.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingBottom: '15px' }}>
                                        <img style={{ maxWidth: '25%', minWidth: '350px', align: 'center' }}
                                             src={SettingsLink}
                                             alt="Settings Link"
                                        />
                                    </div>

                                    <p>
                                        2. Click on "Delete Account" link and then click on the "Delete Account" button.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '25%', minWidth: '350px', align: 'center' }}
                                             src={DeleteAccountScreen}
                                             alt="Delete Account Screen"
                                        />
                                    </div>

                                    <p>
                                        3. A dialog will be displayed to confirm whether you want to delete your account
                                        where clicking on "Yes" will delete the account. Below shows an image of the
                                        expected confirmation dialog.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={DeleteConfirm}
                                             alt="Example of a delete confirmation dialog"
                                        />
                                    </div>


                                    <p>
                                        4. If the deletion is successful then you will be shown a confirmation screen,
                                        otherwise an error screen will be displayed.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px' }}>
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
                                                                 src={SuccessfulAccountDeletion}
                                                                 alt="Successful Account Deletion Screen"
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
                                                                 src={UnsuccessfulAccountDeletion}
                                                                 alt="Unsuccessful Account Deletion Screen"
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

export default DeleteAccountHelp;