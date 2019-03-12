import React from 'react'

import { Button, FormGroup, HelpBlock, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

// DatePicker
import DatePicker from 'react-datepicker';
import moment from "moment";
import TextAreaField from './TextAreaField';

import {
    PETITION_TITLE_ID, PETITION_SITUATION_ID, PETITION_ACTION_ID, PETITION_GOAL_ID,
    PETITION_VALUE_ID, PETITION_CLOSING_DATE_ID, PETITION_IS_ANONYMOUS_ID, PETITION_FIELD_MAX
} from '../../constants';
import {TITLE_LENGTH_MAX} from "../../constants";

/**
 * Is a form used for creating or editing a petition.
 */

class PetitionForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            formFields: {},
            formValidationStates: {},
            isCreating: false,
            titleLength: 0
        };
    }

    // Used for submitting a request object containing the details of a petition.
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isCreating: true });

        const formFields = this.state.formFields;

        const dateValue = formFields[PETITION_CLOSING_DATE_ID]
            ? moment(formFields[PETITION_CLOSING_DATE_ID]) : moment().add(1, 'days');

        const isAnonymous = (formFields[PETITION_IS_ANONYMOUS_ID] === undefined)
            ? false : formFields[PETITION_IS_ANONYMOUS_ID];

        const petitionRequest = {};

        petitionRequest[PETITION_TITLE_ID] = formFields[PETITION_TITLE_ID];
        petitionRequest[PETITION_SITUATION_ID] = formFields[PETITION_SITUATION_ID];
        petitionRequest[PETITION_ACTION_ID] = formFields[PETITION_ACTION_ID];
        petitionRequest[PETITION_GOAL_ID] = formFields[PETITION_GOAL_ID];
        petitionRequest[PETITION_VALUE_ID] = formFields[PETITION_VALUE_ID];
        petitionRequest[PETITION_CLOSING_DATE_ID] = new Date(dateValue).getTime();
        petitionRequest[PETITION_IS_ANONYMOUS_ID] = isAnonymous;

        this.setState({ isCreating: false });
        this.props.onSubmit(petitionRequest);
    }

    // Used for updating a petition's details in the component's state.
    handleChange(formField, event) {
        const { formFields, formValidationStates } = this.state;
        formFields[formField] = event.target.value;
        formValidationStates[formField] = (event.target.value.length <= 0) ? "error" : null;

        if (formField === PETITION_TITLE_ID) {
            this.setState({ formFields, formValidationStates, titleLength: event.target.value.length });
        } else {
            this.setState({ formFields, formValidationStates });
        }
    }

    // Used for updating the petition's closing date in the component's state.
    handleDateChange(date) {
        const { formFields, formValidationStates } = this.state;
        formFields[PETITION_CLOSING_DATE_ID] = date;
        formValidationStates[PETITION_CLOSING_DATE_ID] = !date ? "error" : date;
        this.setState({ formFields, formValidationStates });
    }

    // Used for updating the petition's anonymity in the component's state.
    handleAnonymityChange() {
        let formFields = this.state.formFields;
        formFields[PETITION_IS_ANONYMOUS_ID] = (formFields[PETITION_IS_ANONYMOUS_ID] === null)
            ? true : !formFields[PETITION_IS_ANONYMOUS_ID];
        this.setState({ formFields })
    }

    componentDidMount() {
        if (this.props.petition) {
            // Assumes the petition exists.

            const petition = this.props.petition;
            petition[PETITION_CLOSING_DATE_ID] = new Date(petition[PETITION_CLOSING_DATE_ID]).getTime();
            this.setState({ formFields: petition })
        }
    }

    render() {
        const { formFields, formValidationStates, titleLength, isCreating } = this.state;

        const dateValue = formFields[PETITION_CLOSING_DATE_ID]
            ? moment(formFields[PETITION_CLOSING_DATE_ID]) : moment().add(1, 'days');

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup
                        controlId={PETITION_TITLE_ID}
                        validationState={formValidationStates[PETITION_TITLE_ID]}
                    >
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type={"text"}
                            placeholder={"Enter a Title"}
                            onChange={(e) => this.handleChange(PETITION_TITLE_ID, e)}
                            required={true}
                            maxLength={TITLE_LENGTH_MAX}
                            value={formFields[PETITION_TITLE_ID]}
                        />
                        <FormControl.Feedback />
                        <div className={"nonEmptyFieldWarningContainer"}>
                            <div className={"nonEmptyFieldWarning"}>
                                { formValidationStates[PETITION_TITLE_ID] === 'error' &&
                                    <HelpBlock>This field cannot be empty.</HelpBlock> }
                            </div>
                            <div className={"titleLengthCounter"}>
                                <p>{titleLength}/{TITLE_LENGTH_MAX}</p>
                            </div>
                        </div>
                    </FormGroup>
                    <TextAreaField
                        id={PETITION_SITUATION_ID}
                        label={"What is the current situation?"}
                        placeholder={"Enter the Current Situation"}
                        onChange={this.handleChange.bind(this, PETITION_SITUATION_ID)}
                        validationState={formValidationStates[PETITION_SITUATION_ID]}
                        required={true}
                        value={formFields[PETITION_SITUATION_ID]}
                        maxLength={PETITION_FIELD_MAX}
                    />
                    <TextAreaField
                        id={PETITION_ACTION_ID}
                        label={"What action should be performed?"}
                        placeholder={"Enter your Proposed Action"}
                        onChange={this.handleChange.bind(this, PETITION_ACTION_ID)}
                        validationState={formValidationStates[PETITION_ACTION_ID]}
                        required={true}
                        value={formFields[PETITION_ACTION_ID]}
                        maxLength={PETITION_FIELD_MAX}
                    />
                    <TextAreaField
                        id={PETITION_GOAL_ID}
                        label={"What would be achieved as a result of this action?"}
                        placeholder={"Enter the goal that would be achieved"}
                        onChange={this.handleChange.bind(this, PETITION_GOAL_ID)}
                        validationState={formValidationStates[PETITION_GOAL_ID]}
                        required={true}
                        value={formFields[PETITION_GOAL_ID]}
                        maxLength={PETITION_FIELD_MAX}
                    />
                    <TextAreaField
                        id={PETITION_VALUE_ID}
                        label={"What value would be promoted as a result of what would be achieved?"}
                        placeholder={"Enter the value that would be promoted"}
                        onChange={this.handleChange.bind(this, PETITION_VALUE_ID)}
                        validationState={formValidationStates[PETITION_VALUE_ID]}
                        required={true}
                        value={formFields[PETITION_VALUE_ID]}
                        maxLength={PETITION_FIELD_MAX}
                    />
                    <FormGroup controlId={PETITION_CLOSING_DATE_ID}>
                        <ControlLabel>Closing Date</ControlLabel>
                        <div className={"datePickerContainer"}>
                            <DatePicker
                                timeFormat={"HH:mm"}
                                dateFormat={"DD/MM/YYYY h:mma"}
                                selected={dateValue}
                                onChange={this.handleDateChange.bind(this)}
                                minDate={moment().add(1, "days")}
                                showTimeSelect
                                required
                            />
                        </div>
                    </FormGroup>
                    <Checkbox
                        checked={formFields[PETITION_IS_ANONYMOUS_ID]}
                        onChange={() => this.handleAnonymityChange()}
                    >
                        Stay Anonymous?
                    </Checkbox>
                    <div className={"buttonContainer"}>
                        <div className={"cancelButtonContainer"}>
                            <Button onClick={this.props.onCancel}>Cancel</Button>
                        </div>
                        <Button bsStyle="primary" type="submit" disabled={isCreating}>
                            { isCreating ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PetitionForm;