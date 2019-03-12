import React from 'react';
import {generateArgumentCreatorName, getArgumentLabels} from "../../utils/Helpers";
import {Link, withRouter} from "react-router-dom";
import ShareContent from "./ShareContent";
import {Glyphicon, OverlayTrigger, Popover} from "react-bootstrap";
import ArgCounts from "./ArgCounts";
import {countArgsByArgumentIdAndIsSupporting} from "../../utils/AppUtils";
import {ARGUMENT} from "../../constants";

/**
 * Displays the details of an argument in a container that will be used for an arguments table.
 */

class ArgumentEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noOfForArguments: 0,
            noOfAgainstArguments: 0
        }
    }

    // Displays a badge to indicate that the argument was created by the current argument's creator.
    createCreatorBadge() {
        const byArgumentCreatorPopover = <Popover id={"arg-creator-popover"}>By the Main Argument Creator</Popover>;
        const byPetitionCreatorPopover = <Popover id={"petition-creator-popover"}>By the Petition Creator</Popover>;

        return (
            <div style={{ paddingLeft: '5px' }}>
                <OverlayTrigger
                    trigger={['hover', 'focus']}
                    placement="top"
                    overlay={this.props.parentContentType === ARGUMENT ? byArgumentCreatorPopover : byPetitionCreatorPopover}
                >
                    <Glyphicon glyph="certificate" style={{ color: '#ebc12e' }}/>
                </OverlayTrigger>
            </div>
        );
    }

    // Fetches the number of arguments that are supporting or opposing the argument.
    fetchArgumentCounts() {
        const argumentId = this.props.argument.id;
        countArgsByArgumentIdAndIsSupporting(argumentId, true)
            .then(response => this.setState({ noOfForArguments: response }))
            .catch(error => console.error(error));
        countArgsByArgumentIdAndIsSupporting(argumentId, false)
            .then(response => this.setState({ noOfAgainstArguments: response }))
            .catch(error => console.error(error))
    }

    // Generates a link to the parent argument or petition.
    generateParentContentLink(argument) {
        if (argument.parentArgumentId === null) {
            return <span><Link to={`/petition/${argument.rootPetitionId}`}>Petition</Link></span>;
        } else {
            return <span><Link to={`/argument/${argument.parentArgumentId}`}>Argument</Link></span>;
        }
    }

    componentWillMount() {
        this.fetchArgumentCounts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        (prevProps !== this.props) && this.fetchArgumentCounts();
    }

    render() {
        const { showCreatorBadge, showCreatorName, argument, parentArgument, parentContentCreatorId,
            key } = this.props;
        const { noOfForArguments, noOfAgainstArguments } = this.state;

        const labels = getArgumentLabels(argument, parentArgument, argument.agreesWithCQ);
        const isParentContentCreator = parentContentCreatorId === argument.createdBy.id;

        return (
            <tr id={key}>
                <th className={"argumentPanelRow"}>
                    <div className={"spaceBetweenElements"}>
                        <div>
                            <div className={"spaceBetweenElementsTwo"}>
                                <Link className={"argumentEntryTitle"} to={`/argument/${argument.id}`}>
                                    { labels[0] }
                                </Link>
                                { (isParentContentCreator && !argument.isAnonymous && showCreatorBadge)
                                && this.createCreatorBadge() }
                            </div>
                            <div className={"argumentEntryType"}>
                                {`${labels[1]} for `}
                                { this.generateParentContentLink(argument) }
                            </div>
                        </div>
                        <ArgCounts
                            noOfForArguments={noOfForArguments}
                            noOfAgainstArguments={noOfAgainstArguments}
                        />
                    </div>

                    <div className={"argumentEntryFooter"}>
                        { generateArgumentCreatorName(argument, showCreatorName) }
                        <ShareContent contentId={argument.id} contentType={ARGUMENT} />
                    </div>
                </th>
            </tr>
        );
    }
}

export default withRouter(ArgumentEntry);