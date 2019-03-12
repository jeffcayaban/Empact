import React from 'react'
import { Panel } from "react-bootstrap";
import CreateArgumentOptions from "../../CreateArgumentOptions";
import {ARGUMENTATION_SCHEMES, CRITICAL_QUESTION_IDS} from "../../../../../constants";
import {getIsArgumentAgreeWithCQ, showArgumentTemplate} from "../../../../../utils/Helpers";
import UserOpinionBtn from "../../../../common/UserOpinionBtn";
import ExplanationPreviewModal from "../../../../common/ExplanationPreviewModal";

/**
 * Will display critical question "Is the explanation generally accepted?" and provide options to create an argument.
 */

class AcceptedCQ extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showOptions: false,
            showExplanation: false,
            selectedArgScheme: ''
        };

        this.explanationBtnCallbackFn = this.explanationBtnCallbackFn.bind(this);
        this.handleShowArgumentOptions = this.handleShowArgumentOptions.bind(this);
    }

    onOptionSelect = (optionKey) => this.setState({ selectedArgScheme: ARGUMENTATION_SCHEMES[optionKey]});
    handleShowArgumentOptions = () => this.setState({ showOptions: !this.state.showOptions });
    explanationBtnCallbackFn = () => this.setState({ showExplanation: !this.state.showExplanation });

    render() {
        const { isSupporting, argument } = this.props;
        const { selectedArgScheme, showOptions } = this.state;
        const isOrNot = isSupporting ? '' : 'not ';
        const isArgumentAgreeWithCQ = getIsArgumentAgreeWithCQ(isSupporting, argument.agreesWithCQ);

        const argumentTemplates = showArgumentTemplate(null, selectedArgScheme, null, isSupporting,
            isArgumentAgreeWithCQ, argument.id, argument.criticalQuestionId, CRITICAL_QUESTION_IDS[3]);

        const explanationBtn = (
            <button type="button" className="linkButton" onClick={this.explanationBtnCallbackFn}>
                explanation
            </button>
        );

        return (
            <Panel expanded={showOptions}>
                <Panel.Heading className={"argumentAssumption"}>
                    <div>
                        {`1. Can you provide a supporting argument to prove that the `}
                        { explanationBtn }
                        {` is ${isOrNot}generally accepted?`}
                    </div>
                    <UserOpinionBtn showOption={showOptions} showArgTemplates={this.handleShowArgumentOptions} />
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <CreateArgumentOptions handleSelect={this.onOptionSelect.bind(this)} />
                        { argumentTemplates }
                    </Panel.Body>
                </Panel.Collapse>
                <ExplanationPreviewModal
                    showExplanation={this.state.showExplanation}
                    closeCallbackFn={this.explanationBtnCallbackFn}
                    explanation={argument.explanation}
                    container={this}
                />
            </Panel>
        );
    }
}

export default AcceptedCQ;
