import React from "react";
import CreatorName from "./CreatorName";

/**
 * Displays the argument or petition's creation details.
 */

class CreatedByOn extends React.PureComponent {

    render() {
        const { content, date } = this.props;
        return (
            <span>
                {`Created by `}
                <CreatorName content={content} />
                {` on ${date}`}
            </span>
        );
    }
}

export default CreatedByOn;