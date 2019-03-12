import React from 'react';
import { Col, Grid, Row } from "react-bootstrap";
import AdminControlPanelBtn from "./AdminControlPanelBtn";
import { isUserAdmin } from "../../utils/Helpers";
import {ARGUMENT, PETITION, USER} from "../../constants";
import NotPermittedAlert from "../common/alerts/NotPermittedAlert";

/**
 * Used in the Admin Page. This is the first component that the user will see and provides options to redirect the
 * user to other relevant administrative pages.
 */

class AdminControlPanel extends React.PureComponent {

    render() {
        const { isAuthenticated, currentUser } = this.props;

        if (isUserAdmin(currentUser, isAuthenticated)) {
            // Administrators will be able to access the contents of this component.

            return (
                <div>
                    <div className={"centerStyle"}>
                        <h2>Admin Control Panel</h2>
                    </div>
                    <div className={"manageContentActionPanels"}>
                        <Grid>
                            <h4 id={"actionCenterHeading"}>Action Centre</h4>
                            <hr id={"controlPanelHr"} />
                            <Row>
                                <Col md={4} lg={4}><AdminControlPanelBtn contentType={`${PETITION}s`} /></Col>
                                <Col md={4} lg={4}><AdminControlPanelBtn contentType={`${ARGUMENT}s`} /></Col>
                                <Col md={4} lg={4}><AdminControlPanelBtn contentType={`${USER}s`} /></Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            );
        } else {
            // Users other than administrators will be shown an alert.
            return <NotPermittedAlert />
        }
    }
}

export default AdminControlPanel;