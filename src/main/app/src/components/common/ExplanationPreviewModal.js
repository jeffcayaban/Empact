import React from "react";
import { Button, Modal} from "react-bootstrap";

/**
 * Displays a preview of the argument's explanation.
 */

class ExplanationPreviewModal extends React.Component {

    render() {
        const { explanation, showExplanation, container, closeCallbackFn } = this.props;

        return (
            <Modal show={showExplanation} container={container} aria-labelledby="contained-modal-title" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Explanation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { explanation }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeCallbackFn}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ExplanationPreviewModal;