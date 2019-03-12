import React from "react";
import {Col, Grid, Row} from "react-bootstrap";

import ProfileLink from '../../../other/images/profile-link.png';
import ProfilePage from '../../../other/images/profile-page.png';
import BackButton from "../../common/BackButton";

/**
 * Displays help information for a profile page.
 */

class ProfileHelp extends React.PureComponent {

    render() {
        return (
            <div className={'secondaryPageContainerStyle'}>
                <div className={"centerStyle"}>
                    <h2>Your Profile</h2>
                    <p>Understand the different features of your profile page.</p>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"}>
                        <Row>
                            <Col md={12} lg={12}>
                                <div>
                                    <h4 style={{ margin: 0 }}>Your profile page</h4>
                                    <hr className={"helpHr"} />

                                    <p>
                                        Go to your profile page by clicking on the "Profile" link. This link is found
                                        on the top navigation bar. You can additionally view another user's profile page
                                        by clicking on their name on an argument or petition.
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '30%', minWidth: '350px', align: 'center' }}
                                             src={ProfileLink}
                                             alt="Profile Page Link"
                                        />
                                    </div>

                                    <p>
                                        Below shows an image of a typical profile page. It features an area for your
                                        petitions and another area for your arguments. 
                                    </p>

                                    <div className={"centerStyle"} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <img style={{ maxWidth: '80%', minWidth: '350px', align: 'center' }}
                                             src={ProfilePage}
                                             alt="Profile Page"
                                        />
                                    </div>
                                </div>
                                <BackButton link={"/help/account"}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default ProfileHelp;