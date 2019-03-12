import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import Home from "../Home";

import * as AppUtils from '../../../utils/AppUtils';

import MockGetArgumentsResponse from '../../../other/mock-data/MockGetArgumentsResponse';
import MockGetPetitionsResponse from '../../../other/mock-data/MockGetPetitionsResponse';

describe('Home', () => {

    it('should render correctly', () => {
        const originalGetMostDiscussedPetitions = AppUtils.getMostDiscussedPetitions;
        const originalGetMostDiscussedArguments = AppUtils.getMostDiscussedArguments;

        AppUtils.getMostDiscussedPetitions = () => MockGetPetitionsResponse;
        AppUtils.getMostDiscussedArguments = () => MockGetArgumentsResponse;

        const component = shallow(<Home />);
        component.setState({ isLoading: false });

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getMostDiscussedPetitions = originalGetMostDiscussedPetitions;
        AppUtils.getMostDiscussedArguments = originalGetMostDiscussedArguments;
    });

    it('should render the loader if isLoading is true', () => {
        const component = shallow(<Home />);
        component.setState({ isLoading: true });
        expect(toJson(component)).toMatchSnapshot();
    });
});
