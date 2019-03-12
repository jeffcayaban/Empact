import React from "react";
import { Link } from "react-router-dom";

/**
 * Displays the creator name and a link to their profile.
 */

class CreatorName extends React.PureComponent {

    render() {
        const content = this.props.content;

        if (!content.isAnonymous) {
            // Creator chose to show name.
            const createdBy = content.createdBy;
            return (
                <span><Link to={`/user/${createdBy.username}`}>{`${createdBy.firstName} ${createdBy.lastName}`}</Link></span>
            )

        } else {
            // Creator decides to stay anonymous.
            return <span>Anonymous</span>
        }
    }
}

export default CreatorName;