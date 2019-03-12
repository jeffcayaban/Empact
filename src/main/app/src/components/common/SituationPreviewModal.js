import * as React from "react";
import {Button, Modal} from "react-bootstrap";

/**
 * Displays a preview of the petition's situation.
 */

class SituationPreviewModal extends React.PureComponent {

    render() {
        const { situation, showSituation, container, closeCallbackFn } = this.props;

        return (
            <Modal
                show={showSituation}
                container={container}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Situation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { situation }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeCallbackFn}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default SituationPreviewModal;