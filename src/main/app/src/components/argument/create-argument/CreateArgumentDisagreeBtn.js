import React from "react";
import { Button } from "react-bootstrap";
import { Route } from "react-router-dom";

/**
 * This button is used for places when an argument is disagreed on.
 */

class CreateArgumentDisagreeBtn extends React.PureComponent {

    render() {
        const { isContentCreator, closeHandler, contentId, contentType } = this.props;

        if (isContentCreator) {
            return <Button onClick={() => closeHandler()}>No</Button>;
        } else {
            return (
                <Route render={({ history }) => (
                    <Button onClick={() => { history.push(`/${contentType.toLowerCase()}/${contentId}/disagree`); }}>
                        Disagree
                    </Button>
                )}/>
            )
        }
    }
}

export default CreateArgumentDisagreeBtn;