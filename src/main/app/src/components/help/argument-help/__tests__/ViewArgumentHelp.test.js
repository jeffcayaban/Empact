import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ViewArgumentsHelp from "../ViewArgumentsHelp";

describe('ViewArgumentsHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<ViewArgumentsHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
