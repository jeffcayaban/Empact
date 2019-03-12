import React from 'react'
import {Table} from "react-bootstrap";

import TableFooter from "./TableFooter";
import ArgumentEntry from "./ArgumentEntry";
import { withRouter } from "react-router-dom";
import {
    getArgumentsByArgumentId,
    getArgumentsByRootPetitionId, getMostDiscussedArgumentsForArgument,
    getMostDiscussedArgumentsForPetition
} from "../../utils/AppUtils";
import {
    ARGUMENT, ASCENDING,
    DESCENDING,
    DISPLAY_SORT_BY_VALUES, LEAST_DISCUSSED, MOST_DISCUSSED,
    NEWEST,
    PETITION,
    SORT_BY_VALUES
} from "../../constants";
import TableSortByBtn from "./TableSortByBtn";
import NoContentAlert from "./alerts/NoContentAlert";

/**
 * Displays a set of arguments and provides pagination and sorting options.
 */

class ArgumentsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSortByDisplay: NEWEST,

            argumentsList: [],
            currentSort: DESCENDING,
            pageNumber: 0,
            pageSize: 5,
            totalPages: 0,
            argumentsLast: true,
            byNoOfChildArgs: false
        }
    }

    // Fetches arguments from the server.
    getArgumentsFromServer(page, size, sort, subjectId, isSupporting, parentContentType, byNoOfChildArgs) {
        if (parentContentType === PETITION) {
            // Assumes the parent content is a Petition.

            if (!byNoOfChildArgs) {
                // Fetches the arguments in order of creation date.

                getArgumentsByRootPetitionId(page, size, sort, subjectId, isSupporting)
                    .then(response => {
                        this.setState({
                            argumentsList: response.content,
                            pageNumber: response.page,
                            totalPages: response.totalPages,
                            argumentsLast: response.last,
                            currentSort: sort,
                            byNoOfChildArgs: false
                        })
                    })
                    .catch(error => console.error(error));
            } else {
                // Fetches the arguments by the number of arguments to it.

                getMostDiscussedArgumentsForPetition(page, size, sort, subjectId, isSupporting)
                    .then(response => {
                        this.setState({
                            argumentsList: response.content,
                            pageNumber: response.page,
                            totalPages: response.totalPages,
                            argumentsLast: response.last,
                            currentSort: sort,
                            byNoOfChildArgs: true
                        })
                    })
                    .catch(error => console.error(error));
            }
        } else {
            // Assumes the parent content is an Argument.

            if (!byNoOfChildArgs) {
                // Fetches the arguments in order of creation date.

                getArgumentsByArgumentId(page, size, sort, subjectId, isSupporting)
                    .then(response => {
                        this.setState({
                            argumentsList: response.content,
                            pageNumber: response.page,
                            totalPages: response.totalPages,
                            argumentsLast: response.last,
                            byNoOfChildArgs: false
                        })
                    })
                    .catch(error => console.error(error));
            } else {
                // Fetches the arguments by the number of arguments to it.

                getMostDiscussedArgumentsForArgument(page, size, sort, subjectId, isSupporting)
                    .then(response => {
                        this.setState({
                            argumentsList: response.content,
                            pageNumber: response.page,
                            totalPages: response.totalPages,
                            argumentsLast: response.last,
                            currentSort: sort,
                            byNoOfChildArgs: true
                        })
                    })
                    .catch(error => console.error(error));
            }
        }
    }

    // Calls the method to get arguments from the server.
    handleLoadArguments(pageNumber, currentSort = this.state.currentSort, byNoOfChildArgs = this.state.byNoOfChildArgs) {
        const { subjectId, isSupporting, parentContentType } = this.props;

        this.getArgumentsFromServer(
            pageNumber,
            this.state.pageSize,
            currentSort,
            subjectId,
            isSupporting,
            parentContentType,
            byNoOfChildArgs
        );
    }

    // Handles the event of where the arguments are to be sorted by a given parameter.
    handleChangeSortBy(key) {
        const { currentSortByDisplay } = this.state;

        const newSortByValue = SORT_BY_VALUES[key - 1];
        const newCurrentSortByDisplay = DISPLAY_SORT_BY_VALUES[key - 1];

        if (newCurrentSortByDisplay !== currentSortByDisplay) {
            // Assumes that the sort by option has been changed.

            if (key === "1" || key === "2") {
                // Assumes that the arguments are to be sorted by creation date.

                this.setState({ currentSortByDisplay: newCurrentSortByDisplay, byNoOfChildArgs: false });
                this.handleLoadArguments(0, newSortByValue, false);
            } else {
                // Assumes that the arguments are to be sorted by the number of arguments to it.

                if (newCurrentSortByDisplay === MOST_DISCUSSED) {
                    // Assumes that arguments are to be sorted with the most discussed arguments first.

                    this.setState({ currentSortByDisplay: newCurrentSortByDisplay, byNoOfChildArgs: true });
                    this.handleLoadArguments(0, DESCENDING, true);
                } else if (newCurrentSortByDisplay === LEAST_DISCUSSED) {
                    // Assumes that arguments are to be sorted with the least discussed arguments first.

                    this.setState({ currentSortByDisplay: newCurrentSortByDisplay, byNoOfChildArgs: true });
                    this.handleLoadArguments(0, ASCENDING, true);
                }
            }
        }
    }

    componentDidMount() {
        this.handleLoadArguments(this.state.pageNumber);
    }

    render() {
        const { argumentsList, pageNumber, totalPages, currentSortByDisplay } = this.state;
        const { parentArgument, isSupporting, parentContentCreatorId, parentContentType } = this.props;

        if (argumentsList.length === 0) {
            // Assumes that there are no arguments to be displayed so an error is displayed instead.
            return <NoContentAlert contentType={ARGUMENT} />;
        } else {
            // Assumes that there are arguments to be displayed.
            return (
                <div>
                    <div className={"argumentsTableHeader"}>
                        <div className={"spaceBetweenElements"} style={{ paddingTop: '7px', paddingBottom: '7px' }}>
                            <TableSortByBtn
                                id={`${isSupporting}-args-sortby`}
                                title={currentSortByDisplay}
                                onSelect={this.handleChangeSortBy.bind(this)}
                                totalContentCount={this.props.totalNoOfArgs}
                                showMoreOptions={true}
                            />
                        </div>
                    </div>

                    <Table responsive hover className={"argumentsTable"}>
                        <tbody>
                            { argumentsList.map((argument, index) =>
                                <ArgumentEntry
                                    showCreatorName={true}
                                    showCreatorBadge={true}
                                    parentArgument={parentArgument}
                                    isSupporting={isSupporting}
                                    argument={argument}
                                    key={index}
                                    parentContentCreatorId={parentContentCreatorId}
                                    parentContentType={parentContentType}
                                />
                            )}
                        </tbody>
                    </Table>

                    <div className={"argumentsTableFooter"}>
                        <TableFooter
                            pageNumber={pageNumber}
                            totalPages={totalPages}
                            onPrevious={() => this.handleLoadArguments(pageNumber - 1)}
                            onNext={() => this.handleLoadArguments(pageNumber + 1)}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(ArgumentsTable);