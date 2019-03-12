import React from "react";
import {Redirect} from "react-router-dom";
import {getArgumentById} from "../../utils/AppUtils";
import ExpertOpinion from "./create-argument/forms/ExpertOpinion";
import PopularOpinion from "./create-argument/forms/PopularOpinion";
import {isUserLoggedIn} from "../../utils/Helpers";
import UnableToEditAlert from "../common/alerts/UnableToEditAlert";
import {ARGUMENT, EXPERT_OPINION} from "../../constants";
import Loader from "../Loader";

/**
 * Allows the user to edit an argument.
 */

class EditArgument extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            argument: {},
            isLoading: true
        }
    }

    // Fetches an argument from the server.
    loadFromServer(argumentId) {
        getArgumentById(argumentId)
            .then(response => this.setState({ argument: response, isLoading: false }))
            .catch(error => this.setState({ isLoading: false }));
    }

    componentDidMount() {
        const argumentId = this.props.match.params.id;
        this.loadFromServer(argumentId);
    }

    render() {
        const argument = this.state.argument;

        if (isUserLoggedIn(this.props.isAuthenticated)) {
            // Assumes the user is logged in.

            if (!this.state.isLoading) {
                // Assumes any data fetching to be completed.

                if (argument.createdBy.username === this.props.currentUser.username) {
                    // Assumes the user is the argument's creator.

                    let form;

                    if (argument.argumentType === EXPERT_OPINION) {
                        // Assumes the argument to be of expert opinion.

                        form = <ExpertOpinion
                            isForEdit={true}
                            argument={argument}
                            isSupporting={argument.isSupporting}
                            petitionId={argument.rootPetitionId}
                            argumentId={argument.parentArgumentId}
                            criticalQuestionId={argument.criticalQuestionId}
                            agreesWithCQ={argument.agreesWithCQ}
                        />

                    } else {
                        // Assumes the argument to be of popular opinion.

                        form = <PopularOpinion
                            isForEdit={true}
                            argument={argument}
                            isSupporting={argument.isSupporting}
                            petitionId={argument.rootPetitionId}
                            argumentId={argument.parentArgumentId}
                            criticalQuestionId={argument.criticalQuestionId}
                            agreesWithCQ={argument.agreesWithCQ}
                        />
                    }

                    return (
                        <div className={"editArgContainer"}>
                            <div className={"centerStyle"}>
                                <h2>Edit Argument</h2>
                            </div>
                            <div className={"editArgFormContainer"}>
                                { form }
                            </div>
                        </div>
                    )
                } else {
                    // Assumes the user is not the argument's creator, so an error is displayed.
                    return <UnableToEditAlert contentType={ARGUMENT} />;
                }
            } else {
                // Assumes data is being fetched, so a loader is displayed.
                return <Loader isLoading={this.state.isLoading} />;
            }
        } else {
            // Assumes the user is not logged in and is redirected to the login page.
            return <Redirect to={{ pathname: '/login' }} />
        }
    }
}

export default EditArgument;
