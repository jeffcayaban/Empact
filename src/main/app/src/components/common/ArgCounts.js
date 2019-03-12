import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

/**
 * Displays the number of supporting and opposing arguments.
 */

class ArgCounts extends React.Component {

    render() {
        const { noOfForArguments, noOfAgainstArguments } = this.props;

        return (
            <div className={"argCounts"}>
                <div className={"argCountIconContainer"}>
                    <FontAwesomeIcon title="Number of supporting arguments" className={"argCountIcon"} icon={faCheckCircle} />
                    <div>{ noOfForArguments }</div>
                </div>
                <div className={"argCountIconContainer"}  style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon title="Number of opposing arguments" className={"argCountIcon"} icon={faTimesCircle} />
                    { noOfAgainstArguments }
                </div>
            </div>
        );
    }
}

export default ArgCounts;
