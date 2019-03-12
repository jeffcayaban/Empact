import React from 'react'
import { Panel } from "react-bootstrap";
import CreateArgumentOptions from "../../CreateArgumentOptions";
import {ARGUMENTATION_SCHEMES, CRITICAL_QUESTION_IDS} from "../../../../../constants";
import { showArgumentTemplate } from "../../../../../utils/Helpers";
import UserOpinionBtn from "../../../../common/UserOpinionBtn";
import SituationPreviewModal from "../../../../common/SituationPreviewModal";

/**
 * Will display critical question "Are the circumstances true?" and provide options to create an argument in
 * response to the question.
 */

class SituationCQ1 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showOptions: false,
            showSituation: false,
            selectedArgScheme: ''
        };

        this.situationBtnCallbackFn = this.situationBtnCallbackFn.bind(this);
    }

    handleShowArgumentOptions() {
        this.setState({ showOptions: !this.state.showOptions });
    }

    onOptionSelect(optionKey) {
        this.setState({ selectedArgScheme: ARGUMENTATION_SCHEMES[optionKey]})
    }

    situationBtnCallbackFn = () => this.setState({ showSituation: !this.state.showSituation });

    render() {
        const { situation, petitionId, isSupporting } = this.props;
        const { showSituation, showOptions, selectedArgScheme } = this.state;

        const userOpinionOnSituation = isSupporting ? "true" : "false";
        const popularOpinionAssumption = `You believe it is generally well known that the situation is ${userOpinionOnSituation}.`;

        const argumentTemplates = showArgumentTemplate(popularOpinionAssumption, selectedArgScheme, petitionId,
            isSupporting, isSupporting, null, CRITICAL_QUESTION_IDS[0], null);

        return (
            <Panel expanded={showOptions} onToggle={()=>{}}>
                <Panel.Heading className={"argumentAssumption"}>
                    <div>
                        <div>
                            {`1. Can you provide a supporting argument as to why you think the `}
                            <button type="button" className="linkButton" onClick={this.situationBtnCallbackFn}>
                                situation
                            </button>{` is ${userOpinionOnSituation}?`}
                        </div>
                        <SituationPreviewModal situation={situation} showSituation={showSituation} container={this}
                                               closeCallbackFn={this.situationBtnCallbackFn} />
                    </div>
                    <UserOpinionBtn showOption={showOptions} showArgTemplates={() => this.handleShowArgumentOptions()} />
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <CreateArgumentOptions handleSelect={this.onOptionSelect.bind(this)} />
                        { argumentTemplates }
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

export default SituationCQ1;
