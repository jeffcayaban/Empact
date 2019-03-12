import React from 'react';
import {Col, Grid, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import BackButton from "../../common/BackButton";

/**
* Displays the links to help pages that are relevant to arguments.
*/

class ArgumentHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Argument Help</h2>
                </div>

                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <ListGroup>
                                    <ListGroupItem onClick={() => window.location = `/help/argument/view`}>
                                        Viewing Arguments
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/argument/create`}>
                                        Creating an Argument
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/argument/edit`}>
                                        Editing an Argument
                                    </ListGroupItem>
                                    <ListGroupItem onClick={() => window.location = `/help/argument/delete`}>
                                        Deleting an Argument
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

export default ArgumentHelp;