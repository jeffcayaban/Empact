import React from 'react';
import { Panel, Table } from "react-bootstrap";
import TableFooter from "../../common/TableFooter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import PetitionEntry from "../../common/PetitionEntry";
import {
    ASCENDING,
    DESCENDING,
    DISPLAY_SORT_BY_VALUES, LEAST_DISCUSSED,
    MOST_DISCUSSED,
    NEWEST,
    PETITION,
    SORT_BY_VALUES
} from "../../../constants";
import {getMostDiscussedPetitionsByUser, getUserPetitions} from "../../../utils/AppUtils";
import Loader from "../../Loader";
import NoContentAlert from "../../common/alerts/NoContentAlert";
import TableSortByBtn from "../../common/TableSortByBtn";
import ClosedCheckbox from "../../common/ClosedCheckbox";

/**
 * Displays the petitions for a given user.
 */

class UserPetitions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSortByDisplay: NEWEST,
            currentSortBy: DESCENDING,

            isLoading: true,
            petitions: [],
            totalNoOfPetitions: 0,
            pageNumber: 0,
            pageSize: 2,
            totalPages: 0,
            isLast: true,
            showClosed: false,
            byNoOfChildArgs: false
        }
    }

    // Changes the sort by option for a given set of user petitions.
    handleChangeSortBy(key) {
        const { currentSortByDisplay } = this.state;

        const newSortByValue = SORT_BY_VALUES[key - 1];
        const newCurrentSortByDisplay = DISPLAY_SORT_BY_VALUES[key - 1];

        if (newCurrentSortByDisplay !== currentSortByDisplay) {
            // Assumes that the sort by option has been changed.

            if (key === "1" || key === "2") {
                // Assumes that the arguments are to be sorted by creation date.
                this.setState({ currentSortByDisplay: newCurrentSortByDisplay, byNoOfChildArgs: false, currentSortBy: newSortByValue });
                this.loadUserPetitions(0, newSortByValue, false);

            } else {
                if (newCurrentSortByDisplay === MOST_DISCUSSED) {
                    // Assumes that arguments are to be sorted with the most discussed arguments first.
                    this.setState({ currentSortByDisplay: newCurrentSortByDisplay, byNoOfChildArgs: true, currentSortBy: DESCENDING });
                    this.loadUserPetitions(0, DESCENDING, true);

                } else if (newCurrentSortByDisplay === LEAST_DISCUSSED) {
                    // Assumes that arguments are to be sorted with the least discussed arguments first.
                    this.setState({ currentSortByDisplay: newCurrentSortByDisplay, byNoOfChildArgs: true, currentSortBy: ASCENDING });
                    this.loadUserPetitions(0, ASCENDING, true);
                }
            }
        }
    }

    // Fetches the user petitions from the server.
    loadUserPetitions(pageNumber, sortBy = this.state.currentSortBy, byNoOfChildArgs = this.state.byNoOfChildArgs, showClosed = this.state.showClosed) {
        const { isUser, username } = this.props;
        const { pageSize } = this.state;

        if (username != null && isUser != null) {
            // Assumes that the user is logged in.

            if (!byNoOfChildArgs) {
                // Fetches the user petitions that are sorted by creation date.

                getUserPetitions(pageNumber, pageSize, sortBy, username, isUser, showClosed)
                    .then(response => {
                        this.setState({
                            isLoading: false,
                            petitions: response.content,
                            pageNumber: response.page,
                            totalPages: response.totalPages,
                            isLast: response.last,
                            showClosed: showClosed,
                            totalNoOfPetitions: response.totalElements,
                            byNoOfChildArgs: false
                        })
                    }).catch(error => this.setState({ isLoading: false }))
            } else {
                // Fetches the user petitions that are sorted by the number of arguments made to them.

                getMostDiscussedPetitionsByUser(pageNumber, pageSize, sortBy, username, isUser, showClosed)
                    .then(response => {
                        this.setState({
                            isLoading: false,
                            petitions: response.content,
                            pageNumber: response.page,
                            totalPages: response.totalPages,
                            isLast: response.last,
                            showClosed: showClosed,
                            totalNoOfPetitions: response.totalElements,
                            byNoOfChildArgs: true
                        })
                    }).catch(error => this.setState({ isLoading: false }))
            }
        } else {
            // Assumes that the user is not logged in, so no petitions are fetched.
            this.setState({ isLoading: false })
        }
    }

    // Generates the petitions table body given a set of petitions.
    static generatePetitionsTableBody(petitions) {
        return (
            <Table>
                <tbody>
                { petitions.map((petition, index) =>
                    <PetitionEntry
                        showCreatorName={false}
                        key={index}
                        petition={petition}
                        showCreationDetails={true}
                    />)
                }
                </tbody>
            </Table>
        )
    }

    componentDidMount() {
        this.loadUserPetitions(this.state.pageNumber);
    }

    render() {
        if (!this.state.isLoading) {
            // Assumes any data fetching has completed.

            const { username } = this.props;
            const { petitions, pageNumber, totalPages, currentSortByDisplay, totalNoOfPetitions, showClosed, currentSortBy, byNoOfChildArgs } = this.state;

            const petitionsTable = (
                <div>
                    <div style={{ paddingLeft: '10px' }}>
                        <div className={"spaceBetweenElements"}  style={{ paddingTop: '7px' }}>
                            <TableSortByBtn
                                id={`${username}-petition-table-filter`}
                                title={currentSortByDisplay}
                                onSelect={this.handleChangeSortBy.bind(this)}
                                totalContentCount={totalNoOfPetitions}
                                showMoreOptions={true}
                            />
                            <div style={{ paddingRight: '10px' }}>
                                <ClosedCheckbox onChange={() => {
                                    this.loadUserPetitions(0, currentSortBy, byNoOfChildArgs, !showClosed)
                                }} />
                            </div>
                        </div>
                    </div>
                    {
                        (Array.isArray(petitions) && petitions.length)
                            ? UserPetitions.generatePetitionsTableBody(petitions)
                            : <NoContentAlert contentType={PETITION} />
                    }
                    <div className={"userContentTableFooter"}>
                        <TableFooter
                            pageNumber={pageNumber}
                            totalPages={totalPages}
                            onPrevious={() => this.loadUserPetitions(pageNumber - 1)}
                            onNext={() => this.loadUserPetitions(pageNumber + 1)}
                        />
                    </div>
                </div>
            );

            return (
                <Panel>
                    <Panel.Heading>
                        <Panel.Title>
                            <div className={"spaceBetweenElements"}>
                                <div>
                                    <FontAwesomeIcon icon={faClipboard} />
                                    <span style={{ paddingLeft: '10px' }}>
                                        Petitions
                                    </span>
                                </div>
                                <div>{totalNoOfPetitions}</div>
                            </div>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body className={"argumentsPanelBody"}>
                        { petitionsTable }
                    </Panel.Body>
                </Panel>
            );
        } else {
            // Assumes data is being fetched, so a loader is displayed.
            return <Loader isLoading={this.state.isLoading} />
        }
    }
}

export default UserPetitions;