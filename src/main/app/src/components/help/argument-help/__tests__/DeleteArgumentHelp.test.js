import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import DeleteArgumentHelp from "../DeleteArgumentHelp";

describe('DeleteArgumentHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<DeleteArgumentHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
