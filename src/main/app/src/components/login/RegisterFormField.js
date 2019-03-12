import React from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";

/**
 * Is a generic field that is used for the account registration form.
 */

class RegisterFormField extends React.PureComponent {

    render() {
        const { id, validationState, handleChange, name, type, placeholder, maxLength, minLength } = this.props;

        return (
            <FormGroup controlId={id} validationState={validationState}>
                <ControlLabel>{name}</ControlLabel>
                <FormControl
                    type={type}
                    placeholder={placeholder}
                    onChange={handleChange}
                    required={true}
                    minLength={minLength}
                    maxLength={maxLength}
                />
            </FormGroup>
        );
    }

}

export default RegisterFormField;