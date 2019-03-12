import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import ExplanationPreviewModal from "../ExplanationPreviewModal";

describe('ExplanationPreviewModal', () => {

    it('should render successfully', () => {
        const component = shallow(<ExplanationPreviewModal
            explanation={"testExplanation"}
            showExplanation={true}
            container={<div>testContainer</div>}
            closeCallbackFn={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

});
