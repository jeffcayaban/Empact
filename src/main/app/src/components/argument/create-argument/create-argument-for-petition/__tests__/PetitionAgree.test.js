import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import PetitionAgree from "../PetitionAgree";
import * as AppUtils from "../../../../../utils/AppUtils";
import {CURRENT_USERNAME} from "../../../../../constants";
import MockGetPetitionsResponse from '../../../../../other/mock-data/MockGetArgumentsResponse';

describe('PetitionAgree', () => {

    it('should render a loader', () => {
        const component = shallow(
            <PetitionAgree match={{ params: { id: 'testId' } }} />
        );

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render a content retrieval alert', () => {
        const component = shallow(<PetitionAgree match={{ params: { id: 'testId' } }} />);
        component.setState({ petition: null, isPetitionClosed: false, isLoading: false });
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully render the page given the petition is open', () => {
        const petitionData = MockGetPetitionsResponse.content[0];

        const originaGetPetition = AppUtils.getPetition;
        const originalIsPetitionClosed = AppUtils.isPetitionClosed;
        AppUtils.getPetition = () => Promise.resolve(petitionData);
        AppUtils.isPetitionClosed = () => Promise.resolve(false);

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<PetitionAgree match={{ params: { id: 'testId' } }} />);
        component.setState({ petition: petitionData, isPetitionClosed: false, isLoading: false });

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);

        AppUtils.getPetition = originaGetPetition;
        AppUtils.isPetitionClosed = originalIsPetitionClosed;
    });

    it('should successfully render the page given the petition is closed.', () => {
        const petitionData = MockGetPetitionsResponse.content[0];

        const originaGetPetition = AppUtils.getPetition;
        const originalIsPetitionClosed = AppUtils.isPetitionClosed;
        AppUtils.getPetition = () => Promise.resolve(petitionData);
        AppUtils.isPetitionClosed = () => Promise.resolve(false);

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<PetitionAgree match={{ params: { id: 'testId' } }} />);
        component.setState({ petition: petitionData, isPetitionClosed: true, isLoading: false });

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);

        AppUtils.getPetition = originaGetPetition;
        AppUtils.isPetitionClosed = originalIsPetitionClosed;
    });

});
