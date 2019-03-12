import React from "react";
import { ControlLabel, FormControl, FormGroup } from "react-bootstrap";

/**
 * Represents a generic field for the argument form. It indicates the character count for the field.
 */

class ArgumentFormField extends React.PureComponent {
    render() {
        const { id, label, maxLength, value,  ...props } = this.props;
        const currentFieldLength = value !== undefined ? value.length : 0;
        return (
            <FormGroup controlId={id} style={{ paddingBottom: '10px' }}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl maxLength={maxLength} value={value} {...props} />
                <FormControl.Feedback />
                <div className={"argFormFieldCharCount"}>
                    <div className={"titleLengthCounter"}>
                        <p>{currentFieldLength}/{maxLength}</p>
                    </div>
                </div>
            </FormGroup>
        );
    }
}

export default ArgumentFormField;