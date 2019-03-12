import React from 'react';
import {Button, Col, Grid, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Route} from "react-router-dom";
import {faComment, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {faClipboard} from "@fortawesome/free-solid-svg-icons/faClipboard";

/**
 * Displays the links to the different help pages for the major elements such as Petitions, Arguments and Accounts.
 */

class Help extends React.PureComponent {
    render() {
        return (
            <div>
                <div className={"centerStyle"}>
                    <h2>Help</h2>
                    <p>What do you need help with?</p>
                </div>
                <div className={"manageContentActionPanels"}>
                    <Grid>
                        <Row>
                            <Col md={4} lg={4}>
                                <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                    <Route render={({ history }) => (
                                        <Button
                                            style={{ width: '100%', height: '100px' }}
                                            onClick={() => { history.push(`/help/argument`) }}
                                        >
                                            <div className={"centerStyle"}>
                                                <FontAwesomeIcon icon={faComment} size="3x" />
                                                <div style={{ paddingTop: '15px' }}>{'Argument'}</div>
                                            </div>
                                        </Button>
                                    )}/>
                                </div>
                            </Col>
                            <Col md={4} lg={4}>
                                <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                    <Route render={({ history }) => (
                                        <Button
                                            style={{ width: '100%', height: '100px' }}
                                            onClick={() => { history.push(`/help/petition`) }}
                                        >
                                            <div className={"centerStyle"}>
                                                <FontAwesomeIcon icon={faClipboard} size="3x" />
                                                <div style={{ paddingTop: '15px' }}>{'Petition'}</div>
                                            </div>
                                        </Button>
                                    )}/>
                                </div>
                            </Col>
                            <Col md={4} lg={4}>
                                <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                    <Route render={({ history }) => (
                                        <Button
                                            style={{ width: '100%', height: '100px' }}
                                            onClick={() => { history.push(`/help/account`) }}
                                        >
                                            <div className={"centerStyle"}>
                                                <FontAwesomeIcon icon={faUserAlt} size="3x" />
                                                <div style={{ paddingTop: '15px' }}>{'Account'}</div>
                                            </div>
                                        </Button>
                                    )}/>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Help;