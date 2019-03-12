import React from 'react'

import {Button, Col, Form, FormGroup, Grid, Panel} from 'react-bootstrap';
import {Route} from "react-router-dom";
import {sendLoginRequest} from "../../utils/Helpers";
import LoginFormField from "./LoginFormField";

/**
 * Is the login page that users will use to log in into their account.
 */

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = { username: "", password: "" };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    // Submits the request to log in into an account.
    handleSubmit(event) {
        event.preventDefault();
        sendLoginRequest(this.state, false, this.state.username, this.props.onLogin);
    }

    // Updates the username in the component's state.
    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    // Updates the password in the component's state.
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        const { username, password } = this.state;
        const { handleUsernameChange, handlePasswordChange } = this;

        return (
            <div>
                <div className={"centerStyle"}>
                    <h2 align="center">Login</h2>
                </div>
                <Grid className={"divNoPadding"} style={{ paddingTop: '30px' }}>
                    <Col md={12} lg={12}>
                        <div id={"loginPanelContainer"}>
                            <Panel>
                                <div id={"loginPanel"}>
                                    <Form horizontal onSubmit={this.handleSubmit}>
                                        <LoginFormField
                                            name={"Username"}
                                            type={"text"}
                                            onChange={handleUsernameChange}
                                            fieldValue={username}
                                        />
                                        <LoginFormField
                                            name={"Password"}
                                            type={"password"}
                                            onChange={handlePasswordChange}
                                            fieldValue={password}
                                        />
                                        <FormGroup style={{ paddingTop: '5px' }}>
                                            <Col smOffset={2} sm={10}>
                                                <Button bsStyle="primary" type="submit">Login</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                    <hr style={{ marginTop: '25px' }}/>
                                    <p align="center">Don't have an account? Register yours now!</p>
                                    <div id={"registerBtnContainer"}>
                                        <Route render={({ history }) => (
                                            <Button onClick={() => { history.push('/register') }}>
                                                Register
                                            </Button>
                                        )}/>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    </Col>
                </Grid>
            </div>
        );
    }
}

export default Login;