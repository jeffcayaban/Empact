import React from 'react';
import Tree from 'react-d3-tree';
import { getDataNodes } from "../../../utils/AppUtils";
import Loader from "../../Loader";

/**
 * Is the tree network data visualisation which is used to display an overview of the different arguments that are made
 * to an argument or petition.
 */

class TreeNetwork extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            networkData: [],
            isLoading: true
        };
    }

    // Fetches the data nodes that are required to generate the data visualisation.
    getDataNotes() {
        getDataNodes(this.props.contentId, this.props.isPetition)
            .then(response => this.setState({ networkData: response, isLoading: false }))
            .catch(error => console.log(error))
    }

    componentWillMount() {
        this.getDataNotes();
    }

    componentDidMount() {
        const dimensions = this.treeContainer.getBoundingClientRect();

        // Sets the positioning dimensions for the data visualisation.
        this.setState({ translate: { x: dimensions.width / 2, y: dimensions.height / 2 } })
    }

    // Used to redirect a click on a data node to its corresponding argument page.
    static onNodeClick(contentObject, e) {
        window.location = `/${contentObject.contentType.toLowerCase()}/${contentObject.contentId}`;
    }

    render() {
        if (!this.state.isLoading) {
            // Assumes any data fetching to be finished.

            const { networkData, translate } = this.state;
            return (
                <div className={"treeNetwork"} ref={tc => (this.treeContainer = tc)}>
                    <Tree
                        data={networkData}
                        translate={translate}
                        orientation={'vertical'}
                        transitionDuration={0}
                        onClick={TreeNetwork.onNodeClick}
                    />
                </div>
            );
        } else {
            // Assumes data is being fetched.
            const height = `${this.props.heightVal - 25}px`;

            return (
                <div style={{ height: height, width: '100%' }} ref={tc => (this.treeContainer = tc)}>
                    <Loader isLoading={this.state.isLoading} />
                </div>
            );
        }
    }
}

export default TreeNetwork;