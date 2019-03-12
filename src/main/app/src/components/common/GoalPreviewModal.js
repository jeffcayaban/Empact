import React from "react";
import {Button, Modal} from "react-bootstrap";

/**
 * Displays a preview of the goal of a petition.
 */

class GoalPreviewModal extends React.PureComponent {

    render() {
        const { petitionGoal, showGoalPreview, container, closeCallbackFn } = this.props;

        return (
            <Modal
                show={showGoalPreview}
                container={container}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Goal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { petitionGoal }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeCallbackFn}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default GoalPreviewModal;