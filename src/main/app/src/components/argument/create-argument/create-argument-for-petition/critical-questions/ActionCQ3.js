import React from 'react'
import { Panel } from "react-bootstrap";
import CreateArgumentOptions from "../../CreateArgumentOptions";
import {ARGUMENTATION_SCHEMES, CRITICAL_QUESTION_IDS} from "../../../../../constants";
import { showArgumentTemplate } from "../../../../../utils/Helpers";
import UserOpinionBtn from "../../../../common/UserOpinionBtn";
import GoalPreviewModal from "../../../../common/GoalPreviewModal";
import ActionPreviewModal from "../../../../common/ActionPreviewModal";

/**
 * Will display critical question "Does the action achieve the goal?" and provide options to create an argument in
 * response to the question.
 */

class ActionCQ3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showOptions: false,
            showAction: false,
            showGoal: false,
            selectedArgScheme: ''
        };
    }

    handleShowArgumentOptions = () => this.setState({ showOptions: !this.state.showOptions });
    onOptionSelect = (optionKey) => this.setState({ selectedArgScheme: ARGUMENTATION_SCHEMES[optionKey]});

    render() {
        const { petition, petitionId, isSupporting } = this.props;
        const { showAction, showGoal, selectedArgScheme, showOptions } = this.state;

        console.log(isSupporting);

        const userSays = isSupporting ? 'does' : 'does not';
        const popularOpinionAssumption = `You believe it is generally well known that the proposed action ${userSays} achieve the goal.`;

        const actionArgumentTemplate = showArgumentTemplate(popularOpinionAssumption, selectedArgScheme,
            petitionId, isSupporting,isSupporting, null, CRITICAL_QUESTION_IDS[1], null);

        const actionPreviewBtnCallbackFn = () => this.setState({ showAction: true });
        const goalPreviewBtnCallbackFn = () => this.setState({ showGoal: true });

        return (
            <Panel expanded={showOptions} onToggle={()=>{}}>
                <Panel.Heading className={"argumentAssumption"}>
                    <div>
                        <div>
                            {`2. Can you provide a supporting argument as to why you think the `}
                            <button type="button" className="linkButton" onClick={actionPreviewBtnCallbackFn}>
                                action
                            </button>
                            {` ${userSays} achieve the `}
                            <button type="button" className="linkButton" onClick={goalPreviewBtnCallbackFn}>
                                goal
                            </button>
                            {`?`}
                        </div>
                        <ActionPreviewModal
                            petitionAction={petition.action}
                            showActionPreview={showAction}
                            container={this}
                            closeCallbackFn={() => this.setState({ showAction: false })}
                        />
                        <GoalPreviewModal
                            petitionGoal={petition.goal}
                            showGoalPreview={showGoal}
                            container={this}
                            closeCallbackFn={() => this.setState({ showGoal: false })}
                        />
                    </div>
                    <UserOpinionBtn showOption={showOptions} showArgTemplates={() => this.handleShowArgumentOptions()} />
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <CreateArgumentOptions handleSelect={this.onOptionSelect.bind(this)} />
                        { actionArgumentTemplate }
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

export default ActionCQ3;
