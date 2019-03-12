import React from "react";
import { Button, Modal } from "react-bootstrap";
import {getPetitionReport} from "../../../utils/AppUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import ArgumentHorizontalList from "./ArgumentHorizontalList";

/**
 * Displays a summary of the petition based on its arguments. It highlights whether the majority has supported or
 * opposed the petition, in addition to displaying the arguments that have agreed or disagreed with certain elements
 * of the petition.
 */

class PetitionReport extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isPetitionWinning: false,
            supportingSituation: [],
            supportingActionGoal: [],
            notSupportingSituation: [],
            notSupportingActionGoal: []
        }
    }

    // Fetches the data for the petition report.
    fetchPetitionReport(petitionId) {
        getPetitionReport(petitionId)
            .then(response => {
                this.setState({
                    isPetitionWinning: response.isPetitionWinning,
                    supportingSituation: response.supportingSituation,
                    supportingActionGoal: response.supportingActionGoal,
                    notSupportingSituation: response.notSupportingSituation,
                    notSupportingActionGoal: response.notSupportingActionGoal
                })
            })
            .catch(error => console.error(error));
    }

    // Generates a message regarding the petition's situation.
    static generateArgsSituationMessage(userArguments, isSupporting) {
        if (userArguments.length > 0) {
            // Assumes that there exists arguments.

            const isSupportingText = isSupporting ? "supports" : "does not support";
            return (
                <div>
                    <p>
                        There has been {userArguments.length} arguments that {isSupportingText} the <strong>situation
                        being true</strong>:
                    </p>
                    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                        <ArgumentHorizontalList userArguments={userArguments} />
                    </div>
                </div>
            )
        }
    }

    // Generates a message regarding the petition's action.
    static generateArgsSituationActionMessage(userArguments, isSupporting) {
        if (userArguments.length > 0) {
            // Assumes that there exists arguments.

            const isSupportingText = isSupporting ? "supports" : "does not support";
            return (
                <div>
                    <p>
                        There has been { userArguments.length } arguments that {isSupportingText} the
                        <strong> proposed action in achieving the goal</strong>:
                    </p>
                    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                        <ArgumentHorizontalList userArguments={userArguments} />
                    </div>
                </div>
            )
        }
    }

    // Checks whether there exists any arguments.
    existAnyArguments() {
        const {supportingSituation, supportingActionGoal, notSupportingSituation, notSupportingActionGoal} = this.state;
        return (
            (supportingSituation !== undefined && supportingSituation.length > 0) ||
            (supportingActionGoal !== undefined && supportingActionGoal.length > 0) ||
            (notSupportingSituation !== undefined && notSupportingSituation.length > 0) ||
            (notSupportingActionGoal !== undefined && notSupportingActionGoal.length > 0)
        )
    }

    componentDidMount() {
        this.fetchPetitionReport(this.props.petition.id);
    }

    render() {
        const { showReport, handleShowPetitionReport } = this.props;
        const { isPetitionWinning, supportingSituation, supportingActionGoal, notSupportingSituation,
            notSupportingActionGoal } = this.state;
        const isWinning = isPetitionWinning ? "supported" : "opposed";

        let petitionReportContent;

        if (this.existAnyArguments()) {
            // Assumes that there exists arguments for the petition.

            petitionReportContent = (
                <div>
                    <div className={"centerStyle"}>
                        <h3 align="center">{`The majority has `} <strong>{isWinning}</strong> {`your petition`}</h3>
                    </div>
                    <div className={"titleContentPadding"}>
                        <div>
                            <div>
                                <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }}/>
                                <span style={{ fontSize: '13pt', margin: 0, paddingLeft: '10px' }}>What is supported:</span>
                            </div>
                            <hr style={{ marginTop: '10px' }} />
                            { PetitionReport.generateArgsSituationMessage(supportingSituation, true) }
                            { PetitionReport.generateArgsSituationActionMessage(supportingActionGoal, true) }
                        </div>

                        <div style={{ paddingTop: '30px' }}>
                            <div>
                                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }}/>
                                <span style={{ fontSize: '13pt', margin: 0, paddingLeft: '10px' }}>What is opposed:</span>
                            </div>
                            <hr style={{ marginTop: '10px' }}/>
                            { PetitionReport.generateArgsSituationMessage(notSupportingSituation, false) }
                            { PetitionReport.generateArgsSituationActionMessage(notSupportingActionGoal, false) }
                        </div>
                    </div>
                </div>
            )
        } else {
            // Assumes that there exists no arguments for the petition.

            petitionReportContent = (
                <div>
                    <div className={"centerStyle"}>
                        <h3 align="center">No arguments has been made to this petition.</h3>
                    </div>
                </div>
            )
        }

        return (
            <Modal show={showReport} bsSize="large">
                <Modal.Header>
                    <Modal.Title>Petition Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { petitionReportContent }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleShowPetitionReport}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PetitionReport;