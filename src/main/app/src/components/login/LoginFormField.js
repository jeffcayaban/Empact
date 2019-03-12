import React from "react";
import {Col, FormControl, FormGroup} from "react-bootstrap";

/**
 * Is a generic field for the login form.
 */

class LoginFormField extends React.Component {

    render() {
        const { name, type, onChange, fieldValue } = this.props;
        return (
            <FormGroup controlId={name.toLowerCase()}>
                <Col className={"loginFieldName"} sm={2}>
                    {name}
                </Col>
                <Col sm={10}>
                    <FormControl type={type} value={fieldValue} onChange={onChange} placeholder={name} required={true} />
                </Col>
            </FormGroup>
        );
    }
}

export default LoginFormField;
