import React from 'react'
import { createArgumentByExpertOpinion, editArgumentByExpertOpinion } from "../../../../utils/AppUtils";
import {
    ARGUMENT_FIELD_MAX,
    EXPERT_FIELD_MAX,
    MAXIMUM_NO_OF_SOURCES,
    MINIMUM_NO_OF_SOURCES
} from "../../../../constants";
import ArgumentFormBase from "./argument-form/ArgumentFormBase";
import ArgumentFormField from "./argument-form/ArgumentFormField";
import { handleArgumentSubmit } from "../../../../utils/Helpers";

/**
 * Represents the form for an argument by expert opinion.
 */

class ExpertOpinion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expert: '',
            expertDomain: '',
            expertAssertion: '',
            sources: [],
            isAnonymous: false
        };

        this.createArgRequest = this.createArgRequest.bind(this);
        this.createEditArgRequest = this.createEditArgRequest.bind(this);
        this.onEventChange = this.onEventChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSource = this.handleChangeSource.bind(this);
        this.handleAddSource = this.handleAddSource.bind(this);
        this.handleRemoveSource = this.handleRemoveSource.bind(this);
        this.handleChangeAnonymity = this.handleChangeAnonymity.bind(this);
    }

    // Used to update a field within the component's state.
    onEventChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    // Used to add a new source.
    handleAddSource() {
        if (this.state.sources.length <= MAXIMUM_NO_OF_SOURCES) {
            this.setState((prevState) => ({ sources: [...prevState.sources, ""] }));
        }
    }

    // Used to remove an existing source.
    handleRemoveSource() {
        if (this.state.sources.length > MINIMUM_NO_OF_SOURCES) {
            this.setState((prevState) => ({
                sources: prevState.sources.splice(0, prevState.sources.length - 1)
            }));
        }
    }

    // Used to change an existing source.
    handleChangeSource(index, event) {
        const sources = this.state.sources;
        sources[index] = event.target.value;
        this.setState({ sources: sources });
    }

    // Used to change the argument's anonymity within the component's state.
    handleChangeAnonymity() {
        this.setState({ isAnonymous: !this.state.isAnonymous });
    }

    // Create a request object for editing an argument.
    createEditArgRequest() {
        const { isForEdit, argument } = this.props;

        if (isForEdit && argument) {
            const { expert, expertDomain, expertAssertion, sources, isAnonymous } = this.state;
            return {
                id: argument.id,
                expert: expert,
                expertDomain: expertDomain,
                expertAssertion: expertAssertion,
                sources: sources,
                isAnonymous: isAnonymous
            };
        }
    }

    // Create a request object for creating a new argument.
    createArgRequest() {
        if (!this.props.isForEdit) {
            const { isSupporting, petitionId, argumentId, criticalQuestionId, agreesWithCQ, subCriticalQuestionId } = this.props;
            const { expert, expertDomain, expertAssertion, sources, isAnonymous } = this.state;

            return {
                isSupporting: isSupporting,
                rootPetitionId: petitionId,
                parentArgumentId: argumentId,
                criticalQuestionId: criticalQuestionId,
                agreesWithCQ: agreesWithCQ,
                expert: expert,
                expertDomain: expertDomain,
                expertAssertion: expertAssertion,
                sources: sources,
                isAnonymous: isAnonymous,
                subCriticalQuestionId: subCriticalQuestionId
            };
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

        handleArgumentSubmit(sources, isForEdit, editArgRequest, editArgumentByExpertOpinion, createArgRequest,
            createArgumentByExpertOpinion, argumentId, argument);
    }

    componentDidMount() {
        const argument = this.props.argument;

        if (argument) {
            const { expert, expertDomain, expertAssertion, isAnonymous } = argument;

            const argumentSources = argument.sources && argument.sources.slice();

            this.setState({
                expert: expert,
                expertDomain: expertDomain,
                expertAssertion: expertAssertion,
                sources: argumentSources,
                isAnonymous: isAnonymous
            })
        }
    }

    render() {
        const { sources, isAnonymous, expert, expertDomain, expertAssertion } = this.state;
        const { handleSubmit, onEventChange, handleChangeSource, handleAddSource, handleRemoveSource,
            handleChangeAnonymity } = this;

        return (
            <form onSubmit={handleSubmit}>
                <ArgumentFormField
                    id="expert"
                    label="Who would you like to reference to?"
                    placeholder="Expert"
                    type="text"
                    value={expert}
                    onChange={onEventChange}
                    maxLength={EXPERT_FIELD_MAX}
                    required
                />
                <ArgumentFormField
                    id="expertDomain"
                    label="What does this person expertise on?"
                    placeholder="Area of expertise"
                    onChange={onEventChange}
                    type="text"
                    value={expertDomain}
                    maxLength={ARGUMENT_FIELD_MAX}
                    required
                />
                <ArgumentFormField
                    id="expertAssertion"
                    label="What does the expert claim?"
                    placeholder="What does the expert assert?"
                    onChange={onEventChange}
                    componentClass="textarea"
                    value={expertAssertion}
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

export default ExpertOpinion;
