import React from 'react';
import {Col, Grid, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import BackButton from "../../common/BackButton";

/**
 * Displays the links to help pages that are relevant to petitions.
 */

class PetitionHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Petition Help</h2>
                </div>

                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <ListGroup>
                                    <ListGroupItem onClick={() => window.location = `/help/petition/view`}>
                                        Viewing Petitions
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/petition/create`}>
                                        Creating a Petition
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/petition/edit`}>
                                        Editing a Petition
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/petition/delete`}>
                                        Deleting a Petition
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/petition/close`}>
                                        Closing a Petition
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/petition/search`}>
                                        Searching Petitions
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

export default PetitionHelp;