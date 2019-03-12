import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import BackButton from "../BackButton";

describe('ArgumentSources', () => {

    it('should render successfully', () => {
        const component = shallow(<BackButton />);
        expect(toJson(component)).toMatchSnapshot();
    });

});
