import React from "react";
import { Button, FormControl, Grid, Panel } from "react-bootstrap";
import {USER, USERNAME, ID} from "../../constants";

/**
 * Is a panel for managing a petition or argument. It invites the user to provide the unique identifier of the content,
 * for which a modification will be applied to it.
 */

class ManageContentPanel extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { contentId: '' }
    }

    // Updates the content ID in the component's state.
    handleUpdateContentId(event) {
        this.setState({ contentId: event.target.value });
    }

    render() {
        const { contentType, contentAction, handleSubmit } = this.props;
        const { contentId } = this.state;

        let contentIdType = (contentType === USER) ? USERNAME.toLowerCase() : ID.toUpperCase();
        let contentIdPlaceholder = (contentType === USER) ? USERNAME : `${contentType} ${ID.toUpperCase()}`;

        return (
            <Grid>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3" toggle>{`${contentAction} ${contentType}`}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <p>
                                {`Enter the ${contentIdType} of the ${contentType.toLowerCase()} that you wish to `}
                                <strong>{`${contentAction.toLowerCase()}`}</strong>.
                            </p>
                            <form onSubmit={(e) => handleSubmit(e, contentId)}>
                                <FormControl
                                    placeholder={contentIdPlaceholder}
                                    type="text"
                                    value={contentId}
                                    onChange={e => this.handleUpdateContentId(e)}
                                    required
                                />
                                <div className={"contentActionBtn"}>
                                    <Button bsStyle="primary" type="submit">
                                        {`${contentAction}`}
                                    </Button>
                                </div>
                            </form>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </Grid>
        );
    }
}

export default ManageContentPanel;