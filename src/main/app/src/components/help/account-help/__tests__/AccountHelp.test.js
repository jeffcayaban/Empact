import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import AccountHelp from "../AccountHelp";

describe('AccountHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<AccountHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
