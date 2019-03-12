import React from "react";
import {Col, Grid, Row} from "react-bootstrap";
import PetitionEntry from '../../../other/images/petition-entry.png';
import PetitionPage from '../../../other/images/petition-page.png';
import {Link} from "react-router-dom";
import BackButton from "../../common/BackButton";

/**
 * Displays help information for viewing petitions.
 */

class ViewPetitionsHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Viewing Petitions</h2>
                    <p>Understand how petitions are viewed.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>Viewing petitions on the home, search and explore pages</h4>
                                    <hr className={"helpHr"} />
                                    <p>
                                        You may see petitions on the homepage, search page or the explore page. The
                                        image below explains the different things you may see.
                                    </p>
                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <img style={{ maxWidth: '60%', minWidth: '350px', align: 'center' }}
                                             src={PetitionEntry}
                                             alt="Petition Entry Diagram" />
                                    </div>
                                </div>
                                <div style={{ paddingTop: '25px' }}>
                                    <h4 style={{ margin: 0 }}>Viewing a petition on its page</h4>
                                    <hr className={"helpHr"} />
                                    <p>
                                        The image below explains the different things you may see when you are on a
                                        petition page.
                                    </p>
                                    <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                        <img style={{ maxWidth: '70%', minWidth: '350px', align: 'center' }}
                                             src={PetitionPage}
                                             alt="Petition Page" />
                                    </div>
                                </div>

                                <div style={{ paddingTop: '20px' }}>
                                    <p>
                                        As you scroll down the page, you will see a set of arguments and a button to access
                                        a graph showing the different supporting and opposing arguments that are made to it.
                                        Click <Link to={"/help/argument/view"}>here</Link> to learn more about this section.
                                    </p>
                                </div>
                                <BackButton link={"/help/petition"}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default ViewPetitionsHelp;