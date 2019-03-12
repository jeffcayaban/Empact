import React from 'react';
import { Col, Grid, Row } from "react-bootstrap";
import { getUserProfile } from "../../../utils/AppUtils";
import UserPetitions from "./UserPetitions";
import UserDetails from "./UserDetails";
import UserArguments from "./UserArguments";
import Loader from "../../Loader";

/**
 * Is the user profile page. This page will display the user's arguments and petitions.
 */

class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            user: {},
        };
    }

    // Fetches the user's details from the server.
    loadUserDetails(username) {
        getUserProfile(username)
            .then(response => this.setState({ user: response, isLoading: false }))
            .catch(error => this.setState({ isLoading: false }))
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserDetails(username);
    }

    render() {
        if (!this.state.isLoading) {
            // Assumes any data fetching has completed.

            const user = this.state.user;
            const { firstName, lastName, username } = user;
            const currentUser = this.props.currentUser;
            const isUser = ((currentUser !== null) && (username === currentUser.username));

            return (
                <div>
                    <div className={"userDetailsContainer"}>
                        <UserDetails firstName={firstName} lastName={lastName} userName={username} />
                    </div>

                    <div className={"userContentContainer"}>
                        <Grid>
                            <Row>
                                <Col md={6} lg={6}>
                                    <UserPetitions isUser={isUser} username={username} />
                                </Col>
                                <Col md={6} lg={6}>
                                    <UserArguments isUser={isUser} username={username}  />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            );
        } else {
            // Assumes data is being fetched, so a loader is displayed.
            return <Loader isLoading={this.state.isLoading} />
        }
    }
}

export default UserProfile;