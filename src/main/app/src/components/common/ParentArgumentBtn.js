import React from "react";
import { Button } from "react-bootstrap";

/**
 * Displays a button for viewing an argument's parent argument.
 */

class ParentArgumentBtn extends React.PureComponent {

    render() {
        const { parentArgId, showArg } = this.props;

        if (parentArgId !== null && parentArgId !== undefined) {
            // Assumes that the parent argument exists.

            return (
                <Button style={{ marginRight: '10px' }} onClick={() => showArg()}>
                    Parent Argument
                </Button>
            )
        } else {
            // Assumes that the parent argument does not exists.

            return null;
        }
    }
}

export default ParentArgumentBtn;