import React from 'react';
import {
    generateAdminActionSuccessDialog,
    generateConfirmActionDialog,
    generateSomethingWentWrongDialog,
    isUserAdmin
} from "../../utils/Helpers";
import NotPermittedAlert from "../common/alerts/NotPermittedAlert";
import { deleteUser } from "../../utils/AppUtils";
import ManageContentPanel from "./ManageContentPanel";
import {DELETE, USER} from "../../constants";

/**
 * Provides the administrator with links to different pages that focuses on managing users within the system.
 */

class ManageUsers extends React.PureComponent {

    // Makes the request to the server to delete a user.
    handleDeleteUser(result, username) {
        if (result.value) {
            // Assumes that the user has confirmed the action to delete the account.
            deleteUser({ username: username })
                .then(() => generateAdminActionSuccessDialog(USER, DELETE))
                .catch(() => generateSomethingWentWrongDialog())
        }
    }

    // Confirms the action to delete a user.
    handleDeleteUserRequest(e, username) {
        e.preventDefault();
        const confirmActionDialog = generateConfirmActionDialog(USER, DELETE);
        confirmActionDialog.then((result) => this.handleDeleteUser(result, username));
    }

    render() {
        const { isAuthenticated, currentUser } = this.props;

        if (isUserAdmin(currentUser, isAuthenticated)) {
            // Administrators will be able to access the contents of this component.

            return (
                <div>
                    <div className={"centerStyle"}>
                        <h2>{`Manage ${USER}s`}</h2>
                    </div>
                    <div className={"manageContentActionPanels"}>
                        <ManageContentPanel
                            contentType={USER}
                            contentAction={DELETE}
                            handleSubmit={this.handleDeleteUserRequest.bind(this)}
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

export default ManageUsers;