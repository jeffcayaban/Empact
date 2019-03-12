import React from "react";
import {formatTimestampToDate} from "../../utils/Helpers";

/**
 * Displays when the argument or petition was last updated.
 */

class LastUpdated extends React.PureComponent {

    render() {
        const { creationDateTime, lastUpdatedDateTime } = this.props;

        if (creationDateTime !== lastUpdatedDateTime) {
            const ukFormattedUpdateDate = formatTimestampToDate(lastUpdatedDateTime);
            return <span style={{ paddingLeft: '5px' }}>{`(Updated on ${ukFormattedUpdateDate})`}</span>;
        } else {
            return null;
        }
    }
}

export default LastUpdated;