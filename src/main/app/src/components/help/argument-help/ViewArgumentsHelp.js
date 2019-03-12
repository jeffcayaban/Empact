import React from "react";
import {Col, Grid, Row} from "react-bootstrap";
import ArgumentEntryDiagram from '../../../other/images/argument-entry-diagram.png';
import ArgumentPageDiagram from '../../../other/images/argument-page-diagram.png';
import ArgumentVisualisationBtn from '../../../other/images/argument-visualisation-btn.png';
import ArgumentVisualisation from '../../../other/images/argument-visualisation.png';
import BackButton from "../../common/BackButton";

/**
 * Displays help information for viewing arguments.
 */

class ViewArgumentsHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Viewing Arguments</h2>
                    <p>Understand how arguments are viewed.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>Viewing arguments on a petition or argument</h4>
                                    <hr className={"helpHr"} />
                                    <p>
                                        When you are on a petition or argument, you may sometimes notice that there
                                        are a set of arguments that are located on the lower part of the page. The
                                        image below explains the different things you may see for a set of supporting
                                        arguments.
                                    </p>
                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <img style={{ maxWidth: '70%', minWidth: '350px', align: 'center' }}
                                             src={ArgumentEntryDiagram}
                                             alt="Argument Entry Diagram" />
                                    </div>
                                </div>
                                <div style={{ paddingTop: '35px' }}>
                                    <h4 style={{ margin: 0 }}>Viewing an argument on its page</h4>
                                    <hr className={"helpHr"} />
                                    <p>
                                        The image below explains the different things you may see when you are on an
                                        argument page.
                                    </p>
                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <img style={{ maxWidth: '70%', minWidth: '350px', align: 'center' }}
                                             src={ArgumentPageDiagram}
                                             alt="Argument Page Diagram" />
                                    </div>
                                </div>
                                <div style={{ paddingTop: '35px' }}>
                                    <h4 style={{ margin: 0 }}>Viewing the tree of arguments for an argument</h4>
                                    <hr className={"helpHr"} />
                                    <p>
                                        Click on the "Arguments Overview" button found within the page of an
                                        argument to view a data visualisation of the arguments that were made to
                                        support or oppose the argument.
                                    </p>
                                    <div className={"centerStyle"} style={{ paddingTop: '15px', paddingBottom: '20px' }}>
                                        <img style={{ width: '180px', align: 'center' }}
                                             src={ArgumentVisualisationBtn}
                                             alt="Argument Page Diagram" />
                                    </div>
                                    <p>
                                        A diagram showing the arguments supporting and opposing the argument is shown
                                        after clicking the button. A red circle shows that there exists an argument
                                        that is opposing argument above it. A green circle shows that there exists an
                                        argument that is supporting the argument above it. Clicking on any of the circles
                                        will send you to that argument's page.
                                    </p>
                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <img style={{ maxWidth: '25%', minWidth: '350px', align: 'center' }}
                                             src={ArgumentVisualisation}
                                             alt="Argument Data Visualisation" />
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

export default ViewArgumentsHelp;