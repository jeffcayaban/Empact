import React from 'react'
import { Button, Tooltip, OverlayTrigger, DropdownButton, MenuItem } from "react-bootstrap";

import { Route, withRouter } from "react-router-dom";
import { closePetition } from "../../utils/AppUtils";
import { generateGeneralConfirmDialog, generateSomethingWentWrongDialog, generateSuccessDialog } from "../../utils/Helpers";

/**
 * Provides the user with actions to be applied to a petition. This includes deleting, editing, or closing a
 * petition.
 */

class PetitionActionPanel extends React.PureComponent {

    // Handles the result of the delete petition request.
    handleDelete() {
        generateGeneralConfirmDialog().then((result) => {
            if (result.value) {
                // Assumes that the user has confirmed the action to delete the petition.

                this.props.deletePetition()
                    .then(response => {
                        generateSuccessDialog('Your petition has been deleted!', 'Explore').then(() => {
                            window.location = `/petitions`
                        })
                    }).catch(error => generateSomethingWentWrongDialog())
            }
        })
    }

    // Handles the result of the close petition request.
    handleClose(petitionId) {
        generateGeneralConfirmDialog().then((result) => {
            if (result.value) {
                // Assumes that the user has confirmed the action to close the petition.

                closePetition({ petitionId: petitionId })
                    .then(response => {
                        generateSuccessDialog('Your petition is now closed', 'Your Petition').then(() => {
                            window.location = `/petition/${petitionId}`
                        })
                    }).catch(error => generateSomethingWentWrongDialog())
            }
        })
    }

    // Generates the button to delete the petition.
    generateDeleteBtn(isOpen) {
        const deleteTooltip = <Tooltip id={"delete-petition-tooltip"}>Permanently delete this petition.</Tooltip>;
        const innerElement = isOpen
            ? <MenuItem onClick={this.handleDelete.bind(this)}>Delete</MenuItem>
            : <Button bsStyle="danger" onClick={this.handleDelete.bind(this)}>Delete</Button>;

        return (
            <OverlayTrigger placement={"top"} overlay={deleteTooltip}>
                { innerElement }
            </OverlayTrigger>
        )
    }

    render() {
        const editTooltip = <Tooltip id={"edit-petition-tooltip"}>Edit the contents of this petition.</Tooltip>;

        return (
            <div>
                <DropdownButton id={"petition-actions"} title={"Actions"} pullRight>
                    <Route render={({ history }) => (
                        <OverlayTrigger placement={"top"} overlay={editTooltip}>
                            <MenuItem onClick={() => { history.push(`/petition/edit/${this.props.petition.id}`) }}>
                                Edit
                            </MenuItem>
                        </OverlayTrigger>
                    )}/>
                    { this.generateDeleteBtn(true) }
                    <MenuItem divider />
                    <MenuItem onClick={() => this.handleClose(this.props.petition.id)}>Close</MenuItem>
                </DropdownButton>
            </div>
        );
    }
}

export default withRouter(PetitionActionPanel);