import React from "react";
import { Button } from "react-bootstrap";

/**
 * A button that is used for the user to indicate their request to create an argument.
 */

class UserOpinionBtn extends React.PureComponent {
    render() {
        const { showOptions, showArgTemplates } = this.props;
        return (
            <div className={"userOpinionBtns"}>
                <Button onClick={showArgTemplates}>
                    { showOptions ? 'No' : 'Yes' }
                </Button>
            </div>
        );
    }
}

export default UserOpinionBtn;