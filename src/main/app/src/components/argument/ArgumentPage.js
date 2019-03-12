import React from 'react';

import { countArgsByArgumentIdAndIsSupporting, getArgumentById, getParentArgumentById, isPetitionClosed } from "../../utils/AppUtils";
import {formatTimestampToDate, getArgumentLabels} from "../../utils/Helpers";
import Loader from "../Loader";
import {Col, Grid, Panel, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import ExpertOpinion from "./content/ExpertOpinion";
import PopularOpinion from "./content/PopularOpinion";
import PreviewPetition from "./preview-context/PreviewPetition";
import PreviewArgument from "./preview-context/PreviewArgument";
import ShareContent from "../common/ShareContent";
import ArgumentActionPanel from "./ArgumentActionPanel";
import ArgumentVisualisation from "../common/argument-visualisation/ArgumentVisualisation";
import {ARGUMENT, EXPERT_OPINION, POPULAR_OPINION} from "../../constants";
import ArgumentPanel from "../common/ArgumentPanel";
import ContentRetrievalAlert from "../common/alerts/ContentRetrievalAlert";
import CreatorName from "../common/CreatorName";
import CreateArgumentPanel from "./CreateArgumentPanel";
import LastUpdated from "../common/LastUpdated";

/**
 * Represents the page for which the details of an argument is shown. It also displays any arguments that are made to
 * support or oppose the argument.
 */

class ArgumentPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            argument: null,
            isArgumentCreator: false,
            showArgPreview: false,
            showPetitionPreview: false,
            isRootPetitionClosed: null,
            parentArgument: null,

            noOfForArguments: 0,
            noOfAgainstArguments: 0
        };

        this.renderArgumentContents = this.renderArgumentContents.bind(this);
        this.handleShowArgPreview = this.handleShowArgPreview.bind(this);
        this.handleShowPetitionPreview = this.handleShowPetitionPreview.bind(this);
    }

    // Fetches an argument from the server given an ID.
    getArgumentFromServer(argumentId) {
        getArgumentById(argumentId)
            .then(response => {
                this.getIsPetitionClosedFromServer(response.rootPetitionId);

                this.setState({
                    argument: response,
                    isLoading: false,
                    isArgumentCreator: this.props.currentUser && response.createdBy.username === this.props.currentUser.username
                })
            }).catch(error => this.setState({ isLoading: false }))
    }

    // Fetches the parent argument of a given argument's ID.
    getParentArgumentFromServer(argumentId) {
        getParentArgumentById(argumentId)
            .then(response => this.setState({ parentArgument: response }))
            .catch(error => this.setState({ parentArgument: null }))
    }

    // Fetches whether a petition is closed.
    getIsPetitionClosedFromServer(petitionId) {
        isPetitionClosed(petitionId)
            .then(response => this.setState({ isRootPetitionClosed: response }))
            .catch(error => console.error(error))
    }

    // Fetches the number of arguments that is made
    getNoOfArguments(argumentId, isSupporting) {
        countArgsByArgumentIdAndIsSupporting(argumentId, isSupporting)
            .then(response => {
                if (isSupporting) {
                    this.setState({ noOfForArguments: response })
                } else {
                    this.setState({ noOfAgainstArguments: response })
                }
            })
            .catch(error => console.error(error))
    }

    // Renders the argument contents based on its type.
    renderArgumentContents(argument, labels, includePreview) {
        const argType = argument.argumentType;

        if (argType === POPULAR_OPINION) {
            // The argument is by Popular Opinion.

            return <PopularOpinion
                argument={argument}
                includePreview={includePreview}
                labels={labels}
                showArg={this.handleShowArgPreview.bind(this)}
                showPetition={this.handleShowPetitionPreview.bind(this)}
                criticalQuestionId={argument.criticalQuestionId}
            />;
        } else if (argType === EXPERT_OPINION) {
            // The argument is by Expert Opinion.

            return <ExpertOpinion
                argument={argument}
                includePreview={includePreview}
                labels={labels}
                showArg={this.handleShowArgPreview.bind(this)}
                showPetition={this.handleShowPetitionPreview.bind(this)}
                criticalQuestionId={argument.criticalQuestionId}
            />;
        } else {
            // Display error message if the type is unidentifiable.

            return <Panel><Panel.Body>Unable to render the contents of the arguments</Panel.Body></Panel>
        }
    }

    // Updates the component's state to show the argument preview.
    handleShowArgPreview() {
        this.setState({ showArgPreview: !this.state.showArgPreview });
    }

    // Updates the component's state to show the petition preview.
    handleShowPetitionPreview() {
        this.setState({ showPetitionPreview: !this.state.showPetitionPreview });
    }

    // Generates a preview of either the parent argument or the root petition.
    generateContextPreview(labels) {
        const argument = this.state.argument;

        if (argument.parentArgumentId !== null && this.state.parentArgument !== null) {
            // If the parent argument exists then provide an option to preview it.

            return (
                <div>
                    <PreviewArgument
                        renderContents={this.renderArgumentContents}
                        labels={labels}
                        parentArgument={this.state.parentArgument}
                        show={this.state.showArgPreview}
                        handleHide={this.handleShowArgPreview}
                    />
                    <PreviewPetition
                        petitionId={argument.rootPetitionId}
                        show={this.state.showPetitionPreview}
                        handleHide={this.handleShowPetitionPreview}
                    />
                </div>
            );

        } else if (argument.rootPetitionId !== null) {
            // If the parent argument exists then provide an option to preview it.

            return <PreviewPetition petitionId={argument.rootPetitionId} show={this.state.showPetitionPreview}
                                    handleHide={this.handleShowPetitionPreview} />;
        }
    }

    // Provides the different options to modify an argument.
    static createArgumentActionPanel(argument, isRootPetitionClosed, isArgumentCreator) {
        if (!isRootPetitionClosed && isArgumentCreator) {
            // Assumes the petition is not closed and the user is the argument's creator.

            return (
                <ArgumentActionPanel
                    argumentId={argument.id}
                    isSupporting={argument.isSupporting}
                    isAnArgument={argument.parentArgumentId !== null}
                    parentSubjectId={argument.parentArgumentId === null ? argument.rootPetitionId : argument.parentArgumentId}
                />
            )
        }
    }

    componentDidMount() {
        const argumentId = this.props.match.params.id;
        this.getArgumentFromServer(argumentId);

        // Gets the parent argument (if an argument to another argument).
        this.getParentArgumentFromServer(argumentId);

        // Get the number of arguments made to the argument.
        this.getNoOfArguments(argumentId, true);
        this.getNoOfArguments(argumentId, false);
    }

    render() {
        if (!this.state.isLoading) {
            // Assumes that any data fetching has finished.

            const { argument, noOfForArguments, isRootPetitionClosed, parentArgument, isArgumentCreator,
                noOfAgainstArguments } = this.state;

            if (argument !== null && argument !== {}) {
                // Assumes that the argument exists.

                const labels = getArgumentLabels(argument, parentArgument, argument.agreesWithCQ);
                const creationDateTime = formatTimestampToDate(argument.creationDateTime);
                const argumentContents = this.renderArgumentContents(argument, labels, true);
                const argumentActionPanel = ArgumentPage.createArgumentActionPanel(argument, isRootPetitionClosed,
                    isArgumentCreator);

                return (
                    <div className={'secondaryPageContainerStyle'}>
                        { this.generateContextPreview(labels) }
                        <Grid className={"divNoPadding"} style={{ paddingTop: '30px' }} >
                            <Col md={12} lg={12}  className={"divNoPadding"}>
                                <div>
                                    <div className={"spaceBetweenElements"}>
                                        <div className={"argumentHeader"}>
                                            <h1 className={"argumentTitle"}>{labels[0]}</h1>
                                            <p>{labels[1]}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className={"argumentHr"} />
                                <div className={"spaceBetweenElements"}>
                                    <div className={"argumentCreationDetails"}>
                                        <span>
                                            {'By '}
                                            <CreatorName content={this.state.argument} />
                                            {` on ${creationDateTime}`}
                                        </span>
                                        <LastUpdated
                                            creationDateTime={argument.creationDateTime}
                                            lastUpdatedDateTime={argument.lastUpdatedDateTime} />
                                    </div>
                                    <ShareContent contentId={argument.id} contentType={ARGUMENT} />
                                </div>
                            </Col>
                        </Grid>
                        <Grid className={"divNoPadding"} style={{ paddingTop: '30px' }}>
                            <Col md={12} lg={12} className={'noSidePadding'}>
                                <div className={"spaceBetweenElements"} style={{ paddingBottom: '15px' }}>
                                    <div className={"contentIdNumber"}>{`ID: ${argument.id}`}</div>
                                    { argumentActionPanel }
                                </div>
                                { argumentContents }
                            </Col>
                        </Grid>
                        <CreateArgumentPanel argumentId={argument.id} isRootPetitionClosed={isRootPetitionClosed}
                            isArgumentCreator={isArgumentCreator} />
                        <Grid className={"divNoPadding"}>
                            <Col md={12} lg={12} className={'noSidePadding'}>
                                <ArgumentVisualisation contentId={argument.id} isPetition={false} />
                            </Col>
                        </Grid>
                        <Grid className={"divNoPadding"}>
                            <Row>
                                <Col md={6} lg={6}>
                                    <ArgumentPanel
                                        isSupporting={true}
                                        subjectId={argument.id}
                                        parentCreatedById={argument.createdBy.id}
                                        noOfArguments={noOfForArguments}
                                        isCreator={isArgumentCreator}
                                        parentContentType={ARGUMENT}
                                    />
                                </Col>
                                <Col md={6} lg={6}>
                                    <ArgumentPanel
                                        isSupporting={false}
                                        subjectId={argument.id}
                                        parentCreatedById={argument.createdBy.id}
                                        noOfArguments={noOfAgainstArguments}
                                        isCreator={isArgumentCreator}
                                        parentContentType={ARGUMENT}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                );
            } else {
                // Will display an alert when the argument could not be fetched.
                return <div className={"alertContainer"}><ContentRetrievalAlert contentType={ARGUMENT} /></div>;
            }

        } else {
            // Will display a loader when data is being fetched.
            return <Loader isLoading={this.state.isLoading} />
        }
    }
}

export default withRouter(ArgumentPage);
