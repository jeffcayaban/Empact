import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockPetition from '../../../other/mock-data/MockGetPetitionsResponse';
import PetitionEntry from "../PetitionEntry";
import * as Helpers from '../../../utils/Helpers';
import * as AppUtils from "../../../utils/AppUtils";

function createPetitionEntry(props = {}) {
    const mockRouter = jest.fn();
    return <PetitionEntry.WrappedComponent {...props} params={{ router: mockRouter }} />;
}

describe('PetitionEntry', () => {

    it('should successfully render given the creator name is to be shown', () => {
        const originaTruncateText = Helpers.truncateText;
        Helpers.truncateText = (text, length) => { return "truncatedText" };

        const originalCountArgs = AppUtils.countArgsByPetitionIdAndIsSupporting;
        AppUtils.countArgsByPetitionIdAndIsSupporting = (_) => Promise.resolve(5);

        const originalIsDatePassed = Helpers.isDatePassed;
        Helpers.isDatePassed = () => { return true };

        const props = {
            key: 1,
            petition: MockPetition.content[0],
            showCreationDetails: true,
            showCreatorName: true
        };

        const component = shallow(createPetitionEntry(props));
        expect(toJson(component)).toMatchSnapshot();

        Helpers.isDatePassed = originalIsDatePassed;
        Helpers.truncateText = originaTruncateText;
        AppUtils.countArgsByPetitionIdAndIsSupporting = originalCountArgs;
    });

    it('should successfully render given the creator name is not to be shown', () => {
        const originaTruncateText = Helpers.truncateText;
        Helpers.truncateText = (text, length) => { return "truncatedText" };

        const originalCountArgs = AppUtils.countArgsByPetitionIdAndIsSupporting;
        AppUtils.countArgsByPetitionIdAndIsSupporting = (_) => Promise.resolve(5);

        const originalIsDatePassed = Helpers.isDatePassed;
        Helpers.isDatePassed = () => { return true };

        MockPetition.content[0].isAnonymous = true;

        const props = {
            key: 1,
            petition: MockPetition.content[0],
            showCreationDetails: true,
            showCreatorName: false
        };

        const component = shallow(createPetitionEntry(props));
        expect(toJson(component)).toMatchSnapshot();

        Helpers.isDatePassed = originalIsDatePassed;
        Helpers.truncateText = originaTruncateText;
        AppUtils.countArgsByPetitionIdAndIsSupporting = originalCountArgs;
    });

});
