import React from 'react'

import {Button, FormGroup, FormControl, Grid, Col, Glyphicon, Checkbox} from 'react-bootstrap';
import Loader from "./Loader";
import {searchPetitions} from "../utils/AppUtils";
import PetitionsContentTable from "./common/PetitionsContentTable";
import {
    DISPLAY_SORT_BY_VALUES,
    NEWEST,
    SORT_BY_VALUES
} from "../constants";
import TableSortByBtn from "./common/TableSortByBtn";

/**
 * Is the search page that will allow the user to search for petitions.
 */

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            query: "",

            petitions: null,
            page: 0,
            size: 5,
            totalNoOfResults: 0,
            totalPages: 0,
            last: false,

            sort: NEWEST,
            showClosed: false,
            currentSortByDisplay: NEWEST,
        };

        this.fetchPetitions = this.fetchPetitions.bind(this);
    }

    // Updates the component's state with the user's updated query.
    updateQuery(event) {
        const newQuery = event.target.value;
        if (this.state.query !== newQuery) {
            // Assumes that the query has changed.
            this.setState({ query: newQuery });
        }
    }

    // Updates the component's state to show or not show closed petitions.
    updateOnClosed() {
        this.setState({ showClosed: !this.state.showClosed });
    }

    // Updates the component's state to reflect the selected sort by option.
    handleChangeSortBy(key) {
        const { currentSortByDisplay } = this.state;

        const newSortByValue = SORT_BY_VALUES[key - 1];
        const newCurrentSortByDisplay = DISPLAY_SORT_BY_VALUES[key - 1];

        if (newCurrentSortByDisplay !== currentSortByDisplay) {
            // Assumes that the sort by option has changed.
            this.setState({ currentSortByDisplay: newCurrentSortByDisplay, sort: newSortByValue });
            this.fetchPetitions(0, newSortByValue);
        }
    }

    // Fetches the petitions that match the given query.
    fetchPetitions(page = this.state.page, sort = this.state.sort) {
        const { size, showClosed, query } = this.state;

        searchPetitions(page, size, sort, showClosed, query)
            .then(response => {
                this.setState({
                    isLoading: false,

                    petitions: response.content,
                    page: response.page,
                    size: response.size,
                    totalNoOfResults: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last
                })
            })
            .catch(error => this.setState({ isLoading: false }))
    }

    // Handles the request to fetch the petitions and displays a loader.
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        this.fetchPetitions();
    }

    // Generates the table of petitions given a set of petitions.
    generatePetitionsTable() {
        const { petitions, page, totalNoOfResults } = this.state;

        return (
            <Grid className={"divNoPadding"} style={{ paddingTop: '60px' }}>
                <Col md={12} lg={12}>
                    <div style={{ marginBottom: '15px' }}>
                        <TableSortByBtn
                            title={this.state.currentSortByDisplay}
                            onSelect={this.handleChangeSortBy.bind(this)}
                            totalContentCount={totalNoOfResults}
                            showMoreOptions={false}
                        />
                    </div>
                    <PetitionsContentTable
                        petitions={petitions}
                        pageNumber={page}
                        totalPages={totalNoOfResults}
                        showFollowUp={false}
                        loadFromServer={this.fetchPetitions}
                    />
                </Col>
            </Grid>
        )
    }

    render() {
        const { isLoading, query, petitions, showClosed } = this.state;

        if (!isLoading) {
            // Assumes that the data fetching is completed.

            return (
                <div style={{ paddingBottom: '30px' }}>
                    <div className={"centerStyle"}>
                        <h2>Search</h2>
                        <p>Search petitions on the site!</p>
                    </div>
                    <div className={"divNoPadding"} style={{ paddingTop: '40px' }}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <Grid>
                                <FormGroup bsSize="lg">
                                    <FormControl
                                        value={query}
                                        onChange={this.updateQuery.bind(this)}
                                        type="text"
                                        placeholder="Search"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid className={"showClosedCheckbox"}>
                                <Checkbox
                                    checked={showClosed}
                                    onChange={() => this.updateOnClosed()}
                                >
                                    Show Closed
                                </Checkbox>
                            </Grid>
                            <Grid>
                                <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                                    <Button type="submit" bsSize="large">
                                        Search
                                        <Glyphicon style={{ paddingLeft: '12px' }} glyph="search" />
                                    </Button>
                                </div>
                            </Grid>
                        </form>
                    </div>
                    { (petitions !== null) && this.generatePetitionsTable() }
                </div>
            );
        } else {
            // Assumes that the data is being fetched, so a loader is displayed.
            return <Loader isLoading={this.state.isLoading} />
        }
    }

}

export default Search;