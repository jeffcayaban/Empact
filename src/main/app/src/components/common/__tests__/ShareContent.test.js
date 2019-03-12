import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import ShareContent from "../ShareContent";
import {PETITION} from "../../../constants";

describe('ShareContent', () => {

    it('should render successfully', () => {
        const component = shallow(<ShareContent
            contentType={PETITION}
            contentId={"testContentId"}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
