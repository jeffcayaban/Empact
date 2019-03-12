import React from 'react'
import { Redirect } from "react-router-dom";
import { CURRENT_USERNAME } from "../../../../constants";
import {getArgumentById, isPetitionClosed} from "../../../../utils/AppUtils";
import Loader from "../../../Loader";
import NoArgCreationClosedPetition from "../../../common/alerts/NoArgCreationOnClosedPetitionAlert";
import {ARGUMENT} from "../../../../constants";
import NoCreatorDisagreeAlert from "../../../common/alerts/NoCreatorDisagreeAlert";
import ContentRetrievalAlert from "../../../common/alerts/ContentRetrievalAlert";
import {generateCriticalQuestions} from "../../../../utils/Helpers";

/**
 * Will be displayed when the user decides to create an argument that disagrees with another argument. It will display
 * relevant critical questions that the user can choose to answer.
 */

class ArgumentDisagree extends React.Component {

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
            .then(response => {
                this.setState({
                    argument: response,
                    isLoading: false
                })
            }).catch(error => this.setState({ isLoading: false }))
    }

    // Used for fetching whether the root petition is closed or not.
    getIsPetitionClosedFromServer(petitionId) {
        if (this.state.isRootPetitionClosed === null) {
            isPetitionClosed(petitionId)
                .then(response => this.setState({ isRootPetitionClosed: response }))
                .catch(error => console.log(error));
        }
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

                this.getIsPetitionClosedFromServer(argument.rootPetitionId);
                const username = localStorage.getItem(CURRENT_USERNAME);
                const argumentCreator = argument.createdBy;

                if (username && (argumentCreator.username !== username) && !isRootPetitionClosed) {
                    // Assumes the user is not the argument creator and the petition is not closed.

                    return (
                        <div className={"secondaryPageContainerStyle"}>
                            <div className={"centerStyle"}>
                                <h2 align="center">You <strong>disagree</strong> with the argument</h2>
                                <p align="center">Tell us your reasons for deciding this!</p>
                            </div>
                            <div style={{ paddingTop: '30px' }}>
                                { generateCriticalQuestions(argument, false) }
                            </div>
                        </div>
                    );
                } else if (isRootPetitionClosed) {
                    // Assumes the petition is closed.
                    return <NoArgCreationClosedPetition />
                } else if (username && (argumentCreator.username === username)) {
                    // Assumes the user is the argument creator, of which an alert is shown.
                    return <NoCreatorDisagreeAlert />
                } else {
                    // Assumes the user is not logged in and will be redirected to the login page.
                    return <Redirect to={{ pathname: '/login' }} />
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

export default ArgumentDisagree;