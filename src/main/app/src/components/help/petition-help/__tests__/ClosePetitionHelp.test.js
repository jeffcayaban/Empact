import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ClosePetitionHelp from "../ClosePetitionHelp";

describe('ClosePetitionHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<ClosePetitionHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
