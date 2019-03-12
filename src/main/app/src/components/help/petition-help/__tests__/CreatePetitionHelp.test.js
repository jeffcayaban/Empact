import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import CreatePetitionHelp from "../CreatePetitionHelp";

describe('CreatePetitionHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<CreatePetitionHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
