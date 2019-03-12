import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import NoArgCreationOnClosedPetitionAlert from "../NoArgCreationOnClosedPetitionAlert";

describe('NoArgCreationOnClosedPetitionAlert', () => {

    it('should render successfully', () => {
        const component = shallow(<NoArgCreationOnClosedPetitionAlert />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
