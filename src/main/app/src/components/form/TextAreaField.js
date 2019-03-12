import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

/**
 * Is a generic text area field with validation to identify whether the field is empty.
 */

class TextAreaField extends React.PureComponent {

    render() {
        const { id, label, value, maxLength, validationState, ...props } = this.props;
        const currentFieldLength = value !== undefined ? value.length : 0;

        return (
            <div>
                <FormGroup controlId={id} validationState={validationState}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl className={"petitionTextAreaField"} componentClass={"textarea"} value={value}
                                 maxLength={maxLength} {...props} />
                    <FormControl.Feedback />
                    <div className={"nonEmptyFieldWarningContainer"}>
                        <div className={"nonEmptyFieldWarning"}>
                            { validationState === 'error' && <HelpBlock>This field cannot be empty.</HelpBlock> }
                        </div>
                        <div className={"titleLengthCounter"}>
                            <p>{currentFieldLength}/{maxLength}</p>
                        </div>
                    </div>
                </FormGroup>
            </div>
        );
    }
}

export default TextAreaField;