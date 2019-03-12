import React from 'react'
import { Button, Col, ControlLabel, FormControl, FormGroup, Glyphicon, Grid, HelpBlock, OverlayTrigger, Panel,
    Popover} from "react-bootstrap";
import {checkUsernameAvailability, signup} from "../../utils/AppUtils";
import swal from "sweetalert2";
import {
    generateErrorDialog,
    generateSuccessDialog,
    sendLoginRequest
} from "../../utils/Helpers";
import RegisterFormField from "./RegisterFormField";
import {
    CONFIRM_PASSWORD_ID,
    FIRST_NAME_ID, FIRST_NAME_LENGTH_MAX,
    LAST_NAME_ID, LAST_NAME_LENGTH_MAX,
    PASSWORD_ID, PASSWORD_LENGTH_MAX,
    PASSWORD_LENGTH_MIN,
    USERNAME_ID, USERNAME_LENGTH_MAX
} from "../../constants";

/**
 * Is the page used for users to create a new user account.
 */

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formFields: {},
            formValidationStates: {},

            isUsernameChosen: false,
            isCreating: false,
            isCheckingUsername: false,
            usernameLength: 0
        };
    }

    // Sends the request to log in into an existing account.
    handleSignIn() {
        const loginRequest = {};
        loginRequest[USERNAME_ID] = this.state.formFields[USERNAME_ID];
        loginRequest[PASSWORD_ID] = this.state.formFields[PASSWORD_ID];
        sendLoginRequest(loginRequest, true, this.state.formFields[USERNAME_ID], null);
    }

    // Confirms the request to create a new user account.
    onSubmit(newUserData) {
        signup(newUserData)
            .then(response => {
                generateSuccessDialog('Your account has been created!', 'Okay').then((result) => {
                    // Log into the newly created account.
                    (result.value) && this.handleSignIn();
                })
            }).catch(error => generateErrorDialog('There was a problem registering your account'))
    }

    // Sends the request to create a new user account.
    handleSubmit(e) {
        e.preventDefault();
        const formFields = this.state.formFields;

        if (formFields[PASSWORD_ID] !== formFields[CONFIRM_PASSWORD_ID]) {
            generateErrorDialog('Both passwords do not match. Please try again.');

        } else {
            this.setState({ isCreating: true });

            const registerRequest = {};

            registerRequest[USERNAME_ID] = formFields[USERNAME_ID];
            registerRequest[FIRST_NAME_ID] = formFields[FIRST_NAME_ID];
            registerRequest[LAST_NAME_ID] = formFields[LAST_NAME_ID];
            registerRequest[PASSWORD_ID] = formFields[PASSWORD_ID];

            this.setState({ isCreating: false });
            this.onSubmit(registerRequest);
        }
    }

    // Updates a new user account field value within the component's state.
    handleChange(formField, event) {
        const { formFields, formValidationStates } = this.state;
        formFields[formField] = event.target.value;
        formValidationStates[formField] = (event.target.value.length <= 0) ? "error" : null;
        this.setState({ formFields, formValidationStates });
    }

    // Updates the component's state to indicate whether a username is chosen.
    onChangeUsername() {
        this.setState({ isUsernameChosen: false });
    }

    // Checks whether a given username is available to be taken.
    checkUsernameAvailability(e) {
        e.preventDefault();
        this.setState({ isCheckingUsername: true });

        checkUsernameAvailability(this.state.formFields[USERNAME_ID])
            .then(response => {
                if (!response.usernameExists) {
                    // Assumes the username is available.

                    generateSuccessDialog(
                        'Click on continue to start filling out the required details for your account.',
                        'Continue'
                    ).then(() => {
                        this.setState({ isUsernameChosen: true, isCheckingUsername: false });
                    });
                } else {
                    // Assumes the username is not available.

                    swal({
                        title: 'Username is not available',
                        text: 'Please use a different username',
                        type: 'error',
                    });

                    this.setState({ isCheckingUsername: false });
                }
            })
            .catch(error => {
                // Assumes that the server has failed to check the username's availability.

                generateErrorDialog('There was a problem checking the availability of this username.');
                this.setState({ isCheckingUsername: false })
            })
    }

    // Generates a popover to inform the user of restrictions on the password.
    static generatePasswordPopover() {
        return <Popover id={"password-info-popover"}>Your password must be between 5 and 21 characters.</Popover>;
    }

    // Generates a form for the user to enter the details of the new account.
    generateUserDetailForm() {
        const { formValidationStates, formFields, isCreating } = this.state;

        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">2. Fill out your details</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup controlId={USERNAME_ID}>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type={"text"} value={formFields[USERNAME_ID]} disabled />
                        </FormGroup>
                        <RegisterFormField
                            id={FIRST_NAME_ID}
                            validationState={formValidationStates[FIRST_NAME_ID]}
                            handleChange={this.handleChange.bind(this, FIRST_NAME_ID)}
                            name={"First Name"}
                            type={"text"}
                            placeholder={"Enter your first name"}
                            maxLength={FIRST_NAME_LENGTH_MAX}
                        />
                        <RegisterFormField
                            id={LAST_NAME_ID}
                            validationState={formValidationStates[LAST_NAME_ID]}
                            handleChange={this.handleChange.bind(this, LAST_NAME_ID)}
                            name={"Last Name"}
                            type={"text"}
                            placeholder={"Enter your last name"}
                            maxLength={LAST_NAME_LENGTH_MAX}
                        />
                        <FormGroup controlId={PASSWORD_ID} validationState={formValidationStates[PASSWORD_ID]}>
                            <span>
                                <ControlLabel>Password</ControlLabel>
                                <OverlayTrigger trigger={['hover', 'focus']} placement="top"
                                                overlay={Register.generatePasswordPopover()}>
                                  <Glyphicon glyph="info-sign" style={{ paddingLeft: '5px' }}/>
                                </OverlayTrigger>
                            </span>
                            <FormControl
                                type={"password"}
                                placeholder={"Enter a password"}
                                onChange={this.handleChange.bind(this, PASSWORD_ID)}
                                required={true}
                                minLength={PASSWORD_LENGTH_MIN}
                                maxLength={PASSWORD_LENGTH_MAX}
                            />
                        </FormGroup>
                        <RegisterFormField
                            id={CONFIRM_PASSWORD_ID}
                            validationState={formValidationStates[CONFIRM_PASSWORD_ID]}
                            handleChange={this.handleChange.bind(this, CONFIRM_PASSWORD_ID)}
                            name={"Confirm Password"}
                            type={"password"}
                            placeholder={"Enter your password again"}
                            minLength={PASSWORD_LENGTH_MIN}
                            maxLength={PASSWORD_LENGTH_MAX}
                        />
                        <div className={"buttonContainer"}>
                            <div style={{ paddingRight: '10px' }}>
                                <Button onClick={this.onChangeUsername.bind(this)}>Change Username</Button>
                            </div>
                            <Button bsStyle="primary" type="submit" disabled={isCreating}>
                                { isCreating ? 'Registering...' : 'Register' }
                            </Button>
                        </div>
                    </form>
                </Panel.Body>
            </Panel>
        )
    }

    render() {
        const { formValidationStates, isUsernameChosen, usernameLength, isCheckingUsername } = this.state;

        return (
            <div>
                <div className={"centerStyle"}>
                    <h2 align="center">Register</h2>
                </div>
                <div className={"titleContentPadding"}>
                    <Grid className={"divNoPadding"} style={{ paddingTop: '30px' }}>
                        <Col md={12} lg={12}>
                            <Panel>
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">1. Check if your username is available</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <form onSubmit={this.checkUsernameAvailability.bind(this)}>
                                        <FormGroup validationState={formValidationStates[USERNAME_ID]}>
                                            <ControlLabel id={"username-label"}>Username</ControlLabel>
                                            <FormControl
                                                id={"username-input"}
                                                type={"text"}
                                                placeholder={"Enter a Username"}
                                                onChange={(e) => {
                                                    this.handleChange(USERNAME_ID, e);
                                                    this.setState({ usernameLength: e.target.value.length })
                                                }}
                                                required={true}
                                                maxLength={USERNAME_LENGTH_MAX}
                                                disabled={isUsernameChosen}
                                            />
                                            <FormControl.Feedback />
                                            <div id={"usernameFieldValidation"}>
                                                <div id={"usernameFieldError"}>
                                                    { formValidationStates[USERNAME_ID] === 'error' &&
                                                    <HelpBlock>This field cannot be empty.</HelpBlock> }
                                                </div>
                                                <div style={{ resizeMode: 'contain', paddingTop: '5px' }}>
                                                    <p>{usernameLength}/15</p>
                                                </div>
                                            </div>
                                        </FormGroup>
                                        <Button bsStyle="primary" type="submit"
                                                disabled={isCheckingUsername || isUsernameChosen}>
                                            { isCheckingUsername ? 'Checking...' : 'Check Availability' }
                                        </Button>
                                    </form>
                                </Panel.Body>
                            </Panel>
                            { isUsernameChosen && this.generateUserDetailForm() }
                        </Col>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Register;