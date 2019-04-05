import React from 'react';
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { renderArgumentCreatorName } from "../../../utils/Helpers";
import ContentPreviewBtns from "../../common/ContentPreviewBtns";
import ArgumentSources from "../../common/ArgumentSources";

/**
 * Will display the contents of an argument based on expert opinion.
 */

class ExpertOpinion extends React.PureComponent {

    render() {
        const { argument, labels, showPetition, showArg, includePreview } = this.props;
        const { expert, expertDomain, expertAssertion, parentArgumentId } = argument;
        const creatorName = renderArgumentCreatorName(argument);
        const argumentTitle = (argument.parentArgumentId !== null && labels[2] !== undefined) ? labels[2] : labels[0];

        const contentPreviewBtns = includePreview && <ContentPreviewBtns parentArgId={parentArgumentId}
                                                                         isWinning={argument.isWinning}
                                                                         showArg={showArg} showPetition={showPetition} />;

        return (
            <ListGroup>
                <ListGroupItem>
                    <p className={"expertOpinionSummary"}>
                        {`${creatorName} believes that ${argumentTitle.toLowerCase()} because an expert, `}
                        <strong>{expert}</strong>{` (who specialises in ${expertDomain}) claims that:`}
                    </p>
                    <p className={"expertAssertionContent"}>
                        {`"${expertAssertion}"`}
                    </p>
                </ListGroupItem>
                <ArgumentSources argument={argument} />
                { contentPreviewBtns }
            </ListGroup>
        );
    }
}

export default ExpertOpinion;