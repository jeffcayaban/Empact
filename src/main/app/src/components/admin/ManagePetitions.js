import React from 'react';
import {
    generateAdminActionSuccessDialog,
    generateConfirmActionDialog,
    generateSomethingWentWrongDialog,
    isUserAdmin
} from "../../utils/Helpers";
import NotPermittedAlert from "../common/alerts/NotPermittedAlert";
import { closePetition, deletePetition } from "../../utils/AppUtils";
import ManageContentPanel from "./ManageContentPanel";
import { CLOSE, DELETE, PETITION } from "../../constants";

/**
 * Provides the administrator with links to different pages that focuses on managing the petitions within the system.
 */

class ManagePetitions extends React.PureComponent {

    // Makes the request to the server to delete a petition.
    handleDeletePetition(result, petitionId) {
        if (result.value) {
            // Assumes that the user has confirmed the action to delete the petition.
            deletePetition({ petitionId: petitionId })
                .then(() => generateAdminActionSuccessDialog(PETITION, DELETE))
                .catch(() => generateSomethingWentWrongDialog())
        }
    }

    // Confirms the action to delete a petition.
    handleDeletePetitionRequest(e, petitionId) {
        e.preventDefault();
        const confirmActionDialog = generateConfirmActionDialog(PETITION, DELETE);
        confirmActionDialog.then((result) => this.handleDeletePetition(result, petitionId));
    }

    // Makes the request to the server to close a petition.
    handleClosingPetition(result, petitionId) {
        if (result.value) {
            // Assumes that the user has confirmed the action to close the petition.
            closePetition({ petitionId: petitionId })
                .then(() => generateAdminActionSuccessDialog(PETITION, CLOSE))
                .catch(() => generateSomethingWentWrongDialog())
        }
    }

    // Confirms the action to close a petition.
    handleClosingPetitionRequest(e, petitionId) {
        e.preventDefault();
        const confirmActionDialog = generateConfirmActionDialog(PETITION, CLOSE);
        confirmActionDialog.then((result) => this.handleClosingPetition(result, petitionId))
    }

    render() {
        const { isAuthenticated, currentUser } = this.props;

        if (isUserAdmin(currentUser, isAuthenticated)) {
            // Administrators will be able to access the contents of this component.

            return (
                <div>
                    <div className={"centerStyle"}>
                        <h2>{`Manage ${PETITION}s`}</h2>
                    </div>
                    <div className={"manageContentActionPanels"}>
                        <ManageContentPanel
                            contentType={PETITION}
                            contentAction={DELETE}
                            handleSubmit={this.handleDeletePetitionRequest.bind(this)}
                            {...this.props}
                        />
                        <ManageContentPanel
                            contentType={PETITION}
                            contentAction={CLOSE}
                            handleSubmit={this.handleClosingPetitionRequest.bind(this)}
                            {...this.props}
                        />
                    </div>
                </div>
            );
        } else {
            // Users other than administrators will be shown an alert.

            return <NotPermittedAlert />
        }
    }
}

export default ManagePetitions;