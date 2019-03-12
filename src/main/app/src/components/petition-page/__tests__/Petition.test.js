import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import * as AppUtils from '../../../utils/AppUtils';
import MockPetition from '../../../other/mock-data/MockGetPetitionsResponse';

import Petition from "../Petition";

function createPetitionPage(props = {}) {
    const mockRouter = jest.fn();
    return <Petition.WrappedComponent {...props} params={{ router: mockRouter }} />;
}

describe('Petition', () => {

    it('should render successfully', () => {
        const mockPetitionData = MockPetition.content[0];

        const originalGetPetition = AppUtils.getPetition;
        AppUtils.getPetition = (id) => Promise.resolve(mockPetitionData);

        const originalCountArgs = AppUtils.countArgsByPetitionIdAndIsSupporting;
        AppUtils.countArgsByPetitionIdAndIsSupporting = (_) => Promise.resolve(5);

        const props = {
            match: { params: { id: "testId" }},
            currentUser: { createdBy: { username: 'admin' }}
        };

        const component = shallow(createPetitionPage(props));
        component.setState({ isLoading: false, petition: mockPetitionData });

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.getPetition = originalGetPetition;
        AppUtils.countArgsByPetitionIdAndIsSupporting = originalCountArgs;
    });

    it('should display a content retrieval alert given no petition data', () => {
        const originalGetPetition = AppUtils.getPetition;
        AppUtils.getPetition = (id) => Promise.reject();

        const originalCountArgs = AppUtils.countArgsByPetitionIdAndIsSupporting;
        AppUtils.countArgsByPetitionIdAndIsSupporting = (_) => Promise.resolve(5);

        const props = {
            match: { params: { id: "testId" }},
            currentUser: { createdBy: { username: 'admin' }}
        };

        const component = shallow(createPetitionPage(props));
        component.setState({ isLoading: false });

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.getPetition = originalGetPetition;
        AppUtils.countArgsByPetitionIdAndIsSupporting = originalCountArgs;
    });

});
