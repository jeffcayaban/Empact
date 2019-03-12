import React from 'react'

import {withRouter} from 'react-router-dom'
import Loader from "../Loader";
import {
    deletePetition,
    getPetition,
    countArgsByPetitionIdAndIsSupporting
} from "../../utils/AppUtils";

import PetitionContent from "./PetitionContent";
import PetitionActionPanel from "./PetitionActionPanel";
import ContentRetrievalAlert from "../common/alerts/ContentRetrievalAlert";
import {Col, Grid, Row} from "react-bootstrap";

import {formatTimestampToDate, isDatePassed} from "../../utils/Helpers";
import ArgumentVisualisation from "../common/argument-visualisation/ArgumentVisualisation";
import {PETITION} from "../../constants";
import ArgumentPanel from "../common/ArgumentPanel";
import LastUpdated from "../common/LastUpdated";
import CreateArgumentPanel from "./CreateArgumentPanel";
import CreatedByOn from "../common/CreatedByOn";
import ClosedPetitionActions from "./ClosedPetitionActions";

/**
 * Represents the page that will display the details of the petition. It will additionally display any arguments that
 * support or oppose the petition.
 */

class Petition extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            petition: {},
            isPetitionCreator: false,
            showCreateArgument: true
        };

        this.hideCreateArgumentInvite = this.hideCreateArgumentInvite.bind(this);
    }

    // Fetches the petition from the server.
    getPetitionFromServer(petitionId) {
        getPetition(petitionId)
            .then(response => {
                this.setState({
                    isLoading: false,
                    petition: response,
                    isPetitionCreator: this.props.currentUser && response.createdBy.username === this.props.currentUser.username
                });
            }).catch(error => this.setState({ isLoading: false }));
    }

    // Fetches the number of arguments that supports and opposes the petition.
    getNoOfArguments(petitionId, isSupporting) {
        countArgsByPetitionIdAndIsSupporting(petitionId, isSupporting)
            .then(response => {
                if (isSupporting) {
                    // Assumes the response is for supporting arguments.
                    this.setState({ noOfForArguments: response })
                } else {
                    // Assumes the response is for opposing arguments.
                    this.setState({ noOfAgainstArguments: response })
                }
            }).catch(error => console.error(error))
    }

    // Sends the request to delete the petition.
    deletePetition() {
        return deletePetition({ petitionId: this.state.petition.id })
    }

    // Updates the component's state to hide the create argument invite.
    hideCreateArgumentInvite() {
        this.setState({ showCreateArgument: false })
    }

    // Generates the panel that contains the actions that can be applied to the petition.
    generatePetitionActionPanel(petition) {
        if (!isDatePassed(petition.closingDateTime)) {
            // Assumes that the petition is open.
            return (
                <PetitionActionPanel
                    petition={petition}
                    deletePetition={this.deletePetition.bind(this)}
                    {...this.props}
                />
            )
        } else {
            // Assumes that the petition is closed.
            return <ClosedPetitionActions petition={petition} deletePetition={this.deletePetition.bind(this)} />
        }
    }

    componentDidMount() {
        const petitionId = this.props.match.params.id;
        this.getPetitionFromServer(petitionId);

        // Get Argument Counts
        this.getNoOfArguments(petitionId, true);
        this.getNoOfArguments(petitionId, false);
    }

    render() {
        if (!this.state.isLoading) {
            // Assumes that the data fetching is completed.

            if (Object.keys(this.state.petition).length !== 0) {
                // Assumes that the petition details is defined.

                const { petition, noOfAgainstArguments, isPetitionCreator, noOfForArguments } = this.state;
                const { id, lastUpdatedDateTime, creationDateTime } = petition;
                const ukFormattedCreationDate = formatTimestampToDate(creationDateTime);

                return (
                    <div className={'secondaryPageContainerStyle'}>
                        <Grid className={"divNoPadding"} style={{ paddingTop: '15px' }}>
                            <Col md={12} lg={12} className={'noSidePadding'}>
                                <h1 align="center">{ petition.title }</h1>
                                <div className={"centerStyle"} style={{ paddingTop: '10px' }}>
                                    <CreatedByOn content={petition} date={ukFormattedCreationDate}/>
                                    <LastUpdated
                                        creationDateTime={creationDateTime}
                                        lastUpdatedDateTime={lastUpdatedDateTime}
                                    />
                                </div>
                            </Col>
                        </Grid>
                        <Grid className={"divNoPadding"} style={{ paddingTop: '40px' }}>
                            <Col md={12} lg={12} className={'noSidePadding'}>
                                <div className={"spaceBetweenElements"} style={{ paddingBottom: '15px' }}>
                                    <div className={"contentIdNumber"}>{`ID: ${id}`}</div>
                                    { isPetitionCreator && this.generatePetitionActionPanel(petition) }
                                </div>
                                <PetitionContent petition={petition} showCreatedByOnFooter={false} />
                            </Col>
                        </Grid>
                        <CreateArgumentPanel
                            closingDateTime={petition.closingDateTime}
                            petitionId={id}
                            isPetitionCreator={this.state.isPetitionCreator}
                            hideCreateArgumentInvite={this.hideCreateArgumentInvite}
                            showCreateArgument={this.state.showCreateArgument}
                        />
                        <Grid className={"divNoPadding"} style={{ paddingTop: '30px' }}>
                            <Col md={12} lg={12} className={'noSidePadding'}>
                                <ArgumentVisualisation contentId={id} isPetition={true} />
                            </Col>
                        </Grid>
                        <Grid className={"divNoPadding"}>
                            <Row>
                                <Col md={6} lg={6}>
                                    <ArgumentPanel
                                        isSupporting={true}
                                        subjectId={id}
                                        parentCreatedById={petition.createdBy.id}
                                        noOfArguments={noOfForArguments}
                                        isCreator={isPetitionCreator}
                                        parentContentType={PETITION}
                                    />
                                </Col>
                                <Col md={6} lg={6}>
                                    <ArgumentPanel
                                        isSupporting={false}
                                        subjectId={id}
                                        parentCreatedById={petition.createdBy.id}
                                        noOfArguments={noOfAgainstArguments}
                                        isCreator={isPetitionCreator}
                                        parentContentType={PETITION}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                );
            } else {
                // Assumes that the petition details is not defined, so an alert is displayed.
                return <div className={"alertContainer"}><ContentRetrievalAlert contentType={PETITION} /></div>;
            }
        } else {
            // Assumes that the data is being fetched, so a loader is displayed.
            return <Loader isLoading={this.state.isLoading} />;
        }
    }
}

export default withRouter(Petition);