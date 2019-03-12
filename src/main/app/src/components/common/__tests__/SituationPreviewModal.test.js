import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import SituationPreviewModal from "../SituationPreviewModal";

describe('SituationPreviewModal', () => {

    it('should render successfully', () => {
        const component = shallow(<SituationPreviewModal
            situation={"testSituation"}
            showSituation={true}
            container={<div>testDiv</div>}
            closeCallbackFn={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
