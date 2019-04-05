import React from "react";
import {Button, ListGroupItem} from "react-bootstrap";
import ParentArgumentBtn from "./ParentArgumentBtn";

/**
 * Displays buttons to view an argument's petition or parent argument.
 */

class ContentPreviewBtns extends React.PureComponent {

    render() {
        const { parentArgId, showArg, showPetition, isWinning } = this.props;
        const isWinningText = isWinning ? 'Winning' : 'Losing';

        return (
            <ListGroupItem className={"spaceBetweenElements"}>
                <div>
                    <ParentArgumentBtn parentArgId={parentArgId} showArg={showArg} />
                    <Button onClick={() => showPetition()}>Related Petition</Button>
                </div>
                <p style={{ margin: '0px', lineHeight: '35px' }}>{isWinningText}</p>
            </ListGroupItem>
        )
    }
}

export default ContentPreviewBtns;