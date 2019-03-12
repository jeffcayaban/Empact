import React from 'react';
import {Button, Modal, Panel, Table} from "react-bootstrap";
import TreeNetwork from "./TreeNetwork";
import {TREE_NETWORK_HEIGHT} from "../../../constants";

/**
 * Is the container for displaying the tree graph of arguments for an argument or petition.
 */

class ArgumentVisualisation extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            showArgumentOverview: false,
            showArgumentOverviewKey: false
        };

        this.handleShowArgumentOverview.bind(this);
        this.handleShowArgumentOverviewKey.bind(this);
    }

    // Updates the component's state to show the argument visualisation.
    handleShowArgumentOverview() {
        this.setState({ showArgumentOverview: !this.state.showArgumentOverview });
    }

    // Updates the component's state to show the argument visualisation key.
    handleShowArgumentOverviewKey() {
        this.setState({ showArgumentOverviewKey: !this.state.showArgumentOverviewKey });
    }

    render() {
        const { contentId, isPetition } = this.props;
        const { showArgumentOverview, showArgumentOverviewKey } = this.state;

        return (
            <div>
                <Panel>
                    <Panel.Body>
                        <div className={"centerStyle"}>
                            <Button bsStyle="primary" onClick={() => this.handleShowArgumentOverview()}>
                                Arguments Overview
                            </Button>
                        </div>
                        <Modal show={showArgumentOverview} bsSize="large">
                            <Modal.Header>
                                <Modal.Title>Arguments Overview</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ height: window.innerHeight * 0.75 }}>
                                <TreeNetwork
                                    contentId={contentId}
                                    isPetition={isPetition}
                                    heightVal={TREE_NETWORK_HEIGHT}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <div className={"argumentVisualisationBtns"}>
                                    <Button bsStyle="primary" onClick={() => this.handleShowArgumentOverviewKey()}>
                                        Help
                                    </Button>
                                    <Button onClick={() => this.handleShowArgumentOverview()}>
                                        Close
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </Panel.Body>
                </Panel>
                <Modal show={showArgumentOverviewKey}>
                    <Modal.Header>
                        <Modal.Title>Help</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>How to use the visualisation:</h5>
                        <p>Scroll up to zoom in and scroll down to zoom out.
                            Use your mouse to explore the different regions of the tree.
                            Clicking on any of the nodes will redirect you to their respective page.
                        </p>
                        <hr />
                        <h5 className={"argumentVisualisationKey"}>Key:</h5>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Shape</th>
                                    <th>Meaning</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ color: 'green' }}>Green Rectangles</td>
                                    <td>Supporting Arguments</td>
                                </tr>
                                <tr>
                                    <td style={{ color: 'red' }}>Red Rectangles</td>
                                    <td>Opposing Arguments</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.handleShowArgumentOverviewKey()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ArgumentVisualisation;
