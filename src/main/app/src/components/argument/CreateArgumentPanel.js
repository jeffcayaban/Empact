import React from "react";
import {Col, Collapse, Grid, Well} from "react-bootstrap";
import {ARGUMENT} from "../../constants";
import CreateArgumentInvite from "./create-argument/CreateArgumentInvite";

/**
 * Provides the option for the user to create an argument.
 */

class CreateArgumentPanel extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            showCreateArgument: true
        }
    }

    // Updates the component's state to show or hide the create argument invitation.
    handleShowCreateArgumentInvite() {
        this.setState({ showCreateArgument: !this.state.showCreateArgument })
    }

    render() {
        const { argumentId, isRootPetitionClosed, isArgumentCreator } = this.props;

        if (!isRootPetitionClosed) {
            // Assumes the root petition is open.

            return (
                <Collapse in={this.state.showCreateArgument}>
                    <Grid style={ { paddingTop: '15px' } } className={"divNoPadding"} >
                        <Col md={12} lg={12} className={'noSidePadding'}>
                            <Well>
                                <CreateArgumentInvite
                                    isContentCreator={isArgumentCreator}
                                    contentId={argumentId}
                                    contentType={ARGUMENT}
                                    closeHandler={() => this.handleShowCreateArgumentInvite()}
                                />
                            </Well>
                        </Col>
                    </Grid>
                </Collapse>
            )
        } else {
            // Assumes the root petition is closed, of which the option to create an argument will not be provided.
            return null;
        }
    }
}

export default CreateArgumentPanel;