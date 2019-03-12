import React from "react";
import {Col, Collapse, Grid} from "react-bootstrap";
import CreateArgumentInvite from "../argument/create-argument/CreateArgumentInvite";
import {PETITION} from "../../constants";
import {isDatePassed} from "../../utils/Helpers";

/**
 * Generates the container for creating a new argument. This is used for the petition page.
 */

class CreateArgumentPanel extends React.PureComponent {

    render() {
        const { closingDateTime, petitionId, isPetitionCreator, hideCreateArgumentInvite, showCreateArgument} = this.props;

        if (!isDatePassed(closingDateTime)) {
            // Assumes the root petition is still open.

            return (
                <Collapse in={showCreateArgument}>
                    <Grid className={"noSidePadding"} >
                        <Col md={12} lg={12} id={"createArgumentInvite"} className={'noSidePadding'}>
                            <CreateArgumentInvite
                                isContentCreator={isPetitionCreator}
                                contentId={petitionId}
                                contentType={PETITION}
                                closeHandler={hideCreateArgumentInvite}
                            />
                        </Col>
                    </Grid>
                </Collapse>
            )
        } else {
            // Assumes the root petition is closed, so no argument can not be created.
            return null;
        }
    }
}

export default CreateArgumentPanel;