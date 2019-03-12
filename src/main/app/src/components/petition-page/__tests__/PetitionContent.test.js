import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import * as Helpers from '../../../utils/Helpers';
import MockPetition from '../../../other/mock-data/MockGetPetitionsResponse';
import PetitionContent from "../PetitionContent";

describe('PetitionContent', () => {

    Date.now = jest.fn(() => 1489246534000);    // 11-03-2017

    it('should render successfully and show the Created By message', () => {
        const originalIsDatePassed = Helpers.isDatePassed;
        Helpers.isDatePassed = () => { return true };

        const component = shallow(<PetitionContent
            showCreatedByOnFooter={true}
            petition={MockPetition.content[0]}
        />);

        expect(toJson(component)).toMatchSnapshot();
        Helpers.isDatePassed = originalIsDatePassed;
    });

    it('should render successfully and not show the Created By message', () => {
        const originalIsDatePassed = Helpers.isDatePassed;
        Helpers.isDatePassed = () => { return true };

        const component = shallow(<PetitionContent
            showCreatedByOnFooter={false}
            petition={MockPetition.content[0]}
        />);

        expect(toJson(component)).toMatchSnapshot();
        Helpers.isDatePassed = originalIsDatePassed;
    });

    it('should render successfully and include the closing date popover', () => {
        const originalIsDatePassed = Helpers.isDatePassed;
        Helpers.isDatePassed = () => { return false };

        const component = shallow(<PetitionContent
            showCreatedByOnFooter={true}
            petition={MockPetition.content[0]}
        />);

        expect(toJson(component)).toMatchSnapshot();
        Helpers.isDatePassed = originalIsDatePassed;
    });

});
