import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import CreateAccountHelp from "../CreateAccountHelp";

describe('CreateAccountHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<CreateAccountHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
