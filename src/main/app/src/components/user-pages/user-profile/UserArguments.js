import React from 'react';
import { Panel, Table } from "react-bootstrap";
import TableFooter from "../../common/TableFooter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import ArgumentEntry from "../../common/ArgumentEntry";
import {
    ARGUMENT, ASCENDING,
    DESCENDING,
    DISPLAY_SORT_BY_VALUES, LEAST_DISCUSSED,
    MOST_DISCUSSED,
    NEWEST,
    SORT_BY_VALUES
} from "../../../constants";
import {getMostDiscussedArgumentsForUser, getUserArguments} from "../../../utils/AppUtils";
import Loader from "./UserPetitions";
import NoContentAlert from "../../common/alerts/NoContentAlert";
import TableSortByBtn from "../../common/TableSortByBtn";

/**
 * Displays the set of arguments that is created by a given user.
 */

class UserArguments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSortByDisplay: NEWEST,
            currentSortBy: DESCENDING,

            isLoading: true,
            userArguments: [],
            totalNoOfArguments: 0,
            pageNumber: 0,
            pageSize: 5,
            totalPages: 0,
            isLast: true,
            byNoOfChildArgs: false
        }
    }

    // Changes the sort by option for a given set of user arguments.
    handleChangeSortBy(key) {
        const { username, isUser } = this.props;
        const { pageSize, currentSortByDisplay } = this.state;

        const newSortByValue = SORT_BY_VALUES[key - 1];
        const newCurrentSortByDisplay = DISPLAY_SORT_BY_VALUES[key - 1];

        if (newCurrentSortByDisplay !== currentSortByDisplay) {
            // Assumes that the sort by option has been changed.

            if (key === "1" || key === "2") {
                // Assumes that the arguments are to be sorted by creation date.
                this.setState({ currentSortByDisplay: newCurrentSortByDisplay, currentSortBy: newSortByValue });
                this.loadUserArguments(0, pageSize, newSortByValue, username, isUser, false)

            } else {
                if (newCurrentSortByDisplay === MOST_DISCUSSED) {
                    // Assumes that arguments are to be sorted with the most discussed arguments first.
                    this.setState({ currentSortByDisplay: newCurrentSortByDisplay, byNoOfChildArgs: true,
                        currentSortBy: DESCENDING });
                    this.loadUserArguments(0, pageSize, DESCENDING, username, isUser, true)

                } else if (newCurrentSortByDisplay === LEAST_DISCUSSED) {
                    // Assumes that arguments are to be sorted with the least discussed arguments first.
                    this.setState({ currentSortByDisplay: newCurrentSortByDisplay, byNoOfChildArgs: true,
                        currentSortBy: ASCENDING });
                    this.loadUserArguments(0, pageSize, ASCENDING, username, isUser, true)
                }
            }
        }
    }

    // Fetches the user arguments from the server.
    loadUserArguments(pageNumber, pageSize, sortBy, username, includeAnon, byNoOfChildArgs = this.state.byNoOfChildArgs) {

        if (username != null && includeAnon != null) {
            // Assumes that the user is logged in.

            if (!byNoOfChildArgs) {
                // Fetches the user arguments that are sorted by creation date.

                getUserArguments(pageNumber, pageSize, sortBy, username, includeAnon)
                    .then(response => {
                        this.setState({
                            isLoading: false,
                            userArguments: response.content,
                            pageNumber: response.page,
                            totalPages: response.totalPages,
                            isLast: response.last,
                            totalNoOfArguments: response.totalElements,
                            byNoOfChildArgs: false
                        })
                    }).catch(error => this.setState({ isLoading: false }));
            } else {
                // Fetches the user arguments that are sorted by the number of arguments made to them.

                getMostDiscussedArgumentsForUser(pageNumber, pageSize, sortBy, username, includeAnon)
                    .then(response => {
                        this.setState({
                            isLoading: false,
                            userArguments: response.content,
                            pageNumber: response.page,
                            totalPages: response.totalPages,
                            isLast: response.last,
                            totalNoOfArguments: response.totalElements,
                            byNoOfChildArgs: true
                        })
                    }).catch(error => this.setState({ isLoading: false }));
            }
        } else {
            // Assumes that the user is not logged in, so no arguments are fetched.
            this.setState({ isLoading: false })
        }
    }

    // Generates the arguments table body given a set of arguments.
    static generateArgumentsTableBody(userArguments) {
        return (
            <Table responsive hover className={"argumentsTable"}>
                <tbody>
                    { userArguments.map((argument) =>
                        <ArgumentEntry key={argument.id} showCreatorName={false} showCreatorBadge={false}
                                       argument={argument} isSupporting={argument.isSupporting} />
                    )}
                </tbody>
            </Table>
        )
    }

    componentDidMount() {
        const { username, isUser } = this.props;
        const { pageNumber, pageSize, currentSortBy } = this.state;
        this.loadUserArguments(pageNumber, pageSize, currentSortBy, username, isUser);
    }

    render() {
        if (!this.state.isLoading) {
            // Assumes any data fetching has completed.

            const { username, isUser } = this.props;
            const { currentSortBy, userArguments, pageNumber, totalPages, pageSize, totalNoOfArguments,
                currentSortByDisplay } = this.state;

            const argumentsTable = (
                <div>
                    <div style={{ paddingLeft: '10px' }}>
                        <div className={"spaceBetweenElements"} style={{ paddingTop: '7px', paddingBottom: '7px' }}>
                            <TableSortByBtn
                                id={`${username}-arguments-table-filter`}
                                title={currentSortByDisplay}
                                onSelect={this.handleChangeSortBy.bind(this)}
                                totalContentCount={totalNoOfArguments}
                                showMoreOptions={true}
                            />
                        </div>
                    </div>
                    {
                        (Array.isArray(userArguments) && userArguments.length)
                            ? UserArguments.generateArgumentsTableBody(userArguments)
                            : <NoContentAlert contentType={ARGUMENT} />
                    }
                    <div className={"userContentTableFooter"}>
                        <TableFooter
                            pageNumber={pageNumber}
                            totalPages={totalPages}
                            onPrevious={() => this.loadUserArguments(pageNumber - 1, pageSize, currentSortBy,
                                username, isUser)}
                            onNext={() => this.loadUserArguments(pageNumber + 1, pageSize, currentSortBy,
                                username, isUser)}
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
                                    <FontAwesomeIcon icon={faComment} />
                                    <span style={{ paddingLeft: '10px' }}>
                                        Arguments
                                    </span>
                                </div>
                                <div>{totalNoOfArguments}</div>
                            </div>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body className={"argumentsPanelBody"}>
                        { argumentsTable }
                    </Panel.Body>
                </Panel>
            );
        } else {
            // Assumes data is being fetched, so a loader is displayed.
            return <Loader isLoading={this.state.isLoading} />
        }
    }
}

export default UserArguments;