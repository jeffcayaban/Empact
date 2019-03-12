import React from "react";
import { formatTimestampToDate, getTimeRemaining, isDatePassed } from "../../utils/Helpers";

/**
 * Displays the petition's closing time.
 */

class PetitionClosingTime extends React.PureComponent {

    render() {
        const closingDateTime = this.props.closingDateTime;

        if (!isDatePassed(closingDateTime)) {
            // Content is still ACTIVE.

            return (
                <span className={"activeClosingTime"}>
                    {`Ending in `}
                    <div className={"petitionTimeRemaining"}>{ getTimeRemaining(closingDateTime) }</div>
                </span>
            );
        } else {
            // Content is CLOSED.

            return (
                <div className={"closedPetitionTime"}>
                    {`Closed on ${formatTimestampToDate(closingDateTime)}`}
                </div>
            );
        }
    }
}

export default PetitionClosingTime;