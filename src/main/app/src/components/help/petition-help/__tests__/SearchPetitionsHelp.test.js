import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import SearchPetitionsHelp from "../SearchPetitionsHelp";

describe('SearchPetitionsHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<SearchPetitionsHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
