import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import EditPetitionHelp from "../EditPetitionHelp";

describe('EditPetitionHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<EditPetitionHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
