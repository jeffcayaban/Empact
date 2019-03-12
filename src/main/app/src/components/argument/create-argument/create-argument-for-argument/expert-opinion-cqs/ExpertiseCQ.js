import React from 'react'
import { Panel } from "react-bootstrap";
import CreateArgumentOptions from "../../CreateArgumentOptions";
import {ARGUMENTATION_SCHEMES, CRITICAL_QUESTION_IDS} from "../../../../../constants";
import {getIsArgumentAgreeWithCQ, showArgumentTemplate} from "../../../../../utils/Helpers";
import UserOpinionBtn from "../../../../common/UserOpinionBtn";

/**
 * Will display critical question "Is the expert credible?" and provide options to create an argument.
 */

class ExpertiseCQ extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showOptions: false,
            showAction: false,
            showGoal: false,
            selectedArgScheme: ''
        };
    }

    // Updates the state to either show or not show argument creation options.
    handleShowArgumentOptions() {
        this.setState({ showOptions: !this.state.showOptions });
    }

    // Updates the state to display the chosen argumentation scheme.
    onOptionSelect(optionKey) {
        this.setState({ selectedArgScheme: ARGUMENTATION_SCHEMES[optionKey]})
    }

    render() {
        const { isSupporting, argument } = this.props;
        const { selectedArgScheme, showOptions } = this.state;

        const isCredible = isSupporting ? 'credibility' : 'incredibility';
        const isOrNot = isSupporting ? '' : 'not ';
        const isArgumentAgreeWithCQ = getIsArgumentAgreeWithCQ(isSupporting, argument.agreesWithCQ);

        const argumentTemplates = showArgumentTemplate(null, selectedArgScheme, null, isSupporting,
            isArgumentAgreeWithCQ, argument.id, argument.criticalQuestionId, CRITICAL_QUESTION_IDS[2]);

        return (
            <Panel expanded={showOptions} onToggle={()=>{}}>
                <Panel.Heading className={"argumentAssumption"}>
                    <div>
                        <div>
                            <p>
                                {`1. Can you provide a supporting argument to prove the ${isCredible} of the expert,
                                ${argument.expert}?`}
                            </p>
                            <ul>
                                <li><p>
                                    {`Does the expert ${isOrNot}hold any degrees, professional qualifications or
                                    certification?`}
                                </p></li>
                                <li><p>
                                    {`Does the expert ${isOrNot}have considerable experience in the area of
                                    ${argument.expertDomain}?`}
                                </p></li>
                            </ul>
                        </div>
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

export default ExpertiseCQ;
