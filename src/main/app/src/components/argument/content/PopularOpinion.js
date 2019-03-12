import React from 'react';
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { renderArgumentCreatorName } from "../../../utils/Helpers";
import ContentPreviewBtns from "../../common/ContentPreviewBtns";
import ArgumentSources from "../../common/ArgumentSources";

/**
 * Will display the contents of an argument based on popular opinion.
 */

class PopularOpinion extends React.PureComponent {

    render() {
        const { argument, labels, showPetition, showArg, includePreview } = this.props;
        const { explanation, parentArgumentId } = argument;
        const creatorName = renderArgumentCreatorName(argument);
        const argumentTitle = (argument.parentArgumentId !== null && labels[2] !== undefined) ? labels[2] : labels[0];

        const contentPreviewBtns = includePreview && <ContentPreviewBtns parentArgId={parentArgumentId}
                                                                         showArg={showArg} showPetition={showPetition} />;

        return (
            <ListGroup>
                <ListGroupItem>
                    <p className={"popularOpinionSummary"}>
                        {`${creatorName} believes it is generally well known that ${argumentTitle.toLowerCase()}.
                        ${creatorName} has provided the following explanation to prove this:`}
                    </p>
                    <p className={"argumentExplanation"}>{`"${explanation}"`}</p>
                </ListGroupItem>
                <ArgumentSources argument={argument} />
                { contentPreviewBtns }
            </ListGroup>
        );
    }
}

export default PopularOpinion;