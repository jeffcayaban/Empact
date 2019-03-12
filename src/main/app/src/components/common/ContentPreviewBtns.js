import React from "react";
import {Button, ListGroupItem} from "react-bootstrap";
import ParentArgumentBtn from "./ParentArgumentBtn";

/**
 * Displays buttons to view an argument's petition or parent argument.
 */

class ContentPreviewBtns extends React.PureComponent {

    render() {
        const { parentArgId, showArg, showPetition } = this.props;
        return (
            <ListGroupItem>
                <ParentArgumentBtn parentArgId={parentArgId} showArg={showArg} />
                <Button onClick={() => showPetition()}>Related Petition</Button>
            </ListGroupItem>
        )
    }
}

export default ContentPreviewBtns;