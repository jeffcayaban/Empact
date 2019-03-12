import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {getPetition} from "../../../utils/AppUtils";
import Loader from "../../Loader";
import PetitionContent from "../../petition-page/PetitionContent";
import {Route} from "react-router-dom";

/**
 * Provides a quick preview of a petition in the form of a modal.
 */

class PreviewPetition extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            petition: {}
        }
    }

    // Fetches a petition from the server.
    getPetitionFromServer(petitionId) {
        getPetition(petitionId)
            .then(response => this.setState({ isLoading: false, petition: response}))
            .catch(error => this.setState({ isLoading: false }));
    }

    componentDidMount() {
        this.getPetitionFromServer(this.props.petitionId)
    }

    render() {
        if (!this.state.isLoading) {
            // Assumes any data fetching to be finished

            const { show, handleHide, petitionId } = this.props;

            return (
                <Modal show={show} onHide={handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Petition Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PetitionContent petition={this.state.petition} showCreatedByOnFooter={true} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Route render={({ history }) => (
                            <Button bsStyle="primary" onClick={() => { history.push(`/petition/${petitionId}`) }}>
                                View
                            </Button>
                        )}/>
                        <Button onClick={handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            // Assumes data is still being fetched, so a loader is shown.

            return <Loader isLoading={this.state.isLoading} />
        }
    }
}

export default PreviewPetition;
