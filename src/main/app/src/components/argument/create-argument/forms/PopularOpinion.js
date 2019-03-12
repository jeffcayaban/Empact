import React from 'react'
import { createArgumentByPopularOpinion, editArgumentByPopularOpinion } from "../../../../utils/AppUtils";
import { handleArgumentSubmit } from "../../../../utils/Helpers";
import {ARGUMENT_FIELD_MAX, MAXIMUM_NO_OF_SOURCES, MINIMUM_NO_OF_SOURCES} from "../../../../constants";
import ArgumentFormBase from "./argument-form/ArgumentFormBase";
import ArgumentFormField from "./argument-form/ArgumentFormField";

/**
 * Represents the form for an argument by popular opinion.
 */

class PopularOpinion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userExplanation: '',
            sources: [],
            isAnonymous: false
        };

        this.createArgRequest = this.createArgRequest.bind(this);
        this.createEditArgRequest = this.createEditArgRequest.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSource = this.handleChangeSource.bind(this);
        this.handleAddSource = this.handleAddSource.bind(this);
        this.handleRemoveSource = this.handleRemoveSource.bind(this);
        this.handleChangeAnonymity = this.handleChangeAnonymity.bind(this);
        this.onExplanationChange = this.onExplanationChange.bind(this);
    }

    // Used for updating the argument's explanation within the state.
    onExplanationChange(event) {
        const explanation = event.target.value;
        this.setState({ userExplanation: explanation });
    }

    // Used for adding a new source.
    handleAddSource() {
        if (this.state.sources.length <= MAXIMUM_NO_OF_SOURCES) {
            this.setState((prevState) => ({ sources: [...prevState.sources, ""] }));
        }
    }

    // Used for removing an existing source.
    handleRemoveSource() {
        if (this.state.sources.length > MINIMUM_NO_OF_SOURCES) {
            this.setState((prevState) => ({
                sources: prevState.sources.splice(0, prevState.sources.length - 1)
            }));
        }
    }

    // Used for updating an existing source.
    handleChangeSource(index, event) {
        const sources = this.state.sources;
        sources[index] = event.target.value;
        this.setState({ sources: sources });
    }

    // Used for updating an argument's anonymity.
    handleChangeAnonymity() {
        this.setState({ isAnonymous: !this.state.isAnonymous });
    }

    // Create a request object for editing an argument.
    createEditArgRequest() {
        const { isForEdit, argument } = this.props;

        if (isForEdit && argument) {
            const { userExplanation, sources, isAnonymous } = this.state;

            return {
                id: argument.id,
                sources: sources,
                isAnonymous: isAnonymous,
                explanation: userExplanation
            };
        }
    }

    // Create a request object for creating a new argument.
    createArgRequest() {
        if (!this.props.isForEdit) {
            const { isSupporting, petitionId, argumentId, criticalQuestionId, agreesWithCQ, subCriticalQuestionId } = this.props;
            const { userExplanation, sources, isAnonymous } = this.state;

            const request = {
                isSupporting: isSupporting,
                rootPetitionId: petitionId,
                parentArgumentId: argumentId,
                criticalQuestionId: criticalQuestionId,
                agreesWithCQ: agreesWithCQ,
                explanation: userExplanation,
                sources: sources,
                isAnonymous: isAnonymous,
                subCriticalQuestionId: subCriticalQuestionId
            };

            return request;
        }
    }

    // Used for submitting an argument request.
    handleSubmit(e) {
        e.preventDefault();

        const createArgRequest = this.createArgRequest();
        const editArgRequest = this.createEditArgRequest();

        const { isForEdit, argument } = this.props;
        const argumentId = argument ? argument.id : null;

        const sources = isForEdit ? editArgRequest.sources : createArgRequest.sources;

        handleArgumentSubmit(sources, isForEdit, editArgRequest, editArgumentByPopularOpinion, createArgRequest,
            createArgumentByPopularOpinion, argumentId, argument);
    }

    componentWillMount() {
        const argument = this.props.argument;
        if (argument) {
            const { explanation, isAnonymous } = argument;
            const argumentSources = argument.sources && argument.sources.slice();

            this.setState({
                userExplanation: explanation,
                sources: argumentSources,
                isAnonymous: isAnonymous
            });
        }
    }

    render() {
        const statement = this.props.statement;
        const { sources, isAnonymous, userExplanation } = this.state;
        const { handleSubmit, onExplanationChange, handleChangeSource, handleAddSource, handleRemoveSource,
            handleChangeAnonymity  } = this;

        return (
            <form onSubmit={handleSubmit}>
                { statement && <p align="center" style={{ paddingBottom: '20px' }}>{statement}</p> }
                <ArgumentFormField
                    id="formControlsTextarea"
                    label="Enter your explanation in the box below."
                    placeholder="Your explanation"
                    onChange={onExplanationChange}
                    componentClass="textarea"
                    value={userExplanation}
                    className={"petitionTextAreaField"}
                    maxLength={ARGUMENT_FIELD_MAX}
                    required
                />
                <ArgumentFormBase
                    sources={sources}
                    handleChangeSource={handleChangeSource}
                    handleAddSource={handleAddSource}
                    handleRemoveSource={handleRemoveSource}
                    isAnonymous={isAnonymous}
                    handleChangeAnonymity={handleChangeAnonymity}
                />
            </form>
        );
    }
}

export default PopularOpinion;
