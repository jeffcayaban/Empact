import React from 'react';
import { Col, Grid } from "react-bootstrap";
import Circle from "./Circle";

/**
 * Displays the details of a given user.
 */

class UserDetails extends React.PureComponent {

    render() {
        const { firstName, lastName, userName } = this.props;

        const userInitial = String(firstName).charAt(0);
        const fullName = `${firstName} ${lastName}`;
        const usernameToShow = `@${userName}`;

        return (
            <Grid>
                <Col xs={12} md={12}>
                    <div className={"centerStyle"}>
                        <Circle text={userInitial} />
                        <div>
                            <h1 align={"center"}>{fullName}</h1>
                            <h4 align={"center"} style={{ color: '#7c7c7c' }}>{usernameToShow}</h4>
                        </div>
                    </div>
                </Col>
            </Grid>
        );
    }
}

export default UserDetails;
