import React from 'react';
import {Col, Grid, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import BackButton from "../../common/BackButton";

/**
 * Displays the links to help pages that are relevant to accounts.
 */

class AccountHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Account Help</h2>
                </div>

                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <ListGroup>
                                    <ListGroupItem onClick={() => window.location = `/help/account/profile`}>
                                        Your Profile
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/account/create`}>
                                        Creating an account
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/account/delete`}>
                                        Deleting your account
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/account/login`}>
                                        Logging in
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/account/logout`}>
                                        Logging out
                                    </ListGroupItem>
                                </ListGroup>
                                <BackButton link={"/help"}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default AccountHelp;