import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ArgumentHelp from "../ArgumentHelp";

describe('ArgumentHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<ArgumentHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
