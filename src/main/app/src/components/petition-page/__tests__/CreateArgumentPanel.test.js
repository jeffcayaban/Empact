import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import * as Helpers from '../../../utils/Helpers';

import CreateArgumentPanel from "../CreateArgumentPanel";

describe('CreateArgumentPanel', () => {

    it('should render successfully given the date has not passed', () => {
        const originalIsDatePassed = Helpers.isDatePassed;
        Helpers.isDatePassed = (date) => { return false };

        const component = shallow(<CreateArgumentPanel
            closingDateTime={"testDate"}
            petitionId={"testId"}
            isPetitionCreator={true}
            hideCreateArgumentInvite={jest.fn()}
            showCreateArgument={true}
        />);

        expect(toJson(component)).toMatchSnapshot();
        Helpers.isDatePassed = originalIsDatePassed;
    });

    it('should render nothing given the date has passed', () => {
        const originalIsDatePassed = Helpers.isDatePassed;
        Helpers.isDatePassed = (date) => { return true };

        const component = shallow(<CreateArgumentPanel
            closingDateTime={"testDate"}
            petitionId={"testId"}
            isPetitionCreator={true}
            hideCreateArgumentInvite={jest.fn()}
            showCreateArgument={true}
        />);

        expect(toJson(component)).toMatchSnapshot();
        Helpers.isDatePassed = originalIsDatePassed;
    });
});
