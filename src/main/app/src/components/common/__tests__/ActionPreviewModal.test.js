import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ActionPreviewModal from "../ActionPreviewModal";

describe('ActionPreviewModal', () => {

    it('should render successfully', () => {
        const component = shallow(<ActionPreviewModal
            petitionAction={<div>test</div>}
            showActionPreview={true}
            container={null}
            closeCalbackFn={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
