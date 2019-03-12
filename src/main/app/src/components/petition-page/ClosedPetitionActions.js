import React from 'react';
import {Button, MenuItem, OverlayTrigger, Tooltip} from "react-bootstrap";
import {
    generateGeneralConfirmDialog,
    generateSomethingWentWrongDialog,
    generateSuccessDialog
} from "../../utils/Helpers";
import PetitionReport from "./petition-report/PetitionReport";

/**
 * Provides the user with actions to be applied to a closed petition. This includes deleting or editing a petition.
 */

class ClosedPetitionActions extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            showReport: false,
        };

        this.handleShowPetitionReport.bind(this);
    }

    // Updates the component's state to show or hide the petition report.
    handleShowPetitionReport() {
        this.setState({ showReport: !this.state.showReport });
    }

    // Handles the result of the petition deletion.
    handleDelete(result, deletePetition) {
        if (result.value) {

            // Assumes that the user has confirmed the action to delete the petition.
            deletePetition()
                .then(response => {
                    generateSuccessDialog('Your petition has been deleted!', 'Explore').then(() => {
                        window.location = `/petitions`
                    })
                }).catch(error => generateSomethingWentWrongDialog())
        }
    }

    // Confirms the request to delete the petition.
    handleDeleteRequest() {
        generateGeneralConfirmDialog().then((result) => this.handleDelete(result, this.props.deletePetition))
    }

    // Generates the button to delete the petition.
    generateDeleteBtn(isOpen) {
        const deleteTooltip = <Tooltip id={"delete-petition-tooltip"}>Permanently delete this petition.</Tooltip>;
        const innerElement = isOpen
            ? <MenuItem onClick={this.handleDeleteRequest.bind(this)}>Delete</MenuItem>
            : <Button bsStyle="danger" onClick={this.handleDeleteRequest.bind(this)}>Delete</Button>;

        return (
            <OverlayTrigger placement={"top"} overlay={deleteTooltip}>
                { innerElement }
            </OverlayTrigger>
        )
    }

    render() {
        const { petition } = this.props;
        const { showReport } = this.state;

        const reportTooltip = (
            <Tooltip id={"petition-report-tooltip"}>Generate a report of the petition and its arguments.</Tooltip>
        );

        return (
            <div>
                <div>
                    <OverlayTrigger placement={"top"} overlay={reportTooltip}>
                        <Button style={{ marginRight: '5px' }} onClick={() => this.handleShowPetitionReport()}>
                            View Report
                        </Button>
                    </OverlayTrigger>
                    { this.generateDeleteBtn(false) }
                </div>
                <PetitionReport petition={petition} showReport={showReport}
                                handleShowPetitionReport={() => this.handleShowPetitionReport()} />
            </div>
        );
    }
}

export default ClosedPetitionActions;
