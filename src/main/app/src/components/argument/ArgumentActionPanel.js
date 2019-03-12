import React from "react";
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { deleteArgument } from "../../utils/AppUtils";
import { Route } from "react-router-dom";
import { generateGeneralConfirmDialog, generateSomethingWentWrongDialog, generateSuccessDialog } from "../../utils/Helpers";

/**
 *  Provides the argument creator with several options of argument modification. This includes editing or deleting the
 *  argument.
 */

class ArgumentActionPanel extends React.Component {

    // Sends the request to delete the argument.
    handleDelete(argumentIdRequest) {
        const { isAnArgument, parentSubjectId } = this.props;

        deleteArgument(argumentIdRequest)
            .then(response => {
                let redirectUrl;
                let confirmButtonText;

                if (isAnArgument === false) {
                    // Assumes the argument's parent is an argument.

                    redirectUrl = `/petition/${parentSubjectId}`;
                    confirmButtonText = 'See Petition';
                } else if (isAnArgument === true) {
                    // Assumes the argument's parent is a petition.

                    redirectUrl = `/argument/${parentSubjectId}`;
                    confirmButtonText = 'See Parent Argument';
                } else {
                    // Falls back to redirecting to the homepage.

                    redirectUrl = ``;
                    confirmButtonText = 'Home';
                }

                generateSuccessDialog('Your argument has been deleted!', confirmButtonText).then(() => {
                    window.location = redirectUrl
                })
            })
            .catch(error => generateSomethingWentWrongDialog())
    }

    // Confirms the action to delete the argument.
    handleDeleteRequest() {
        generateGeneralConfirmDialog().then((result) => {
            result.value && this.handleDelete({ argumentId: this.props.argumentId });
        })
    }

    render() {
        const deleteTooltip = <Tooltip id={"delete-argument-tooltip"}>Permanently delete this argument.</Tooltip>;
        const editTooltip = <Tooltip id={"edit-argument-tooltip"}>Edit the contents of this argument.</Tooltip>;

        return (
            <div align="right">
                <ButtonGroup>
                    <Route render={({ history }) => (
                        <OverlayTrigger placement={"top"} overlay={editTooltip}>
                            <Button onClick={() => { history.push(`/argument/edit/${this.props.argumentId}`) }}>
                                Edit
                            </Button>
                        </OverlayTrigger>
                    )}/>
                    <OverlayTrigger placement={"top"} overlay={deleteTooltip}>
                        <Button bsStyle="danger" onClick={this.handleDeleteRequest.bind(this)}>Delete</Button>
                    </OverlayTrigger>
                </ButtonGroup>
            </div>
        );
    }

}

export default ArgumentActionPanel;