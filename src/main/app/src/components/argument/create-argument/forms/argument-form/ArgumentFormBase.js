import React from "react";
import { Button, ButtonGroup, Checkbox } from "react-bootstrap";
import { MAXIMUM_NO_OF_SOURCES, MINIMUM_NO_OF_SOURCES } from "../../../../../constants";
import ArgumentFormSources from "./ArgumentFormSources";

/**
 * Represents the basis of creating a new argument. It allows the user to add or remove sources and to submit the
 * argument with anonymity or not.
 */

class ArgumentFormBase extends React.Component {

    render() {
        const { sources, handleAddSource, handleRemoveSource, isAnonymous, handleChangeSource,
            handleChangeAnonymity } = this.props;

        return (
            <div>
                <p align="center"  style={{ paddingTop: '20px' }}>Can you provide any URL sources to prove your argument?
                    (optional)</p>
                <div className={"centerStyle"}>
                    <ButtonGroup>
                        <Button onClick={() => handleAddSource()} disabled={sources.length >= MAXIMUM_NO_OF_SOURCES}>
                            +
                        </Button>
                        <Button onClick={() => handleRemoveSource()} disabled={sources.length <= MINIMUM_NO_OF_SOURCES}>
                            -
                        </Button>
                    </ButtonGroup>
                </div>
                <div className={"argSources"}>
                    <ArgumentFormSources sources={sources} handleChangeSource={handleChangeSource} />
                </div>
                <Checkbox checked={isAnonymous} onChange={() => handleChangeAnonymity()}>
                    Stay Anonymous?
                </Checkbox>
                <div className={"argFormSubmitBtnContainer"}>
                    <Button bsStyle="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default ArgumentFormBase;
