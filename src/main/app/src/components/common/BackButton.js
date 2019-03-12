import React from "react";
import {Route} from "react-router-dom";
import {Button} from "react-bootstrap";

/**
 * Displays a back button to go back to the previous page.
 */

class BackButton extends React.PureComponent {

    render() {
        return (
            <div style={{ paddingTop: '20px' }}>
                <Route render={({ history }) => (
                    <Button onClick={() => { history.push(this.props.link); }}>Back</Button>
                )}/>
            </div>
        );
    }

}

export default BackButton;