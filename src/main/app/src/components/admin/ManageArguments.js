import React from 'react';
import { generateAdminActionSuccessDialog, generateConfirmActionDialog, generateSomethingWentWrongDialog,
    isUserAdmin } from "../../utils/Helpers";
import NotPermittedAlert from "../common/alerts/NotPermittedAlert";
import { deleteArgument } from "../../utils/AppUtils";
import ManageContentPanel from "./ManageContentPanel";
import {ARGUMENT, DELETE} from "../../constants";

/**
 * Provides the administrator with links to different pages that focuses on managing the arguments within the system.
 */

class ManageArguments extends React.PureComponent {

    // Makes the request to the server to delete an argument.
    handleDeleteArgument(result, argumentId) {
        if (result.value) {
            // Assumes that the user has confirmed the action to delete the argument.
            deleteArgument({ argumentId: argumentId })
                .then(() => generateAdminActionSuccessDialog(ARGUMENT, DELETE))
                .catch(() => generateSomethingWentWrongDialog());
        }
    }

    // Confirms the action to delete an argument.
    handleDeleteArgumentRequest(e, argumentId) {
        e.preventDefault();
        const confirmActionDialog = generateConfirmActionDialog(ARGUMENT, DELETE);
        confirmActionDialog.then((result) => this.handleDeleteArgument(result, argumentId));
    }

    render() {
        const { isAuthenticated, currentUser } = this.props;

        if (isUserAdmin(currentUser, isAuthenticated)) {
            // Administrators will be able to access the contents of this component.

            return (
                <div>
                    <div className={"centerStyle"}>
                        <h2>{`Manage ${ARGUMENT}s`}</h2>
                    </div>
                    <div className={"manageContentActionPanels"}>
                        <ManageContentPanel
                            contentType={ARGUMENT}
                            contentAction={DELETE}
                            handleSubmit={this.handleDeleteArgumentRequest.bind(this)}
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

export default ManageArguments;