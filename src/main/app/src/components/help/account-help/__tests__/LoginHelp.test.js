import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import LoginHelp from "../LoginHelp";

describe('LoginHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<LoginHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
