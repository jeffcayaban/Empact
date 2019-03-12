import React from "react";
import { Button, Modal} from "react-bootstrap";

/**
 * Displays a preview of the intended action for a petition.
 */

class ActionPreviewModal extends React.PureComponent {

    render() {
        const { petitionAction, showActionPreview, container, closeCallbackFn } = this.props;

        return (
            <Modal show={showActionPreview} container={container} aria-labelledby="contained-modal-title" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Action
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { petitionAction }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeCallbackFn}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ActionPreviewModal;