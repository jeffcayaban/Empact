import React from "react";
import {Col, Grid, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

import SearchPetitionLink from "../../../other/images/search-petition-link.png";
import SearchForm from "../../../other/images/search-form.png";
import SearchResults from "../../../other/images/search-results.png";
import BackButton from "../../common/BackButton";

/**
 * Displays help information for searching petitions.
 */

class SearchPetitionsHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Searching Petitions</h2>
                    <p>Understand how petitions can be searched.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>How to search for petitions</h4>
                                    <hr className={"helpHr"} />

                                    <p>
                                        1. Go to the search page by clicking on the "
                                        <Link to={"/search"}>Search</Link>" link on the
                                        top navigation bar.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={SearchPetitionLink}
                                             alt="Search Link"
                                        />
                                    </div>

                                    <p>
                                        2. Type in the words you want to search and then click on the "Search" button.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '40%', minWidth: '350px', align: 'center' }}
                                             src={SearchForm}
                                             alt="Search Form"
                                        />
                                    </div>

                                    <p>
                                        3. Any petitions that matches your query will be displayed to you.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '50%', minWidth: '350px', align: 'center' }}
                                             src={SearchResults}
                                             alt="Search Results"
                                        />
                                    </div>
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

export default SearchPetitionsHelp;