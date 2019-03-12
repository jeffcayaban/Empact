import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {Route} from "react-router-dom";

/**
 * Provides a quick preview of an argument in the form of a modal.
 */

class PreviewArgument extends React.PureComponent {

    render() {
        const { parentArgument, handleHide, show, labels, renderContents } = this.props;

        return (
            <Modal show={show} onHide={handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Argument Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { renderContents(parentArgument, labels, false) }
                </Modal.Body>
                <Modal.Footer>
                    <Route render={({ history }) => (
                        <Button bsStyle="primary" onClick={() => { history.push(`/argument/${parentArgument.id}`) }}>
                            View
                        </Button>
                    )}/>
                    <Button onClick={handleHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PreviewArgument;
