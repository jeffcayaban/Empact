import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import DeletePetitionHelp from "../DeletePetitionHelp";

describe('DeletePetitionHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<DeletePetitionHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
