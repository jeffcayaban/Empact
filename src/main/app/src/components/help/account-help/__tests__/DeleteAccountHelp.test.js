import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import DeleteAccountHelp from "../DeleteAccountHelp";

describe('DeleteAccountHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<DeleteAccountHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
