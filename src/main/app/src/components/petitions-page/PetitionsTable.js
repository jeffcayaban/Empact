import React from 'react'

import Loader from "../Loader";
import {getAllPetitions, getMostDiscussedPetitions} from "../../utils/AppUtils";
import ClosedCheckbox from "../common/ClosedCheckbox";
import PetitionsContentTable from "../common/PetitionsContentTable";

/**
 * Is used to display a set of petitions in the form of a table.
 */

class PetitionsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,

            petitions: [],
            pageNumber: 0,
            pageSize: 5,
            totalPages: 0,
            last: true,
            showClosed: false
        };
    }

    // Sets the component's state with the the petitions and pagination details.
    setResponse(response, showClosed) {
        this.setState({
            isLoading: false,
            petitions: response.content,
            pageNumber: response.page,
            totalPages: response.totalPages,
            last: response.last,
            showClosed: showClosed
        });
    }

    // Fetches the set of petitions from the server.
    loadFromServer(page = 0, size = this.state.pageSize, showClosed = this.state.showClosed) {
        if (this.props.byNoOfArgs) {
            getMostDiscussedPetitions(page, size, this.props.sort, showClosed)
                .then(response => this.setResponse(response, showClosed))
                .catch(error => this.setState({ isLoading: false }))

        } else {
            getAllPetitions(page, size, this.props.sort, showClosed)
                .then(response => this.setResponse(response, showClosed))
                .catch(error => this.setState({ isLoading: false }))
        }
    }

    componentWillMount() {
        this.loadFromServer();
    }

    render() {
        const { petitions, pageNumber, totalPages, isLoading, pageSize, showClosed } = this.state;

        if (!isLoading) {
            // Assumes that the data fetching is completed.
            return (
                <div>
                    <ClosedCheckbox onChange={() => this.loadFromServer(0, pageSize, !showClosed)}/>
                    <PetitionsContentTable
                        petitions={petitions}
                        pageNumber={pageNumber}
                        totalPages={totalPages}
                        showFollowUp={true}
                    />
                </div>
            )
        } else {
            // Assumes that the data is being fetched.
            return <Loader isLoading={isLoading} />
        }
    }
}

export default PetitionsTable;