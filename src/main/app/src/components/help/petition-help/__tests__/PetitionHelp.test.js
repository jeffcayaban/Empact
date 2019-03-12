import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import PetitionHelp from "../PetitionHelp";

describe('PetitionHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<PetitionHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
