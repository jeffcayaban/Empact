import React from "react";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {getArgumentLabels} from "../../../utils/Helpers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import ArgumentListEntry from "./ArgumentListEntry";

/**
 * Displays a list of arguments in the horizontal orientation. It is used for the petition report.
 */

class ArgumentHorizontalList extends React.Component {

    render() {
        const userArguments = this.props.userArguments ? this.props.userArguments : [];

        const Menu = userArguments.map(userArgument => {
            const labels = getArgumentLabels(userArgument, null, userArgument.agreesWithCQ);
            return <ArgumentListEntry argumentId={userArgument.id} labels={labels} />
        });

        const LeftArrow = <FontAwesomeIcon icon={faArrowLeft} />;
        const RightArrow = <FontAwesomeIcon icon={faArrowRight} />;

        return <ScrollMenu data={Menu} arrowLeft={LeftArrow} arrowRight={RightArrow} />;
    }
}

export default ArgumentHorizontalList;