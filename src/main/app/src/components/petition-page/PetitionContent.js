import React from 'react'
import {Glyphicon, ListGroup, OverlayTrigger, Panel, Popover} from "react-bootstrap";
import { formatTimestampToDate, formatTimestampToDateTime, getTimeRemaining, isDatePassed } from "../../utils/Helpers";
import ShareContent from "../common/ShareContent";
import { PETITION } from "../../constants";
import PetitionContentProperty from "./PetitionContentProperty";
import CreatedByOn from "../common/CreatedByOn";

/**
 * Displays the contents of a petition.
 */

class PetitionContent extends React.PureComponent {

    // Generates the label of the petition's closing date.
    static generateClosingDateLabel(closingDateTime) {
        const ukFormattedClosingDate = formatTimestampToDateTime(closingDateTime);

        if (!isDatePassed(closingDateTime)) {
            // Petition is still ACTIVE.
            const closingDatePopover = (
                <Popover id={"closing-date-popover"} title={'Closing Date'}>{`${ukFormattedClosingDate}`}</Popover>
            );

            return (
                <span className={"closingDateLabel"}>
                    {`Ending in `}
                    <div style={{ paddingLeft: '4px' }}>
                        { getTimeRemaining(closingDateTime) }
                    </div>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={closingDatePopover}>
                        <Glyphicon glyph="info-sign" style={{ paddingLeft: '5px' }}/>
                    </OverlayTrigger>
                </span>
            )

        } else {
            // Petition is CLOSED.
            return <span className={"closingDateLabel"}>{`Closed on ${ukFormattedClosingDate}`}</span>
        }
    }

    render() {
        const { showCreatedByOnFooter, petition } = this.props;
        const { situation, action, value, goal, id, closingDateTime } = petition;

        return (
            <Panel className={'noBottomMarginPanel'}>
                <ListGroup>
                    <PetitionContentProperty labelText={"Situation:"} text={situation} />
                    <PetitionContentProperty labelText={"Proposed Action:"} text={action} />
                    <PetitionContentProperty labelText={"Goal that would be achieved:"} text={goal} />
                    <PetitionContentProperty labelText={"Value that would be promoted:"} text={value} />
                </ListGroup>
                <Panel.Footer>
                    <div className={"spaceBetweenElements"}>
                        <span>
                            { showCreatedByOnFooter
                                ? <CreatedByOn content={petition} date={formatTimestampToDate(petition.creationDateTime)}/>
                                : <ShareContent contentId={id} contentType={PETITION} />
                            }
                        </span>
                        { PetitionContent.generateClosingDateLabel(closingDateTime) }
                    </div>
                </Panel.Footer>
            </Panel>
        );
    }
}

export default PetitionContent;
