import React from "react";
import { Route } from "react-router-dom";
import { Button } from "react-bootstrap";

/**
 * Used in the Admin Control Panel. These buttons is used for redirecting the user to other administrative pages when
 * clicked on.
 */

class AdminControlPanelBtn extends React.PureComponent {

    render() {
        const contentType = this.props.contentType;
        return (
            <div className={"centerStyle"} style={{ paddingTop: '15px' }}>
                <Route render={({ history }) => (
                    <Button
                        className={"manageContentBtn"}
                        onClick={() => { history.push(`/admin-panel/${contentType.toLowerCase()}`) }}
                    >
                        {`Manage ${contentType}`}
                    </Button>
                )}/>
            </div>
        );
    }
}

export default AdminControlPanelBtn;