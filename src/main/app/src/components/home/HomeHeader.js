import React from 'react'

import { Route } from "react-router-dom";
import { Button, Jumbotron } from "react-bootstrap";
import {WEBSITE_NAME} from "../../constants";

/**
 * Represents the header that is displayed on the home page.
 */

class HomeHeader extends React.PureComponent {
    render() {
        return (
            <Jumbotron id={"homeHeaderContainer"}>
                <div className={'centerStyle'}>
                    <h2 id={"headline-text"} align="center">{`Welcome to ${WEBSITE_NAME}!`}</h2>
                    <p id={"sub-headline-text"}>Ready to make a change?</p>
                    <div id={"homeExploreBtn"}>
                        <Route render={({ history }) => (
                            <Button bsSize="large" onClick={() => { history.push('/petitions') }}>Explore!</Button>
                        )}/>
                    </div>
                </div>
            </Jumbotron>
        );
    }
}

export default HomeHeader;

