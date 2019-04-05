import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import ContentPreviewBtns from "../ContentPreviewBtns";

describe('ContentPreviewBtns', () => {

    it('should render successfully', () => {
        const component = shallow(
            <ContentPreviewBtns parentArgId={"testId"} showArg={true} showPetition={true} isWinning={true} />
        );
        expect(toJson(component)).toMatchSnapshot();
    });
});
