import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import GoalPreviewModal from "../GoalPreviewModal";

describe('GoalPreviewModal', () => {

    it('should render successfully', () => {
        const component = shallow(<GoalPreviewModal
            petitionGoal={"testPetitionGoal"}
            showGoalPreview={jest.fn()}
            container={<div>testContainer</div>}
            closeCallbackFn={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

});
