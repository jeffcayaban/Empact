import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ProfileHelp from "../ProfileHelp";

describe('ProfileHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<ProfileHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
