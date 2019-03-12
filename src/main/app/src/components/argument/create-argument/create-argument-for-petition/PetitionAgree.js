import React from 'react'
import {Redirect, Route} from "react-router-dom";
import { CURRENT_USERNAME } from "../../../../constants";
import {getPetition, isPetitionClosed} from "../../../../utils/AppUtils";
import Loader from "../../../Loader";
import SituationCQ1 from "./critical-questions/SituationCQ1";
import ActionCQ3 from "./critical-questions/ActionCQ3";
import {Button} from "react-bootstrap";
import NoArgCreationClosedPetition from "../../../common/alerts/NoArgCreationOnClosedPetitionAlert";
import ContentRetrievalAlert from "../../../common/alerts/ContentRetrievalAlert";
import {PETITION} from "../../../../constants";

/**
 * Will be displayed when the user decides to create an argument that agrees with a petition. It will display
 * relevant critical questions that the user can choose to answer.
 */

class PetitionAgree extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            petition: null,
            isPetitionClosed: null,
        }
    }

    // Used for fetching the petition that is to be made to.
    getPetitionFromServer(petitionId) {
        getPetition(petitionId)
            .then(response => this.setState({ isLoading: false, petition: response }))
            .catch(error => this.setState({ isLoading: false }))
    }

    // Used for fetching whether the root petition is closed or not.
    getIsPetitionClosedFromServer(petitionId) {
        isPetitionClosed(petitionId)
            .then(response => this.setState({ isPetitionClosed: response }))
            .catch(error => console.log(error));
    }

    componentDidMount() {
        const petitionId = this.props.match.params.id;
        this.getPetitionFromServer(petitionId);
        this.getIsPetitionClosedFromServer(petitionId);
    }

    render() {
        const petitionId = this.props.match.params.id;
        const username = localStorage.getItem(CURRENT_USERNAME);
        const { isLoading, isPetitionClosed, petition } = this.state;

        if (!isLoading) {
            // Assumes that any data fetching has finished.

            if (petition !== null && petition !== undefined) {
                // Assumes that the petition has been fetched.

                if (username && !isPetitionClosed) {
                    // Assumes the user is logged in and the petition is not closed.

                    return (
                        <div className={"secondaryPageContainerStyle"}>
                            <div className={"centerStyle"}>
                                <h2 align="center">You <strong>agree</strong> with the petition</h2>
                                <p align="center">Tell us your reasons for deciding this!</p>
                            </div>

                            <div style={{ paddingTop: '30px' }}>
                                <SituationCQ1 petitionId={petitionId} isSupporting={true} situation={petition.situation} />
                                <ActionCQ3 petitionId={petitionId} isSupporting={true} petition={petition} />
                            </div>
                            <Route render={({ history }) => (
                                <Button onClick={() => { history.push(`/petition/${petitionId}`); }}>Back</Button>
                            )}/>
                        </div>
                    );
                } else if (isPetitionClosed) {
                    // Assumes the petition is closed.
                    return <NoArgCreationClosedPetition />
                } else {
                    // Assumes the user is not logged in and will be redirected to the login page.
                    return <Redirect to={{ pathname: '/login' }} />
                }
            } else {
                // Will display an alert when the petition could not be fetched.
                return <div className={"alertContainer"}><ContentRetrievalAlert contentType={PETITION} /></div>;
            }
        } else {
            // Will display a loader when data is being fetched.
            return (<Loader isLoading={isLoading} />);
        }
    }
}

export default PetitionAgree;