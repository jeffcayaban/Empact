import React from 'react'
import {Redirect, Route} from "react-router-dom";
import { CURRENT_USERNAME } from "../../../../constants";
import {getArgumentById, isPetitionClosed} from "../../../../utils/AppUtils";
import Loader from "../../../Loader";
import NoArgCreationClosedPetition from "../../../common/alerts/NoArgCreationOnClosedPetitionAlert";
import {Button} from "react-bootstrap";
import {ARGUMENT} from "../../../../constants";
import ContentRetrievalAlert from "../../../common/alerts/ContentRetrievalAlert";
import {generateCriticalQuestions} from "../../../../utils/Helpers";

/**
 * Will be displayed when the user decides to create an argument that agrees with another argument. It will display
 * relevant critical questions that the user can choose to answer.
 */

class ArgumentAgree extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            argument: null,
            isRootPetitionClosed: null
        }
    }

    // Used for fetching the argument that is to be made to.
    getArgumentFromServer(argumentId) {
        getArgumentById(argumentId)
            .then(response => this.setState({ argument: response, isLoading: false }))
            .catch(error => this.setState({ isLoading: false }))
    }

    // Used for fetching whether the root petition is closed or not.
    getIsPetitionClosedFromServer(petitionId) {
        isPetitionClosed(petitionId)
            .then(response => this.setState({ isRootPetitionClosed: response }))
            .catch(error => console.log(error));
    }

    componentDidMount() {
        const argumentId = this.props.match.params.id;
        this.getArgumentFromServer(argumentId);
    }

    render() {
        const { isLoading, isRootPetitionClosed, argument } = this.state;

        if (!isLoading) {
            // Assumes that any data fetching has finished.

            if (argument !== null && argument !== undefined) {
                // Assumes that an argument has been fetched.

                (isRootPetitionClosed === null) && this.getIsPetitionClosedFromServer(argument.rootPetitionId);
                const username = localStorage.getItem(CURRENT_USERNAME);

                if (username && !isRootPetitionClosed) {
                    // Assumes the user is logged in and the petition is not closed.

                    return (
                        <div className={"secondaryPageContainerStyle"}>
                            <div className={"centerStyle"}>
                                <h2 align="center">You <strong>agree</strong> with the argument</h2>
                                <p align="center">Tell us your reasons for deciding this!</p>
                            </div>

                            <div style={{ paddingTop: '30px' }}>
                                { generateCriticalQuestions(argument, true) }
                            </div>
                            <Route render={({ history }) => (
                                <Button onClick={() => { history.push(`/argument/${argument.id}`); }}>
                                    Back
                                </Button>
                            )}/>
                        </div>
                    );
                } else if (!username) {
                    // Assumes the user is not logged in and will be redirected to the login page.
                    return <Redirect to={{ pathname: '/login' }} />
                } else {
                    // Assumes the petition is closed.
                    return <NoArgCreationClosedPetition />
                }
            } else {
                // Will display an alert when the parent argument could not be fetched.
                return <div className={"alertContainer"}><ContentRetrievalAlert contentType={ARGUMENT} /></div>;
            }
        } else {
            // Will display a loader when data is being fetched.
            return (<Loader isLoading={isLoading} />);
        }
    }
}

export default ArgumentAgree;