import React from "react";
import { Alert, ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import { VALID_URL_PREFIX_REGEX } from "../../../../../constants";

/**
 * Represents the sources field for the argument form. It allows the user to enter a source for their argument.
 */

class ArgumentFormSources extends React.Component {

    // Produces an error regarding the format of the source.
    static generateUrlSourceWarning(index, sourceUrl) {
        if (sourceUrl && !VALID_URL_PREFIX_REGEX.test(sourceUrl)) {
            return (
                <Alert bsStyle="warning" style={{ marginTop: '10px' }}>
                    {`Source ${index + 1} should start with either https:// or http://`}
                </Alert>
            );
        }
    }

    render() {
        const { sources, handleChangeSource } = this.props;

        return sources.map((source, index) => {
            return (
                <FormGroup key={index} controlId={`source-${index}`}>
                    <ControlLabel>{`Source ${index + 1}`}</ControlLabel>
                    <FormControl
                        placeholder="Enter your source"
                        type="text"
                        value={source}
                        onChange={(e) => handleChangeSource(index, e)}
                        required
                    />
                    { ArgumentFormSources.generateUrlSourceWarning(index, sources[index]) }
                </FormGroup>
            )
        })
    }
}

export default ArgumentFormSources;