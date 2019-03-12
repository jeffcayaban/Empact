import React from "react";
import {Panel} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import ArgumentsTable from "./ArgumentsTable";

/**
 * Represents the container for the arguments table. It includes the set of arguments and the number of arguments.
 */

class ArgumentPanel extends React.PureComponent {

    render() {
        const { isSupporting, subjectId, parentCreatedById, noOfArguments, isCreator, parentContentType } = this.props;
        const titlePrefix = isSupporting ? "Supporting" : "Opposing";
        const icon = isSupporting ? faCheckCircle : faTimesCircle;

        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>
                        <div className={"spaceBetweenElements"}>
                            <div>
                                <FontAwesomeIcon icon={icon} />
                                <span style={{ paddingLeft: '10px' }}>{`${titlePrefix} Arguments`}</span>
                            </div>
                            <div>{noOfArguments}</div>
                        </div>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body className={"argumentsPanelBody"}>
                    <ArgumentsTable
                        subjectId={subjectId}
                        isContentCreator={isCreator}
                        isSupporting={isSupporting}
                        parentContentCreatorId={parentCreatedById}
                        parentContentType={parentContentType}
                        totalNoOfArgs={noOfArguments}
                    />
                </Panel.Body>
            </Panel>
        );
    }
}

export default ArgumentPanel;