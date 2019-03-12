import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import PetitionClosingTime from "../PetitionClosingTime";

import * as Helpers from '../../../utils/Helpers';

describe('PetitionClosingTime', () => {

    Date.now = jest.fn(() => 1489246534000);    // 11-03-2017

    it('should render successfully given the petition is closed', () => {
        const originalIsDatePassed = Helpers.isDatePassed;
        Helpers.isDatePassed = () => { return true };

        const component = shallow(<PetitionClosingTime
            closingDateTime={1551903565}
        />);

        expect(toJson(component)).toMatchSnapshot();
        Helpers.isDatePassed = originalIsDatePassed;
    });

    it('should render successfully given the petition is not closed', () => {
        const originalIsDatePassed = Helpers.isDatePassed;
        Helpers.isDatePassed = () => { return false };

        const component = shallow(<PetitionClosingTime
            closingDateTime={1551903565}
        />);

        expect(toJson(component)).toMatchSnapshot();
        Helpers.isDatePassed = originalIsDatePassed;
    });
});
