import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import NoArgumentsAndExploreAlert from "../NoArgumentsAndExploreAlert";

describe('NoArgCreationOnClosedPetitionAlert', () => {

    it('should render successfully', () => {
        const component = shallow(<NoArgumentsAndExploreAlert />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
