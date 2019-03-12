import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ViewPetitionsHelp from "../ViewPetitionsHelp";

describe('ViewPetitionsHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<ViewPetitionsHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
